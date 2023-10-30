import { useCallback, useEffect, useState } from 'react'
import styles from './modal.module.css'

declare global {
  interface HTMLDialogElement {
    toggleModal: () => void
  }
}

export function useModal(
  dialog: React.MutableRefObject<HTMLDialogElement | null>,
  isCloseBackDrop: boolean = false
) {
  const [isOpen, setIsOpen] = useState(false)

  const openModal = useCallback(() => {
    if (dialog.current === null) return
    dialog.current.showModal()
    dialog.current.dispatchEvent(new Event('open'))
    dialog.current.classList.add(styles.open)
  }, [dialog])

  // Esta función cierra un modal con animación y dispara un evento personalizado "close".
  const closeModal = useCallback(() => {
    if (dialog.current === null) return
    dialog.current.classList.remove(styles.open)
    dialog.current.classList.add(styles.close)
    dialog.current.addEventListener(
      'animationend',
      () => {
        dialog.current?.close()
        setTimeout(() => {
          dialog.current?.classList.remove(styles.close)
        })
      },
      { once: true }
    )
  }, [dialog])

  const closeModalSuccess = (handleFunction: () => void) => {
    closeModal()
    dialog.current?.addEventListener('animationend', handleFunction)
  }

  // HANDLES EVENTS
  useEffect(() => {
    const dialogCurrent = dialog.current
    if (dialogCurrent === null) return

    // Cierra el modal si se hace clic fuera de él.
    const handleCloseBackDrop = (e: MouseEvent): void => {
      const dialogContent = dialogCurrent.firstChild as HTMLDivElement
      if (dialogContent === null) return
      const rect = dialogContent.getBoundingClientRect()
      const isInDialog =
        rect.top <= e.clientY &&
        e.clientY <= rect.top + rect.height &&
        rect.left <= e.clientX &&
        e.clientX <= rect.left + rect.width

      if (!isInDialog && isCloseBackDrop) {
        closeModal()
      }
    }

    // Cierra el modal si se presiona la tecla Escape.
    const handleEventKeyBoard = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') {
        e.preventDefault()
        closeModal()
      }

      if (e.key === 'Enter') {
        // e.preventDefault();
      }
    }

    // Escucha eventos personalizados "open" y "close" para mostrar mensajes de registro.
    const handleOpenEvent = () => {
      console.log(`show modal - open '${dialogCurrent.id}'`)
      document.documentElement.style.overflow = 'hidden'
      setIsOpen(true)
    }

    const handleCloseEvent = () => {
      console.log(`hide modal - close '${dialogCurrent.id}'`)
      document.documentElement.removeAttribute('style')
      setIsOpen(false)
    }

    dialogCurrent.addEventListener('click', handleCloseBackDrop)
    dialogCurrent.addEventListener('keydown', handleEventKeyBoard)
    dialogCurrent.addEventListener('open', handleOpenEvent)
    dialogCurrent.addEventListener('close', handleCloseEvent)

    return () => {
      dialogCurrent.removeEventListener('click', handleCloseBackDrop)
      dialogCurrent.removeEventListener('keydown', handleEventKeyBoard)
      dialogCurrent.removeEventListener('open', handleOpenEvent)
      dialogCurrent.removeEventListener('close', handleCloseEvent)
    }
  }, [dialog, closeModal, isCloseBackDrop, openModal, isOpen])

  // Código personalizado de custom metod global dialog
  useEffect(() => {
    function handleCustomMethod(): void {
      const dialogCurrent = dialog.current
      if (dialogCurrent === null) return
      dialogCurrent.toggleModal = () => {
        if (isOpen === true) {
          closeModal()
        } else if (isOpen === false) {
          openModal()
        }
      }
    }

    handleCustomMethod()
  }, [dialog, openModal, closeModal, isOpen])

  return {
    openModal,
    closeModal,
    isOpen,
    closeModalSuccess
  }
}
