import { FormEvent, lazy, useRef } from 'react'
import Section from './Section'
import Modal from './components/Modal/Modal'
import { useModal } from './components/Modal/useModal'
import { Spinner } from './components/Spinner/Spinner'
const FormModal = lazy(() => import('./FormModal'))

function App() {
  const modalRef = useRef<HTMLDialogElement | null>(null)
  const { closeModal, openModal, isOpen, closeModalSuccess } =
    useModal(modalRef)

  const alertRef = useRef<HTMLDialogElement | null>(null)
  const {
    closeModal: closeAlert,
    openModal: openAlert,
    isOpen: isOpenModal
  } = useModal(alertRef, true)

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    console.log('submit modal')
    setTimeout(() => {
      closeModalSuccess(() => {
        window.location.href = '/submit'
      })
    }, 1000)
  }

  const handleSubmitAlert = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    console.log('submit alert')
    closeAlert()
  }

  return (
    <main>
      <button onClick={openModal}>Open Modal</button>
      <Modal
        modalRef={modalRef}
        id='modal'
        loader={<Spinner />}
        isOpen={isOpen}
      >
        <FormModal handleSubmit={handleSubmit} closeModal={closeModal} />
      </Modal>

      <Section />
      <br />
      <br />
      <button onClick={openAlert}>Open Alert</button>
      <Modal
        modalRef={alertRef}
        id='alert'
        isOpen={isOpenModal}
        loader={<p>Cargando alert ..</p>}
      >
        <form
          method='dialog'
          onSubmit={handleSubmitAlert}
          style={{ padding: '1rem', width: '100%' }}
        >
          <p>Example alert 59487949</p>
          <button onClick={closeAlert} type='reset'>
            Cerrar
          </button>
          <button value='ok-btn' type='submit'>
            ok
          </button>
        </form>
      </Modal>
      <br />

      <br />
      <div
        style={{
          height: '200vh',
          display: 'flex',
          flexDirection: 'column-reverse'
        }}
      >
        <p>final</p>
      </div>
    </main>
  )
}

export default App
