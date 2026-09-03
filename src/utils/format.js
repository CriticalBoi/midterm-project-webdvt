import moment from 'moment';

export function formatCurrency(value) {
  const n = Number(value) || 0;
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(n);
}

export function formatDate(value) {
  if (!value) return '';
  const m = moment(value, 'YYYY-MM-DD');
  return m.isValid() ? m.format('MMM D, YYYY') : value;
}

export function today() {
  return moment().format('YYYY-MM-DD');
}
