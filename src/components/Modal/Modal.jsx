import React from 'react'
import ReactModal from 'react-modal'
import { MODAL_STYLES } from '../../constants/enum'

import './Modal.css'

ReactModal.setAppElement('#root')

function Modal({ children, isOpen, setIsOpenModal }) {
  return (
    <ReactModal
      style={MODAL_STYLES}
      isOpen={isOpen}
      onRequestClose={() => setIsOpenModal(false)}
      ariaHideApp={false}
      contentLabel="Are you sure to logout?"
    >
      {children}
    </ReactModal>
  )
}

export default Modal
