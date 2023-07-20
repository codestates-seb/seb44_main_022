export interface AddCustomProductRequest {
  store_id: number;
  product_id: number;
  file: File;
}

export interface AddCustomProductResponse {
  status: number;
  message: string;
}
