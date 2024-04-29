import { toNumber } from 'lodash-es'

export default defineEventHandler(event => {
  const query = getQuery(event)
  const pageIndex = toNumber(query.page || 1)

  if (pageIndex > 50) {
    return {
      totalRecords: 50 * 50,
      list: [],
    }
  }

  return {
    totalRecords: 50 * 50,
    list: createData(pageIndex),
  }
})

function createData(index: number) {
  const list = []
  for (let i = 0; i < 50; i++) {
    const rowIndex = index * 50 + i + 1
    const row: Record<string, any> = {}
    row['rowIndex'] = rowIndex
    for (let j = 1; j <= 50; j++) {
      row[`col${j}`] = `coloumnData:${rowIndex}:${j}`
    }

    list.push(row)
  }

  return list
}
