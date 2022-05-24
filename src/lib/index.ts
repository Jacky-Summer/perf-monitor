/**
 * 获取性能指标
 */
import { getObserver } from '../utils'

let tbt = 0

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

export const getPaintTime = () => {
  getObserver('paint', (entries) => {
    for (const entry of entries) {
      const time = entry.startTime
      const name = entry.name
      if (name === 'first-contentful-paint') {
        getLongTask(time)
        console.log('FCP', time)
      } else {
        // first-paint
        console.log('FP', time)
      }
    }
  })
}

export const getLCP = () => {
  getObserver('largest-contentful-paint', (entries) => {
    for (const entry of entries) {
      // @ts-ignore
      const { startTime, renderTime } = entry
      console.log('LCP', renderTime, startTime)
    }
  })
}

export const getFID = () => {
  getObserver('first-input', (entries) => {
    for (const entry of entries) {
      // TODO: fix ts type
      const time =
        (entry as IPerformanceEventTiming).processingStart - entry.startTime
      console.log('FID', time)
      // TBT is in fcp -> tti
      // This data may be inaccurate, because fid >= tti
      console.log('TBT', tbt)
    }
  })
}

export const getLongTask = (fcp: number) => {
  getObserver('longtask', (entries) => {
    for (const entry of entries) {
      console.log('longtask', entry)
      // get long task time in fcp -> tti
      if (entry.name !== 'self' || entry.startTime < fcp) {
        return
      }
      // long tasks mean time over 50ms
      const blockingTime = entry.duration - 50
      if (blockingTime > 0) tbt += blockingTime
    }
  })
}

export const getCLS = () => {
  getObserver('layout-shift', (entries) => {
    let value = 0
    for (const entry of entries) {
      // @ts-ignore
      if (!entry.hadRecentInput) {
        // @ts-ignore
        value += entry.value
      }
    }
    console.log('CLS', value)
  })
}
