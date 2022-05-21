export const isSupportPerformance = () => {
  const performance = window.performance
  return (
    performance &&
    !!performance.now &&
    !!performance.getEntries &&
    !!performance.mark
  )
}
