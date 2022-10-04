import React from 'react';
import { useController } from 'react-hook-form';
import Item from '../Item';
import { calSubTotal } from '../../helpers/calcHelper';

const InputForm = (props) => {
  const { control, setValue, product } = props;
  const { id, name, price, unit } = product;
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
  const { field: productId } = useController({
    name: `product.${name}.id`,
    control,
    defaultValue: id,
  });

  const count = amount.value - sendBack.value;

  React.useEffect(() => {
    setSubTotal(calSubTotal(count, unit, price));
    setValue(`product.${name}.subTotalValue`, subTotal);
  }, [count, unit, price, setValue, name, subTotal]);

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
      <input type="number" className="hidden" disabled {...productId} />
    </div>
  );
};

export default React.memo(InputForm);
