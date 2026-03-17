export const GSAP_DEFAULTS = {
  scrub: 1.5,
  ease: 'power2.out',
  stagger: 0.1,
};

export const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
};

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.5 },
};

export const staggerChildren = {
  animate: { transition: { staggerChildren: 0.1 } },
};

export const scaleIn = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  transition: { type: 'spring', stiffness: 200, damping: 20 },
};
