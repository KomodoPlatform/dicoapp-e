import getConfig from '../../utils/config';

const config = getConfig();
const symbolToName = config.get('symbol.symbolToName');

// eslint-disable-next-line import/prefer-default-export
export function covertSymbolToName(syl) {
  const s = symbolToName[syl];
  if (s) return s;
  return '';
}

export function floor(number, after = 1) {
  // eslint-disable-next-line no-restricted-properties
  const p = Math.pow(10, after);
  return Math.floor(number * p) / p;
}

const MONTH_NAMES = [
  'JAN',
  'FEB',
  'MAR',
  'APR',
  'MAY',
  'JUN',
  'JUL',
  'AUG',
  'SEP',
  'OCT',
  'NOV',
  'DEC'
];

export function getMonth(date) {
  return MONTH_NAMES[date.getMonth()];
}
