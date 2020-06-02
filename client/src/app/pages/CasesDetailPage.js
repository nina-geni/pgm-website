import { BAAS } from '../services';

class CasesDetailPage {
  async showCase (id) {
    const project = await BAAS.getCase(id);
    return `
      <div class="detail-titlepic">
        <h3>${project.data.title}</h3>
        <div class="detail-titlepic__picture">
          <img src="${project.domain}${project.data.thumbnail}">
          <div class="detail-titlepic__pink"><div>©${project.data.jaar} ${project.data.student.join(', ')}</div><div>created for ${project.data.vak}</div></div>
        </div>
      </div>
      <div class="container">
        <div class="row detail-content">
          <div class="col-md-7">
            ${project.data.Omschrijving}
          </div>
        </div>
        <div class="row">
          <div class="col-md-12 detail-content__pics">
            ${await this.getPics(project.data.pics, project.domain)}
          </div>
        </div>
      </div>
    `;
  }

  async relatedCase (id) {
    const related = await BAAS.getCaseRelated(id);
    const index = Math.floor(Math.random() * related.data.length);
    console.log(related);
    const relatedCase = related.data[index];
    console.log(relatedCase);
    return `
    <a href="/#!/cases/${relatedCase.id}" class="main-card" data-navigo>
          <div class="main-card__img">
            <img src="${related.domain}${relatedCase.thumbnail}">
          </div>
          <div class="main-card__overlay"></div>
          <div class="main-card__text">
            <p class="main-card__title">${relatedCase.title}</p>
            <p class="main-card__link">Lees Meer <i class="fas fa-arrow-right"></i></p>
          </div>
        </a>`;
  }

  getPics (pics, domain) {
    let tempStr = '';
    pics.forEach((e) => {
      if (e.type !== 'model') {
        tempStr += `
          <div class="picture">
            <img src="${domain}${e.src}">
          </div>
        `;
      }
    });
    return tempStr;
  }

  async render (params) {
    return `     
    ${await this.showCase(params.id)}
    <div class="container">
      <div class="row">
        <div class="col-md-12 main-cards">
          <h3>Lees ook</h3>
          ${await this.relatedCase(params.id)}
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

export default CasesDetailPage;
