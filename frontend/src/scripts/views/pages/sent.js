import EmailDbSource from '../../data/email-db-source';

const Sent = {
  async renderHeader() {
    return `
        <nav>
        <div class="navigate-title">
          <button id="hamburger-icon" aria-label="Skip to content"><img src="./images/hamburger_icon.png" alt=""></button>
          <a href="/"><h1>Aplikasi Kriptografi</h1></a>
        </div>
        <ul class="navigate-link">
          <li><a href="/#/inbox">inbox</a></li>
          <li><a href="/#/send">Send</a></li>
          <li><button class="logout" type="button">Logout</button></li>
        </ul>
      </nav>
        `;
  },

  async renderMain() {
    return `
        <h2>Send Mail</h2>
        <div class="login-form">
      
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
            <label for="body" class="col-sm-2 col-form-label">Body</label>
            <div class="col-sm-10">
                <textarea class="form-control" id="bodyMail" placeholder="body" cols="50" style="min-height:100px;"></textarea>
            </div>
        </div>
        <div class="mb-3 row">
        <label for="subject" class="col-sm-2 col-form-label">Image</label>
        <div class="col-sm-10">
            <input type="file" class="form-control" id="img" accept="image/png, image/jpeg, image/jpg" name="img">
        </div>
    </div>
            <div class="wrapper-button">
            <button type="submit" class="btn btn-success">Submit</button>   
            </div>
        </form>
        
    </div>`;
  },

  async afterRender() {
    const logout = document.querySelector('.logout');
    logout.addEventListener('click', (e) => {
      e.preventDefault();
      localStorage.removeItem('auth');
      window.location.href = '/#/login';
    });

    const form = document.querySelector('form');

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const emailInput = document.querySelector('#email').value;
      const subjectInput = document.querySelector('#subject').value;
      const bodyMailInput = document.querySelector('#bodyMail').value;
      const fileInput = document.getElementById('img');
      const formData = new FormData();
      formData.append('Image', fileInput.files[0]);
      formData.append('email', emailInput);
      formData.append('subject', subjectInput);
      formData.append('bodyMail', bodyMailInput);
      const { error } = await EmailDbSource.add(formData);
      if (error) {
        console.log(`error, ${error}`);
      } else {
        window.location.href = '/';
        console.log(`not error, ${error}`);
      }
      // const { data } = await EmailDbSource.login(emailInput);
    });
  },

};

export default Sent;
