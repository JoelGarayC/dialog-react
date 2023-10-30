import { useEffect, useRef } from 'react'

function Section() {
  const btnRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const mod = document.querySelector<HTMLDialogElement>('#modal')!
    const handleOpen = () => mod?.toggleModal()

    const btnRefCurrent = btnRef.current
    btnRefCurrent?.addEventListener('click', handleOpen)
    return () => {
      btnRefCurrent?.removeEventListener('click', handleOpen)
    }
  }, [])

  return (
    <div>
      <button ref={btnRef}>Component</button>
    </div>
  )
}

export default Section
