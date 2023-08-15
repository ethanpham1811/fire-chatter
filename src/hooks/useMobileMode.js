import { useState } from 'react'
import { MOBILE_MODE } from '../constants/enum'

const useMobileMode = () => {
  const [mobileMode, setMobileMode] = useState(MOBILE_MODE.FRIEND_LIST)

  return { mobileMode, setMobileMode }
}

export default useMobileMode
