/**
 *
 * @param {(Lambda event object).body} eventBody
 *
 * Lambda event bodies can occasionally differ based on what sls version you are using, and where it is deployed/whether you are running it locally
 *
 * @returns Event body formatted as JSON
 */
const normalizeEventBody = (eventBody) => {
  try {
    if (typeof eventBody === "object")
      return {
        ...eventBody,
      };

    if (process.env.SLS_STAGE) {
      eventBody = Buffer.from(eventBody, "base64").toString("utf-8");
    }

    return {
      ...JSON.parse(eventBody),
    };
  } catch (err) {
    console.log(err, "normalizeEventBody error");
  }
  return eventBody;
};

/**
 * @param {number | string} num - A number (i.e. 1000000)
 * @returns String of num with commas appended (i.e. 1,000,000)
 */
const numberWithCommas = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

/**
 *
 * @param {number | string} n
 * @returns
 */

const dolHR = (n) => {
  n = Number(n);
  n = n.toFixed(2);
  n = numberWithCommas(n);
  if (n === "-0.00") {
    n = "0.00";
  }
  return "$" + n;
};

module.exports = {
  dolHR,
  normalizeEventBody,
  numberWithCommas,
};
