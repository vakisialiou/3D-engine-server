
class ArrayHelper {
  static unique(array) {
    const unique = []
    for (const element of array) {
      if (unique.includes(element)) {
        continue
      }
      unique.push(element)
    }
    return unique
  }

  static uniqueProperty(array, property) {
    const unique = []
    const uniqueValues = []
    for (const element of array) {
      if (!element.hasOwnProperty(property)) {
        throw Error(`Property "${property}" doesn't exists`)
      }
      if (uniqueValues.includes(element[property])) {
        continue
      }
      unique.push(element)
      uniqueValues.push(element[property])
    }
    return unique
  }
}