let index = 0;
let myLibrary = [];

// book constructor
function Book(title, author, pages, status = false) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.status = status;
}

// add book to lib
function addBookToLibrary() {
  let addTitle = document.getElementById("new-title").value;
  let addAuthor = document.getElementById("new-author").value;
  let addPages = document.getElementById("new-pages").value;
  let radios = document.getElementsByName("new-read");

  radios.forEach(function (radio) {
    if (radio.checked) addStatus = radio.value;
  });

  let newBook = new Book(addTitle, addAuthor, addPages, addStatus);
  myLibrary.push(newBook);
  saveLocalAndRender();
}

// render boolks on lib table
function render(books) {

  let table = document.getElementById("lib-table");

  while (index < books.length) {
    let row = table.insertRow();

    let indexColumn = document.createElement("th");
    indexColumn.setAttribute("scope", "row");
    indexColumn.innerHTML = index + 1;
    row.appendChild(indexColumn);

    let titleColumn = row.insertCell(1);
    titleColumn.innerHTML = books[index].title;

    let authorColumn = row.insertCell(2);
    authorColumn.innerHTML = books[index].author;

    let pagesColumn = row.insertCell(3);
    pagesColumn.innerHTML = books[index].pages;

    // status btn
    let btnColumn = row.insertCell(4);
    if (books[index].status === false) {
      createStatusBtn(btnColumn, "btn btn-outline-info", "reading", true);
    } else {
      createStatusBtn(btnColumn, "btn btn-outline-success", "finished", false);
    }

    // remove btn
    let removeColumn = row.insertCell(5);
    let removeBtn = document.createElement("button");
    removeColumn.appendChild(removeBtn);
    removeBtn.setAttribute("class", "btn btn-outline-danger");
    removeBtn.setAttribute("id", `${index}`);
    removeBtn.innerHTML = "remove";
    row.appendChild(removeColumn);

    removeBtn.addEventListener("click", function () {
      myLibrary.splice(this.id, 1);
      let tableRows = table.getElementsByTagName('tr');
      while (index > 0) {
        table.removeChild(tableRows[index - 1]);
        index--;
      };
      saveLocalAndRender();
    });
    
    index++;

    function createStatusBtn(btnColumn, btnClass, btnText, btnStatus) {
      let statusBtn = document.createElement("button");
      btnColumn.appendChild(statusBtn);
      statusBtn.setAttribute("class", btnClass);
      statusBtn.setAttribute("id", `${index}`);
      statusBtn.innerHTML = btnText;

      statusBtn.addEventListener("click", function () {
        books[this.id].status = btnStatus;
        let tableRows = table.getElementsByTagName('tr');
        while (index > 0) {
          table.removeChild(tableRows[index - 1]);
          index--;
        };
        saveLocalAndRender();
      });
    }

  }
}

// save to local storage and render lib
function saveLocalAndRender() {
  localStorage.setItem("myLib", JSON.stringify(myLibrary));
  render(myLibrary);
}

// populateBooks
function populateBooks() {
  myLibrary.push(new Book("book01", "author01", 11, true));
  myLibrary.push(new Book("book02", "author02", 22, false));
  myLibrary.push(new Book("book03", "author03", 33, true));
}

// store lib in localstorage
if (localStorage.getItem("myLib") === null) {
  populateBooks();
  localStorage.setItem("myLib", JSON.stringify(myLibrary));
} else {
  myLibrary = JSON.parse(localStorage.getItem("myLib"));
}

// render books
render(myLibrary);
