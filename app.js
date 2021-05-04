/** @format */

//Place to store the array
let myLibrary = [];

let book1 = new Book("DOM Elements", "TOP", 99, true);
let book2 = new Book("Roll Tide", "Justin", 55, false);

manualAdd(book1);
manualAdd(book2);

function manualAdd(a) {
    newBook = a;
    if (myLibrary.some((book) => book.title === newBook.title)) return false;
    myLibrary.push(newBook);
}

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
function addBookToLibrary() {
    let title = document.querySelector("#title").value;
    let author = document.querySelector("#author").value;
    let pages = document.querySelector("#pages").value;
    let read;
    if (document.querySelector("#yes").checked) {
        read = "Finished Book";
    } else if (document.querySelector("#no").checked) {
        read = "Have not finished";
    }
    const book = new Book(title, author, pages, read); //Creates a new object inherited from Book
    myLibrary.push(book); //Adds new book to library
    document.getElementById("popup").remove();
    displayLibrary();
}

function displayLibrary() {
    //Clear Display
    const library = document.getElementById("book-collection");
    library.textContent = "";

    if (myLibrary.length < 1) {
        let div = document.createElement("div");
        let p = document.createElement("p");
        p.innerText = "You library is empty";
        library.appendChild(p);
    }
    // Create the stuff to be displayed
    else {
        myLibrary.forEach((element) => {
            //-- First Step Create elements
            let div = document.createElement("div");
            let title = document.createElement("h2");
            let author = document.createElement("p");
            let pages = document.createElement("p");
            let read = document.createElement("p");
            let btnDiv = document.createElement("div");
            let rm = document.createElement("button");
            let status = document.createElement("button");

            title.textContent = element.title;
            author.textContent = "Author: " + element.author;
            pages.textContent = element.pages + " pages";
            read.textContent = element.read ? "Finished" : "Not read yet";
            // //Data set for buttons and Event listeners
            rm.dataset.ID = myLibrary.indexOf(element);
            rm.innerText = "Delete from Library";
            status.innerText = "Finished Book";
            status.classList.add("status-btn");
            status.dataset.ID = myLibrary.indexOf(element);
            rm.addEventListener("click", removeBook);
            status.addEventListener("click", changeStatus);
            btnDiv.classList.add("btnDiv");
            btnDiv.appendChild(status);
            btnDiv.appendChild(rm);
            //--Append elements to div
            div.appendChild(title);
            div.appendChild(author);
            div.appendChild(pages);
            div.appendChild(read);
            div.appendChild(btnDiv);
            //--Styles
            title.classList.add("title");
            rm.classList.add("rmBtn-list");
            // element.read ?
            //     status.classList.add("watched") :
            //     status.classList.add("watch"); // If read it adds class "watched" if not it adds class "watch"
            // status.classList.add("status");
            div.classList.add("books");
            //-Append div to library
            library.appendChild(div);
        });
    }
    // Button for new book
    let addBook = document.createElement("button");
    library.appendChild(addBook);
    addBook.setAttribute("ID", "add-book");
    addBook.classList.add("add-button");
    addBook = document.getElementById("add-book").innerHTML = "+";
    addBook = document
        .getElementById("add-book")
        .addEventListener("click", function() {
            let popup = document.createElement("div");
            popup.id = "popup";
            document.getElementById("app-container").appendChild(popup);
            addForm();
        });
}

