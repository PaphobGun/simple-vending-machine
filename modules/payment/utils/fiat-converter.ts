const changeFiat: any = {
  1: '1 bath coin',
  5: '5 bath coin',
  10: '10 bath coin',
  20: '20 bank note',
  50: '50 bank note',
  100: '100 bank note',
  500: '500 bank note',
  1000: '1,000 bank note',
}

function mapFiatDisplay(fiat: string): string {
  const display = changeFiat[fiat]
  if (!display) {
    throw new Error('Not support fiat')
  }

  return display
}

export {mapFiatDisplay}
