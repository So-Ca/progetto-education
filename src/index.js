document.getElementById("search-bar").addEventListener("keydown", function(e){
  if(e.key === "Enter") {
    searchBooks();
  }
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

function setFont(element, subjects) {
  if (subjects && subjects.includes("Horror")) {
    element.style.fontFamily = "Bloodthirsty";
  }
  if (subjects && subjects.includes("fantasy")) {
    element.style.fontFamily = "Alamak";
  }
  if (subjects && (subjects.includes("crime") || subjects.includes("Giallo"))) {
    element.style.fontFamily = "Label";
  }
  if (subjects && (subjects.includes("Fantascienza") || subjects.includes("Scienza"))) {
    element.style.fontFamily = "Squid";
  }
  if (subjects && (subjects.includes("Art") || subjects.includes("Arte"))) {
    element.style.fontFamily = "Riesling";
  }
  if (subjects && (subjects.includes("Novel") || subjects.includes("Romanzo"))) {
    element.style.fontFamily = "Road";
  }
}

function clearBookList() {
  const bookList = document.getElementById("booklist");
  while (bookList.firstChild) {
    bookList.removeChild(bookList.firstChild);
  }
}

function clearDescription() {
  const description = document.getElementById("book-description");
  while (description.firstChild) {
    description.removeChild(description.firstChild);
  }
}

function createErrMex(parent) {
  const p = document.createElement("p");
  const err = document.createElement("div");
  const searchBar = document.getElementById("search-bar").value;
  p.innerHTML = `No result found for: "${searchBar}". <br>  
    Insert a valid book title or valid category. <br>
    Make sure you didn't use capital letters. <br>`;
  p.style.color = "rgb(128, 14, 14)";
  err.style.border = "3px solid red";
  err.style.borderRadius = "50px";
  err.style.backgroundColor = "rgb(252, 239, 239)";
  parent.appendChild(err);
  err.appendChild(p);
}