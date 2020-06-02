import { BAAS } from '../services';

class OpleidingPage {
  async showOpleding () {
    const opleidingen = await BAAS.getOpleiding();
    return opleidingen.data.map(
      (opleiding, i) => `
      <div class="opleidingen">
        <div class="opleidingen__title" id="${i}">
          <h3>${opleiding.title}</h3>
          <i class="fas fa-chevron-down" id="${i}"></i>
        </div>
        <div class="opleidingen__content" id="${i}">
          ${opleiding.content}
          ${this.getExtra(opleiding.extra, opleidingen.domain)}
        </div>
      </div>
      `
    ).join('');
  }

  getExtra (extra, domain) {
    let tempStr = '';
    if (extra.length > 0) {
      if (extra[0].type === 'image') {
        tempStr = `
          <img src="${domain}${extra[0].src}">
        `;
      } else {
        tempStr = `
        <iframe src="${extra[0].src}"></iframe>
        `;
      }
    }
    return tempStr;
  }
  
  async render () {
    return `
  <div class="head-page">
    <div class="container">
      <div class="row head-secondItem">
        <h2 class="head-title">Graduaat <br>Programmeren</h2>
        <div class="button head-button">
          <button><a href="https://webregistratie.arteveldehs.be" target="_blank">SCHRIJF JE IN</a></button>
          <div class="button__behind"></div>
        </div>
      </div>
    </div>
    <div class="head-picture">
      <div class="head-picture__overlay"></div>
      <div class="head-picture__image head-picture__image--opleiding"></div>
    </div>
  </div>
  <div class="container">
    <div class="row opleiding-text">
      <div class="col-md-7">
        <p>120 studiepunten, VDAB-traject mogelijk, Campus Mariakerke Tijdens het Graduaat Programmeren specialiseer je je in JavaScript, HTML, CSS, UI/UX en software engineering. Naast deze technische kant, leer je ook om creatief en commercieel te denken. Als programmeur creëer je namelijk niet alleen aantrekkelijke en functionele websites, maar werk je ook samen met heel wat bedrijven. Na deze opleiding kan je aan de slag als front-end developer, CMS Themer of full-stack JavaScript developer.</p>
        <p>Vraag je brochure aan <a href="https://forms.summit.nl/Artevelde/BrochureAanvraagPost/open/0d721f86-aad4-4497-bb87-bbfa0633823f/Programmeren" target="_blank" rel="noopener noreferrer">per post</a> of <a href="https://forms.summit.nl/Artevelde/BrochureAanvraagDigitaal/open/10fb35fa-a4b6-42c0-b7ac-8c3ba74a4d9e/Programmeren" target="_blank" rel="noopener noreferrer">via e-mail</a>.</p>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        ${await this.showOpleding()}
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <iframe src="https://www.youtube.com/embed/oZE6MQnM0cQ"></iframe>
      </div>
    </div>
  </div>
    `;
  }

  async afterRender () {
    const titleElements = document.querySelectorAll('.opleidingen__title');
    const contentElements = document.querySelectorAll('.opleidingen__content');
    const icons = document.querySelectorAll('.opleidingen__title > i');


    titleElements.forEach((element) => {
      element.addEventListener('click', (ev) => {
        const id = ev.target.id || ev.target.parentNode.id;

        if (document.querySelector(`i[id="${id}`).classList.contains('active-arrow')) {
          document.querySelector(`i[id="${id}`).classList.remove('active-arrow');
        } else {
          icons.forEach(el => el.classList.remove('active-arrow'));
          document.querySelector(`i[id="${id}"]`).classList.add('active-arrow');
        }

        contentElements.forEach((el) => {
          if (el.id === id && el.classList.contains('show')) {
            el.classList.remove('show');
          } else {
            el.classList.remove('show');
            if (el.id === id) {
              el.classList.add('show');
            }
          }
        });

        ev.target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  }

  async mount () {
    // Before the rendering of the page
    return this;
  }

  async unmount () {
    // After leaving the page
    return this;
  }
}

export default OpleidingPage;
