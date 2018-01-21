export const fetch = (url, cb, err) => {
  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function ready() {
    if (this.readyState === 4) {
      if (this.status === 200) {
        cb(xhttp.responseText);
      } else if (typeof err === 'function') {
        err(xhttp);
      }
    }
  };
  xhttp.open('GET', url, true);
  xhttp.send();
};

export const percent = (a, b) => {
  if (a === b) {
    return 0;
  } else if (a > b) {
    return (b * 100) / a;
  }
  return (a * 100) / b;
};
