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

export const calSubTotal = (prodPrice, prodAmountOrSendBack, prodUnit) => {
  return (
    Math.round(prodPrice * unitSwitch(prodAmountOrSendBack, prodUnit)) || 0
  );
};

export const calcShippingSum = (RecordedProducts) => {
  return RecordedProducts.reduce((total, recordedProduct) => {
    const { historyPrice, amount, Product } = recordedProduct;
    return Number(total + calSubTotal(historyPrice, amount, Product?.unit));
  }, 0);
};

export const calcStockSum = (RecordedProducts) => {
  return RecordedProducts.reduce((total, recordedProduct) => {
    const { historyPrice, sendBack, Product } = recordedProduct;
    return Number(total + calSubTotal(historyPrice, sendBack, Product?.unit));
  }, 0);
};
