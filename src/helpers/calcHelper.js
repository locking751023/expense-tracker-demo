export const unitSwitch = (count, unit) => {
  const tk = Math.floor(count / 1);
  const tg = Math.round((count % 1) * 10);
  if (unit === '兩') {
    return tk * 16 + tg;
  }
  return Number(`${tk}.${tg}`);
};

export const calSubTotal = (prodCount, prodUnit, prodPrice) => {
  return Math.round(prodPrice * unitSwitch(prodCount, prodUnit)) || 0;
};
