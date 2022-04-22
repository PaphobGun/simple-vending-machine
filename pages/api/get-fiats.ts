// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next'

export interface Fiat {
  fiatId: string
  fiatName: string
  fiatImage: string
  stock: number
  price: number
}

export const fiats: Fiat[] = [
  {
    fiatId: '1',
    fiatName: '1 bath coin',
    fiatImage:
      'http://www.royalthaimint.net/ewtadmin/ewt/mint_web/images/Pic/1BathB.png',
    stock: 8,
    price: 1,
  },
  {
    fiatId: '2',
    fiatName: '5 bath coin',
    fiatImage:
      'http://www.royalthaimint.net/ewtadmin/ewt/mint_web/images/Pic/5bathF2.png',
    stock: 5,
    price: 5,
  },
  {
    fiatId: '3',
    fiatName: '10 bath coin',
    fiatImage:
      'http://www.royalthaimint.net/ewtadmin/ewt/mint_web/images/Pic/10BathF.png',
    stock: 7,
    price: 10,
  },
  {
    fiatId: '4',
    fiatName: '20 bank note',
    fiatImage:
      'https://www.bot.or.th/Thai/Banknotes/HistoryAndSeriesOfBanknotes/PublishingImages/AL16_20f.gif',
    stock: 12,
    price: 20,
  },
  {
    fiatId: '5',
    fiatName: '50 bank note',
    fiatImage:
      'https://www.bot.or.th/Thai/Banknotes/HistoryAndSeriesOfBanknotes/PublishingImages/AL16_50f.gif',
    stock: 6,
    price: 50,
  },
  {
    fiatId: '6',
    fiatName: '100 bank note',
    fiatImage:
      'https://www.bot.or.th/Thai/Banknotes/HistoryAndSeriesOfBanknotes/PublishingImages/AL16_B100f.gif',
    stock: 12,
    price: 100,
  },
  {
    fiatId: '7',
    fiatName: '500 bank note',
    fiatImage:
      'https://www.bot.or.th/Thai/Banknotes/HistoryAndSeriesOfBanknotes/PublishingImages/AL16_B500f.gif',
    stock: 10,
    price: 500,
  },
  {
    fiatId: '8',
    fiatName: '1,000 bank note',
    fiatImage:
      'https://www.bot.or.th/Thai/Banknotes/HistoryAndSeriesOfBanknotes/PublishingImages/AL16_B1000f.gif',
    stock: 7,
    price: 1000,
  },
]

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  return res.status(200).json({fiats})
}
