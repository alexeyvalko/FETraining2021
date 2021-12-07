import './styles/styles.scss';
import App from './app';

window.onload = () => {
  const rootElement = document.querySelector('#app');
  if (!rootElement) throw new Error('Error element with id "app" not found');
  try {
    const app = new App(rootElement);
    app.render();
  } catch (err) {
    console.error(err.message);
  }
};
