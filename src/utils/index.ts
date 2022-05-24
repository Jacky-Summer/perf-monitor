export const isSupportPerformance = () => {
  const performance = window.performance
  return (
    performance &&
    !!performance.now &&
    !!performance.getEntries &&
    !!performance.mark
  )
}

export const getObserver = (
  type: IEntryType,
  callback: (entries: PerformanceEntryList | LargestContentfulPaint[]) => void,
) => {
  const perfObserver = new PerformanceObserver((list) => {
    callback(list.getEntries())
  })
  perfObserver.observe({ type, buffered: true })
}
