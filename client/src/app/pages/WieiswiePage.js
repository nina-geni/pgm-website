import { BAAS } from '../services';

class WieiswiePage {
  async showTeam () {
    const teamMedewerkers = await BAAS.getTeamMedewerkers();
    return teamMedewerkers.data.map((medewerker) => {
      return `
      <a href="#" class="person-card" data-navigo>
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
      <a href="#" class="person-card" data-navigo>
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
      <div class="row">
        <h2 class="head-title">wie is wie</h2>
      </div>
    </div>
    <div class="head-picture">
      <div class="head-picture__overlay"></div>
      <div class="head-picture__image head-picture__image--wieiswie"></div>
    </div>
  </div>
  <div class="container">
    <div class="row">
    <div class="col-md-12 person-cards">
      ${await this.showTeam()}
      ${await this.showStudents()}
  </div>
    </div>
  </div>
    `;
  }

  async afterRender () {
    // Connect the listeners
    return this;
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

export default WieiswiePage;
