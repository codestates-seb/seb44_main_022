import { OrderInputProps } from '../../assets/interface/Input.interface';
import AddressFunc from '../../pages/order/Payment/AddressFunc';
import { InputBox, InputLabel } from './UserInput.style';

function OrderInput({ id, name, width, placeholder, state, setState }: OrderInputProps) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', width: '100%' }} key={id}>
      <InputLabel htmlFor={id}>{name}</InputLabel>
      <InputBox
        id={id}
        style={{
          padding: '0.5rem',
          width: `${width}`,
          backgroundColor: 'transparent',
          borderColor: '#d8d8d8',
          borderRadius: '0px',
        }}
        placeholder={placeholder}
        onChange={(e) => setState(e.target.value)}
        onClick={() => id === 'shippingAddress' && AddressFunc(setState)}
        value={state}
        readOnly={id === 'shippingAddress'}
      />
    </div>
  );
}

export default OrderInput;
