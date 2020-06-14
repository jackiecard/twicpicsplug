class Point {
  constructor(canvas, eventBus) {
    this.canvas = canvas;
    this.eventBus = eventBus;
    this.info = null;
    this.el = null;
    this.currentPoint = null;
  }

  createPointElement(point) {
    const pointElem = document.createElement('button');
    pointElem.classList.add('point');
    pointElem.id = point.id;
    pointElem.style = `--x: ${point.x}px; --y: ${point.y}px;`;
    return pointElem;
  }

  setPointOnCanvas(point) {
    const el = this.createPointElement(point);
    el.addEventListener('pointerdown', (e) => this.handlePointMovement(e, point), false);
    this.canvas.append(el);
  }

  setCurrent(current) {
    this.currentPoint = current;
    this.eventBus.emit('currentPointUpdated', current);
  }

  handlePointMovement(e, point) {
    this.setCurrent(point);
    this.selectPoint(e);
  }

  updatePointView(data) {
    if (!data) {
      return;
    }
    let point = document.getElementById(data.id);
    point.style = `--x: ${data.x}px; --y: ${data.y}px;`;
  }

  //pointOut(data)
  unselectPoint(data) {
    const point = document.getElementById(data.id);
    point.classList.remove('selected');
  }

  selectPoint(e) {
    e.target.classList.add('selected');
  }
}

export { Point as default };