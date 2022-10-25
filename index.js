const url = "http://localhost:3000/articles";
const articlesContainer = document.querySelector(".articles__container");

const getData = async (url) => {
  const res = await fetch(url);
  const data = await res.json();
  return data;
};

const renderItems = async (arr) => {
  const localArray = await arr;
  localArray.map((item, index) => {
    const cardItem = ` <a href="../../html/article${Number(item.id) + 1}.html">
    ${index === 0 ? "" : '<hr class="inner-separator" />'}
    <div class="article__preview">
      <img src=${item.thumbnail} alt="" />
      <div class="article__preview--text">
        <h1>${item.title}</h1>
        <p>
        ${item.description}
        </p>
      </div>
    </div></a
  >`;
    articlesContainer.innerHTML += cardItem;
  });
};

renderItems(getData(url));
window.document.onload = getData(url);
