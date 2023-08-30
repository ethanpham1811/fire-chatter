import React from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

/* custom injected jsx */
const Msg = ({ userName, message, photoUrl }) => (
  <div className="grid grid-cols-[2.5rem_1fr] grid-rows-2 grid-template-col">
    <img src={photoUrl} alt="user image" className="row-span-2 self-center rounded-full w-10 aspect-square" />
    <div className="pl-3 self-center font-bold">{userName}</div>
    <div className="pl-3 self-center overflow-hidden text-ellipsis whitespace-nowrap w-full">{message}</div>
  </div>
)

function NotificationBoard() {
  /* notification listener from fire cloud messaging */
  // useEffect(() => {
  //   const unsubcribe = msgNotificationListener((payload) => {
  //     const { userName, message, photoUrl } = payload.notification
  //     toast(<Msg userName={userName + ':'} message={message} photoUrl={photoUrl} />)
  //   })
  //   return () => unsubcribe()
  // }, [])

  return (
    <ToastContainer
      toastStyle={{ backgroundColor: '#fff', color: '#000' }}
      position="top-right"
      autoClose={500000}
      limit={1}
      hideProgressBar
      newestOnTop
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable={false}
      pauseOnHover
    />
  )
}

export default NotificationBoard
