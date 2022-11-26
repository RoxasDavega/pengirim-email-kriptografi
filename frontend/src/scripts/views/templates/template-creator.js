// import API_ENDPOINT from '../../globals/api-endpoint';

const inboxMailItemTemplate = async (mail) => `
  <table class="table">
    <tbody>
      <tr>
        <td>${mail.from.email}</td>
        <td>${mail.subject}</td>
        <td><a href="/#/inbox-detail/${mail.id}" style="color: black;">Detail Email</a><td>
      </tr>
    </tbody>
  </table>
`;

const sendedMailItemTemplate = async (mail) => `
  <table class="table">
    <tbody>
      <tr>
        <td>${mail.to.email}</td>
        <td>${mail.subject}</td>
        <td><a href="/#/sent-detail/${mail.id}" style="color: black;">Detail Email</a><td>
      </tr>
    </tbody>
  </table>
`;

const detailInboxMail = (mail) => `
  <article class="card">
    <div class="card-img">
      <img src="${mail.image}" alt="picture of alt">
    </div>
    <div class="card-body">
      <h3 class="email-from">${mail.from.email}</h3>
      <p class="email-subject">${mail.subject}</p>
      <p class="email-body">${mail.bodyMail}</p>
      <p>${new Date(mail.createdAt).toDateString()}</p>
    </div>
  </article>
`;

const detailSentMail = (mail) => `
  <article class="card">
    <div class="card-img">
      <img src="${mail.image}" alt="picture of alt">
    </div>
    <div class="card-body">
      <h3 class="email-from">${mail.to.email}</h3>
      <p class="email-subject">${mail.subject}</p>
      <p class="email-body">${mail.bodyMail}</p>
      <p>${new Date(mail.createdAt).toDateString()}</p>
    </div>
  </article>
`;

export {
  inboxMailItemTemplate, sendedMailItemTemplate, detailInboxMail, detailSentMail,
};
