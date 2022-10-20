document.addEventListener('DOMContentLoaded', ()=> {
    // id stores the parameter sent by URL to know which article to fetch
    const id = window.location.search.substring(1).split('=')[1];

    // fetch the article selected and set the information within the html.
    fetch(`http://localhost:3000/articles/${id}`)
    .then(rawData => rawData.json())
    .then(information => {
        document.getElementById('title').innerText = information.title;
        document.getElementById('description').innerText = information.description;
        document.getElementById('content').innerText = information.content;
        document.getElementById('author').innerText = information.author;
        document.getElementById('description').innerText = information.description;
        document.getElementById('thumbnail').src = information.thumbnail;
    })
})