// requestAnimationFrame 기반 게임 루프
// update(scaledDt, realDt): 게임 로직 (timeScale 적용)
// render(realDt): 렌더링 및 연출 타이머 (실시간)
(function (POF) {
  'use strict';

  function GameLoop(update, render, maxDeltaSec) {
    this.update = update;
    this.render = render;
    this.maxDeltaSec = maxDeltaSec;
    this.timeScale = 1.0;
    this._running = false;
    this._last = 0;
    this._tick = this._tick.bind(this);
  }

  GameLoop.prototype.start = function () {
    if (this._running) return;
    this._running = true;
    this._last = performance.now();
    requestAnimationFrame(this._tick);
  };

  GameLoop.prototype.stop = function () {
    this._running = false;
  };

  GameLoop.prototype._tick = function (now) {
    if (!this._running) return;
    var dt = (now - this._last) / 1000;
    this._last = now;
    if (dt < 0) dt = 0;
    if (dt > this.maxDeltaSec) dt = this.maxDeltaSec;

    this.update(dt * this.timeScale, dt);
    this.render(dt);
    requestAnimationFrame(this._tick);
  };

  POF.GameLoop = GameLoop;
})(window.POF = window.POF || {});
