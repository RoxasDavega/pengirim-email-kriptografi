// import CourseDbSource from '../../data/course-db-source';

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
          <li><a href="/#/add">Sent</a></li>
          <li><button class="logout" type="button">Logout</button></li>
        </ul>
      </nav>
        `;
  },

  async renderMain() {
    return `
        <h2>Sent Mail</h2>
        
        `;
  },

  async afterRender() {
    const logout = document.querySelector('.logout');
    logout.addEventListener('click', (e) => {
      e.preventDefault();
      localStorage.removeItem('auth');
      window.location.href = '/#/login';
    });
  },
};

export default Sent;
