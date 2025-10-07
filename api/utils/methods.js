const m = {};

m.normalizeEventBody = (eventBody) => {
  try {
    if (typeof eventBody === "object")
      return {
        ...eventBody,
      };

    try {
      eventBody = JSON.parse(eventBody);
    } catch (err) {
      eventBody = Buffer.from(eventBody, "base64").toString("utf-8");
    }

    return {
      ...eventBody,
    };
  } catch (err) {
    console.log(err, "normalizeEventBody error");
  }
};

/**
 * @param {String | Number} num - A number (i.e. 1000000)
 * @returns String - Number with commas appended (i.e. 1,000,000)
 */
export const numberWithCommas = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const dolHR = (n) => {
  /**
   * Returns human readable dollar amount from mongo value which is stored in pennies
   */
  n = Number(n);
  n = n.toFixed(2);
  n = numberWithCommas(n);
  if (n === "-0.00") {
    n = "0.00";
  }
  return "$" + n;
};

module.exports = m;
