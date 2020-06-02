const DOMAIN = 'https://pgmgent-1920-students.github.io/case1-pgm-website-baas-pgmgent-ninageni/';

class BAAS {
  static getBlog = async () => {
    const response = await fetch(`${DOMAIN}/blog/blog.json`);
    const jsonData = await response.json();
    return {
      data: jsonData,
      domain: DOMAIN,
    };
  }

  static getPost = async (id) => {
    const response = await fetch(`${DOMAIN}/blog/blog.json`);
    const jsonData = await response.json();
    return {
      data: jsonData.find(post => post.id === id),
      domain: DOMAIN,
    };
  }

  static getBlogRelated = async (id) => {
    const response = await fetch(`${DOMAIN}/blog/blog.json`);
    const jsonData = await response.json();
    return {
      data: jsonData.filter(post => post.id !== id),
      domain: DOMAIN,
    };
  }

  static getMedewerkers = async () => {
    const response = await fetch(`${DOMAIN}/medewerkers/medewerkers.json`);
    const jsonData = await response.json();
    return jsonData;
  }

  static getMedewerker = async (id) => {
    const response = await fetch(`${DOMAIN}/medewerkers/medewerkers.json`);
    const jsonData = await response.json();
    return jsonData.find(medewerker => medewerker.id === id);
  }

  static getContacts = async () => {
    const response = await fetch(`${DOMAIN}/medewerkers/medewerkers.json`);
    const jsonData = await response.json();
    // console.log(jsonData.filter((value) => value.importantContact));
    return {
      data: jsonData.filter(value => value.importantContact),
      domain: DOMAIN,
    };
  }

  static getTeamMedewerkers = async (id) => {
    const response = await fetch(`${DOMAIN}/medewerkers/medewerkers.json`);
    const jsonData = await response.json();
    return {
      data: jsonData,
      domain: DOMAIN,
    };
  }

  static getTeamStudents = async (id) => {
    const response = await fetch(`${DOMAIN}/studenten/studenten.json`);
    const jsonData = await response.json();
    return {
      data: jsonData,
      domain: DOMAIN,
    };
  }

  static getCases = async () => {
    const response = await fetch(`${DOMAIN}/cases/cases.json`);
    const jsonData = await response.json();
    return {
      data: jsonData,
      domain: DOMAIN,
    };
  }

  static getCase = async (id) => {
    const response = await fetch(`${DOMAIN}/cases/cases.json`);
    const jsonData = await response.json();
    return {
      data: jsonData.find(project => project.id === id),
      domain: DOMAIN,
    };
  }

  static getCaseRelated = async (id) => {
    const response = await fetch(`${DOMAIN}/cases/cases.json`);
    const jsonData = await response.json();
    return {
      data: jsonData.filter(post => post.id !== id),
      domain: DOMAIN,
    };
  }

  static getOpleiding = async () => {
    const response = await fetch(`${DOMAIN}/opleiding/opleiding.json`);
    const jsonData = await response.json();
    return {
      data: jsonData,
      domain: DOMAIN,
    };
  }

  static getHome = async () => {
    const response = await fetch(`${DOMAIN}/home/home.json`);
    const jsonData = await response.json();
    return {
      data: jsonData,
      domain: DOMAIN,
    };
  }
}

export default BAAS;
