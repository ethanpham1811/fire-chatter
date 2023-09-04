import React, { forwardRef, useEffect, useRef, useState } from 'react'
import { translatedText } from '../../../constants/enum'
import Modal from '../../Modal/Modal'
import PreviewImgModal from '../../Modal/PreviewImgModal'
import Message from '../Message/Message'

const MessageList = forwardRef(({ isLoading, messages, userId, friendPhoto }, ref) => {
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [previewImg, setPreviewImg] = useState(false)
  const dummyRef = useRef()

  /* scroll down chat box on init */
  useEffect(() => {
    setTimeout(() => {
      messages?.length !== 0 && dummyRef?.current?.scrollIntoView({ behavior: 'smooth' })
    }, 10)
  }, [messages])

  function handlePreviewImg(img) {
    setPreviewImg(img)
    setIsOpenModal(true)
  }

  function checkLastMsg(i) {
    if (i === messages.length - 1) return true
    return messages[i].receiver !== messages[i + 1].receiver
  }

  const messagesJsx = (
    <>
      {!isLoading ? (
        <>
          {messages?.length !== 0 ? (
            messages.map((msg, i) => (
              <Message
                setPreviewImg={handlePreviewImg}
                myLastMsg={checkLastMsg(i)}
                userId={userId}
                friendPhoto={friendPhoto}
                key={msg.uid ?? `msg${i}`}
                message={msg}
              />
            ))
          ) : (
            <div className="mt-auto my-3 flex justify-center py-2 relative text-sm before:absolute before:top-0 before:m-auto before:w-1/6 before:h-[1px] before:bg-[#999]">
              {translatedText.startConversation}
            </div>
          )}
        </>
      ) : (
        <div className="mt-auto my-3 flex justify-center py-2 relative text-sm before:absolute before:top-0 before:m-auto before:w-1/6 before:h-[1px] before:bg-[#999]">
          {translatedText.loadingMsg}
        </div>
      )}
    </>
  )
  return (
    <main ref={ref} className="flex flex-1 flex-col gap-2 overflow-y-auto bg-chatBox mx-[-1.25rem] p-5 shadow-innerChatBox">
      {/* {isLoading ? <Spinner message="Loading messages.." /> : messagesJsx} */}
      {messagesJsx}

      {/* for scroll into view on form submit */}
      <span ref={dummyRef}></span>

      {/* Preview img modal */}
      <Modal isOpen={isOpenModal} setIsOpenModal={setIsOpenModal}>
        <PreviewImgModal img={previewImg} setIsOpenModal={setIsOpenModal} anim={{}} isPopup={true} />
      </Modal>
    </main>
  )
})

export default MessageList
