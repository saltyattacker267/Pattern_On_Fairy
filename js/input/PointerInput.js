// Pointer 이벤트 입력 처리
// - 단일 포인터 잠금: 첫 포인터만 추적하고 나머지 멀티터치는 무시한다.
// - 고스트 터치 방지: 릴리즈 직후 guardMs 이내의 재터치는 무시한다.
// - 화면 좌표를 캔버스 논리 좌표로 변환해 handler에 전달한다.
// handler: { onDown(x, y) -> boolean(수락 여부), onMove(x, y), onUp(x, y), onCancel() }
(function (POF) {
  'use strict';

  function PointerInput(target, handler, guardMs) {
    this.target = target;
    this.handler = handler;
    this.guardMs = guardMs;
    this.activeId = -1;
    this.lastUpTime = -1e9;
    this.offsetX = 0;
    this.offsetY = 0;
    this.scaleX = 1;
    this.scaleY = 1;

    this._onDown = this._onDown.bind(this);
    this._onMove = this._onMove.bind(this);
    this._onUp = this._onUp.bind(this);
    this._onCancel = this._onCancel.bind(this);
    this._onContextMenu = function (e) { e.preventDefault(); };

    target.addEventListener('pointerdown', this._onDown, { passive: false });
    target.addEventListener('pointermove', this._onMove, { passive: false });
    target.addEventListener('pointerup', this._onUp, { passive: false });
    target.addEventListener('pointercancel', this._onCancel, { passive: false });
    target.addEventListener('lostpointercapture', this._onCancel, { passive: false });
    target.addEventListener('contextmenu', this._onContextMenu);
  }

  // 리사이즈 시에만 호출 (화면 rect -> 논리 좌표 매핑 캐싱)
  PointerInput.prototype.setMapping = function (left, top, scaleX, scaleY) {
    this.offsetX = left;
    this.offsetY = top;
    this.scaleX = scaleX;
    this.scaleY = scaleY;
  };

  PointerInput.prototype._onDown = function (e) {
    e.preventDefault();
    if (this.activeId !== -1) return;              // 멀티터치 차단
    if (e.button > 0) return;                      // 마우스 보조 버튼 무시
    if (e.timeStamp - this.lastUpTime < this.guardMs) return; // 고스트 터치 차단

    var x = (e.clientX - this.offsetX) * this.scaleX;
    var y = (e.clientY - this.offsetY) * this.scaleY;
    if (!this.handler.onDown(x, y)) return;

    this.activeId = e.pointerId;
    try {
      this.target.setPointerCapture(e.pointerId);
    } catch (err) {
      // 캡처 실패 시에도 입력 자체는 유지
    }
  };

  PointerInput.prototype._onMove = function (e) {
    if (e.pointerId !== this.activeId) return;
    e.preventDefault();
    var x = (e.clientX - this.offsetX) * this.scaleX;
    var y = (e.clientY - this.offsetY) * this.scaleY;
    this.handler.onMove(x, y);
  };

  PointerInput.prototype._onUp = function (e) {
    if (e.pointerId !== this.activeId) return;
    e.preventDefault();
    this.activeId = -1;
    this.lastUpTime = e.timeStamp;
    var x = (e.clientX - this.offsetX) * this.scaleX;
    var y = (e.clientY - this.offsetY) * this.scaleY;
    this.handler.onUp(x, y);
  };

  PointerInput.prototype._onCancel = function (e) {
    if (e.pointerId !== this.activeId) return;
    this.activeId = -1;
    this.lastUpTime = e.timeStamp;
    this.handler.onCancel();
  };

  POF.PointerInput = PointerInput;
})(window.POF = window.POF || {});
