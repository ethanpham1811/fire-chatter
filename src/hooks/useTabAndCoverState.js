import { useEffect, useState } from 'react'
import { PROFILE_TABS } from '../constants/enum'

const useTabAndCoverState = (user) => {
  const [coverSize, setCoverSize] = useState('180%')
  const [tabIndex, setTabIndex] = useState(PROFILE_TABS.CONTACT)

  useEffect(() => {
    setCoverSize(tabIndex === PROFILE_TABS.CONTACT ? '180%' : '100%')
  }, [tabIndex])

  useEffect(() => {
    setTabIndex(PROFILE_TABS.CONTACT)
  }, [user])

  return [coverSize, tabIndex, setTabIndex]
}

export default useTabAndCoverState
