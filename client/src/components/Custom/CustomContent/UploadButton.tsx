import styled from 'styled-components';
import React from 'react';
import upload from '../../../assets/images/img_modal/upload.png';

const InputStyled = styled.input.attrs({
  type: 'file',
  accept: 'image/*',
})`
  position: relative;
  z-index: 20;
  height: 30px;
  width: 30px;
  border-radius: 10px;
  margin-left: 20px;
  background-image: url(${upload});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  aspect-ratio: 1/1;

  &::-webkit-file-upload-button {
    visibility: hidden;
  }

  &::before {
    content: '';
    position: absolute;
    top: -10px;
    left: -10px;
    right: -10px;
    bottom: -10px;
    border-radius: 20px;
    background-color: rgba(0, 0, 0, 0.1);
    transform: scale(0);
    transition: transform 0.2s ease-in-out;
  }

  &:hover::before {
    transform: scale(1);
  }

  &:active {
    filter: brightness(1.2);
  }
`;

type UploadButtonProps = {
  id: string;
  onUpload: (imageUrl: string) => void;
};

const UploadButton: React.FC<UploadButtonProps> = ({ id, onUpload }) => {
  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        onUpload(imageUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  return <InputStyled type="file" id={id} onChange={handleUpload} />;
};

export default UploadButton;
