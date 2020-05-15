let myLibrary = [];
const infoContainer = document.getElementById("info-container");

function deleteById(id) {
    myLibrary.splice(id, 1);
    loopAndDisplayBooks();
}

function Book(bookTitle, bookAuthor, bookLength, bookIsRead) {
    this.bookTitle = bookTitle;
    this.bookAuthor = bookAuthor;
    this.bookLength = bookLength;
    this.bookIsRead = bookIsRead;
}
function addBook() {
    const userInputTitle = document.getElementById("book-title");
    const userInputAuthor = document.getElementById("book-author");
    const userInputLength = document.getElementById("book-length");
    const userInputRead = document.getElementById("book-read");

    /*let testBooks = new Book(one, two, three, four); //take this out after testing completed
    myLibrary.push(testBooks);*/

    let addBook = new Book(userInputTitle.value, userInputAuthor.value, userInputLength.value, userInputRead.checked);
    myLibrary.push(addBook);
    userInputTitle.value = "";
    userInputAuthor .value = "";
    userInputLength.value = "";
    userInputRead.checked = false;
    loopAndDisplayBooks();
}
function render(htmlTemplate, elementId) {
    if (!elementId) return;
    elementId.innerHTML = htmlTemplate;
}
function loopAndDisplayBooks() {
    const bookDisplayDiv = document.getElementById("table-body");
    bookDisplayDiv.innerHTML = "";
    for (i = 0; i < myLibrary.length; i++) {
        let tr = document.createElement("tr");
        tr.id = `${i}`
        bookDisplayDiv.appendChild(tr);
            for(j = 0; j < 5; j++) {
                if(j == 0) {
                    td = document.createElement("td");
                    tr.appendChild(td);
                    let template = `${myLibrary[i].bookTitle}`;
                    render(template, td);
                } else if(j == 1) {
                    td = document.createElement("td");
                    tr.appendChild(td);
                    let template = `${myLibrary[i].bookAuthor}`;
                    render(template, td);
                } else if(j == 2) {
                    td = document.createElement("td");
                    tr.appendChild(td);
                    let template = `${myLibrary[i].bookLength}`
                    render(template, td);
                } else if(j == 3) {
                    td = document.createElement("td");
                    td.id = `${i}`;
                    tr.appendChild(td);
                    if(myLibrary[i].bookIsRead == true) {
                        td.className = "yes";
                        trueOrFalse = "Yes";
                    } else {
                        td.className = "no";
                        trueOrFalse = "No";
                    }
                    let template = `${trueOrFalse}`
                    render(template, td);
                } else if(j == 4) {
                    td = document.createElement("td");
                    td.id = `${i}`;
                    td.className = "delete-button";
                    tr.appendChild(td);
                    let template = `X`;
                    render(template, td);
                }
            }       
    }
    [...document.querySelectorAll('.yes')].forEach(function(trueFalseValue) {
        trueFalseValue.addEventListener('click', function() {
            let indexToToggle = trueFalseValue.id;
            myLibrary[indexToToggle].toggleRead();
        });
    });
    [...document.querySelectorAll('.no')].forEach(function(trueFalseValue) {
        trueFalseValue.addEventListener('click', function() {
            let indexToToggle = trueFalseValue.id;
            myLibrary[indexToToggle].toggleRead();
        });
    });
    [...document.querySelectorAll('.delete-button')].forEach(function(button) {
        button.addEventListener('click', function() {
            deleteById(button.id);
        });
    });
}


/*function addFiveTestBooks() {                               
    let i = 0;
    let trueFalse;
    while (i < 30) {               // function to add five unique books to array while testing
        if (i % 2 == 0) {
            trueFalse = true;
        } else {
            trueFalse = false;
        }
        addBook(`Title ${i}`, `Author ${i}`, `Length ${i}00`, trueFalse);
        i++;
    }
}
addFiveTestBooks();*/

Book.prototype.toggleRead = function() {
    this.bookIsRead = !this.bookIsRead;
    loopAndDisplayBooks();
}
Book.prototype.info = function() {
    return `Title: ${this.bookTitle}\nAuthor: ${this.bookAuthor}\nLength: ${this.bookLength}\nRead: ${this.bookIsRead}`;
}
