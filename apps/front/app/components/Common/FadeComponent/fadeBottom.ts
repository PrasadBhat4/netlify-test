import { Transition } from 'framer-motion';

export const fadeBottomInitial = { opacity: 0, y: -20 };

export const fadeBottomAnimate = { opacity: 1, y: 0 };

export const fadeBottomTransition: Transition = { type: 'spring', bounce: 0, duration: 2 };

export const fadeBottomVariant = {
  hidden: fadeBottomInitial,
  visible: fadeBottomAnimate,
};

const fadeBottomAnimation = {
  initial: fadeBottomInitial,
  whileInView: fadeBottomAnimate,
  transition: fadeBottomTransition,
  viewport: { once: true },
};

export default fadeBottomAnimation;
