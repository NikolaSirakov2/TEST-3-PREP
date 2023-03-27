class ViewController {
  constructor() {
    window.addEventListener("load", this.handleHashChange);
    window.addEventListener("hashchange", this.handleHashChange);
    this.userManager = new UserManager();

    this.registerController = new RegisterController(this.userManager);
    this.logInController = new LogInController(this.userManager);
  }

  handleHashChange = (e) => {
    let header = document.getElementById("headerText");

    if (localStorage.loggedUser) {
      header.innerText = `Hi, ${
        JSON.parse(localStorage.loggedUser).username
      }! Welcome to world of STAR WARS`;
    }

    const hash = location.hash.slice(1) || PAGE_IDS[0];

    if (!PAGE_IDS.includes(hash)) {
      location.hash = "error";
      return;
    }

    PAGE_IDS.forEach((pageId) => {
      let element = getEl(pageId);
      if (hash === pageId) {
        element.style.display = "block";
      } else {
        element.style.display = "none";
      }
    });

    switch (hash) {
      case "register":
        this.registerController.render();
        break;
      case "login":
        localStorage.loggedUser = [];
        this.logInController.render();
        break;
      case "people":
        this.renderPeoplePage();
        break;
    }
  };

  renderPeoplePage = () => {
    let container = getEl("peopleContainer");
    container.innerHTML = "";

    let people = makeAPICall(SW_URL + "people").then((data) => {
      for (let i = 0; i < data.results.length; i++) {
        let card = document.createElement("div");
        card.classList.add("card");
        card.style.width = "200px";
        card.style.background = "khaki";

        card.innerHTML = `
          <div class="card-body">
            <h5 class="card-title">${data.results[i].name}</h5>
            <p class="card-text">${data.results[i].gender}</p>
            <p class="card-text">${data.results[i].mass}</p>
          </div>`;

        let planetBtn = document.createElement("a");
        planetBtn.classList.add("btn", "btn-primary");
        planetBtn.innerText = "Homeworld";

        planetBtn.onclick = (e) => {
          e.preventDefault();
          this.renderPlanetPage(data.results[i].homeworld);
          location.hash = "planet";
        };

        card.appendChild(planetBtn);
        container.appendChild(card);
      }
    });
  };

  
  renderPlanetPage = (url) => {
    let container = getEl("planetContainer");
    container.innerHTML = "";

    let planet = easyFetch(url)
    .then((result) => {
      console.log(result);
      let card = document.createElement("div");
      card.classList.add("card");
      card.style.width = "200px";
      card.style.background = "coral";

      card.innerHTML = `
          <div class="card-body">
            <h5 class="card-title">${result.name}</h5>
            <p class="card-text">${result.terrain}</p>
            <p class="card-text">${result.climate}</p>
          </div>`;

    //   let planetBtn = document.createElement("a");
    //   planetBtn.classList.add("btn", "btn-primary");
    //   planetBtn.innerText = "Homeworld";

    //   planetBtn.onclick = (e) => {
    //     e.preventDefault();
    //     this.renderPlanetPage(data.results[i].homeworld);
    //     location.hash = "planet";
    //   };

    //   card.appendChild(planetBtn);
      container.appendChild(card);
    });
  };
}

let viewController = new ViewController();
