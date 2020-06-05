import notFound from '../_static/images/404.png';

class NotFoundPage {
  async render () {
    return `
    <div class="containter">
      <div class="row">
        <div class=" col-md-12 page--404">
          <img src="${notFound}">
          <h3>Sorry, er ging iets mis</h3>
          <p class="text-title__sub">Deze pagina heeft pootjes gekregen.</p>
        </div>
      </div>
    </div>
    `;
  }
}

export default NotFoundPage;
