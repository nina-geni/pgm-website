import { BAAS } from '../services';

import { routes } from '../router';

class HomePage {
  async getPosts () {
    const posts = await BAAS.getPosts();
    return posts.map(post => `
      <div class="col-12 col-md-6 col-lg-4 post">
        <picture class="post__picture">
          <img src="${post.thumbnailUrl}" />
        </picture>
        <h1 class="post__title">${post.title}</h1>
        <a href="#!${routes.POST_DETAIL.replace(':id', post.id)}">Details</a>
      </div>`).join('');
  }

  async render () {
    return `
    <body>
    <div class="container">
      <div class="row">
        <h2 class="headTitle">HOME</h2>
      </div>
    </div>
    <div class="overlay"></div>
    <div class="headPicture headPicture__home"></div>
  </body>
    `;
  }

  async afterRender () {
    const btn = document.querySelector('.btn');
    btn.addEventListener('click', (ev) => {
      console.log(ev);
    });
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

export default HomePage;
