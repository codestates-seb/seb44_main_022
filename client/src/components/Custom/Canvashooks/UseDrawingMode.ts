import { useState } from 'react';

const useDrawingMode = () => {
  const [drawingMode, setDrawingMode] = useState<boolean>(false);

  const toggleDrawingMode = () => {
    setDrawingMode((prevMode) => !prevMode);
  };

  return {
    drawingMode,
    toggleDrawingMode,
  };
};

export default useDrawingMode;
