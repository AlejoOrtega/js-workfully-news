document.addEventListener('DOMContentLoaded', ()=> {
    fetch('http://localhost:3000/articles/1')
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