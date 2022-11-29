/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
import EmailDbSource from '../../data/email-db-source';
import { inboxMailItemTemplate, sendedMailItemTemplate } from '../templates/template-creator';

const Home = {
  async renderMain() {
    return `
        <h2 class="greeting">Home Page</h2>
        <div class="mailbox-container">
          <div class="inbox__sidebar">
            <ul>
              <li><button class="inbox-button" type="button"><i class="bi bi-envelope-exclamation"></i> Inbox</button></li>
              <li><button class="sended-button" type="button"><i class="bi bi-send-exclamation"></i> Sent</button></li>
            </ul>
          </div>
          <div class="mail-box">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">Email</th>
                  <th scope="col">Subject</th>
                  <th scope="col">Detail</th>
                </tr>
              </thead>
              <tbody class="mail-box__table-content">
                
              </tbody>
            </table>
          </div>
        
        </div>
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
    const mailContainer = document.querySelector('.mail-box__table-content');
    const inboxButton = document.querySelector('.inbox-button');
    const sendedButton = document.querySelector('.sended-button');
    const mails = await EmailDbSource.getInboxMail();
    const userData = JSON.parse(localStorage.getItem('auth'));
    document.querySelector('.greeting').innerHTML = `Hello, ${userData.fullName}`;

    for (const mail of mails) {
      mailContainer.innerHTML += await inboxMailItemTemplate(mail);
    }

    inboxButton.addEventListener('click', async (e) => {
      e.preventDefault();
      mailContainer.innerHTML = '';
      const inboxMails = await EmailDbSource.getInboxMail();
      for (const mail of inboxMails) {
        mailContainer.innerHTML += await inboxMailItemTemplate(mail);
      }
    });

    sendedButton.addEventListener('click', async (e) => {
      e.preventDefault();
      mailContainer.innerHTML = '';
      const inboxMails = await EmailDbSource.getSendedMail();
      for (const mail of inboxMails) {
        mailContainer.innerHTML += await sendedMailItemTemplate(mail);
      }
    });

    const logout = document.querySelector('.logout');
    logout.addEventListener('click', (e) => {
      e.preventDefault();
      localStorage.removeItem('accessToken');
      localStorage.removeItem('auth');
      window.location.href = '/#/login';
    });
  },
};

export default Home;
