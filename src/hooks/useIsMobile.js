import { useWindowSize } from '@uidotdev/usehooks'
import { useEffect, useState } from 'react'

const useIsMobile = () => {
  /* reorganize layout on resizing window & mobile mode */
  const size = useWindowSize()
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

  useEffect(() => {
    if (!size.width) return
    setIsMobile(size.width < 1024)
  }, [size.width])

  return [isMobile]
}

export default useIsMobile
