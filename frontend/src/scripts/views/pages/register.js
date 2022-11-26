import EmailDbSource from '../../data/email-db-source';

const Register = {

  async renderHeader() {
    return '';
  },

  async renderMain() {
    return `
    <div class="regis-form">
        <h2>Register</h2>
        <form action="">
            <div class="mb-3 row">
                <label for="fullName" class="col-sm-2 col-form-label">Fullname</label>
                <div class="col-sm-10">
                    <input type="text" class="form-control" id="fullName" placeholder="fullname">
                </div>
            </div>
            <div class="mb-3 row">
                <label for="email" class="col-sm-2 col-form-label">Email</label>
                <div class="col-sm-10">
                    <input type="text" class="form-control" id="email" placeholder="email@example.com">
                </div>
            </div>
            <div class="mb-3 row">
                <label for="password" class="col-sm-2 col-form-label">Password</label>
                <div class="col-sm-10">
                    <input type="password" class="form-control" id="password" placeholder="min 8 charachter">
                </div>
            </div>
            <div class="wrapper-button">
            <button type="submit" class="btn btn-success">Submit</button>
            </div>
        </form>
        <p>Sudah punya akun ? <a href="/#/login" class="text-success">Login</a></p>
        
    </div>
        `;
  },

  async afterRender() {
    const form = document.querySelector('form');

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = document.querySelector('#email').value;
      const password = document.querySelector('#password').value;
      const fullName = document.querySelector('#fullName').value;
      console.log(`${email}, ${password}, ${fullName}`);

      const { error } = await EmailDbSource.register({ email, password, fullName });

      if (error) {
        console.log(`error, ${error}`);
      } else {
        window.location.href = '/';
        console.log(`not error, ${error}`);
      }
    });
  },
};

export default Register;
