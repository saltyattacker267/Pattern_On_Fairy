// 드로잉 궤적 누적 (미리 할당된 버퍼 사용)
// 연결 규칙:
//   1) 두 노드 사이 직선 위의 중간 노드는 미방문 상태이면 항상 자동 포함한다.
//   2) 이미 방문한 노드는 다시 추가하지 않는다 (지나가도 무시).
//   3) 단, 시작 노드로 복귀하는 경우는 허용하며 궤적이 닫힌다. 닫힌 이후 추가 입력은 무시한다.
// 의존: PatternGrid.middleOf
(function (POF) {
  'use strict';

  var CAPACITY = 10; // 고유 노드 9개 + 닫힘 복귀 1개

  function PatternPath(closeMinNodes) {
    this.closeMinNodes = closeMinNodes;
    this.nodes = new Int8Array(CAPACITY);
    this.length = 0;
    this.closed = false;
    this._visited = new Uint8Array(10);
  }

  PatternPath.prototype.reset = function () {
    this.length = 0;
    this.closed = false;
    for (var i = 0; i < 10; i++) this._visited[i] = 0;
  };

  PatternPath.prototype.isVisited = function (node) {
    return this._visited[node] === 1;
  };

  PatternPath.prototype.lastNode = function () {
    return this.length > 0 ? this.nodes[this.length - 1] : 0;
  };

  // 고유 노드 수 (닫힘 복귀 노드는 제외)
  PatternPath.prototype.distinctCount = function () {
    return this.closed ? this.length - 1 : this.length;
  };

  PatternPath.prototype._push = function (node) {
    this.nodes[this.length] = node;
    this.length++;
    this._visited[node] = 1;
  };

  // 노드 진입 시도. 궤적이 변경되면 true를 반환한다.
  PatternPath.prototype.tryAdd = function (node) {
    if (this.closed) return false;
    if (node < 1 || node > 9) return false;

    if (this.length === 0) {
      this._push(node);
      return true;
    }

    var last = this.nodes[this.length - 1];
    if (node === last) return false;

    var mid = POF.PatternGrid.middleOf(last, node);

    if (this._visited[node] === 1) {
      // 시작점 복귀만 허용
      if (node !== this.nodes[0]) return false;
      var distinct = this.length + ((mid !== 0 && this._visited[mid] === 0) ? 1 : 0);
      if (distinct < this.closeMinNodes) return false;
      if (mid !== 0 && this._visited[mid] === 0) this._push(mid);
      this.nodes[this.length] = node;
      this.length++;
      this.closed = true;
      return true;
    }

    if (mid !== 0 && this._visited[mid] === 0) this._push(mid);
    this._push(node);
    return true;
  };

  POF.PatternPath = PatternPath;
})(window.POF = window.POF || {});
