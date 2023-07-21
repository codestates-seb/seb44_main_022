import { MyOrderListName } from './MyOrderListName.style';
function MypageOrderTab() {
  return (
    <div
      style={{
        display: 'flex',
        fontSize: '18px',
        backgroundColor: 'var(--light-purple)',
        width: '100%'
      }}
    >
      <MyOrderListName style={{ justifyContent:"flex-start", paddingLeft:'3rem'}}
      >
        No.
      </MyOrderListName>
      <MyOrderListName style={{ fontWeight: 'bold'}}>
        주문정보
      </MyOrderListName>
      <MyOrderListName style={{ fontWeight: 'bold' }} minWidth={1050}>
        총액
      </MyOrderListName>
      <MyOrderListName style={{ fontWeight: 'bold'}} minWidth={800}> 
        주문날짜
      </MyOrderListName>
      <MyOrderListName
        style={{ fontWeight:'bold', justifyContent:"flex-end", paddingRight:'2rem'}}
      >
        배송상태
      </MyOrderListName>
    </div>
  );
}

export default MypageOrderTab;