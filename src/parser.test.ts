import { expect, it } from 'vitest'

import { parse } from './parser'

it('Parse CSV', () => {
  const csv = `
    name,age,city
    Alice,30,New York
    Bob,35,"Los Angeles"
    "Charlie, Jr.",40,"San Francisco, CA"
  `
  const result = parse(csv)
  expect(result).toEqual([
    { name: 'Alice', age: '30', city: 'New York' },
    { name: 'Bob', age: '35', city: 'Los Angeles' },
    { name: 'Charlie, Jr.', age: '40', city: 'San Francisco, CA' },
  ])
})
