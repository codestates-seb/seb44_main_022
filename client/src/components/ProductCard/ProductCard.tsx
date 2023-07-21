import { useState } from 'react';
import ModalComponentDetail from '../../share/ModalComponentDetail';
import ModalComponentCustom from '../../share/ModalComponentCustom';
import { Product, ProductCardProps } from '../../assets/interface/Store.interface';
import {
  ProductContainer,
  ProductImage,
  HoverOverlay,
  ModalContainer,
  ProductTitle,
} from './ProductCard.style';
function ProductCard({ data, storeId, storeName }: ProductCardProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
    setSelectedProduct(null);
  };
  const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <>
      <ProductContainer>
        {data.map((product) => (
          <li
            key={product.productId}
            style={{ minWidth: '200px', height: '320px', width: '100%', position: 'relative' }}
            onClick={() => handleProductClick(product)}
          >
            <ProductImage src={product.productImage} alt={product.productName} />
            <ProductTitle>{product.productName}</ProductTitle>
            <HoverOverlay />
          </li>
        ))}
      </ProductContainer>
      {modalOpen && selectedProduct && (
        <ModalContainer onClick={handleModalClick}>
          {selectedProduct.productType === 'STANDARD' ? (
            <ModalComponentDetail
              isOpen={modalOpen}
              onRequestClose={closeModal}
              contentLabel="Modal"
              product={selectedProduct}
              closeModal={closeModal}
              storeId={storeId.toString()}
              storeName={storeName}
              productId={selectedProduct.productId.toString()}
            />
          ) : (
            <ModalComponentCustom
              isOpen={modalOpen}
              onRequestClose={closeModal}
              contentLabel="Modal"
              storeId={storeId.toString()}
              storeName={storeName}
              productId={selectedProduct.productId.toString()}
            />
          )}
        </ModalContainer>
      )}
    </>
  );
}
export default ProductCard;
