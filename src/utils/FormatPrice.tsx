/**
 *
 * @param number
 * @returns string
 *
 * Format price value so it
 * will only display max 2 decimals
 * and won't show any decimal if there is
 * no decimal
 */
export const formatPrice = (number: number): string => {
  if (number % 1 === 0) {
    return number.toString();
  } else {
    return number.toFixed(2);
  }
};
