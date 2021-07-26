const dropdown = document.querySelector('select')

const cardTitle = document.querySelector('.title')
const cardAuthor = document.querySelector('.author')
const cardPages = document.querySelector('.pages')
const cardRead = document.querySelector('.read')

selectBook()
let myLibrary = [];

function Book(title, author, pages, read){
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
}

Book.prototype.info = function(){
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`
}

function addBookToLibrary(title, author, pages, read){
    let book = new Book(title, author, pages, read)
    myLibrary.push(book)
    addBooksToList()
}

function addBooksToList(){
    clearList()
    for (i = 0; i < myLibrary.length; i++){
        let newOption = document.createElement('option');
        newOption.className = 'book-entry'
        newOption.value = myLibrary[i].title.toLowerCase()
        newOption.innerText = myLibrary[i].title
        dropdown.appendChild(newOption)
    }
}


function selectBook(){
    eListener = dropdown.addEventListener('change', function(e){
        for(i = 0; i < myLibrary.length; i++){
            if(myLibrary[i].title.toLowerCase() == e.target.value){
                cardTitle.textContent = e.target.value
                cardAuthor.textContent = `Author: ${myLibrary[i].author}`
                cardPages.textContent = `Total Pages: ${parseInt(myLibrary[i].pages)}`
                cardRead.textContent = `Book Status: ${myLibrary[i].read}`
            }
        }
     });
}

function clearList(){
    ddList = document.getElementsByClassName('book-entry')
    if(ddList.length > 0){
        for (i = 0; i < ddList.length; i++){
            dropdown.removeChild(ddList[i])
        }
    }
}

addBookToLibrary('The Best puppy', 'Amanda Weiskopf', 50000, 'unread')
addBookToLibrary('The Best kitty', 'Chris Weiskopf', 100, 'read')