class WebDaemon {
  /**
   * 所有守护程序
   */
  private static daemons = new Map<number, WebDaemon>()

  /**
   * 暂停所有守护程序
   */
  public static pauseAll() {
    WebDaemon.daemons.forEach((daemon) => daemon.pause())
    WebDaemon.daemons.clear()
  }

  /**
   * 计时器标识
   */
  private timer: number = -1

  /**
   * 每次调用的迭代索引
   */
  public index: number = 0

  /**
   * 守护程序是否处在暂停状态
   */
  private paused: boolean = true

  public constructor(
    /**
     * 需要被反复调用的任务
     */
    private task: (daemon: WebDaemon) => void,
    /**
     * 每次调用之间的时间间隔（以毫秒为单位）。默认值为100。
     */
    private rate: number = 1000,
    /**
     * 守护程序的调用总数。它可以是正整数或正无穷大。默认值为正无穷大。
     */
    public len: number = Number.POSITIVE_INFINITY
  ) {}

  /**
   * 启动守护程序
   * @param immediate 是否在启动时立即调用任务
   */
  public start(immediate: boolean = false) {
    if (this.isAtEnd() || !this.paused) return
    this.paused = false
    if (immediate) this.forceCall()
    this.synchronize()
  }

  /**
   * 强制调用一次任务，而不管是否已达到结束的事实。在任何情况下，内部index属性都会增加。
   */
  public forceCall() {
    this.len++
    this.task(this)
    if (this.isAtEnd()) this.pause()
  }

  /**
   * 将启动的守护程序的计时器与其调用时间同步。
   */
  public synchronize() {
    if (this.paused) return
    window.clearTimeout(this.timer)
    WebDaemon.daemons.delete(this.timer)
    this.timer = window.setTimeout(() => {
      this.forceCall()
      this.synchronize()
    }, this.rate)
    WebDaemon.daemons.set(this.timer, this)
  }

  /**
   * 暂停守护程序
   */
  public pause() {
    window.clearTimeout(this.timer)
    WebDaemon.daemons.delete(this.timer)
    this.paused = true
  }

  /**
   * 返回一个布尔值，表示守护程序是否位于结束位置。
   * @returns
   */
  public isAtEnd() {
    return this.index >= this.len
  }
}

export default WebDaemon
