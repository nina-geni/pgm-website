import { BAAS } from '../services';

class WieIsWieDetail {
  async showMember (id) {
    const memberMedewerker = await BAAS.getTeamMedewerker(parseInt(id, 10));
    const memberStudent = await BAAS.getTeamStudent(id);
    let tempStr = '';
    console.log(memberMedewerker.data);
    console.log(memberStudent.data);
    if (memberMedewerker.data !== undefined) {
      tempStr = `
      <div class="detail-wieiswie">
        <div class="detail-wieiswie__content">
          <h3>${memberMedewerker.data.firstname} ${memberMedewerker.data.lastname}</h3>
          <p class="text-title">Medewerker</p>
          <p class="text-title__sub">Functie:</p>
          <p>${memberMedewerker.data.functie}</p>
          <p>${memberMedewerker.data.extraFunctie}</p>
          ${memberMedewerker.data.docent ? '<p>Docent</p>' : ''}
          ${memberMedewerker.data.docent ? `<p class="text-title__sub">Vakken:</p><p>${memberMedewerker.data.vak.join(', ')}</p>` : ''}
        </div>
        <div class="detail-wieiswie__pic">
          <img src="${memberMedewerker.domain}${memberMedewerker.data.image}">
        </div>
      </div>
    `;
    }

    if (memberStudent.data !== undefined) {
      tempStr = `
      <div class="detail-wieiswie">
        <div class="detail-wieiswie__content">
          <h3>${memberStudent.data.fields.name_first} ${memberStudent.data.fields.name_last}</h3>
          <p class="text-title">Student</p>
          <p>${memberStudent.data.fields.about}</p>
          <p class="detail-wieiswie__quote"><strong>"${memberStudent.data.fields.quote_alt}"</strong></p>
          <p class="text-title__sub">Favoriete vak:</p>
          <p>${memberStudent.data.fields.favourite}</p>
          <p class="text-title__sub">Intresses:</p>
          <p>${memberStudent.data.fields.interests}</p>
        </div>
        <div class="detail-wieiswie__pic">
          <img src="${memberStudent.data.fields.img[0].thumbnails.large.url}">
        </div>
      </div>
    `;
    }

    return tempStr;
  }

  async render (params) {
    return `     
      ${await this.showMember(params.id)}
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

export default WieIsWieDetail;
