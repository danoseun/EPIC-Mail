/* eslint-disable max-len */
/**
 * Function to generate random numbers between 1 and 100
 * @param {number} min - The minimum value to be passed in
 * @param {number} max - The maximum values to be passed in
 * @returns {number} which is the random value needed
 */
export const generateRandomArbitraryNumber = (min, max) => Math.floor(Math.random() * (max - min) + min);

export const generateRandomParentMessageId = (min, max) => {
  const result = Math.floor(Math.random() * (max - min) + min);
  if (result === 0) {
    return null;
  }

  return result;
};
