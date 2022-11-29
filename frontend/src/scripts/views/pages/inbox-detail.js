/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
import EmailDbSource from '../../data/email-db-source';
import UrlParser from '../../routes/url-parser';
import { detailInboxMail } from '../templates/template-creator';

const InboxDetail = {
  async renderMain() {
    return `
        <h2 class="greeting">Detail Page</h2>
        <div class="detailed-mail"></div>
          
          
        
        
        `;
  },

  async renderHeader() {
    return `
    <nav>
    <div class="navigate-title">
      <button id="hamburger-icon" aria-label="Skip to content"><img src="./images/hamburger_icon.png" alt=""></button>
      <a href="/"><h1>Aplikasi Kriptografi</h1></a>
    </div>
    <ul class="navigate-link">
      <li><a href="/#/inbox">Inbox</a></li>
      <li><a href="/#/send">Send</a></li>
      <li><button class="logout" type="button">Logout</button></li>
    </ul>
  </nav>
    `;
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const mailContainer = document.querySelector('.detailed-mail');

    const detailedMail = await EmailDbSource.getDetailInboxMail(url.id);
    const userData = JSON.parse(localStorage.getItem('auth'));
    document.querySelector('.greeting').innerHTML = `Hello, ${userData.fullName}`;
    console.log(detailedMail);

    mailContainer.innerHTML += detailInboxMail(detailedMail);

    const logout = document.querySelector('.logout');
    logout.addEventListener('click', (e) => {
      e.preventDefault();
      localStorage.removeItem('accessToken');
      localStorage.removeItem('auth');
      window.location.href = '/#/login';
    });
  },
};

export default InboxDetail;
