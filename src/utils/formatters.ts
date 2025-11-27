
const CURRENCY_MAP: Record<string, string> = {
  "$": "USD",      // US Dollar
  "€": "EUR",      // Euro
  "£": "GBP",      // British Pound
  "¥": "JPY",      // Japanese Yen (also used for CNY)
  "₺": "TRY",      // Turkish Lira
  "₹": "INR",      // Indian Rupee
  "R$": "BRL",     // Brazilian Real
  "₽": "RUB",      // Russian Ruble
  "₩": "KRW",      // South Korean Won
  "Fr": "CHF",     // Swiss Franc
  "C$": "CAD",     // Canadian Dollar
  "A$": "AUD",     // Australian Dollar
  "¥CN": "CNY",    // Chinese Yuan
  "kr": "SEK",     // Swedish Krona
  "zł": "PLN",     // Polish Zloty
  "₪": "ILS",      // Israeli Shekel
  "$MX": "MXN",    // Mexican Peso
  "R": "ZAR",      // South African Rand
  "฿": "THB",      // Thai Baht
  "₫": "VND",      // Vietnamese Dong
}

const LOCALE_CURRENCY_MAP: Record<string, string> = {
  "en-US": "USD",
  "en-GB": "GBP",
  "en-CA": "CAD",
  "en-AU": "AUD",
  "tr-TR": "TRY",
  "de-DE": "EUR",
  "fr-FR": "EUR",
  "es-ES": "EUR",
  "it-IT": "EUR",
  "pt-BR": "BRL",
  "ja-JP": "JPY",
  "zh-CN": "CNY",
  "ko-KR": "KRW",
  "ru-RU": "RUB",
  "hi-IN": "INR",
  "ar-SA": "SAR",
  "pl-PL": "PLN",
  "sv-SE": "SEK",
}

export const formatCurrency = (
  amount: number,
  currency = "USD",
  locale?: string
): string => {
  const currencyCode = CURRENCY_MAP[currency] || currency
  const effectiveLocale = locale ||
    (typeof navigator !== 'undefined' ? navigator.language : 'en-US')
  try {
    return new Intl.NumberFormat(effectiveLocale, {
      style: "currency",
      currency: currencyCode,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount)
  } catch {
    return `${currency} ${Math.abs(amount).toLocaleString(effectiveLocale, { minimumFractionDigits: 2 })}`
  }
}

export const getCurrencySymbol = (currencyCode: string, locale = "en-US"): string => {
  try {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: currencyCode,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })
      .format(0)
      .replace(/\d/g, "")
      .trim()
  } catch {
    return currencyCode
  }
}

export const getLocaleCurrency = (locale: string): string => {
  return LOCALE_CURRENCY_MAP[locale] || "USD"
}

export const formatDate = (
  dateString: string,
  options?: Intl.DateTimeFormatOptions,
  locale?: string
): string => {
  const defaultOptions: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }

  const effectiveLocale = locale ||
    (typeof navigator !== 'undefined' ? navigator.language : 'en-US')

  return new Intl.DateTimeFormat(effectiveLocale, options || defaultOptions).format(new Date(dateString))
}

export const formatDateTime = (
  dateString: string,
  locale?: string,
  use12Hour = false
): string => {
  const effectiveLocale = locale ||
    (typeof navigator !== 'undefined' ? navigator.language : 'en-US')

  return new Intl.DateTimeFormat(effectiveLocale, {
    month: "long",
    day: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: use12Hour,
  }).format(new Date(dateString))
}

export const formatTime = (
  dateString: string,
  locale?: string,
  use12Hour = false
): string => {

  const effectiveLocale = locale ||
    (typeof navigator !== 'undefined' ? navigator.language : 'en-US')

  return new Intl.DateTimeFormat(effectiveLocale, {
    hour: "2-digit",
    minute: "2-digit",
    hour12: use12Hour,
  }).format(new Date(dateString))
}

export const formatRelativeTime = (dateString: string, locale?: string): string => {

  const effectiveLocale = locale ||
    (typeof navigator !== 'undefined' ? navigator.language : 'en-US')

  const date = new Date(dateString)
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  const rtf = new Intl.RelativeTimeFormat(effectiveLocale, { numeric: 'auto' })

  const intervals = [
    { label: 'year', seconds: 31536000 },
    { label: 'month', seconds: 2592000 },
    { label: 'week', seconds: 604800 },
    { label: 'day', seconds: 86400 },
    { label: 'hour', seconds: 3600 },
    { label: 'minute', seconds: 60 },
    { label: 'second', seconds: 1 },
  ]

  for (const interval of intervals) {
    const count = Math.floor(Math.abs(diffInSeconds) / interval.seconds)
    if (count > 0) {
      return rtf.format(diffInSeconds < 0 ? count : -count, interval.label as Intl.RelativeTimeFormatUnit)
    }
  }

  return rtf.format(0, 'second')
}

export const formatCardNumber = (cardNumber: string): string => {
  if (!cardNumber) return '';
  
  const cleaned = cardNumber.replace(/\D/g, '');
  const parts = [];
  for (let i = 0; i < cleaned.length; i += 4) {
    parts.push(cleaned.substring(i, i + 4));
  }
  
  return parts.join(' ').trim();
};


export const maskCardNumber = (cardNumber: string): string => {
  if (!cardNumber) return '';

  const cleaned = cardNumber.replace(/\D/g, '');
  if (cleaned.length >= 16) {
    const parts = [];
    for (let i = 0; i < cleaned.length; i += 4) {
      parts.push(cleaned.substring(i, i + 4));
    }
    return parts.join(' ');
  }
  const first8 = cleaned.substring(0, 8);
  const remaining = cleaned.length - 8;
  const masked = '*'.repeat(Math.max(4, remaining)); // at least 4 stars
  return first8 + masked;
};
