/**
 * Capitalizes the first letter of each word in a given string.
 * Additionally, it capitalizes each part of hyphenated words.
 *
 * @param {string} input - The input string to capitalize.
 * @returns {string} - The input string with each word capitalized.
 * Hyphenated words are also capitalized for each part.
 *
 * @example
 * capitalizeWords("hello world"); // Returns "Hello World"
 * capitalizeWords("john-lenon"); // Returns "John-Lenon"
 * capitalizeWords("hello world-john lenon"); // Returns "Hello World-John Lenon"
 */
export function capitalizeWords(input: string): string {
  return input
    .split(' ') // Split the string into an array of words
    .map(
      (word) =>
        word
          .split('-') // Split each word by hyphen
          .map(
            (part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()
          ) // Capitalize each part
          .join('-') // Join the parts back with a hyphen
    )
    .join(' '); // Join the words back into a single string
}
