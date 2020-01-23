const videoList = document.querySelector(".video-list");
let URI = "";
let userQuerys = [];
let windowIsShown = false;
let userQuery = {};
let id = 0;
let manipulateId = 0;
let userName = "";


// Function for user authorization 

function authUser() {
  const loginForm = document.querySelector(".login-form");
  const login = document.querySelector("#login");
  const password = document.querySelector("#password");

  let request = new XMLHttpRequest();

  request.open("GET", "logins.json");
  request.responseType = "json";
  request.send();


  request.onload = function() {
    const user = request.response;
    const element = document.createElement("div");
    loginForm.appendChild(element);
    user.find(item => {
      if (
        localStorage.token &&
        localStorage.token == item.login + localStorage.getItem("rand")
      ) {
        loginForm.remove();
        userName = item.login;
        renderPage();
      } else {
        loginForm.addEventListener("submit", event => {
          event.preventDefault();
          if (login.value === item.login && password.value === item.password) {
            loginForm.remove();
            const randomValue = Math.random();
            localStorage.rand = randomValue;
            localStorage.token = item.login + randomValue;
            userName = item.login;
            renderPage();
          } else {
            element.innerHTML = "";
            element.innerHTML = `
              <p style = "color: red; margin-top: 1rem">Неправильный логин или пароль</p>
            `;
          }
        });
      }
    });
  };
}

// End function

// Very big function for rendering page and add event listerens on whole

function renderPage() {
  const unlogBtn = document.querySelector("#unlogin");
  const mainContainer = document.querySelector(".main");
  const favouritesPage = document.querySelector(".favourites");
  const addFavourites = document.querySelector(".input-heart");
  const navItems = document.querySelector(".nav__items");
  const changesView = document.querySelector(".filter-panel__change-view");
  const backdrop = document.querySelector(".backdrop");
  const modalSave = document.querySelector(".modal--save");
  const modalEdit = document.querySelector(".modal--edit");

  readingRequests(); // Show favourites list

  // Show page
  mainContainer.classList.add("active");
  navItems.parentElement.classList.add("active");

  unlogBtn.addEventListener("click", () => {
    localStorage.removeItem("token");
    location.reload();
  });

  function clearInputs(element) {
    element.querySelector('[type = "range"]').value = 12;
    element.querySelector('[name = "name"]').value = "Укажите название";
    element.querySelector('[name = "sort"]').value = "none";
    element.querySelector("span").textContent = 12;
  }

  navItems.addEventListener("click", event => {
    if (
      !event.target.classList.contains("active") &&
      event.target.tagName !== "UL"
    ) {
      navItems.querySelector("li.active").classList.remove("active");
      event.target.classList.add("active");
      mainContainer.classList.toggle("active");
      favouritesPage.classList.toggle("active");
    }
  });

  changesView.addEventListener("click", event => {
    if (!event.target.classList.contains("active")) {
      changesView.querySelector(".active").classList.remove("active");
      event.target.classList.add("active");
      videoList.classList.toggle("grid");
    }
  });

  addFavourites.addEventListener("click", event => {
    clearInputs(modalSave);
    if (URI !== "") {
      userQuery = {
        query: URI.searchParams.get("q").replace(/\+/g, " ")
      };

      if (userQuery.query.trim() !== "") {
        backdrop.classList.toggle("active");
        modalSave.querySelector('[name = "query"]').value = userQuery.query;
        modalSave.querySelector('[name = "name"]').value = "Укажите название";
        modalSave.classList.add("active");
      } else {
        showFloatWindow(
          `Пожалуйста, введите запрос.`,
          document.querySelector(".input-heart")
        );
      }
    } else {
      showFloatWindow(
        'Подвердите запрос, нажав "Найти". После чего вы сможете добавить его в раздел "Избранное".',
        document.querySelector(".input-heart")
      );
    }
  });

  backdrop.addEventListener("click", () => {
    modalSave.classList.remove("active");
    modalEdit.classList.remove("active");
    backdrop.classList.remove("active");
  });

  // Render save modal window

  modalSave.querySelector('[type = "range"]').addEventListener("input", () => {
    modalSave.querySelector(
      ".modal__range-container span"
    ).innerHTML = modalSave.querySelector('[type = "range"]').value;
  });

  modalSave
    .querySelector("#save__close-modal") // Closing save modal window
    .addEventListener("click", () => {
      modalSave.classList.remove("active");
      backdrop.classList.remove("active");
      return;
    });

  modalSave.addEventListener("submit", event => {
    event.preventDefault();

    const maxRes = modalSave.querySelector('[type = "range"]');
    const nameQuery = modalSave.querySelector('[name = "name"]');
    const sortQuery = modalSave.querySelector('[name = "sort"]');

    if (nameQuery.value !== "" && nameQuery.value !== "Укажите название") {
      userQuery.name = nameQuery.value;
      userQuery.maxResults = maxRes.value;
      userQuery.order = sortQuery.value;

      userQuerys.push(userQuery);
      sendFavouritesToLocalStorage();
      modalSave.classList.remove("active");
      backdrop.classList.remove("active");

      showFloatWindow(
        'Поиск сохранен в разделе "Избранное". <br><br> <p>Перейти в избранное</p>',
        document.querySelector(".input-heart")
      );
    } else {
      nameQuery.value = "";
      nameQuery.focus();
      showFloatWindow(
        `Пожалуйста, введите имя запроса`,
        document.querySelector(".input-heart")
      );
    }
  });

  // Render Edit modal window

  modalEdit
    .querySelector("#edit__close-modal")
    .addEventListener("click", () => {
      modalEdit.classList.remove("active");
      backdrop.classList.remove("active");
      return;
    });

  modalEdit.querySelector('[type = "range"]').addEventListener("input", () => {
    modalEdit.querySelector(
      ".modal__range-container span"
    ).innerHTML = modalEdit.querySelector('[type = "range"]').value;
  });

  modalEdit.addEventListener("submit", event => {
    event.preventDefault();

    const maxRes = modalEdit.querySelector('[type = "range"]');
    const nameQuery = modalEdit.querySelector('[name = "name"]');
    const queryQuery = modalEdit.querySelector('[name = "query"]');
    const sortQuery = modalEdit.querySelector('[name = "sort"]');

    if (nameQuery.value !== "" && nameQuery.value !== "Укажите название") {
      if (queryQuery.value !== "") {
        userQuerys[manipulateId].query = queryQuery.value;
      }
      userQuerys[manipulateId].name = nameQuery.value;
      userQuerys[manipulateId].maxResults = maxRes.value;
      userQuerys[manipulateId].order = sortQuery.value;

      document.getElementById(manipulateId).querySelector("p").textContent =
        nameQuery.value;

      modalEdit.classList.remove("active");
      backdrop.classList.remove("active");

      showFloatWindow(
        "Изменения применены!",
        document.getElementById(manipulateId)
      );
      sendFavouritesToLocalStorage();
    } else {
      nameQuery.value = "";
      nameQuery.focus();
      showFloatWindow(
        `Пожалуйста, введите имя запроса`,
        document.querySelector("#unlogin")
      );
    }
  });

  sendRequest();
}
// End function

