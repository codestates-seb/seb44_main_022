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
  id: string;
  onUpload: (imageUrl: string) => void;
};

const UploadButton: React.FC<UploadButtonProps> = ({ id, onUpload }) => {
  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const image = new Image();
        image.onload = () => {
          // canvas를 생성하고, 이미지의 너비와 높이를 기반으로 크기를 조절한다
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');

          const aspectRatio = image.width / image.height;
          const maxWidth = 200; // 변경할 가로 크기
          const maxHeight = 200; // 변경할 세로 크기

          let width = maxWidth;
          let height = maxHeight;

          if (maxWidth / maxHeight > aspectRatio) {
            // 이미지의 가로가 더 긴 경우
            height = maxWidth / aspectRatio;
          } else {
            // 이미지의 세로가 더 긴 경우
            width = maxHeight * aspectRatio;
          }

          canvas.width = width;
          canvas.height = height;
          ctx?.drawImage(image, 0, 0, width, height);

          const imageUrl = canvas.toDataURL('image/jpeg', 1);
          onUpload(imageUrl);
        };

        image.src = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  return <InputStyled type="file" id={id} onChange={handleUpload} />;
};

export default UploadButton;
