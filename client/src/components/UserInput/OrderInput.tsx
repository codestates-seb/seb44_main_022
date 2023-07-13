import { OrderInputProps } from '../../assets/interface/Input.interface';

function OrderInput({ id, name, width, setState }: OrderInputProps) {
  return (
    <div style={{ width: '100%' }} key={id}>
      <label htmlFor={id} style={{ marginRight: '1.5rem' }}>
        {name}
      </label>
      <input
        id={id}
        style={{ padding: '0.5rem', width: `${width}` }}
        onChange={(e) => setState(e.target.value)}
      />
    </div>
  );
}

export default OrderInput;
