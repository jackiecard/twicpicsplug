class ImageOutput {
  constructor(eventBus, point, canvasWidth, originalWidth, originalHeight) {
    this.eventBus = eventBus;
    this.outputImage = document.getElementById('output-image');
    this.initialPoint = point;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = this.calcHeightRatio(originalWidth, originalHeight);
    this.transformations = [
      {
        proportion: true,
        type: 'crop',
        val: '300x250'
      },
      {
        type: 'zoom',
        val: '2'
      }
    ];

    this.transform = this.handleTransformation(this.transformations);

    this.init();
    this.setWidthField();
    this.setHeightField();
    this.setTypeField();
    this.setZoomField();

    const updateBtn = document.getElementById('update-output');
    updateBtn.addEventListener('click', e => {
      this.updateProportion()
    });
  }

  init() {
    this.setNewTransform(this.transform);
    this.setNewFocus(this.initialPoint);
    this.imageEventsListener();
  }

  calcHeightRatio(originalWidth, originalHeight) {
    const scale = ((this.canvasWidth * 100) / originalWidth) / 100;
    return parseInt(originalHeight * scale);
  }

  handleProp(prop) {
    return prop.type + '=' + prop.val;
  }

  handleTransformation(transform) {
    return transform.map(prop => this.handleProp(prop)).join('/')
  }

  setNewTransform(newTransformation) {
    console.log(newTransformation)
    this.outputImage.setAttribute('data-src-transform', newTransformation);
  }

  updateProportion() {
    this.transformations = this.transformations.map(t => {
      if (t.proportion) {
        console.log(document.getElementById('output-width').value)
        t.val = `${document.getElementById('output-width').value}x${document.getElementById('output-height').value}`;
        t.type = document.getElementById('output-type').value;
      }
      else if (t.type === 'zoom') {
        t.val = document.getElementById('output-zoom').value;
      }
      return t;
    })
    this.transform = this.handleTransformation(this.transformations);
    this.setNewTransform(this.transform);
  }

  setTypeField() {
    const type = document.getElementById('output-type');
    type.value = this.transformations.find(t => t.proportion).type
  }

  setWidthField() {
    const width = document.getElementById('output-width');
    width.value = this.transformations.find(t => t.proportion).val.split('x')[0]
  }

  setHeightField() {
    const height = document.getElementById('output-height');
    height.value = this.transformations.find(t => t.proportion).val.split('x')[1]
  }

  setZoomField() {
    const zoom = document.getElementById('output-zoom');
    zoom.value = this.transformations.find(t => t.type === 'zoom').val
  }

  setNewFocus(data) {
    const xpercen = (data.x * 100) / this.canvasWidth;
    const ypercen = (data.y * 100) / this.canvasHeight;
    this.outputImage.setAttribute('data-src-focus', `${parseInt(xpercen)}px${parseInt(ypercen)}p`)
  }

  imageEventsListener() {
    this.eventBus.on('pointOut', (data) => {
      this.setNewFocus(data);
    });

    // this.eventBus.on('newTransformation', (data) => {
    //   this.setTransform(data);
    // });
  }
}

export { ImageOutput as default };