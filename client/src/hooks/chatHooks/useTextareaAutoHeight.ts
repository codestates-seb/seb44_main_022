import { useEffect } from 'react';

const useTextareaAutoHeight = (
  inputMessageRef: React.RefObject<HTMLTextAreaElement>,
  chatText: string
) => {
  const handleResizeHeight = () => {
    if (inputMessageRef.current?.style) {
      inputMessageRef.current.style.height = 'auto';
      inputMessageRef.current.style.height = `${inputMessageRef.current.scrollHeight}px`;
    }
  };

  useEffect(() => {
    handleResizeHeight();
  }, [chatText]);
};

export default useTextareaAutoHeight;
