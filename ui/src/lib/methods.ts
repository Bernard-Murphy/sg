import { toast } from "sonner";

/**
 *
 * @param string - String to copy
 * @returns void
 */

export const copyText = (string: string) => {
  let textarea = document.createElement("textarea");
  let result;

  try {
    textarea.setAttribute("readonly", "true");
    textarea.setAttribute("contenteditable", "true");
    textarea.style.position = "fixed";
    textarea.value = string;

    document.body.appendChild(textarea);

    textarea.focus();
    textarea.select();

    const range = document.createRange();
    range.selectNodeContents(textarea);

    const sel = window.getSelection();
    if (sel) {
      sel.removeAllRanges();
      sel.addRange(range);
    }

    textarea.setSelectionRange(0, textarea.value.length);
    result = document.execCommand("copy");
  } catch (err) {
    console.error(err);
    result = null;
  } finally {
    document.body.removeChild(textarea);
  }

  if (!result) {
    const isMac = navigator.platform.toUpperCase().indexOf("MAC") >= 0;
    const copyHotkey = isMac ? "⌘C" : "CTRL+C";
    result = prompt(`Press ${copyHotkey}`, string); // eslint-disable-line no-alert
    if (!result) {
      return false;
    }
  }

  toast.success("Copied to clipboard");
};

/**
 *
 * @param text Text to abbreviate
 * @param length Number of characters to show before appending an ellipsis (defaults to 75)
 * @returns Abbreviated text
 */

export const abbreviatedText = (text: string, length?: number) => {
  text = String(text);
  if (!length) length = 75;

  return text.length > length ? text.substring(0, length) + "..." : text;
};

/**
 * @param {number | string} num - A number (i.e. 1000000)
 * @returns String of num with commas appended (i.e. 1,000,000)
 */
export const numberWithCommas = (num: number | string) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

/**
 *
 * @param {number | string} n
 * @returns
 */
export const dolHR = (n: number | string) => {
  n = Number(n);
  n = n.toFixed(2);
  n = numberWithCommas(n);
  if (n === "-0.00") {
    n = "0.00";
  }
  return "$" + n;
};
