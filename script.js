const container = document.querySelector('.book-container')

const dropdown = document.querySelector('select')
const cardTitle = document.querySelector('.title')
const cardAuthor = document.querySelector('.author')
const cardPages = document.querySelector('.pages')
const cardRead = document.querySelector('.read')
const newBook = document.querySelector('.new-book')
newBook.addEventListener("click", createForm)

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

function newCreateForm(count){
    const newEntry = document.createElement('form')
    newEntry.className = 'new-entry-forms'
    container.appendChild(newEntry)
    while(count > 0){
        const titleText = document.createElement('p')
        titleText.className = 'new-input'
        newEntry.appendChild(titleText)
        const titleForm = document.createElement('input')
        titleForm.className = 'new-input'
        titleForm.id = 'input-field'
        newEntry.appendChild(titleForm)
        count--
    }
}

function createForm(){
        const newEntry = document.createElement('form')
        newEntry.className = 'new-entry-forms'
        container.appendChild(newEntry)
        const titleText = document.createElement('p')
        titleText.className = 'new-input'
        titleText.innerText = 'Title:'
        newEntry.appendChild(titleText)
        const titleForm = document.createElement('input')
        titleForm.className = 'new-input'
        titleForm.id = 'input-field'
        newEntry.appendChild(titleForm)
        const authorText = document.createElement('p')
        authorText.className = 'new-input'
        authorText.innerText = 'Author:'
        newEntry.appendChild(authorText)
        const authorForm = document.createElement('input')
        authorForm.id = 'input-field'
        authorForm.className = 'new-input'
        newEntry.appendChild(authorForm)
        const pagesText = document.createElement('p')
        pagesText.className = 'new-input'
        pagesText.innerText = 'Page Count:'
        newEntry.appendChild(pagesText)
        const pagesForm = document.createElement('input')
        pagesForm.id = 'input-field'
        pagesForm.setAttribute('type', 'number')
        pagesForm.setAttribute('max', '5000')
        pagesForm.className = 'new-input'
        newEntry.appendChild(pagesForm)
        const readLabel = document.createElement('label')
        readLabel.setAttribute('for', 'read')
        newEntry.appendChild(readLabel)
        readLabel.className = 'new-input'
        readLabel.innerText = 'Read'
        const readRadio = document.createElement('input')
        readRadio.setAttribute("type", "radio")
        readRadio.setAttribute("name", "read-status")
        readRadio.className = 'new-input'
        readRadio.setAttribute("value", "read")
        newEntry.appendChild(readRadio)
        const unreadLabel = document.createElement('label')
        unreadLabel.setAttribute('for', 'unread')
        newEntry.appendChild(unreadLabel)
        unreadLabel.className = 'new-input'
        unreadLabel.innerText = 'Unread'
        const unreadRadio = document.createElement('input')
        unreadRadio.setAttribute("type", "radio")
        unreadRadio.setAttribute("name", "read-status")
        unreadRadio.className = 'new-input'
        unreadRadio.setAttribute("value", "unread")
        newEntry.appendChild(unreadRadio)
        const submitButton = document.createElement('button')
        submitButton.innerText = "Submit"
        newEntry.appendChild(submitButton)
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

addBookToLibrary('The Best Hammy', 'Amanda Luniewicz', 1000, 'unread')
addBookToLibrary('The Best Pupper', 'Christian Weiskopf', 100, 'read')
