import { toNumber } from 'lodash-es'

export default defineEventHandler(event => {
  const query = getQuery(event)
  const size = toNumber(query.size || 50000)

  return createData(size)
})

function createData(size: number) {
  const list = []
  for (let i = 0; i < size; i++) {
    const rowIndex = i + 1
    const row: Record<string, any> = {}
    for (let j = 1; j <= 50; j++) {
      row[`col${j}`] = `coloumnData:${rowIndex}:${j}`
    }

    list.push(row)
  }

  return list
}
