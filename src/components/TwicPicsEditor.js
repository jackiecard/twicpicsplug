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
      <div class="output">
        <h2>Output</h2>
        <img class="twic" id="output-image" data-src="image:example-1.jpg">
        <div class="edit">
          <select id="output-type">
            <option value="crop">Crop</option>
            <option value="contain">Contain</option>
            <option value="cover">Cover</option>
          </select>
          <label>
            Width:
            <input type="number" step="25" name="width" id="output-width" val="" />
          </label>
          <label>
            Height:
            <input type="number" step="25" name="height" id="output-height" val="" />
          </label>
          <select id="output-zoom">
            <option value="1">Normal</option>
            <option value="2">x2</option>
            <option value="3">x3</option>
            <option value="4">x4</option>
          </select>
          <button id="update-output">Update</button>
        </div>
      </div>`;
    this.twicPicsEditor.append(canvas);
    this.twicPicsEditor.append(output);
  }
}

export { TwicPicsEditor as default };