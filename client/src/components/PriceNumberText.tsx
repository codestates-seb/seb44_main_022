import { PriceNumberProps } from '../assets/interface/Cart.interface';

function PriceNumberText({ price, priceText }: PriceNumberProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ fontSize: '22px', fontWeight: 'bold', margin: '0.5rem 0' }}>
        <span style={{ color: 'var(--gold)' }}>{price.toLocaleString()}</span>원
      </div>
      <div style={{ margin: '0.5rem 0', fontWeight: 'bold' }}>{priceText}</div>
    </div>
  );
}

export default PriceNumberText;
