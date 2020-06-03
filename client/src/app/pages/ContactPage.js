import mapboxgl from 'mapbox-gl';
import { routes } from '../router';
import { BAAS } from '../services';
import pointer from '../_static/images/pointer.png';

class ContactPage {
  async showContacts () {
    const contacts = await BAAS.getContacts();
    return contacts.data.map((contact) => {
      return `
      <a href="#!${routes.WIEISWIE_DETAIL.replace(':id', contact.id)}" class="person-card" data-navigo>
        <img src="${contacts.domain}${contact.image}">
        <div class="person-card__overlay"></div>
        <div class="person-card__text">
          <p class="person-card__name">${contact.firstname}<br>${contact.lastname}</p>
          <p class="person-card__job">${contact.functie}</p>
        </div>
      </a>`;
    }).join('');
  }

  async render () {
    return `
      <div class="head-page">
        <div class="container">
          <div class="row">
            <h2 class="head-title">CONTACT</h2>
          </div>
        </div>
        <div class="head-picture">
          <div class="head-picture__overlay"></div>
          <div class="head-picture__image head-picture__image--contact"></div>
        </div>
      </div>
      <div class="address">
        <div class="contact-info">
          <p>Arteveldehogeschool VZW Industrieweg 232, 9030 Gent</p>
          <p> ALGEMEEN TELEFOONNUMMER: <br> 09 234 90 00</p>
          <div class="contact-info__social">
            <a href="https://www.facebook.com/GraduaatProgrammeren.Arteveldehogeschool/" target="_blank"><i class="fab fa-facebook"></i></a>
            <a href="https://www.linkedin.com/company/graduaat-programmeren/?fbclid=IwAR1qMoOiwQAq9rBaMZLqZNSXNcIIqx2i3YzFNOVyuwTPdCcdl6YgclYH3I0" target="_blank"><i class="fab fa-linkedin-in"></i></a>
            <a href="https://www.instagram.com/explore/locations/354987211999862/graduaat-programmeren-arteveldehogeschool/?hl=nl&fbclid=IwAR0RVc6fFrcWkKjY7kVmFsS5r84gUUavnAoj54dtULhLswaLivBlF1pYA5c" target="_blank"><i class="fab fa-instagram"></i></a>
          </div>
        </div>
        <div id="map"></div>
      </div>
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <h3>Belangrijkste contactpersonen</h3>
          </div>
          <div class="col-md-12 person-cards">
            ${await this.showContacts()}
          </div>
        </div>
        <div class="row">
          <div class="col-md-12">
          <h3>Contactformulier</h3>
          </div>
          <div class="col-md-12">
            <form>
              <input type="text" placeholder="Naam"><br>
              <input type="text" placeholder="email"><br>
              <input type="text" placeholder="onderwerp"><br>
              <textarea placeholder="bericht"></textarea><br>
              <div class="button-hold">
                <div class="button">
                  <button>verzenden</button>
                  <div class="button__behind"></div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    `;
  }

  async afterRender () {
    // After the rendering of the page mapje
    mapboxgl.accessToken = "pk.eyJ1IjoibmluYWdlbmkiLCJhIjoiY2pvYTg3Zzd0MGNpcTNrbXJxMmtkNXo2cCJ9.ZQg31fYeJDmLbIf0Xolz-Q";
  
    var map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v11",
      center: [3.668718,51.087460],
      zoom: 15,
    });

  map.on("load", function() {
    map.loadImage(
      pointer,
      function(error, image) {
      if (error) throw error;
      map.addImage("pointer", image);
      map.addLayer({
        id: "points",
        type: "symbol",
        source: {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: [
              {
                type: "Feature",
                geometry: {
                  type: "Point",
                  coordinates: [3.668718,51.087460],
                }
              }
            ]
          }
        },
        layout: {
          "icon-image": "pointer",
          "icon-size": 0.50
        }
      });
    }
  );
});
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

export default ContactPage;
