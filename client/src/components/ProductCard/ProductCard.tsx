import styled from 'styled-components';
import { useState } from 'react';
import ModalComponentDetail from '../../share/ModalComponentDetail'

interface Product {
  productId: number;
  productImage: string;
  productName: string;
  productPrice: number;
  productType: string;
}

interface ProductCardProps {
  data: Product[];
}
//인터페이스 정리 필요

function ProductCard({data}: ProductCardProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setModalOpen(true)
  }
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <ProductContainer>
        {data.map((product) => (
            <ProductItem key={product.productId} onClick={() => handleProductClick(product)}>
              <ProductImage src={product.productImage} alt={product.productName}/>
              <HoverOverlay />
            </ProductItem>
                        ))}
      </ProductContainer>
      {modalOpen && selectedProduct && (
        <ModalComponentDetail
        isOpen={modalOpen} 
        onRequestClose={closeModal} 
        contentLabel="Modal" 
        product={selectedProduct} 
        closeModal={closeModal}
      >
      </ModalComponentDetail>
      )}

    </>
  );
}
export default ProductCard;

const ProductContainer = styled.ul`
  margin-top: 1rem;
  margin-bottom: 7rem;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  grid-gap: 0; 
  justify-items: center; 
  align-items: center; 
  grid-row-gap: 3rem;
`

const ProductItem = styled.li`
  min-width: 200px;
  height: 320px; 
  width: 100%;
  position: relative;
`

const ProductImage = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
  object-position: center;
  cursor: pointer;
`
const HoverOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.2);
  opacity: 0;
  transition: opacity 0.5s;
  pointer-events: none;
  ${ProductItem}:hover & {
    opacity: 1;
  }
`;