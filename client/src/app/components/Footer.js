class Footer {
  async render () {
    return `
      <footer>
        <div class="container">
          <div class="row footer">
          <p>© 2019 - 2020 GENITELLO NINA</p>
          <p>created for PGM</p>
          </div>
        </div>        
      </footerr>
    `;
  }

  async afterRender () {
  }
}

export default Footer;
