class LogItem {
  constructor() {
    this.logItem = document.createElement('div');
    this.logItem.classList.add('app-item');
    this.title = document.createElement('h3');
    this.title.classList.add('title')
    this.title.textContent = `Logs`
    this.logContainer = document.createElement('div');
    this.logContainer.classList.add('log-container', 'scroll-y');
    this.logItem.append(this.title, this.logContainer);
  }
}

export default LogItem