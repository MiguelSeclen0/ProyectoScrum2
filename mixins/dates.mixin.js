import moment from 'moment'

const DateFormats = Object.freeze({
  DATE: 'DD MMM YYYY',
  DATETIME: 'DD MMM YYYY HH:mm:ss',
})

export function applyFormat(date, format = DateFormats.DATE, fallback = '-') {
  const parsedDate = moment(date)
  return parsedDate.isValid() ? parsedDate.format(format) : fallback
}

export const DatesMixin = {
  methods: {
    applyFormat(date, format = DateFormats.DATE, fallback = '-') {
      const parsedDate = this.$moment(date)
      return parsedDate.isValid() ? parsedDate.format(format) : fallback
    },
  },
  created() {
    this.DateFormats = DateFormats
  },
}
