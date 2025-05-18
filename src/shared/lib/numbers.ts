export function calcDiscountPrice(price: number | string, discount: number) {
  return ((Number(price) * (100 - discount)) / 100).toFixed(0);
}
