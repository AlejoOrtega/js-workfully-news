const url = "http://localhost:3000/articles";
const cardNews = document.querySelectorAll(".card-news");
const sideColumn = document.querySelector(".side-column__cards");

const getData = async (url) => {
  const res = await fetch(url);
  const data = await res.json();
  return data;
};

//This function will map the array and create a card to each element
async function createCard(arr) {
  const localArray = await arr;
  localArray.map((item, index) => {
    const cardItem = document.createElement("div");
    cardItem.classList.add("card-news");

    cardItem.onclick = function () {
      openArticle(item);
    };

    const cardTitle = document.createElement("p");
    cardTitle.textContent = item.title;

    const cardAuthor = document.createElement("p");
    cardAuthor.textContent = item.author;

    cardItem.appendChild(cardTitle);
    cardItem.appendChild(cardAuthor);

    sideColumn.appendChild(cardItem);
  });
}

//This function will need to get the id from the article and show on the main column
const openArticle = (item) => {
  const mainColumn = document.querySelector(".main-column");
  mainColumn.innerHTML = "";

  const article = document.createElement("article");

  const title = document.createElement("h1");
  title.textContent = item.title;
  title.classList.add("title");

  const description = document.createElement("h2");
  description.textContent = item.description;
  description.classList.add("description");

  const author = document.createElement("h3");
  author.textContent = item.author;
  author.classList.add("author");

  const thumbnail = document.createElement("img");
  thumbnail.src = item.thumbnail;

  const content = document.createElement("p");
  content.textContent = item.content;
  content.classList.add("content");

  mainColumn.appendChild(article);
  article.appendChild(title);
  article.appendChild(description);
  article.appendChild(author);
  article.appendChild(thumbnail);
  article.appendChild(content);
};

//This function will need to get the id from the article and change the main column into an editable input
function editArticle() {}

//This function will need to receive the id from the article and delete the whole object from the db
function deleteArticle() {}

createCard(getData(url));
window.onload = getData(url);
