class WerkpleklerenPage {
  async render () {
    return `
    <div class="head-page">
    <div class="container">
      <div class="row">
        <h2 class="head-title">Werkplekleren</h2>
      </div>
    </div>
    <div class="head-picture">
      <div class="head-picture__overlay"></div>
      <div class="head-picture__image head-picture__image--werkplekleren"></div>
    </div>
  </div>
    <div class="container">
      <div class="row">
        <div class="col-md-12">
        <iframe src= "https://forms.office.com/Pages/ResponsePage.aspx?id=6oDgtrmteUyTA23Pgm-4VOM0tbMfB-FOnDunR1QeEQhUOVQxV1NFVDZXQkcxMk1QTzA3V0tGMlNCTi4u&embed=true" frameborder= "0" marginwidth= "0" marginheight= "0" style= "border: none; max-width:100%; max-height:100vh" allowfullscreen webkitallowfullscreen mozallowfullscreen msallowfullscreen></iframe>
        </div>
      </div>
    </div>

    `;
  }

  async afterRender () {
  }

  async mount () {
    // Before the rendering of the page
    const hamburgerElement = document.querySelector('.hamb');
    const navElement = document.querySelector('.nav__list');
    document.body.style.overflow = 'initial';
    navElement.classList.remove('nav__list--show');
    hamburgerElement.classList.add('fa-bars');
    hamburgerElement.classList.remove('fa-times');
    return this;
  }

  async unmount () {
    // After leaving the page
    return this;
  }
}

export default WerkpleklerenPage;
