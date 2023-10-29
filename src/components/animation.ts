export const childDivAnimations = {
  hidden: { opacity: 0, y: 100 },
  show: (index: number) => ({
    opacity: 1,
    transition: { delay: index * 0.4 },
    y: 0
  }),
};


export const headingAnimation = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      duration: 0.5,
      delay: 0.1,
      ease: "easeOut"
    }
  },
}