import type {NextApiRequest, NextApiResponse} from 'next'

import {products} from 'pages/api/get-products'
import type {Product} from 'pages/api/get-products'
import {fiats} from 'pages/api/get-fiats'
import type {Fiat} from 'pages/api/get-fiats'

interface RequestItem {
  id: string
  amount: number
  value: number
}

const fiatId: {
  [name: string]: string
} = fiats.reduce(
  (pre, cur) => ({
    ...pre,
    [cur.fiatName]: cur.fiatId,
  }),
  {},
)

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const {products: requestProducts, fiats: requestFiats} = req.body

    let totalPrice = 0
    let totalInserted = 0

    const outOfStockProducts: Product[] = []
    // calculate if there are enough stock
    requestProducts.forEach((rp: RequestItem) => {
      const outOfStockProduct = products.find(
        p => p.productId === rp.id && p.stock < rp.amount,
      )
      if (outOfStockProduct) {
        outOfStockProducts.push(outOfStockProduct)
      }

      totalPrice += products.reduce(
        (pre, cur) =>
          cur.productId === rp.id ? (pre += cur.price * rp.amount) : (pre += 0),
        0,
      )
    })

    const stockFromRequest: {id: string; amount: number}[] = []

    requestFiats.forEach((rf: RequestItem) => {
      stockFromRequest.push({id: rf.id, amount: rf.amount})
      totalInserted += fiats.reduce(
        (pre, cur) =>
          cur.fiatId === rf.id ? (pre += cur.price * rf.amount) : (pre += 0),
        0,
      )
    })

    const availableFiats: Fiat[] = []
    fiats.forEach(f => {
      const fiat = stockFromRequest.find(rf => rf.id === f.fiatId)
      if (fiat) {
        availableFiats.push({...f, stock: f.stock + fiat.amount})
      } else {
        availableFiats.push(f)
      }
    })

    if (outOfStockProducts.length) {
      return res
        .status(400)
        .json({msg: 'There are some product out of stock', outOfStockProducts})
    }

    // calculate if there are enough coin/bank note to return the change
    const change = totalInserted!! - totalPrice!!
    let isEnoughToChange = true

    const fiatStock: any = {
      1: availableFiats.find(f => f.fiatId === fiatId['1 bath coin'])!!.stock,
      5: availableFiats.find(f => f.fiatId === fiatId['5 bath coin'])!!.stock,
      10: availableFiats.find(f => f.fiatId === fiatId['10 bath coin'])!!.stock,
      20: availableFiats.find(f => f.fiatId === fiatId['20 bank note'])!!.stock,
      50: availableFiats.find(f => f.fiatId === fiatId['50 bank note'])!!.stock,
      100: availableFiats.find(f => f.fiatId === fiatId['100 bank note'])!!
        .stock,
      500: availableFiats.find(f => f.fiatId === fiatId['500 bank note'])!!
        .stock,
      1000: availableFiats.find(f => f.fiatId === fiatId['1,000 bank note'])!!
        .stock,
    }

    const changeFiat: any = {
      1: 0,
      5: 0,
      10: 0,
      20: 0,
      50: 0,
      100: 0,
      500: 0,
      1000: 0,
    }

    let leftChange = change

    if (change !== 0) {
      ;[1000, 500, 100, 50, 20, 10, 5, 1].forEach((f: any) => {
        changeFiat[f] = Math.floor(leftChange / f)
        leftChange = leftChange - changeFiat[f] * f
      })

      const changeList = Object.entries(changeFiat)
      const neededChange = changeList.filter((c: any) => c[1] > 0)
      neededChange.forEach((n: any) => {
        if (fiatStock[n[0]] < n[1]) {
          isEnoughToChange = false
        }
      })
    }

    if (!isEnoughToChange) {
      return res.status(400).json({msg: 'not enough fiat to change'})
    }

    res.status(200).json({
      change: change || 0,
      changeFiat,
    })
  } else {
    res.status(404).json({msg: 'not found'})
  }
}
