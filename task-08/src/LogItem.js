class LogItem {
  constructor() {
    this.logItem = document.createElement('div');
    this.logItem.classList.add('app-item');
    this.logContainer = document.createElement('div');
    this.logContainer.classList.add('log-container', 'scroll-y');
    this.logItem.appendChild(this.logContainer);
  }
}

export default LogItem