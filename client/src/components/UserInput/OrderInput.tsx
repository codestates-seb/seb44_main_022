import { OrderInputProps } from '../../assets/interface/Input.interface';
import { InputBox } from './UserInput.style';

function OrderInput({ id, name, width, setState }: OrderInputProps) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', width: '100%' }} key={id}>
      <label htmlFor={id} style={{ marginRight: '1.5rem' }}>
        {name}
      </label>
      <InputBox
        id={id}
        style={{ padding: '0.5rem', width: `${width}`, backgroundColor: 'var(--normal-gray)' }}
        onChange={(e) => setState(e.target.value)}
      />
    </div>
  );
}

export default OrderInput;
