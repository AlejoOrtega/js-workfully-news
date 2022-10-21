const url = "http://localhost:3000/articles";
const cardNews = document.querySelectorAll(".card-news");
const sideColumn = document.querySelector(".side-column__cards");

//This function will map the array and create a card to each element
function createCard() {
  fetch(url).then((response) => {
    response.json().then((data) => {
      const listCard = data
        .map(
          (article) =>
            `<div class="card-news" onclick="openArticle()">
                    <p class="card-title">Title</p>
                    <p class="card-author">Author</p>
                </div>`
        )
        .join("");

      sideColumn.innerHTML = listCard;
    });
  });
}

//This function will need to get the id from the article and show on the main column
function openArticle() {
  cardNews.forEach((card) => {
    card.onclick = function (e) {
      e.preventDefault();
      card.classList.add("selected");
      console.log("clicked");
    };
  });
}

//This function will need to get the id from the article and change the main column into an editable input
function editArticle() {}

//This function will need to receive the id from the article and delete the whole object from the db
function delteArticle() {}

window.onload = openArticle();
window.onload = createCard();
