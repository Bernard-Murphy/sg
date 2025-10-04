import { toast } from "sonner";

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

export const getFileSize = (size: string | number) => {
  size = Number(size);
  const units = ["Bytes", "KB", "MB", "GB"];
  let scale = 0;
  while (size > 900 && scale < 3) {
    size /= 1024;
    scale++;
  }
  return Math.round(size * 100) / 100 + " " + units[scale];
};

export const abbreviatedText = (text: string, length?: number) => {
  text = String(text);
  if (!length) length = 75;

  return text.length > length ? text.substring(0, length) + "..." : text;
};
