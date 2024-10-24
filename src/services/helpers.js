
const formatCurrency = (amount = 0) => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'CAD', currencyDisplay: 'code' }).format(amount).replace('CAD', '').trim();
}

const formatDateTime = (dateTime = new Date()) => {
  return new Intl.DateTimeFormat('en-US', { dateStyle: 'long', timeStyle: 'short', timeZone: 'UTC' }).format(new Date(dateTime));
}

const formatDateTimeYear = (dateTime = new Date()) => {
  return new Intl.DateTimeFormat('en-US', { year: 'numeric', timeZone: 'UTC' }).format(new Date(dateTime));
}

const formatDateTimeMonth = (dateTime = new Date()) => {
  return new Intl.DateTimeFormat('en-US', { month: 'long', timeZone: 'UTC' }).format(new Date(dateTime));
}

const formatDateTimeDay = (dateTime = new Date()) => {
  return new Intl.DateTimeFormat('en-US', { day: 'numeric', timeZone: 'UTC' }).format(new Date(dateTime));
}

export {
  formatCurrency,
  formatDateTime,
  formatDateTimeYear,
  formatDateTimeMonth,
  formatDateTimeDay,
};
