const BASE_URL = 'http://localhost:3000/';

const API_ENDPOINT = {
  REGISTER: `${BASE_URL}user/register`,
  LOGIN: `${BASE_URL}user/login`,
  INBOX: `${BASE_URL}mail/inbox`,
  DETAILINBOX: (id) => `${BASE_URL}mail/inbox/${id}`,
  DETAILSENT: (id) => `${BASE_URL}mail/sent/${id}`,
  SENT: `${BASE_URL}mail/sent`,
  PICTURE: (id) => `${BASE_URL}course/image/${id}`,
  ADD: `${BASE_URL}mail/sendMail`,
};

export default API_ENDPOINT;
