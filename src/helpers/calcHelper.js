export const unitSwitch = (count, unit) => {
  const array = count?.toString().split('.') || 0;
  const jin = Number(array[0]) || 0;
  const teal = Number(array[1]) || 0;

  switch (unit) {
    case '兩':
      return jin * 16 + teal;
    case '斤':
      return jin + teal / 16;
    default:
      return count;
  }
};

export const calSubTotal = (
  prodAmount,
  prodSendBack,
  prodUnit,
  prodPriceOrCost,
) => {
  return (
    prodPriceOrCost *
      (unitSwitch(prodAmount, prodUnit) - unitSwitch(prodSendBack, prodUnit)) ||
    0
  );
};
