import EventEmitter from '../utils/EventEmitter';
import PointsEditor from './PointsEditor';
import ImageOutput from './ImageOutput';

class TwicPicsEditor {
  constructor() {
    this.twicPicsEditor = document.getElementById('twicpics-editor');
    this.initialWidth = Number(this.twicPicsEditor.getAttribute('data-original-width'));
    this.initialHeight = Number(this.twicPicsEditor.getAttribute('data-original-height'));
    this.canvasWidth = 600;
    this.initialPoint = { id: 1, x: 140, y: 227 };

    this.init();
  }

  init() {
    this.renderCanvas();

    const eventBus = new EventEmitter();
    const pointsEditor = new PointsEditor([this.initialPoint], eventBus);
    const imageOutput =
      new ImageOutput(
        eventBus,
        this.initialPoint,
        this.canvasWidth,
        this.initialWidth,
        this.initialHeight
      );
  }

  setWidth(width) {
    const widthEl = document.getElementById('output-width');
    widthEl.value = width;
  }

  setHeight(height) {
    const heightEl = document.getElementById('output-height');
    heightEl.value = height;
  }

  renderCanvas() {
    const canvas = document.createElement('div');
    canvas.id = 'canvas';
    canvas.innerHTML = `
      <img id="edit-image" 
        class="twic" 
        data-src-transform="resize=${this.canvasWidth}"
        data-src="image:example-1.jpg"/>`;

    const output = document.createElement('div');
    output.id = 'output';
    output.innerHTML = `
      <div id="output">
        <h2>Output</h2>
        <img class="twic" id="output-image" data-src="image:example-1.jpg">
        <label>
          Width:
          <input type="text" name="width" id="output-width" />
        </label>
        <label>
          Height:
          <input type="text" name="height" id="output-height" />
        </label>
      </div>`;
    this.twicPicsEditor.append(canvas);
    this.twicPicsEditor.append(output);
  }
}

export { TwicPicsEditor as default };