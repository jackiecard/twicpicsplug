class Sidebar {
  constructor(eventBus) {
    this.eventBus = eventBus;
    this.sidebar = null;
  }

  init(id) {
    this.sidebar = document.getElementById(id);
    
  }
}

export { Sidebar as default };