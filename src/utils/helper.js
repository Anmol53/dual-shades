/**
 * Generates a random color in hexadecimal format.
 * @returns {string} A random color in hexadecimal format (#RRGGBB).
 */
export const getRandomColorHex = () => {
  let x = Math.random();
  const red = Math.floor(x * 255)
    .toString(16)
    .padStart(2, "0");
  x = Math.random();
  const green = Math.floor(x * 255)
    .toString(16)
    .padStart(2, "0");
  x = Math.random();
  const blue = Math.floor(x * 255)
    .toString(16)
    .padStart(2, "0");
  return `#${red}${green}${blue}`;
};

/**
 * Generates a random gradient style object.
 * @param {Object} [options] - The options for generating the gradient.
 * @param {string} [options.angle="90deg"] - The angle of the gradient.
 * @param {string} [options.color1] - The first color of the gradient. If not provided, a random color will be generated.
 * @param {string} [options.color2] - The second color of the gradient. If not provided, a random color will be generated.
 * @returns {Object} An object with 'backgroundColor' and 'backgroundImage' properties representing the gradient style.
 */
export const getRandomGradient = ({
  angle = "90deg",
  color1 = getRandomColorHex(),
  color2 = getRandomColorHex(),
} = {}) => {
  return {
    backgroundColor: `${color1}`,
    backgroundImage: `linear-gradient(${angle}, ${color1}, ${color2})`,
  };
};

/**
 * Converts bytes to a human-readable format.
 *
 * @param {number} bytes - The number of bytes to convert.
 * @param {number} [decimals=2] - The number of decimal places to include in the result.
 * @returns {string} The formatted string representing the bytes in a human-readable format.
 *
 * @example
 * formatBytes(1024) // returns "1 KB"
 * formatBytes(1024 * 1024) // returns "1 MB"
 * formatBytes(1024 * 1024 * 1024) // returns "1 GB"
 */
export const formatBytes = (bytes, decimals = 2) => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
};
