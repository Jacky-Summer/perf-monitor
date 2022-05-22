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