// Function for rendering Faviourites list

function readingRequests() {
  if (localStorage[userName]) {
    const requests = JSON.parse(localStorage[userName]);
    id = requests.length;
    userQuerys = [...requests];
    document.querySelector(".fav__items").innerHTML = "";
    userQuerys.forEach((item, index) => {
      item.id = index;

      document.querySelector(".fav__items").insertAdjacentHTML(
        "afterbegin",
        `<li class="fav__item" id = "${index}">
          <p>${item.name}</p>
          <div class = "item__control">
              <span class = "item__change">Изменить</span>
              <span class = "item__delete">Удалить</span>
          </div>
      </li>`
      );

      document
        .querySelector(".fav__items")
        .querySelector("li")
        .addEventListener("click", event => {
          if (event.target.tagName === "LI") {
            const targetID = event.target.closest("li").id;

            document.querySelector(".nav__item").click();

            videoList.innerHTML = "";
            if (
              document
                .querySelector(".form--search-video")
                .getBoundingClientRect().y > 150
            ) {
              document.querySelector(".form--search-video").style.top =
                -150 + "px";
              document.querySelector(".page-title").style.top = -150 + "px";
              videoList.style.top = -150 + "px";
              document.querySelector(".filter-panel").style.top = -150 + "px";

              videoList.classList.add("loaded");
              document.querySelector(".filter-panel").classList.add("loaded");
            }

            youtube(
              userQuerys[targetID].query.replace(/ /g, "+"),
              userQuerys[targetID].maxResults,
              userQuerys[targetID].order === "none"
                ? "relevance"
                : userQuerys[targetID].order
            );
          }
        });

      document
        .querySelector(".fav__items")
        .querySelector(".item__change")
        .addEventListener("click", event => {
          document
            .querySelector(".modal--edit")
            .querySelector('[name = "query"]').disabled = false;
          manipulateId = event.target.closest("li").id;

          document
            .querySelector(".modal--edit")
            .querySelector('[type = "range"]').value =
            userQuerys[manipulateId].maxResults;
          document
            .querySelector(".modal--edit")
            .querySelector('[name = "name"]').value =
            userQuerys[manipulateId].name;
          document
            .querySelector(".modal--edit")
            .querySelector('[name = "query"]').value =
            userQuerys[manipulateId].query;
          document
            .querySelector(".modal--edit")
            .querySelector('[name = "sort"]').value =
            userQuerys[manipulateId].order;
          document
            .querySelector(".modal--edit")
            .querySelector("span").textContent =
            userQuerys[manipulateId].maxResults;

          document.querySelector(".modal--edit").classList.add("active");
          document.querySelector(".backdrop").classList.toggle("active");
        });

      document
        .querySelector(".fav__items")
        .querySelector(".item__delete")
        .addEventListener("click", event => {
          let deletedElem = event.target.closest("li").id;
          userQuerys.splice(deletedElem, 1);
          event.target.closest("li").remove();
          sendFavouritesToLocalStorage();
        });
    });
  }
}

