import { useWindowSize } from '@uidotdev/usehooks'
import { useEffect, useState } from 'react'
import { MOBILE_STEP } from '../constants/enum'

const useIsMobile = () => {
  /* reorganize layout on resizing window & mobile mode */
  const size = useWindowSize()
  const [mobileStep, setMobileStep] = useState(MOBILE_STEP.LEFT_CARD)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
  useEffect(() => {
    if (!size.width) return
    if (size.width < 1024) !isMobile && setIsMobile(true)
    else isMobile && setIsMobile(false)
  }, [size.width])

  return [isMobile, mobileStep, setMobileStep]
}

export default useIsMobile
