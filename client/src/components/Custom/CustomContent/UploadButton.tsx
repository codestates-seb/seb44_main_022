import styled from 'styled-components';
import React from 'react';
import upload from '../../../assets/images/img_modal/upload.png';

const InputStyled = styled.input.attrs({
  type: 'file',
  accept: 'image/*',
})`
  position: relative;
  z-index: 20;
  height: 33px;
  width: 40px;
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
    top: -15px;
    left: -16px;
    right: -16px;
    bottom: -16px;
    border-radius: 50%;
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
  onUpload: (imageUrl: string) => void;
};

const UploadButton: React.FC<UploadButtonProps> = ({ onUpload }) => {
  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const image = new Image();
        image.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');

          const aspectRatio = image.width / image.height;
          const maxWidth = 200;
          const maxHeight = 200;

          let width = maxWidth;
          let height = maxHeight;

          if (maxWidth / maxHeight > aspectRatio) {
            height = maxWidth / aspectRatio;
          } else {
            width = maxHeight * aspectRatio;
          }

          canvas.width = width;
          canvas.height = height;
          ctx?.drawImage(image, 0, 0, width, height);

          const imageUrl = canvas.toDataURL('image/png');

          onUpload(imageUrl);
        };

        image.src = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  return <InputStyled type="file" onChange={handleUpload} />;
};

export default UploadButton;
