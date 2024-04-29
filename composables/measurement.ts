export const useMeasurement = () => {
  let _startDt: Date = null
  const duration = ref(0)

  function start() {
    _startDt = new Date()
    duration.value = 0
  }

  function end() {
    if (!_startDt) {
      return
    }

    duration.value = new Date().getTime() - _startDt.getTime()
  }

  return { end, start, duration }
}
