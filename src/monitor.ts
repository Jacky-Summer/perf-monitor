import { isSupportPerformance } from './utils'
import { getNavigationTime, getNetworkInfo } from './lib'

class PerfMonitor {
  constructor() {
    if (!isSupportPerformance()) {
      console.log(`Your browser doesn't support Performance API`)
      return
    }

    getNavigationTime()
    getNetworkInfo()
  }
}

export default PerfMonitor

window.PerfMonitor = PerfMonitor
