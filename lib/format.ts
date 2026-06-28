export function toPersianNumber(value: number | string) {
  return new Intl.NumberFormat("fa-IR").format(Number(value));
}

export function toPersianCurrency(value: number) {
  return `${new Intl.NumberFormat("fa-IR").format(value)} تومان`;
}