class NotFoundPage {
  async render () {
    return `
      <div class="page page--404">
        <h1>404</h1>
        <a href="home" data-navigo>Home</a>
      </div>
    `;
  }
}

export default NotFoundPage;
