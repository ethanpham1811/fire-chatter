export const MOBILE_STEP = {
  LEFT_CARD: 'LEFT_CARD',
  RIGHT_CARD: 'RIGHT_CARD'
}
export const MAX_UPLOADS = 5

export const MODAL_STYLES = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    background: 'none',
    border: 'none',
    padding: 0,
    overflow: 'visible'
  }
}
export const RIGHT_CARD_MODE = {
  PROFILE: 'PROFILE',
  CHATBOX: 'CHATBOX'
}
export const PROFILE_TABS = {
  STATISTIC: 1,
  CONTACT: 0
}
export const AUTHEN_PROVIDERS = {
  GOOGLE: 'GOOGLE',
  GITHUB: 'GITHUB'
}

/* framer motion */
export const CARD_ANIM = {
  // SLIDE_LEFT: { initial: { opacity: 0, x: 150 }, animate: { opacity: 1, x: 0 }, transition: { ease: 'backIn', duration: 0.7 } },
  // SLIDE_UP: { initial: { opacity: 0, y: 200 }, animate: { opacity: 1, y: 0 }, transition: { ease: 'backOut', duration: 0.5 } },
  // SCALE_IN: { initial: { opacity: 0, scale: 0.5 }, animate: { opacity: 1, scale: 1 }, transition: { ease: 'backOut', duration: 0.6, delay: 0.7 } }
  SLIDE_LEFT: {
    hidden: { opacity: 0, x: 150 },
    visible: { opacity: 1, x: 0, transition: { ease: 'backIn', duration: 0.7 } },
    exit: { opacity: 0, x: -150 }
  },
  SLIDE_UP: {
    hidden: { opacity: 0, y: 200 },
    visible: { opacity: 1, y: 0, transition: { ease: 'backOut', duration: 0.5 } },
    exit: { opacity: 0, x: -150 }
  },
  SCALE_IN: {
    hidden: { opacity: 0, scale: 0.5 },
    visible: { opacity: 1, scale: 1, transition: { ease: 'backOut', duration: 0.6, delay: 0.7 } },
    exit: { opacity: 0, scale: 0.5 }
  },
  SWAP: {
    hidden: { opacity: 0, scale: 1, y: -200 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { ease: 'backOut', duration: 0.2 } },
    exit: { opacity: 0, scale: 1, y: 200, transition: { ease: 'backOut', duration: 0.2 } }
  },
  NO_ANIM: {
    hidden: { opacity: 1, x: 0, y: 0, scale: 1 },
    visible: { opacity: 1, x: 0, y: 0, scale: 1 },
    exit: { opacity: 1, x: 0, y: 0, scale: 1 }
  }
}
export const PROFILE_TAB_ANIM = {
  hidden: { position: 'absolute', opacity: 0 },
  visible: { position: 'static', opacity: 1, transition: { ease: 'backIn', duration: 0.2, delay: 0.3 } },
  exit: { position: 'absolute', opacity: 0 }
}
export const COVER_FILTER_ANIM = {
  show: { opacity: 1, filter: 'grayscale(100%)', transition: { duration: 0.2 } },
  hide: { opacity: 1, filter: 'url(#coverDistortFilter) grayscale(100%)', transition: { duration: 0.2 } }
}
export const NO_ANIM = { initial: { opacity: 1, scale: 1, x: 0, y: 0 }, animate: { opacity: 1, scale: 1, x: 0, y: 0 } }
