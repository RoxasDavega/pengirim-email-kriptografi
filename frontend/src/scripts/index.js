import 'regenerator-runtime';
import '../styles/main.css';
import '../styles/login.css';
import '../styles/regis.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap-icons/font/bootstrap-icons';
import App from './views/app';

const app = new App({
  header: document.querySelector('header'),
  content: document.getElementById('content'),
});

window.addEventListener('hashchange', () => {
  app.renderPage();
});

window.addEventListener('load', () => {
  app.renderPage();
});
