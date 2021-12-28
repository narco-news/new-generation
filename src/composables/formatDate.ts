import dayjs from 'dayjs'

export default function formatDate(date: string, format = 'MMM D') {
  return dayjs(date).format(format)
}
