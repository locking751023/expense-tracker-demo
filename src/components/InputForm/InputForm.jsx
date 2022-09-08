import React from 'react';
import { useController } from 'react-hook-form';
import Item from '../Item';

type InputFormProps = {
  name: String,
  price: Number,
  unit: String,
};

const unitSwitch = (count, unit) => {
  const tk = Math.floor(count / 1);
  const tg = Math.round((count % 1) * 10);
  if (unit === '兩') {
    return tk * 16 + tg;
  }
  return Number(`${tk}.${tg}`);
};

const InputForm: React.FC<InputFormProps> = (props) => {
  const { control, setValue, product } = props;
  const { name, price, unit } = product;
  const [subTotal, setSubTotal] = React.useState();

  const { field: amount } = useController({
    name: `product.${name}.amount`,
    control,
    rules: { required: true },
  });
  const { field: sendBack } = useController({
    name: `product.${name}.sendBack`,
    control,
    rules: { required: true },
  });
  const { field: subTotalValue } = useController({
    name: `product.${name}.subTotalValue`,
    control,
    rules: { required: true },
    defaultValue: 0,
  });

  const count = amount.value - sendBack.value;

  const calSubTotal = React.useCallback(
    (prodCount) => {
      return Math.round(price * unitSwitch(prodCount, unit)) || 0;
    },
    [price, unit],
  );

  React.useEffect(() => {
    setSubTotal(calSubTotal(count));
    setValue(`product.${name}.subTotalValue`, subTotal);
  }, [calSubTotal, count, setValue, name, subTotal]);

  return (
    <div className="grid grid-cols-6 gap-1 border-b-2 p-1">
      <Item item={name} />
      <Item item={price} />
      <Item item={unit} />
      <input
        type="number"
        min={0.0}
        max={99.0}
        step={0.1}
        className="rounded-md border-2 bg-slate-100"
        {...amount}
      />
      <input
        type="number"
        min={0.0}
        max={99.0}
        step={0.1}
        className="rounded-md border-2 bg-slate-100"
        {...sendBack}
      />
      <input
        type="number"
        className=" bg-slate-100 text-center"
        disabled
        {...subTotalValue}
      />
    </div>
  );
};

export default React.memo(InputForm);
