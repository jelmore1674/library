/** @format */

//Place to store the array
let myLibrary = [];

//Constructor for the books
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function() {
        console.log(
            `Title: "${title}", Author: "${author}", Pages Read: ${pages}, Finshed the book: ${read}`
        );
    };
}

//Function to add books to the library
function addBookToLibrary(a) {
    newBook = a;
    if (myLibrary.some((book) => book.title === newBook.title)) return false;
    myLibrary.push(newBook);
}

let book1 = new Book("DOM Elements", "TOP", 99, true);
let book2 = new Book("Roll Tide", "Justin", 55, false);

addBookToLibrary(book1);
addBookToLibrary(book2);

function displayLibrary() {
    //Clear Display
    const library = document.getElementById("book-collection");
    library.textContent = "";
    // Create the stuff to be displayed
    myLibrary.forEach((element) => {
        //-- First Step Create elements
        let div = document.createElement("div");
        let title = document.createElement("h2");
        let author = document.createElement("p");
        let pages = document.createElement("p");
        let read = document.createElement("p");
        // let remove = document.createElement("button");
        // let status = document.createElement("button");

        title.textContent = element.title;
        author.textContent = "Author:" + element.author;
        pages.textContent = element.pages + " pages";
        read.textContent = element.read; //? "Read" : "Not read yet";
        // //Data set for buttons and Event listeners
        // remove.dataset.ID = myLibrary.indexOf(element);
        // status.dataset.ID = myLibrary.indexOf(element);
        // remove.addEventListener("click", removeBook);
        // status.addEventListener("click", changeStatus);
        //--Append elements to div
        div.appendChild(title);
        div.appendChild(author);
        div.appendChild(pages);
        div.appendChild(read);
        // div.appendChild(remove);
        // div.appendChild(status);
        //--Styles
        title.classList.add("title");
        // remove.classList.add("remove");
        // element.read ?
        //     status.classList.add("watched") :
        //     status.classList.add("watch"); // If read it adds class "watched" if not it adds class "watch"
        // status.classList.add("status");
        div.classList.add("books");
        //-Append div to library
        library.appendChild(div);
    });
    // Button for new book
    let addBook = document.createElement("button");
    library.appendChild(addBook);
    addBook.setAttribute("ID", "add-book");
    addBook.classList.add("add-button");
    addBook = document.getElementById("add-book").innerHTML = "+";
}

function addForm() {
    let popUp = document.getElementById("app-container");
    let formContainer = document.createElement("div");
    let titleDiv = document.createElement("div");
    let form = document.createElement("form");
    let titleLabel = document.createElement("label");
    let title = document.createElement("input");
    let authorDiv = document.createElement("div");
    let authorLabel = document.createElement("label");
    let authorInput = document.createElement("input");
    let pagesDiv = document.createElement("div");
    let pagesLabel = document.createElement("label");
    let pagesInput = document.createElement("input");
    let readDiv = document.createElement("div");
    let readStatus = document.createElement("p");
    let readLabel = document.createElement("label");
    let readInput = document.createElement("input");
    let notReadLabel = document.createElement("label");
    let notReadInput = document.createElement("input");
    let radioDiv = document.createElement("div");
    let submitBtn = document.createElement("button");
    formContainer.classList.add("form-container");
    form.classList.add("form-box");
    titleLabel.innerText = "Title";
    titleDiv.id = "title-form";
    titleDiv.appendChild(titleLabel);
    titleDiv.appendChild(title);
    form.appendChild(titleDiv);
    authorLabel.innerText = "Author";
    authorDiv.appendChild(authorLabel);
    authorDiv.appendChild(authorInput);
    authorDiv.id = "author-form";
    form.appendChild(authorDiv);
    pagesLabel.innerText = "Pages";
    pagesDiv.appendChild(pagesLabel);
    pagesDiv.appendChild(pagesInput);
    pagesDiv.id = "pages-form";
    form.appendChild(pagesDiv);
    readStatus.innerText = "Finished the Book?";
    readLabel.innerText = "Yes";
    readInput.type = "radio";
    readInput.setAttribute("name", "read");
    readInput.setAttribute("value", true);
    readInput.setAttribute("id:", "yes");
    readLabel.setAttribute("for", "yes");
    notReadInput.type = "radio";
    notReadLabel.innerText = "No";
    notReadInput.setAttribute("name", "read");
    notReadInput.setAttribute("value", false);
    notReadInput.setAttribute("id:", "no");
    notReadLabel.setAttribute("for", "no");
    radioDiv.classList.add("radio-container");
    readDiv.appendChild(readStatus);
    radioDiv.appendChild(readLabel);
    radioDiv.appendChild(readInput);
    radioDiv.appendChild(notReadLabel);
    radioDiv.appendChild(notReadInput);
    readDiv.appendChild(radioDiv);
    readDiv.id = "read-form";
    submitBtn.classList.add("form-btn");
    submitBtn.innerText = "Add book to library";
    form.appendChild(readDiv);
    form.appendChild(submitBtn);
    formContainer.appendChild(form);
    popUp.appendChild(formContainer);
}

function removeBook(element) {
    //Remove book from library
    myLibrary.splice(element.target.dataset.ID, 1); //Gets the element ID and removes it from myLibrary
    updateLibrary(); //Refresh the library display
    writeUserData(); //Write data to firebase, if logged in
}

function changeStatus(element) {
    //Change from read or not read
    if (myLibrary[element.target.dataset.ID].read) {
        //If the book is "read" pressing the button change it to "not read"
        myLibrary[element.target.dataset.ID].read = false;
    } else if (!myLibrary[element.target.dataset.ID].read) {
        //If the book is "not read" pressing the button change it to "read"
        myLibrary[element.target.dataset.ID].read = true;
    }
    updateLibrary(); //Refresh the library display
    writeUserData(); //Write data to firebase, if logged in
}

displayLibrary();
addForm();
console.log(myLibrary);