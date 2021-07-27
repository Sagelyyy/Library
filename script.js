const container = document.querySelector('.book-container')

const dropdown = document.querySelector('select')
const cardTitle = document.querySelector('.title')
const cardAuthor = document.querySelector('.author')
const cardPages = document.querySelector('.pages')
const cardRead = document.querySelector('.read')
const newBook = document.querySelector('.new-book')
newBook.addEventListener('click', createForm())

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

function createForm(){
        const titleForm = document.createElement('form')
        titleForm.className = 'title-form'
        container.appendChild(titleForm)
        const authorForm = document.createElement('form')
        authorForm.className = 'author-form'
        container.appendChild(authorForm)
        const pagesForm = document.createElement('form')
        pagesForm.className = 'pages-form'
        container.appendChild(pagesForm)
        const readForm = document.createElement('form')
        readForm.className = 'read-form'
        container.appendChild(readForm)
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
    const eListener = dropdown.addEventListener('change', function(e){
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
    let ddList = document.getElementsByClassName('book-entry')
    while (ddList.length > 0){
        ddList[0].parentNode.removeChild(ddList[0])
    }
}
