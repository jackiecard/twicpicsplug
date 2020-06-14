class TwicPicsEditor {
  constructor(eventBus, twicPicsEditor, canvasWidth) {
    this.eventBus = eventBus;
    this.twicPicsEditor = twicPicsEditor;
    this.canvasWidth = canvasWidth;

    this.init();
  }

  init() {
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
      <h2>Output</h2>
      <img class="twic" id="output-image" data-src="image:example-1.jpg">`;
    this.twicPicsEditor.append(canvas);
    this.twicPicsEditor.append(output);
  }
}

export { TwicPicsEditor as default };