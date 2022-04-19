// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({
    products: [
      {
        productId: '1',
        productName: 'Product-1',
        amount: 0,
      },
      {
        productId: '2',
        productName: 'Product-2',
        amount: 0,
      },
      {
        productId: '3',
        productName: 'Product-2',
        amount: 0,
      },
    ],
  })
}
