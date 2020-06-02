import { BAAS } from '../services';

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
