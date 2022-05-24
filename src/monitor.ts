import { isSupportPerformance } from './utils'
import { getNavigationTime, getNetworkInfo, getPaintTime, getLCP } from './lib'

class PerfMonitor {
  constructor() {
    if (!isSupportPerformance()) {
      console.log(`Your browser doesn't support Performance API`)
      return
    }

    getNavigationTime()
    getNetworkInfo()
    getPaintTime()
    getLCP()
  }
}

export default PerfMonitor

window.PerfMonitor = PerfMonitor
