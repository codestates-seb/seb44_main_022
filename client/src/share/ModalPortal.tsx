import { ReactNode } from 'react';
import { createPortal } from 'react-dom';
interface ModalPortalProps {
  children: ReactNode;
}

function ModalPortal({ children }: ModalPortalProps) {
  return createPortal(<>{children}</>, document.getElementById('modal') as HTMLElement);
}

export default ModalPortal;