import { ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface ModalContainersProps {
  children: ReactNode;
}

function ModalContainers({ children }: ModalContainersProps) {
  return createPortal(<>{children}</>, document.getElementById('modal') as HTMLElement);
}

export default ModalContainers;