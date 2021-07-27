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

function createForm(){
    count = 3
    const newEntry = document.createElement('form')
    newEntry.className = 'new-entry-forms'
    container.appendChild(newEntry)
    while(count > 0){
        const titleText = document.createElement('p')
        titleText.className = 'p-input'
        newEntry.appendChild(titleText)
        const titleForm = document.createElement('input')
        titleForm.className = 'new-input'
        titleForm.id = 'input-field'
        newEntry.appendChild(titleForm)
        if (count == 1){
            const readLabel = document.createElement('label')
            readLabel.setAttribute('for', 'read')
            newEntry.appendChild(readLabel)
            readLabel.className = 'new-input'
            readLabel.innerText = 'Read'
            const unreadRadio = document.createElement('input')
            unreadRadio.setAttribute("type", "radio")
            unreadRadio.setAttribute("name", "read-status")
            unreadRadio.setAttribute("value", "read")
            unreadRadio.className = 'read-status'
            newEntry.appendChild(unreadRadio)
        }
        if (count == 1){
            const unreadLabel = document.createElement('label')
            unreadLabel.setAttribute('for', 'unread')
            newEntry.appendChild(unreadLabel)
            unreadLabel.className = 'new-input'
            unreadLabel.innerText = 'Unread'
            const unreadRadio = document.createElement('input')
            unreadRadio.setAttribute("type", "radio")
            unreadRadio.setAttribute("name", "read-status")
            unreadRadio.setAttribute("value", "unread")
            unreadRadio.className = 'read-status'
            newEntry.appendChild(unreadRadio)
            const submitButton = document.createElement('button')
            submitButton.innerText = "Submit"
            newEntry.appendChild(submitButton)
        }
        count--
    }
    formSetup('.p-input')
}

function formSetup(form){
    let formEntry = document.querySelectorAll(form)
    for (i = 0; i < formEntry.length; i++){
        if(formEntry[i].className == 'p-input'){
            if(formEntry[i] == formEntry[0]){
                formEntry[i].innerText = 'Title:'
            }
            if(formEntry[i] == formEntry[1]){
                formEntry[i].innerText = 'Author:'
            }
            if(formEntry[i] == formEntry[2]){
                formEntry[i].innerText = 'Page Count:'
            }  
        }
    }
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
