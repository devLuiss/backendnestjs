import * as dayjs from 'dayjs'
import * as timezone from 'dayjs/plugin/timezone'
import * as utc from 'dayjs/plugin/utc'
dayjs.extend(utc)
dayjs.extend(timezone)

const dayJs = dayjs.tz.setDefault('America/Sao_Paulo')

export default dayJs