// End function

// Function for show float window =)

function showFloatWindow(text, parentElement) {
  const navItems = document.querySelector(".nav__items");
  const heartElLeft = parentElement.getBoundingClientRect().x;
  const heartElTop = parentElement.getBoundingClientRect().y;
  const heartElScrolling = parentElement.scrollTop;
  if (windowIsShown === false) {
    windowIsShown = true;
    document.body.insertAdjacentHTML(
      "beforeend",
      `
    <div class = "float-window">
      ${text}
    </div>
  `
    );
    const timer = setTimeout(() => {
      document.querySelectorAll(".float-window").forEach(item => item.remove());
      windowIsShown = false;
    }, 4000);

    const floatWindow = document.querySelector(".float-window");
    floatWindow.style.top = heartElTop + 25 + heartElScrolling + "px";
    floatWindow.style.left = heartElLeft + "px";

    floatWindow.addEventListener(
      "click",
      event => {
        if (event.target.tagName === "P") {
          navItems.querySelector("li:last-of-type").click();
        }

        floatWindow.remove();
        clearTimeout(timer);
        windowIsShown = false;
      },
      false
    );
  } else {
    return;
  }
}
// End function

// Function for fill request that will send to YouTube

function sendRequest() {
  const searchForm = document.querySelector(".form--search-video");

  searchForm.addEventListener("submit", event => {
    event.preventDefault();
    videoList.innerHTML = "";

    let userInput = document.querySelector(".search-video__input");
    let filterPanel = document.querySelector(".filter-panel");

    if (userInput.value === "") {
      showFloatWindow(
        `Введите пожалуйста запрос.`,
        document.querySelector(".input-heart")
      );
      return;
    }

    userInput = userInput.value.replace(/ /g, "+");

    // Transition for search UI;
    if (searchForm.getBoundingClientRect().y > 150) {
      let j = 0;
      let i = 0;
      const trans = setInterval(() => {
        searchForm.style.top = -i + "px";
        document.querySelector(".page-title").style.top = -i + "px";
        videoList.style.top = -i + "px";
        filterPanel.style.top = -i + "px";
        if (searchForm.getBoundingClientRect().y <= 150) {
          clearInterval(trans);
          videoList.classList.add("loaded");
          filterPanel.classList.add("loaded");
        }
        j += 0.25;
        i = Math.pow(j, 2);
      }, 10);
      i = null;
      j = null;
    }
    // End transition

    youtube(userInput, 12, "date");
  });
}

// End function

// Function for sending request to YouTube and show answer

function youtube(keywords, maxResults, order) {
  let request = new XMLHttpRequest();

  let url = `https://www.googleapis.com/youtube/v3/search?part=snippet&order=${order}&key=AIzaSyBdAEGL07hs4xeWbnhQ8PJGbTuTwy-PkKk`;
  url = url + `&maxResults=${maxResults}&q=${keywords}`;
  URI = new URL(url);
  request.open("GET", url);
  request.responseType = "json";
  request.send();

  request.onload = function() {
    try {
      let responseYoutube = request.response.items;
      document.querySelector(
        ".filter-panel__queryName"
      ).innerHTML = `Видео по запросу "<b>${keywords.replace(/\+/, " ")}</b>"`;
      document.querySelector(
        ".filter-panel__querysAmount"
      ).textContent = `${request.response.pageInfo.totalResults}`;
      for (let item of responseYoutube) {
        videoList.insertAdjacentHTML(
          "beforeend",
          `
              <li class = "video__item">
                <a href = "https://www.youtube.com/watch?v=${item.id.videoId}">
                <img class = "video__image" src = https://i1.ytimg.com/vi/${item.id.videoId}/sddefault.jpg>
                <h3 class = "video__title">${item.snippet.title}</h3>
                <p class = "video__channel">${item.snippet.channelTitle}</p>
                </a>              
              </li>
            
          `
        );
      }
    } catch (err) {
      alert(err);
    }
  };
}

// End function

// Function for sending data on server 

function sendFavouritesToLocalStorage() {
  //Here can write request to server with method POST, but webpack-dev-server can't do it;

  localStorage[userName] = JSON.stringify(userQuerys);
  readingRequests();
}

// End function

authUser();
