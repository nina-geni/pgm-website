import { BAAS } from '../services';
import { routes } from '../router';

class BlogDetailPage {
  async showPost (id) {
    const post = await BAAS.getPost(id);
    return `
      <div class="detail-titlepic">
        <h3>${post.data.title}</h3>
        <div class="detail-titlepic__picture">
          <img src="${post.domain}${post.data.img}">
          <div class="detail-titlepic__pink">${post.data.auteur.join(', ')}</div>
        </div>
      </div>
      <div class="container">
        <div class="row detail-content">
          <div class="col-md-7">
            ${post.data.content}
          </div>
        </div>
      </div>
    `;
  }

  async relatedBlog (id) {
    const related = await BAAS.getBlogRelated(id);
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

  async render (params) {
    return `
        ${await this.showPost(params.id)}
    <div class="container">
      <div class="row">
        <div class="col-md-12 main-cards">
          <h3>Lees ook</h3>
          ${await this.relatedBlog(params.id)}
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

export default BlogDetailPage;
