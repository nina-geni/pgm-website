import { BAAS } from '../services';

class PostDetailPage {
  async getPost (id) {
    const post = await BAAS.getPost(id);
    return `
      <div class="post">
        <h1>${post.title}</h1>
        <div>${post.synopsis}</div>
      </div>
    `;
  }

  async render (params) {
    return `
      <div class="page page--home">
        ${await this.getPost(params.id)}
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

export default PostDetailPage;
