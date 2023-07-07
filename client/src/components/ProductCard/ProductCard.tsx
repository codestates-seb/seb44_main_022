import styled from 'styled-components';

interface ProductInfoList {
    productId: number,
    productImage: string,
    productName: string,
    productPrice: number,
    productType: string
  }

interface ProductCardProps {
    data: ProductInfoList[];
  }
  //임시로 인터페이스 양식만 차용

function ProductCard({data}: ProductCardProps) {
  return (
    <>
     {data.map((product) => (
    <ProductCardItem key={product.productId}>
        <img src={product.productImage}
                      style={{
                        height: '100%',
                        width: '100%',
                        objectFit: 'cover',
                        objectPosition: 'center',
                      }}
                    />
    </ProductCardItem>
                    ))}
    </>
  );
}
export default ProductCard;


const ProductCardItem = styled.div`
  min-width: 200px;
  height: 320px; 
  overflow: hidden;
`