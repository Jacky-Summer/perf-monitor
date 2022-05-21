import { isSupportPerformance } from './utils'

class PerfMonitor {
  constructor() {
    if (!isSupportPerformance()) {
      console.log(`Your browser doesn't support Performance API`)
      return
    }
  }
}

export default PerfMonitor

window.PerfMonitor = PerfMonitor
