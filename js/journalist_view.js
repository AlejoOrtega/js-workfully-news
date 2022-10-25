const { create } = require("json-server");

const url = "http://localhost:3000/articles";
const sideColumn = document.querySelector(".side-column__cards");
const mainColumn = document.querySelector(".main-column");
let edit = false;
let currentArticle = {};

const getData = async (url) => {
  const res = await fetch(url);
  const data = await res.json();
  return data;
};

/**
 * Function map the array and create a card for each item (article)
 * @param {*} arr
 */
async function createCard(arr) {
  const localArray = await arr;
  localArray.map((item) => {
    const cardItem = document.createElement("div");
    cardItem.classList.add("card-news");

    cardItem.onclick = function () {
      openArticle(item);
      edit = true;
      currentArticle = item;
    };

    const cardTitle = document.createElement("p");
    cardTitle.textContent = item.title;

    const cardAuthor = document.createElement("p");
    cardAuthor.textContent = item.author;

    cardItem.appendChild(cardTitle);
    cardItem.appendChild(cardAuthor);

    sideColumn.appendChild(cardItem);
  });
  
  newArticleButton();
}

function newArticleButton() {
  const cardItem = document.createElement("div");
  cardItem.classList.add("card-news");
  cardItem.innerText = 'New Article';
  cardItem.addEventListener('click',()=>{
    const mainColumn = document.querySelector(".main-column");
    mainColumn.innerHTML = "";

    const article = document.createElement("article");
    article.classList.add('article__new-article');

    const saveButton = document.createElement('button');
    saveButton.innerText = 'Save Article'

    saveButton.addEventListener('click', createArticle);

    const inputTitle = document.createElement('input');
    inputTitle.classList.add('article__new-inputs');
    inputTitle.placeholder = 'Title...'

    const inputDescription = document.createElement('input');
    inputDescription.classList.add('article__new-inputs');
    inputDescription.placeholder = 'Description...'

    const inputThumbnail = document.createElement('input');
    inputThumbnail.classList.add('article__new-inputs');
    inputThumbnail.placeholder = 'Thumbnail...'

    const inputContent = document.createElement('input');
    inputContent.classList.add('article__new-inputs');
    inputContent.placeholder = 'Content...'

    article.appendChild(saveButton);
    article.appendChild(inputTitle);
    article.appendChild(inputDescription);
    article.appendChild(inputThumbnail);
    article.appendChild(inputContent);
    mainColumn.appendChild(article);
  })
  sideColumn.appendChild(cardItem)
}

/**
 * Function gets the item that was clicked (card) and present on the big screen
 * @param {*} item
 */
const openArticle = (item) => {
  const mainColumn = document.querySelector(".main-column");
  mainColumn.innerHTML = "";

  const article = document.createElement("article");

  const btnDelete = document.createElement("button");
  btnDelete.classList.add("btn-delete");
  btnDelete.textContent = "Delete article";
  btnDelete.onclick = function () {
    deleteArticle(item);
  };

  const btnEdit = document.createElement("button");
  btnEdit.classList.add("btn-edit");
  btnEdit.textContent = "Save";
  btnEdit.onclick = function () {
    saveBtn();
  };

  const makeEditable = (tag, key) => {
    tag.setAttribute("contenteditable", "true");
    tag.addEventListener("input", (e) => {
      console.log("Content edited: ", e.currentTarget.textContent);
      currentArticle[key] = e.currentTarget.textContent;
      console.log(currentArticle);
    });
  };

  const title = document.createElement("h1");
  title.textContent = item.title;
  title.classList.add("title");
  makeEditable(title, "title");

  const description = document.createElement("h2");
  description.textContent = item.description;
  description.classList.add("description");
  makeEditable(description, "description");

  const author = document.createElement("h3");
  author.textContent = item.author;
  author.classList.add("author");
  makeEditable(author, "author");

  const thumbnail = document.createElement("img");
  thumbnail.src = item.thumbnail;

  const content = document.createElement("p");
  content.textContent = item.content;
  content.classList.add("content");
  makeEditable(content, "content");

  mainColumn.appendChild(btnDelete);
  mainColumn.appendChild(btnEdit);
  mainColumn.appendChild(article);
  article.appendChild(title);
  article.appendChild(description);
  article.appendChild(author);
  article.appendChild(thumbnail);
  article.appendChild(content);
};

function createArticle(newArticleData){

}

//This function will need to get the id from the article and change the main column into an editable input
async function saveBtn() {
  const editUrl = `${url}/${currentArticle.id}`;
  console.log(currentArticle);
  console.log(editUrl);
  await fetch(editUrl, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(currentArticle),
  }).then((res) => {
    if (!res.ok) {
      console.log("Failed to update");
    }
    mainColumn.textContent = "Article was update";
  });
}

//This function will need to receive the id from the article and delete the whole object from the db
function deleteArticle(item) {
  const id = item.id;
  console.log(id);
  /*  const deleteUrl = `${url}/${id}`;
  fetch(deleteUrl, {
    method: "DELETE",
  }).then((res) => {
    if (!res.ok) {
      console.log("Failed to delete");
    }
    mainColumn.textContent = "Article was deleted";
  }); */
}

createCard(getData(url));
window.onload = getData(url);
