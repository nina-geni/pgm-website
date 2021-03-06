const DOMAIN = 'https://pgmgent-1920-students.github.io/case1-pgm-website-baas-pgmgent-ninageni';

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

  static getMedewerker = async (id) => {
    const response = await fetch(`${DOMAIN}/medewerkers/medewerkers.json`);
    const jsonData = await response.json();
    return jsonData.find(medewerker => medewerker.id === id);
  }

  static getContacts = async () => {
    const response = await fetch(`${DOMAIN}/medewerkers/medewerkers.json`);
    const jsonData = await response.json();

    return {
      data: jsonData.filter(value => value.importantContact),
      domain: DOMAIN,
    };
  }

  static getTeamMedewerkers = async () => {
    const response = await fetch(`${DOMAIN}/medewerkers/medewerkers.json`);
    const jsonData = await response.json();
    return {
      data: jsonData,
      domain: DOMAIN,
    };
  }

  static getTeamMedewerker = async (id) => {
    const response = await fetch(`${DOMAIN}/medewerkers/medewerkers.json`);
    const jsonData = await response.json();
    console.log(id);
    return {
      data: jsonData.find(medewerker => medewerker.id === id),
      domain: DOMAIN,
    };
  }

  static getTeamStudents = async () => {
    const response = await fetch(`${DOMAIN}/studenten/studenten.json`);
    const jsonData = await response.json();
    return {
      data: jsonData,
      domain: DOMAIN,
    };
  }

  static getTeamStudent = async (id) => {
    const response = await fetch(`${DOMAIN}/studenten/studenten.json`);
    const jsonData = await response.json();
    return {
      data: jsonData.records.find(student => student.id === id),
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

  static getCasesOpVak = async (vak) => {
    const response = await fetch(`${DOMAIN}/cases/cases.json`);
    const jsonData = await response.json();
    return {
      data: jsonData.filter(project => project.vak === vak),
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
