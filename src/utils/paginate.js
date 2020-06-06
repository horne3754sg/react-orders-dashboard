export function paginate(items, pageNumber, pageSize) {
  // set the state and end index
  const startIndex = (pageNumber - 1) * pageSize
  const endIndex = startIndex + pageSize

  // slide the array to return the paginated items
  return items.slice(startIndex, endIndex)
}
