import styled from 'styled-components';
import { useState, useRef, useEffect } from 'react';
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
  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleOutsideClose = (e: MouseEvent) => {
      if (modalOpen && modalRef.current && e.target instanceof Node &&
        !modalRef.current.contains(e.target)) {
        closeModal()
      }
    };
    document.addEventListener('mousedown', handleOutsideClose);    
    return () => document.removeEventListener('mousedown', handleOutsideClose);
  }, [modalOpen]);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setModalOpen(true)
  }
  const closeModal = () => {
    setModalOpen(false);
  };
  const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <>
      <ProductContainer >
        {data.map((product) => (
            <ProductItem key={product.productId} onClick={() => handleProductClick(product)}>
              <ProductImage src={product.productImage} alt={product.productName}/>
              <HoverOverlay />
            </ProductItem>
                        ))}
      </ProductContainer>
      {modalOpen && selectedProduct && (
        <ModalWrapper >
          <ModalContent ref={modalRef} onClick={handleModalClick}>
            <ModalComponentDetail
            isOpen={modalOpen}
            onRequestClose={closeModal}
            contentLabel="Modal"
            product={selectedProduct}
            closeModal={closeModal}
                  >
                  </ModalComponentDetail>
          </ModalContent>
        </ModalWrapper>
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

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled.div`
  cursor: default;
  z-index: 99;
`;