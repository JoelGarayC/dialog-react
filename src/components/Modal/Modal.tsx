import React, {
  MutableRefObject,
  ReactElement,
  RefObject,
  Suspense
} from 'react'
import { createPortal } from 'react-dom'
import styles from './modal.module.css'

interface Props {
  children: React.ReactNode | React.ReactNode[]
  modalRef: RefObject<HTMLDialogElement> | MutableRefObject<HTMLDialogElement>
  id: string
  margin?: string
  loader?: ReactElement
  isOpen: boolean
}

const Modal: React.FC<Props> = ({ children, modalRef, id, loader, isOpen }) => {
  return createPortal(
    <dialog id={id} ref={modalRef} className={styles.dialogBackdrop}>
      {isOpen ? (
        <Suspense fallback={loader}>
          <div className={styles.dialog}>{children}</div>
        </Suspense>
      ) : null}
    </dialog>,
    document.getElementById('modal-root')!
  )
}

export default Modal
