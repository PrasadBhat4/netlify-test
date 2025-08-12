import { Transition } from 'framer-motion';

export const fadeRightInitial = { opacity: 0, x: -20 };

export const fadeRightAnimate = { opacity: 1, x: 0 };

export const fadeRightTransition: Transition = { type: 'spring', bounce: 0, duration: 2 };

const fadeRightAnimation = {
  initial: fadeRightInitial,
  whileInView: fadeRightAnimate,
  transition: fadeRightTransition,
  viewport: { once: true },
};

export default fadeRightAnimation;
