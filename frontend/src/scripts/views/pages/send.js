// import EmailDbSource from '../../data/email-db-source';

const Send = {
  async renderMain() {
    return `
        <div class="login-form">
        <h2>Login</h2>
        <form action=""  enctype='multipart/form-data'>
            <div class="mb-3 row">
                <label for="email" class="col-sm-2 col-form-label">To</label>
                <div class="col-sm-10">
                    <input type="text" class="form-control" id="email" placeholder="email@example.com">
                </div>
            </div>
            <div class="mb-3 row">
                <label for="subject" class="col-sm-2 col-form-label">Subject</label>
                <div class="col-sm-10">
                    <input type="text" class="form-control" id="subject" placeholder="subject">
                </div>
            </div>
            <div class="mb-3 row">
            <label for="subject" class="col-sm-2 col-form-label">Body</label>
            <div class="col-sm-10">
                <input type="textarea" class="form-control" id="bodyMail" placeholder="Body">
            </div>
        </div>
        <div class="mb-3 row">
        <label for="subject" class="col-sm-2 col-form-label">Body</label>
        <div class="col-sm-10">
            <input type="file" class="form-control" id="img" accept="image/png, image/jpeg, image/jpg" name="img">
        </div>
    </div>
            <div class="wrapper-button">
            <button type="submit" class="btn btn-success">Submit</button>   
            </div>
        </form>
        <p>belum punya akun ? <a href="/#/regis" class="text-success">Registrasi</a></p>
    </div>`;
  },

  async renderHeader() {
    return '';
  },

  async afterRender() {
    const form = document.querySelector('form');

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const emailInput = document.querySelector('#email').value;
      const subjectInput = document.querySelector('#subject').value;
      const bodyMailInput = document.querySelector('#bodyMail').value;
      const fileInput = document.getElementById('img');
      const formData = new FormData();
      formData.append('files', fileInput.files[0]);
      formData.append('email', emailInput);
      formData.append('subject', subjectInput);
      formData.append('bodyMail', bodyMailInput);
      console.log(formData);
      // const { error } = await EmailDbSource.add(formData);
    //   if (error) {
    //     console.log(`error, ${error}`);
    //   } else {
    //     window.location.href = '/';
    //     console.log(`not error, ${error}`);
    //   }
      // const { data } = await EmailDbSource.login(emailInput);
    });
  },
};

export default Send;
