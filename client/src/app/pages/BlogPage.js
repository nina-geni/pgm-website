import { BAAS } from '../services';
import { routes } from '../router';

class BlogPage {
  constructor () {
    this.blogs = {};
  }

  async getDataBlogs () {
    this.blogs = await BAAS.getBlog();
  }

  showBlog (page = 1) {
    const blogsPage = this.blogs.data.slice(page * 4 - 4, page * 4);
    return blogsPage.map(
      blog => `
        <a href="#!${routes.BLOG_DETAIL.replace(':id', blog.id)}" class="main-card" data-navigo>
          <div class="main-card__img">
            <img src="${this.blogs.domain}${blog.img}">
          </div>
          <div class="main-card__overlay"></div>
          <div class="main-card__text">
            <p class="main-card__title">${blog.title}</p>
            <p class="main-card__link">Lees Meer <i class="fas fa-arrow-right"></i></p>
          </div>
        </a>`
    ).join('');
  }

  makePagination (data) {
    let tempStr = '';
    let page = 1;

    for (let i = 0; i <= data.length; i += 4) {
      tempStr += `<a href="" id="${page}" class="page-number">${page}</a>`;
      page++;
    }

    return tempStr;
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
      <div class="col-md-12 col-sm-12 col-12 main-cards">
        ${await this.showBlog()}
      </div>
      <div class="col-md-12 pagination">
        ${this.makePagination(this.blogs.data)}
      </div>
    </div>
  </div>
    `;
  }

  async afterRender () {
    const pages = document.querySelectorAll('.page-number');
    pages[0].classList.add('active-page');

    pages.forEach((page) => {
      page.addEventListener('click', (e) => {
        e.preventDefault();
        let pageNumber = e.target.id;
        pageNumber = parseInt(pageNumber, 10);

        document.querySelector('.main-cards').innerHTML = this.showBlog(pageNumber);

        pages.forEach((el) => {
          el.classList.remove('active-page');
        });

        e.target.classList.add('active-page');
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
    await this.getDataBlogs();
  }

  async unmount () {
    // After leaving the page
    return this;
  }
}

export default BlogPage;
