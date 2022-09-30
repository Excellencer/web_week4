import "./styles.css";

/* From course video JavaScript 1 */
if (document.readyState !== "loading") {
  initializeCode();
} else {
  document.addEventListener("DOMContentLoaded", function () {
    initializeCode();
  });
}

function initializeCode() {
  const body = document.getElementById("dBody");
  const form = document.getElementById("form");

  //The form logic partially taken from https://www.javascripttutorial.net/javascript-dom/javascript-form/
  form.addEventListener("submit", function (event) {
    // stop form submission
    event.preventDefault();
    let search = document.getElementById("input-show").value;
    console.log(search);
    let fetchURL = "https://api.tvmaze.com/search/shows?q=";
    let searchQuery = fetchURL.concat(search);
    // fetch code from https://developer.mozilla.org/en-US/docs/Web/API/Response/json
    fetch(searchQuery)
      .then((response) => response.json())
      .then((data) => {
        let shows = data;
        console.log(shows);

        console.log(shows[0].show?.image?.medium);

        for (let x = 0; x < Object.keys(shows).length; x++) {
          let show_data = document.createElement("div");
          let show_img = document.createElement("img");
          let show_info = document.createElement("div");
          let show_title = document.createElement("h1");
          let show_summary = document.createElement("p");
          let img_URL = "";
          if (shows[x].show?.image?.medium != null) {
            img_URL = data[x].show.image.medium;
          }

          show_data.setAttribute("class", "show-data");
          show_img.setAttribute("src", img_URL);
          show_info.setAttribute("class", "show-info");
          show_title.innerText = shows[x].show?.name;
          show_summary.innerHTML = shows[x].show?.summary;

          show_info.appendChild(show_title);
          show_info.appendChild(show_summary);
          show_data.appendChild(show_img);
          show_data.appendChild(show_info);
          body.appendChild(show_data);
        }
      });
  });
}