function addForm() {
    let formContainer = document.createElement("div");
    let form = document.createElement("form");
    form.setAttribute("action", "javascript:addBookToLibrary();");
    formContainer.classList.add("form-container");
    form.classList.add("form-box");
    form.id = "add-book";
    //Title Element
    let titleDiv = document.createElement("div");
    let titleLabel = document.createElement("label");
    let title = document.createElement("input");
    titleLabel.innerText = "Title";
    titleLabel.setAttribute("for", "title");
    title.id = "title";
    title.setAttribute("type", "text");
    title.setAttribute("name", "title");
    titleDiv.id = "title-form";
    titleDiv.appendChild(titleLabel);
    titleDiv.appendChild(title);
    //Author Element
    let authorDiv = document.createElement("div");
    let authorLabel = document.createElement("label");
    let authorInput = document.createElement("input");
    authorLabel.innerText = "Author";
    authorLabel.setAttribute("for", "author");
    authorInput.id = "author";
    authorInput.setAttribute("type", "text");
    authorInput.setAttribute("name", "author");
    authorDiv.appendChild(authorLabel);
    authorDiv.appendChild(authorInput);
    authorDiv.id = "author-form";
    //Pages Element
    let pagesDiv = document.createElement("div");
    let pagesLabel = document.createElement("label");
    let pagesInput = document.createElement("input");
    pagesLabel.innerText = "Pages";
    pagesLabel.setAttribute("for", "pages");
    pagesInput.id = "pages";
    pagesInput.setAttribute("type", "number");
    pagesInput.setAttribute("name", "pages");
    pagesInput.setAttribute("min", "0");
    pagesDiv.appendChild(pagesLabel);
    pagesDiv.appendChild(pagesInput);
    pagesDiv.id = "pages-form";
    // Read Element
    let radioDiv = document.createElement("div");
    let selectDiv = document.createElement("div");
    let readStatus = document.createElement("p");
    let readLabel = document.createElement("label");
    let readInput = document.createElement("input");
    let notReadLabel = document.createElement("label");
    let notReadInput = document.createElement("input");
    let readDiv = document.createElement("div");
    let notReadDiv = document.createElement("div");
    readStatus.innerText = "Finished the Book?";
    readStatus.classList.add("form-text");
    readLabel.innerText = "Yes";
    readInput.type = "radio";
    readInput.setAttribute("name", "read");
    readInput.setAttribute("value", "yes");
    readInput.id = "yes";
    readLabel.setAttribute("for", "yes");
    notReadInput.type = "radio";
    notReadLabel.innerText = "No";
    notReadInput.setAttribute("name", "read");
    notReadInput.setAttribute("value", false);
    notReadInput.id = "no";
    notReadLabel.setAttribute("for", "no");
    selectDiv.classList.add("radio-container");
    radioDiv.appendChild(readStatus);
    readDiv.appendChild(readLabel);
    readDiv.appendChild(readInput);
    notReadDiv.appendChild(notReadLabel);
    notReadDiv.appendChild(notReadInput);
    selectDiv.appendChild(readDiv);
    selectDiv.appendChild(notReadDiv);
    radioDiv.appendChild(selectDiv);
    selectDiv.id = "read-form";
    //Button Element
    let submitBtn = document.createElement("button");
    submitBtn.classList.add("form-btn");
    submitBtn.innerText = "Add book to library";
    //Removed Element
    let rmBtn = document.createElement("button");
    rmBtn.classList.add("form-rmBtn");
    rmBtn.innerText = "Exit";
    rmBtn.setAttribute("type", "button");
    rmBtn.addEventListener("click", () =>
        document.getElementById("popup").remove()
    );
    //Remove form if pressed
    //Add Elements to Form
    form.appendChild(titleDiv);
    form.appendChild(authorDiv);
    form.appendChild(pagesDiv);
    form.appendChild(radioDiv);
    form.appendChild(submitBtn);
    form.appendChild(rmBtn);

    //event listeners
    titleDiv.addEventListener("click", () => {
        title.focus();
    });
    authorDiv.addEventListener("click", () => {
        authorInput.focus();
    });
    pagesDiv.addEventListener("click", () => {
        pagesInput.focus();
    });

    formContainer.appendChild(form);
    document.getElementById("popup").appendChild(formContainer);
}

function removeBook(element) {
    //Remove book from library
    myLibrary.splice(element.target.dataset.ID, 1); //Gets the element ID and removes it from myLibrary
    displayLibrary(); //Refresh the library display
    // writeUserData(); //Write data to firebase, if logged in
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
    displayLibrary(); //Refresh the library display
    writeUserData(); //Write data to firebase, if logged in
}

displayLibrary();
console.log(myLibrary);