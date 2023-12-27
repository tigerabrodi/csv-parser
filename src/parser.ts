// Building CSV parser from scratch

export function parse(input: string) {
  const lines = splitIntoLines(input)
  const headers = parseHeaders(lines[0])
  const dataLines = lines.slice(1)

  return dataLines.map((line) => parseLine(line, headers))
}

function splitIntoLines(input: string): Array<string> {
  return input
    .trim()
    .split('\n')
    .map((line) => line.trim()) // -> ['name,age,city', 'Alice,30,New York', 'Bob,35,"Los Angeles"', '"Charlie, Jr.",40,"San Francisco, CA"']
}

function parseHeaders(headerLine: string): Array<string> {
  return headerLine.split(',').map((header) => header.trim()) // -> ['name', 'age', 'city']
}

function parseLine(
  line: string,
  headers: Array<string>
): Record<string, string> {
  let currentField = ''
  let isInsideQuote = false
  let columnIndex = 0
  const parsedCSV: Record<string, string> = {}

  for (let i = 0; i <= line.length; i++) {
    const char = line[i] || ',' // when we reach the end of the line (line[i] is undefined because i equals line.length, length is always + 1 the index), we treat it as if there was a comma there.

    if (isQuote(char)) {
      isInsideQuote = !isInsideQuote
      continue
    }

    if (isFieldSeparator(char, isInsideQuote)) {
      parsedCSV[headers[columnIndex]] = currentField // Map the current field value to the header
      currentField = ''
      columnIndex++
      continue
    }

    currentField += char
  }

  return parsedCSV
}

function isQuote(char: string): boolean {
  return char === '"'
}

function isFieldSeparator(char: string, insideQuote: boolean): boolean {
  return char === ',' && !insideQuote
}
