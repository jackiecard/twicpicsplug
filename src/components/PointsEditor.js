import Editor from './Editor';
import Point from './Point';

/**
 * @constructor
 * @augments Editor
 */
class PointsEditor extends Editor {
  constructor(eventBus) {
    super();

    this.eventBus = eventBus;
  }

  init(id, points) {
    const canvas = document.getElementById(id);
    this.setCanvas(canvas);
    this.setPoints(points);
    this.point = new Point(canvas, this.eventBus);
    this.setPointsOnCanvas();
    this.listenToEvents();
  }
  
  setCanvas(canvas) {
    this.canvas = canvas;
  }

  setPoints(points) {
    this.points = points;
  }

  setCurrent(current) {
    this.current = current;
  }

  setPointsOnCanvas() {
    this.points.forEach(info => {
      this.point.setPointOnCanvas(info);
    });
  }

  updatePoint(data) {
    this.current = Object.assign(this.current, data);
    this.points.concat(this.points, this.current);
    this.point.updatePointView(this.current);
  }

  addPointToList(data) {
    this.points.push(data);
    this.point.createPointElement(data);
    this.point.setPointOnCanvas(data)
  }

  listenToEvents() {
    this.eventBus.on('currentPointUpdated', (data) => {
      this.setCurrent(data);
    });

    this.eventBus.on('pointUpdate', (data) => {
      this.updatePoint(data);
    });

    this.eventBus.on('pointOut', (data) => {
      this.point.unselectPoint(data);
    });

    this.eventBus.on('addPoint', () => {
      console.log('add', this.points)
      this.addPointToList({
        id: this.points[this.points.length -1].id + 1,
        x: 140,
        y: 227
      })
    });
  }
}

export { PointsEditor as default }