import Editor from './Editor';
import Point from './Point';

/**
 * @constructor
 * @augments Editor
 */
class PointsEditor extends Editor {
  constructor(points, eventBus) {
    super();

    this.canvas = document.getElementById('canvas');
    this.points = points;
    this.eventBus = eventBus;

    this.init();
  }

  init() {
    this.point = new Point(this.canvas, this.eventBus);
    this.setPointsOnCanvas();
    this.listenToEvents();
    
    //inherited from Editor
    this.bindPointerEvents();
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
  }
}

export { PointsEditor as default }