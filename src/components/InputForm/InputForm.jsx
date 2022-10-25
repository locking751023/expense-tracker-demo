import React from 'react';
import { useController } from 'react-hook-form';
import Item from '../Item';
import { calSubTotal } from '../../helpers/calcHelper';

const InputForm = (props) => {
  const { control, setValue, product, recordedProducts } = props;
  const { id, name, price, unit } = product;
  const [subTotal, setSubTotal] = React.useState();
  const [step, setStep] = React.useState();
  const defValues = recordedProducts?.find((item) => {
    if (item.productId === id) {
      return {
        amount: item.amount,
        sendBack: item.sendBack,
      };
    }
    return null;
  });

  const {
    field: amount,
    fieldState: { error },
  } = useController({
    name: `product.${name}.amount`,
    rules: { required: '必填' },
    control,
    defaultValue: defValues?.amount,
  });
  const { field: sendBack } = useController({
    name: `product.${name}.sendBack`,
    control,
    defaultValue: defValues?.sendBack || 0,
  });
  const { field: subTotalValue } = useController({
    name: `product.${name}.subTotalValue`,
    control,
    rules: { required: true },
    defaultValue: 0,
  });
  const { field: productId } = useController({
    name: `product.${name}.id`,
    control,
    defaultValue: id,
  });

  React.useEffect(() => {
    setSubTotal(() => {
      return (
        calSubTotal(price, amount.value, unit) -
        calSubTotal(price, sendBack.value, unit)
      );
    });
    setValue(`product.${name}.subTotalValue`, subTotal);
    setStep(() => {
      if (unit === '斤' || unit === '兩') return 0.01;
      return 1;
    });
  }, [amount, sendBack, unit, price, setValue, name, subTotal]);

  return (
    <div className="grid grid-cols-6 gap-1 border-b-2 p-1">
      <Item item={name} />
      <Item item={price} />
      <Item item={unit} />
      <div className="flex">
        <input
          type="number"
          min={0.0}
          max={99.0}
          step={step}
          className="w-full rounded-md border-2 bg-slate-100"
          {...amount}
        />
        <small className="text-danger">{error?.message}</small>
      </div>
      <input
        type="number"
        min={0.0}
        max={99.0}
        step={step}
        className="rounded-md border-2 bg-slate-100"
        {...sendBack}
      />
      <input
        type="number"
        className=" bg-slate-100 text-center"
        disabled
        {...subTotalValue}
      />
      <input type="number" className="hidden" disabled {...productId} />
    </div>
  );
};

export default React.memo(InputForm);
