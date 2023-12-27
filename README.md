# CSV Parser

Building a CSV parser from scratch with TDD.

Take CSV data and turn it into array of objects.

## The data

```csv
name,age,city
Alice,30,New York
Bob,35,"Los Angeles"
"Charlie, Jr.",40,"San Francisco, CA"
```

## The output

```json
[
  { "name": "Alice", "age": "30", "city": "New York" },
  { "name": "Bob", "age": "35", "city": "Los Angeles" },
  { "name": "Charlie, Jr.", "age": "40", "city": "San Francisco, CA" }
]
```
