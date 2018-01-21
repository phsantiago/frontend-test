export const get = key => obj => obj[key];

export const compose = (...args) => initial => args.reduceRight(
  (result, fn) => fn(result),
  initial,
);

export const sort = fn => arr => arr.sort(fn);

export const compareKey = key => (a, b) => {
  if (a[key] > b[key]) {
    return -1;
  }
  if (a[key] < b[key]) {
    return 1;
  }
  return 0;
};
