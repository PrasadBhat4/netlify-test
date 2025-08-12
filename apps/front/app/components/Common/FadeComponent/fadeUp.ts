import { Transition } from 'framer-motion';

export const fadeUpInitial = { opacity: 0, y: 20 };

export const fadeUpAnimate = { opacity: 1, y: 0 };

export const fadeUpTransition: Transition = { type: 'spring', bounce: 0, duration: 2 };

export const fadeUpVariant = {
  hidden: fadeUpInitial,
  visible: fadeUpAnimate,
};

const fadeUpAnimation = {
  initial: fadeUpInitial,
  whileInView: fadeUpAnimate,
  transition: fadeUpTransition,
  viewport: { once: true },
};

export default fadeUpAnimation;
