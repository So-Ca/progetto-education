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

export {setFont, clearBookList, clearDescription, createErrMex}