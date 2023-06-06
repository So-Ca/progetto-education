import {setFont, clearBookList, clearDescription, createErrMex} from "./utils.js";
import "../style/general.css";
import "../style/font.css";
import "../style/queries.css";

document.getElementById("search-bar").addEventListener("keydown", function(e){
  if(e.key === "Enter") {
    searchBooks();
  }
});
document.getElementById("search").addEventListener("click", function(){
    searchBooks();
});

function searchBooks(){
  const searchBar = document.getElementById("search-bar").value;
  const url = `https://openlibrary.org/subjects/${searchBar}.json`;
  const bookList = document.getElementById("booklist");

  if (!searchBar) {
    clearBookList();
    clearDescription();
    return;
  }

  fetch(url)
  .then(response => {
    if (!response.ok) {
      throw new Error("Network not response");
    }
    return response.json();
  })
  .then(data => {
    clearBookList();
    clearDescription();
    data.works.forEach(work => {
      const li = document.createElement("li");
      const btn = document.createElement("button");
      const title = document.createTextNode(work.title);
      const authors = document.createTextNode(
        ` - ${work.authors.map(author => author.name).join(" , ")}`
      );
      btn.classList.add("desc-btn");
      btn.innerText = "Description";
      li.appendChild(title);
      li.appendChild(authors);
      li.appendChild(btn);
      li.addEventListener("click", () => {
        bookDescription(work.key);
      });
      bookList.appendChild(li);
    });

    if (data.works.length === 0) {
      createErrMex(bookList, searchBar);
    }
  })
  .catch(error => {
    console.error("Error: ", error);
    clearBookList();
    clearDescription();
    createErrMex(bookList, error.message);
  });
}

function bookDescription(key) {
  const url = `https://openlibrary.org${key}.json`;

  fetch(url)
  .then( response => {
    if(!response.ok){
      throw new Error("Network not response");
    } return response.json()
  })
  .then(data => {
    const description = document.getElementById("book-description");

    while(description.firstChild) {
      description.removeChild(description.firstChild)
    }

    const p = document.createElement("p");
    const h2 = document.createElement("h2");
    h2.innerHTML = `${data.title} <br> Summary:`;
    h2.style.textShadow = "-1px 0 #FE8816, 0 1px #ffffff, 1px 0 #ffffff, 0 -1px #FE8816";
    setFont(h2, data.subjects);
    description.appendChild(h2);
    
    if(data.description && data.description.value) {
      p.textContent = JSON.stringify(data.description.value) || "No description available.";
    } else {
      p.textContent = JSON.stringify(data.description) || "No description available.";
    }

    description.appendChild(p);
  })
}