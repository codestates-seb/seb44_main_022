import { useState } from 'react';
import ModalComponentDetail from '../../share/ModalComponentDetail';
import ModalComponentCustom from '../../share/ModalComponentCustom';
import {
  ProductContainer,
  ProductImage,
  HoverOverlay,
  ModalWrapper
} from './ProductCard.style';

interface Product {
  productId: number;
  productImage: string;
  productName: string;
  productType: string;
}

interface ProductCardProps {
  data: Product[];
  storeId: number;
  storeName: string;
}

function ProductCard({data, storeId, storeName}: ProductCardProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const handleProductClick = (product: Product) => {    
    setSelectedProduct(product);
    setModalOpen(true);
  }
  const closeModal = () => {
    setModalOpen(false);
    setSelectedProduct(null)
  };
  const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <>
      <ProductContainer >
        {data.map((product) => (
            <li key={product.productId} style={{minWidth:'200px', height:'320px', width:'100%', position:'relative'}} onClick={() => handleProductClick(product)}>
              <ProductImage src={product.productImage} alt={product.productName}/>
              <HoverOverlay />
            </li>
                        ))}
      </ProductContainer>
      {modalOpen && selectedProduct && (
        <ModalWrapper >
          <div style={{cursor:'default', zIndex:'99'}} onClick={handleModalClick}>
          {selectedProduct.productType === "STANDARD" ? (
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
                //product={selectedProduct}
                //여긴 ModalComponentCustom쪽과 논의 필요해보임
                //closeModal={closeModal}
                //storeId={storeId.toString()}
                //storeName={storeName}
               //productId={selectedProduct.productId.toString()}
              />
            )}
          </div>
        </ModalWrapper>
      )}

    </>
  );
}
export default ProductCard;
