import { BAAS } from '../services';

class BlogPage {
  async showBlog () {
    const blogs = await BAAS.getBlog();
    return blogs.data.map(
      blog => `
        <a href="#" class="main-card" data-navigo>
          <div class="main-card__img">
            <img src="${blogs.domain}${blog.img}">
          </div>
          <div class="main-card__overlay"></div>
          <div class="main-card__text">
            <p class="main-card__title">${blog.title}</p>
            <p class="main-card__link">Lees Meer <i class="fas fa-arrow-right"></i></p>
          </div>
        </a>`
    ).join('');
  }

  async render () {
    return `
    <div class="head-page">
    <div class="container">
      <div class="row">
        <h2 class="head-title">Blog</h2>
      </div>
    </div>
    <div class="head-picture">
      <div class="head-picture__overlay"></div>
      <div class="head-picture__image head-picture__image--blog"></div>
    </div>
  </div>
  <div class="container">
    <div class="row">
      <div class="col-md-12 main-cards">
        ${await this.showBlog()}
      </div>
    </div>
  </div>
    `;
  }

  async afterRender () {
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

export default BlogPage;
