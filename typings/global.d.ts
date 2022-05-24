interface Window {
  PerfMonitor: any
}

interface NetworkInformation extends EventTarget {
  readonly downlink: number
  readonly downlinkMax: number
  readonly effectiveType: 'slow-2g' | '2g' | '3g' | '4g'
  readonly rtt: number
  readonly saveData: boolean
  readonly type: ConnectionType
  onChange: (event: Event) => void
}

interface LargestContentfulPaint extends PerformanceEntry {
  renderTime: numbers
  loadTime: number
  size: number
  id: number
  url: string
  element: Element
}

type IEntryType =
  | 'first-input'
  | 'measure'
  | 'element'
  | 'navigation'
  | 'paint'
  | 'largest-contentful-paint'
  | 'layout-shift'
  | 'resource'
  | 'longtask'

// https://wicg.github.io/event-timing/#sec-performance-event-timing
interface IPerformanceEventTiming extends PerformanceEntry {
  processingStart: DOMHighResTimeStamp
}
