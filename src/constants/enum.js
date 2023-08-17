export const MOBILE_STEP = {
  LEFT_CARD: 'LEFT_CARD',
  RIGHT_CARD: 'RIGHT_CARD'
}
export const CARD_ANIM = {
  SLIDE_LEFT: { x: [150, 0], opacity: [0, 1], transition: { ease: 'backIn', duration: 0.7 } },
  SLIDE_UP: { y: [200, 0], opacity: [0, 1], transition: { ease: 'backOut', duration: 0.5 } },
  SCALE_IN: { scale: [0.5, 1], opacity: [0, 1], transition: { ease: 'backOut', duration: 0.6, delay: 0.7 } }
}
export const NO_ANIM = { opacity: [1, 1] }
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
