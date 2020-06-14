/**
 * @constructor
 * @property {Node} canvas            - root element in which every event listener will be binded
 * @property {Object} current         - point in which the coordinates will be updated by the Editor
 * @property {EventEmitter} eventBus  - event emission layer
 * @property {Boolean} pressed        - check if something is pressed inside canvas
 */
class Editor {
  constructor() {
    this.canvas = null;
    this.current = null;
    this.eventBus = null;
    this.pressed = false;
  }

  setPressed(payload) {
    this.pressed = payload;
  }

  handleStart(el) {
    this.setPressed(true);
    console.log('start', this.pressed);
  }

  handleEnd(el, that) {
    this.setPressed(false);
    this.eventBus.emit('pointOut', this.current)
    that.setcurrent(null, null, that);
    console.log('end', this.pressed);
  }

  handleCancel(el) {
    this.setPressed(false);
    console.log('cancel', this.pressed);
  }

  handleMove(el, that) {
    if (!this.current || !this.pressed) {
      return;
    }
    that.setcurrent(el.clientX, el.clientY, that);
    console.log('move', this.pressed);
  }

  setcurrent(x, y, that) {
    if(!x && !y) {
      return;
    }
    this.eventBus.emit('pointUpdate', {
      x: x,
      y: y
    })
  }

  handleMovement($event, that) {
    if(!this.current) {
      return;
    }

    switch ($event.type) {
      case 'pointerdown':
        that.handleStart($event);
        break;
      case 'pointerup':
        that.handleEnd($event, that);
        break;
      case 'pointercancel':
        that.handleCancel($event);
        break;
      case 'pointermove':
        that.handleMove($event, that);
        break;
      default:
        break;
    }
  }

  bindPointerEvents() {
    this.canvas.addEventListener("pointerdown", (e) => this.handleMovement(e, this), false);
    this.canvas.addEventListener("pointerup", (e) => this.handleMovement(e, this), false);
    this.canvas.addEventListener("pointercancel", (e) => this.handleMovement(e, this), false);
    this.canvas.addEventListener("pointermove", (e) => this.handleMovement(e, this), false);
  }

  unbindPointerEvents() {
    console.log('editor unbindPointerEvents')
    this.pressed = false;
    this.current = null;
    // TODO: make it work
    // this.canvas.removeEventListener("pointerdown", (e) => this.handleMovement(e, this), false);
    // this.canvas.removeEventListener("pointerup", (e) => this.handleMovement(e, this), false);
    // this.canvas.removeEventListener("pointercancel", (e) => this.handleMovement(e, this), false);
    // this.canvas.removeEventListener("pointermove", (e) => this.handleMovement(e, this), false);
  }
}

export { Editor as default }