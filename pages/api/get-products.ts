// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next'

export interface Product {
  productId: string
  productName: string
  productImage: string
  stock: number
  price: number
}

export const products: Product[] = [
  {
    productId: '1',
    productName: 'Pepsi',
    productImage:
      'https://backend.tops.co.th/media/catalog/product/8/8/8858998581054_30-07-2021.jpg',
    stock: 10,
    price: 24,
  },
  {
    productId: '2',
    productName: 'Coke',
    productImage:
      'https://backend.tops.co.th/media/catalog/product/8/8/8851959141076_04-03-2022.jpg?impolicy=resize&height=300&width=300',
    stock: 5,
    price: 22,
  },
  {
    productId: '3',
    productName: 'Est',
    productImage:
      'https://backend.tops.co.th/media/catalog/product/8/8/8851952101077_e21-04-2020.jpg?impolicy=resize&height=300&width=300',
    stock: 7,
    price: 15,
  },
  {
    productId: '4',
    productName: 'Est Orange',
    productImage:
      'https://backend.tops.co.th/media/catalog/product/8/8/8851952120146_e21-04-2020.jpg?impolicy=resize&height=300&width=300',
    stock: 12,
    price: 27,
  },
  {
    productId: '5',
    productName: 'Fanta Red',
    productImage:
      'https://backend.tops.co.th/media/catalog/product/8/8/8851959141175_04-03-2022.jpg?impolicy=resize&height=300&width=300',
    stock: 6,
    price: 18,
  },
  {
    productId: '6',
    productName: 'Fanta Green',
    productImage:
      'https://backend.tops.co.th/media/catalog/product/8/8/8851959149188_04-03-2022.jpg?impolicy=resize&height=300&width=300',
    stock: 12,
    price: 22,
  },
  {
    productId: '7',
    productName: 'Lay Salt',
    productImage:
      'https://backend.tops.co.th/media/catalog/product/8/8/8850718801121_06-01-2022_1.jpg?impolicy=resize&height=300&width=300',
    stock: 10,
    price: 30,
  },
  {
    productId: '8',
    productName: 'Lay BBQ',
    productImage:
      'https://backend.tops.co.th/media/catalog/product/8/8/8850718801138_421.jpg?impolicy=resize&height=300&width=300',
    stock: 7,
    price: 30,
  },
  {
    productId: '9',
    productName: 'Lay SC',
    productImage:
      'https://backend.tops.co.th/media/catalog/product/8/8/8850718801237_421.jpg?impolicy=resize&height=300&width=300',
    stock: 5,
    price: 30,
  },
  {
    productId: '10',
    productName: 'Lay Seaweed',
    productImage:
      'https://backend.tops.co.th/media/catalog/product/8/8/8850718801893_06-01-2022_4.jpg?impolicy=resize&height=300&width=300',
    stock: 6,
    price: 30,
  },
  {
    productId: '11',
    productName: 'Lay Basil',
    productImage:
      'https://backend.tops.co.th/media/catalog/product/8/8/8850718801688_421.jpg?impolicy=resize&height=300&width=300',
    stock: 7,
    price: 30,
  },
  {
    productId: '12',
    productName: 'Chili Squid',
    productImage:
      'https://backend.tops.co.th/media/catalog/product/8/8/8850718803576_06-01-2022.jpg?impolicy=resize&height=300&width=300',
    stock: 5,
    price: 30,
  },
]

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  return res.status(200).json({products})
}
