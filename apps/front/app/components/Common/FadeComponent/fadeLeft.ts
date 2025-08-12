import { Transition } from 'framer-motion';

export const fadeLeftInitial = { opacity: 0, x: 20 };

export const fadeLeftAnimate = { opacity: 1, x: 0 };

export const fadeLeftTransition: Transition = { type: 'spring', bounce: 0, duration: 2 };

const fadeLeftAnimation = {
  initial: fadeLeftInitial,
  whileInView: fadeLeftAnimate,
  transition: fadeLeftTransition,
  viewport: { once: true },
};

export default fadeLeftAnimation;
