class ImageOutput {
  constructor(eventBus, point, canvasWidth, originalWidth, originalHeight) {
    this.eventBus = eventBus;
    this.outputImage = document.getElementById('output-image');
    this.initialPoint = point;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = this.calcHeightRatio(originalWidth, originalHeight);
    this.transform = [
      {
        type: 'crop',
        val: '300x250'
      }
    ];

    console.log(this.handleTransform(this.transform))
    this.transformations = this.handleTransform(this.transform);

    this.init();
  }

  init() {
    this.setNewTransform(this.transformations);
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

  handleTransform(transform) {
    return transform.map(prop => this.handleProp(prop)).join('/')
  }

  setTransformations(newTransformation) {
    this.transformations = newTransformation;
  }

  setNewTransform(newTransformation) {
    this.outputImage.setAttribute('data-src-transform', newTransformation);
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

    this.eventBus.on('newTransformation', (data) => {
      this.setTransformations(data);
    });
  }
}

export { ImageOutput as default };