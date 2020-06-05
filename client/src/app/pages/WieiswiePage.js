import { BAAS } from '../services';
import { routes } from '../router';

class WieiswiePage {
  async showTeam () {
    const teamMedewerkers = await BAAS.getTeamMedewerkers();
    return teamMedewerkers.data.map((medewerker) => {
      return `
      <a href="#!${routes.WIEISWIE_DETAIL.replace(':id', medewerker.id)}" class="person-card" data-navigo>
        <img src="${teamMedewerkers.domain}${medewerker.image}">
        <div class="person-card__overlay"></div>
        <div class="person-card__text">
          <p class="person-card__name">${medewerker.firstname}<br>${medewerker.lastname}</p>
          <p class="person-card__job">${this.getJob(medewerker)}</p>
        </div>
      </a>`;
    }).join('');
  }

  async showStudents () {
    const teamStudents = await BAAS.getTeamStudents();
    return teamStudents.data.records.map((student) => {
      return `
      <a href="#!${routes.WIEISWIE_DETAIL.replace(':id', student.id)}" class="person-card" data-navigo>
        <img src="${student.fields.img[0].thumbnails.large.url}">
        <div class="person-card__overlay"></div>
        <div class="person-card__text">
          <p class="person-card__name">${student.fields.name_first}<br>${student.fields.name_last}</p>
          <p class="person-card__job">student</p>
        </div>
      </a>`;
    }).join('');
  }

  getJob (medewerker) {
    let job = '';

    if (medewerker.docent) {
      job = 'docent';
    } else {
      if (medewerker.extraFunctie === '') {
        job = medewerker.functie;
      } else {
        job = medewerker.extraFunctie;
      }
    }

    return job;
  }

  async render () {
    return `
    <div class="head-page">
    <div class="container">
      <div class="row filter-head">
        <h2 class="head-title">wie is wie</h2>
        <select class="filter">
          <option value="iedereen">Iedereen</option>
          <option value="studenten">Studenten</option>
          <option value="medewerkers">Medewerkers</option>
        </select>
      </div>
    </div>
    <div class="head-picture">
      <div class="head-picture__overlay"></div>
      <div class="head-picture__image head-picture__image--wieiswie"></div>
    </div>
  </div>
  <div class="container">
    <div class="row">
    <div class="col-md-12">
      <div id="medewerkers" class="person-cards show-persons">
        ${await this.showTeam()}
      </div>
      <div id="studenten" class="person-cards show-persons">
        ${await this.showStudents()}
      </div>
  </div>
    </div>
  </div>
    `;
  }

  async afterRender () {
    // Connect the listeners
    const filter = document.querySelector('.filter');
    const persons = document.querySelectorAll('.person-cards');

    filter.addEventListener('change', (e) => {
      console.log(e.target.value);
      persons.forEach((el) => {
        el.classList.remove('show-persons');

        if (el.id === e.target.value) {
          el.classList.add('show-persons');
        }

        if (e.target.value === 'iedereen') {
          el.classList.add('show-persons');
        }
      });
    });
  }

  async mount () {
    // Before the rendering of the page
    const hamburgerElement = document.querySelector('.hamb');
    const navElement = document.querySelector('.nav__list');
    document.body.style.overflow = 'initial';
    navElement.classList.remove('nav__list--show');
    hamburgerElement.classList.add('fa-bars');
    hamburgerElement.classList.remove('fa-times');
    return this;
  }

  async unmount () {
    // After leaving the page
    return this;
  }
}

export default WieiswiePage;
