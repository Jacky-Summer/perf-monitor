/**
 * 获取性能指标
 */

export const getNavigationTime = () => {
  const navigation = window.performance.getEntriesByType('navigation')
  if (navigation.length > 0) {
    const timing = navigation[0] as PerformanceNavigationTiming
    if (timing) {
      const {
        redirectStart,
        redirectEnd,
        fetchStart,
        domainLookupStart,
        domainLookupEnd,
        connectStart,
        connectEnd,
        transferSize,
        encodedBodySize,
        requestStart,
        responseStart,
        responseEnd,
        domContentLoadedEventEnd,
        domContentLoadedEventStart,
        workerStart,
      } = timing

      return {
        redirect: redirectEnd - redirectStart,
        appCache: domainLookupStart - fetchStart,
        dns: domainLookupEnd - domainLookupStart,
        tcp: connectEnd - connectStart,
        // HTTP head size
        headSize: transferSize - encodedBodySize || 0,
        responseTime: responseEnd - responseStart,
        // time to first byte
        ttfb: responseEnd - requestStart,
        // fetch resource time
        fetchTime: responseEnd - fetchStart,
        // Service worker response time
        workerTime: workerStart > 0 ? responseEnd - workerStart : 0,
        domReady: domContentLoadedEventEnd - fetchStart,
        // DOMContentLoaded time
        dcl: domContentLoadedEventEnd - domContentLoadedEventStart,
      }
    }

    return {}
  }
}

export const getNetworkInfo = () => {
  if ('connection' in window.navigator) {
    const connection = window.navigator.connection || {}
    const { effectiveType, downlink, rtt, saveData } = connection
    return {
      effectiveType,
      downlink,
      rtt,
      saveData,
    }
  }

  return {}
}
