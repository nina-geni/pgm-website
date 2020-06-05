import * as THREE from 'three/build/three.module';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import { BAAS } from '../services';
import { routes } from '../router';

class CasesDetailPage {
  async showCase (id) {
    const project = await BAAS.getCase(id);
    if(project.data === undefined) {
      window.location.assign('#!/404');
    }
    return `
      <div class="detail-titlepic">
        <h3>${project.data.title}</h3>
        <div class="detail-titlepic__picture">
          <img src="${project.domain}${project.data.thumbnail}">
          <div class="detail-titlepic__pink"><div>©${project.data.jaar} ${project.data.student.join(', ')}</div><div>created for ${project.data.vak}</div></div>
        </div>
      </div>
      <div class="container">
        <div class="row detail-content">
          <div class="col-md-7">
            ${project.data.Omschrijving}
          </div>
        </div>
        <div class="row">
          <div class="col-md-12 detail-content__pics">
            ${await this.getPics(project.data.pics, project.domain)}
          </div>
        </div>
      </div>
    `;
  }

  async relatedCase (id) {
    const related = await BAAS.getCaseRelated(id);
    const index = Math.floor(Math.random() * related.data.length);
    console.log(related);
    const relatedCase = related.data[index];
    console.log(relatedCase);
    return `
    <a href="#!${routes.CASES_DETAIL.replace(':id', relatedCase.id)}" class="main-card" data-navigo>
          <div class="main-card__img">
            <img src="${related.domain}${relatedCase.thumbnail}">
          </div>
          <div class="main-card__overlay"></div>
          <div class="main-card__text">
            <p class="main-card__title">${relatedCase.title}</p>
            <p class="main-card__link">Lees Meer <i class="fas fa-arrow-right"></i></p>
          </div>
        </a>`;
  }

  getPics (pics, domain) {
    let tempStr = '';
    pics.forEach((e) => {
      if (e.type !== 'model') {
        tempStr += `
          <div class="picture">
            <img src="${domain}${e.src}">
          </div>
        `;
      } else {
        window.localStorage.setItem('model', `${domain}${e.src}`);
        tempStr += `
          <div class="model"></div>
        `;
      }
    });
    return tempStr;
  }

  async render (params) {
    return `     
    ${await this.showCase(params.id)}
    <div class="container">
      <div class="row">
        <div class="col-md-12 main-cards">
          <h3>Lees ook</h3>
          ${await this.relatedCase(params.id)}
        </div>
      </div>
    </div>

    `;
  }

  async afterRender () {
    if (window.localStorage.getItem('model') !== null) {
      const model = window.localStorage.getItem('model');
      console.log(model);

      // Renderer
      const renderer = new THREE.WebGLRenderer();
      renderer.setSize(document.querySelector('.model').offsetWidth, document.querySelector('.model').offsetHeight);
      renderer.outputEncoding = THREE.sRGBEncoding;

      // Canvas Element
      const canvas = renderer.domElement;
      document.querySelector('.model').appendChild(canvas);

      // Scene
      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0x999999);

      // Camera
      const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight);

      camera.position.set(4.8, 4.8, 4.8);
      camera.lookAt(new THREE.Vector3(0, 0, 0));

      // Controls
      const controls = new OrbitControls(camera, canvas);

      // Lights
      const ambientLight = new THREE.AmbientLight(0x666666);
      scene.add(ambientLight);

      // Loaders
      const loader = new GLTFLoader();
      loader.load(
        model,
        (gltf) => {
          scene.add(gltf.scene);
        },
        (xhr) => {
          console.info(`${xhr.loaded / xhr.total * 100}% loaded`);
        },
        (error) => {
          console.error(error);
        }
      );

      // Animation Loop
      (function animate () {
        // Render
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
      })();

      window.localStorage.removeItem('model');
    }

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

export default CasesDetailPage;
