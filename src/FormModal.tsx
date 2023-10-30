import React, { FormEvent } from 'react';

interface Props {
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  closeModal: () => void;
}

const FormModal: React.FC<Props> = ({ handleSubmit, closeModal }) => {
  return (
    <form
      method='dialog'
      id='form-modal'
      onSubmit={handleSubmit}
      style={{
        background: '#646cff',
        borderRadius: '0.5rem',
        padding: '1.5rem'
        // height: '300vh'
        // maxWidth: '50rem'
      }}
    >
      <input
        type='text'
        name='name'
        id='name'
        required
        placeholder='Escribe tu nombre'
      />
      <label htmlFor=''>
        Celular:
        <input type='number' required />
      </label>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure odit
        deleniti voluptatum in veritatis delectus, corporis recusandae
        cupiditate impedit earum repellat saepe esse consequuntur fuga
        dignissimos quos distinctio dolorum quaerat?
      </p>
      <menu>
        <button id='close-modal' type='reset' onClick={closeModal}>
          Cancel
        </button>
        <button type='submit'>Confirm</button>
      </menu>
      <div id='message'></div>
      <br />
      <br />
    </form>
  );
};

export default FormModal;
