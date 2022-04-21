import numeral from 'numeral'

function formatCurrency(currency: number) {
  return numeral(currency).format('0,0[.]00')
}

export {formatCurrency}
