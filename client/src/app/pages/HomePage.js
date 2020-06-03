import { BAAS } from '../services';
import { routes } from '../router';
import klas from '../_static/images/klas.jpg';
import computer from '../_static/images/programming.jpg';

class HomePage {
  constructor () {
    this.slideIndex = 0;
  }

  async showHome () {
    const pictures = await BAAS.getHome();
    return pictures.data.map(
      picture => `
        <div class="show-pic">
          <img src="${pictures.domain}${picture.img}">  
        </div>
      `
    ).join('');
  }

  async render () {
    return `
    <div class="head-page">
    <div class="container">
      <div class="row">
        <h2 class="head-title">home</h2>
      </div>
    </div>
    <div class="head-picture">
      <div class="head-picture__overlay"></div>
      <div class="head-picture__image head-picture__image--home">
        ${await this.showHome()}
      </div>
    </div>
  </div>
  <div class="container">
    <div class="row">
      <div class="col-md-12 main-cards">
        ${await this.relatedBlog()}
      </div>
    </div>
  </div>
  </div>
  <div class="home-content">
    <div class="home-content__pic">
      <img src="${computer}">
    </div>
    <div>
      <a  href="${routes.OPLEIDING}">Graduaat<br></brQ>Programmeren <i class="fas fa-arrow-right"></i></a>
      <div class="button-hold home-content__button">
        <div class="button">
          <button><a href="https://webregistratie.arteveldehs.be" target="_blank">SCHRIJF JE IN</a></button>
        <div class="button__behind"></div>
      </div>
    </div>
  </div>
  </div>
  <div class="container">
    <div class="row">
      <div class="col-md-12 main-cards">
        ${await this.relatedCase()}
      </div>
    </div>
  </div>
  <div class="home-content">
    <div class="home-content__pic">
      <img src="${klas}">
    </div>
    <a href="${routes.WIEISWIE}">Ontdek ons team <i class="fas fa-arrow-right"></i></a>
  </div>
    `;
  }

  showSlides (slideIndex) {
    let index = slideIndex;

    const slides = document.querySelectorAll('.show-pic');

    for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = 'none';
    }
    index++;
    if (index > slides.length) {
      index = 1;
    }

    slides[index - 1].style.display = 'block';
    setTimeout(() => {
      this.showSlides(index);
    }, 5000);
  }

  async relatedBlog () {
    const related = await BAAS.getBlogRelated();
    const index = Math.floor(Math.random() * related.data.length);
    console.log(related);
    const relatedBlog = related.data[index];
    console.log(relatedBlog);
    return `
    <a href="#!${routes.BLOG_DETAIL.replace(':id', relatedBlog.id)}" class="main-card" data-navigo>
          <div class="main-card__img">
            <img src="${related.domain}${relatedBlog.img}">
          </div>
          <div class="main-card__overlay"></div>
          <div class="main-card__text">
            <p class="main-card__title">${relatedBlog.title}</p>
            <p class="main-card__link">Lees Meer <i class="fas fa-arrow-right"></i></p>
          </div>
        </a>`;
  }

  async relatedCase () {
    const related = await BAAS.getCaseRelated();
    const index = Math.floor(Math.random() * related.data.length);
    console.log(related);
    const relatedCase = related.data[index];
    console.log(relatedCase);
    return `
    <a href="#!${routes.CASES_DETAIL.replace(':id', relatedCase.id)}" class="main-card" data-navigo>
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

  async afterRender () {
    // Connect the listenersss
    const slideIndex = 0;
    this.showSlides(slideIndex);
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

export default HomePage;
