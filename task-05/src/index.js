import './styles/styles.scss';
import Calculator from './Calculator'

window.onload = () => {
  const rootElement = document.querySelector('#app');
  if (!rootElement) throw new Error('Error element with id "app" not found');
  const calc = new Calculator(rootElement);
  calc.render();
}