import { expect, it } from 'vitest'

import { parse } from './parser'

// Test 1: Parsing a single line (header)
it.only('should parse a single header line into keys', () => {
  const csv = 'name,age,city'
  const result = parse(csv)
  expect(result).toEqual([{ name: '', age: '', city: '' }])
})

// Test 2: Parsing multiple fields
it('should parse a line with multiple fields', () => {
  const csv = 'name,age,city\nAlice,30,New York'
  const result = parse(csv)
  expect(result).toEqual([{ name: 'Alice', age: '30', city: 'New York' }])
})

// Test 3: Parsing multiple rows
it('should parse multiple rows', () => {
  const csv = 'name,age,city\nAlice,30,New York\nBob,35,Los Angeles'
  const result = parse(csv)
  expect(result).toEqual([
    { name: 'Alice', age: '30', city: 'New York' },
    { name: 'Bob', age: '35', city: 'Los Angeles' },
  ])
})

// Test 4: Handling quotes in fields
it('should correctly handle quotes in fields', () => {
  const csv = 'name,age,city\n"Charlie, Jr.",40,"San Francisco, CA"'
  const result = parse(csv)
  expect(result).toEqual([
    { name: 'Charlie, Jr.', age: '40', city: 'San Francisco, CA' },
  ])
})

// Test 5: Handling commas in quoted fields
it('should correctly handle commas in quoted fields', () => {
  const csv =
    'name,description\n"Charlie, Jr.","Loves coding, coffee, and cats"'
  const result = parse(csv)
  expect(result).toEqual([
    { name: 'Charlie, Jr.', description: 'Loves coding, coffee, and cats' },
  ])
})

// Test 6: Handling newlines in quoted fields
it('should correctly handle newlines in quoted fields', () => {
  const csv = 'name,quote\n"Charlie, Jr.","Line1\nLine2"'
  const result = parse(csv)
  expect(result).toEqual([{ name: 'Charlie, Jr.', quote: 'Line1\nLine2' }])
})

// Test 7: Handling empty fields
it('should handle empty fields correctly', () => {
  const csv = 'name,age,city\nAlice,,New York\n,35,Los Angeles'
  const result = parse(csv)
  expect(result).toEqual([
    { name: 'Alice', age: '', city: 'New York' },
    { name: '', age: '35', city: 'Los Angeles' },
  ])
})

// Test 8: Error handling for malformed CSV
it('should throw an error for malformed CSV input', () => {
  const csv = 'name,age,city\nAlice,30,New York\nBob,35'
  expect(() => parse(csv)).toThrow('Malformed CSV input')
})
