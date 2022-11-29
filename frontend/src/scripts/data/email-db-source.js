/* eslint-disable no-alert */
import API_ENDPOINT from '../globals/api-endpoint';

class EmailDbSource {
  static async getInboxMail() {
    // const response = await fetch(
    //   API_ENDPOINT.INBOX,
    //   {
    //     method: 'GET',
    //     headers: {
    //       Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    //     },
    //   },
    // );
    const response = await this.fetchWithToken(API_ENDPOINT.INBOX);

    const responseJson = await response.json();
    return responseJson.data;
  }

  static async getSendedMail() {
    const response = await this.fetchWithToken(API_ENDPOINT.SENT);

    const responseJson = await response.json();
    return responseJson.data;
  }

  static async getDetailInboxMail(id) {
    const response = await this.fetchWithToken(API_ENDPOINT.DETAILINBOX(id));

    const responseJson = await response.json();
    return responseJson.data;
  }

  static async getDetailSentMail(id) {
    const response = await this.fetchWithToken(API_ENDPOINT.DETAILSENT(id));

    const responseJson = await response.json();
    return responseJson.data;
  }

  static async picture(id) {
    const response = await fetch(API_ENDPOINT.PICTURE(id));
    const responseJson = await response.json();
    return responseJson.image;
  }

  static async add(formData) {
    const response = await this.fetchWithToken(API_ENDPOINT.ADD, {
      method: 'POST',
      body: formData,
    });
    const responseJson = await response.json();
    console.log(responseJson);

    const { status } = responseJson;
    if (status !== 'success') {
      window.alert(responseJson.message);
      return { error: true, data: null };
    }
    return { error: false, data: responseJson.data };
  }

  static async login(email, password) {
    const response = await fetch(API_ENDPOINT.LOGIN, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    const responseJson = await response.json();
    console.log(responseJson);
    const { status } = responseJson;
    if (status !== 'success') {
      window.alert(responseJson.message);
      return { error: true, data: null };
    }
    return { error: false, data: responseJson.data };
  }

  static async register({ email, password, fullName }) {
    console.log(`${email}, ${password}, ${fullName}`);
    console.log(JSON.stringify({ email, password, fullName }));

    const response = await fetch(API_ENDPOINT.REGISTER, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, fullName, password }),
    });
    const responseJson = await response.json();
    console.log(responseJson);
    const { status } = responseJson;
    if (status !== 'success') {
      window.alert(responseJson.message);
      return { error: true };
    }
    return { error: false };
  }

  static async fetchWithToken(url, options = {}) {
    return fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });
  }
}

export default EmailDbSource;
