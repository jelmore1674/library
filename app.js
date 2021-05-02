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
console.log(myLibrary);