type formatterStyle = 'currency' | 'percent'

const Formatter = (amount: number = 0, minimumFractionDigits: number = 2, style: formatterStyle = 'currency', currency: string = 'USD', locale: string = 'en-US') => {
  let options: object
  if (style === 'percent') {
    options = { style, minimumFractionDigits, maximumFractionDigits: minimumFractionDigits }
  } else if (style === 'currency') {
    options = { style, currency, minimumFractionDigits}
  } else if (style === 'decimal'){
    options = { style }
  }
  return new Intl.NumberFormat(locale, options).format((style === 'percent') ? amount/100 : amount)
}

const Logger = (l: any) => console.log('Logger: ', l)

export { Formatter, Logger }