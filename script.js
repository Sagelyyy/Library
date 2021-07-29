let entryForms = ''
let myVals = []
let currRadio = 'unread'
let myCurrentBook = ''
let myLibrary = [];
let firstLoad = true
let formActive = false

//setup the querySelectors
const container = document.querySelector('.book-container')
const dropdown = document.querySelector('select')
const cardTitle = document.querySelector('.title')
const cardAuthor = document.querySelector('.author')
const cardPages = document.querySelector('.pages')
const cardRead = document.querySelector('.read')

//setup the eventListeners
const newBook = document.querySelector('.new-book')
newBook.addEventListener("click", createForm)
const deleteBookBtn = document.querySelector('.delete-book')
deleteBookBtn.addEventListener("click", deleteBook)
const updateBook = document.querySelector('.read-status')
updateBook.addEventListener("click", updateReadStatus)



const newEntry = document.createElement('form')
newEntry.className = 'new-entry-forms'
container.appendChild(newEntry)

function Book(title, author, pages, read){
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
}

function saveToStorage(){
    for(i = 0; i< myLibrary.length;i++){
        localStorage.setItem('book ' + i, JSON.stringify(myLibrary[i]))
    }
}

function loadFromStorage(){
    if(localStorage.length > 0){
        for(i = 0; i< localStorage.length; i++){
            let book = (JSON.parse(localStorage.getItem(localStorage.key(i))))
            myLibrary.push(book)
        }
    }else{
        addBookToLibrary('The Lord of The Rings', 'J. R. R. Tolkien', 1178, 'read')
        addBookToLibrary('1984', 'George Orwell', 328, 'unread')
    }
    addBooksToList()
}

function updateReadStatus(){
    for(i = 0; i < myLibrary.length; i++){
        if(myLibrary[i].title.toLowerCase() == myCurrentBook){
            if(myLibrary[i].read == 'read'){
                myLibrary[i].read = 'unread'
            }else if(myLibrary[i].read == 'unread'){
                myLibrary[i].read = 'read'
            }
        }
    }
    refreshBook()
}

function refreshBook(){
    for(i = 0; i < myLibrary.length; i++){
        if(myLibrary[i].title.toLowerCase() == myCurrentBook){
            cardTitle.textContent = myLibrary[i].title
            cardAuthor.textContent = `Author: ${myLibrary[i].author}`
            if(myLibrary[i].pages > 10000){
                myLibrary[i].pages = 10000
                cardPages.textContent = `Total Pages: ${parseInt(myLibrary[i].pages)}`
            }else{
                cardPages.textContent = `Total Pages: ${parseInt(myLibrary[i].pages)}`
            }
            cardRead.textContent = `Book Status: ${myLibrary[i].read}`
        }
    }
}

function createForm(){
    count = 3
    if(!formActive){
        while(count > 0){
            const titleText = document.createElement('p')
            titleText.className = 'p-input'
            newEntry.appendChild(titleText)
            const titleForm = document.createElement('input')
            titleForm.setAttribute('required', 'true')
            titleForm.className = 'new-input'
            titleForm.id = 'input-field'
            newEntry.appendChild(titleForm)
            if (count == 1){
                const readLabel = document.createElement('label')
                readLabel.setAttribute('for', 'read')
                newEntry.appendChild(readLabel)
                readLabel.innerText = 'Read'
                const readRadio = document.createElement('input')
                readRadio.setAttribute("type", "radio")
                readRadio.setAttribute("value", "read")
                readRadio.setAttribute("name", "newRadio")
                readRadio.setAttribute('onclick', 
                'setRadio("read")')
                newEntry.appendChild(readRadio)
            }
            if (count == 1){
                const unreadLabel = document.createElement('label')
                unreadLabel.setAttribute('for', 'unread')
                newEntry.appendChild(unreadLabel)
                unreadLabel.innerText = 'Unread'
                const unreadRadio = document.createElement('input')
                unreadRadio.className = 'unreadRadio'
                unreadRadio.setAttribute("checked", "true")
                unreadRadio.setAttribute("type", "radio")
                unreadRadio.setAttribute("value", "unread")
                unreadRadio.setAttribute("name", "newRadio")
                unreadRadio.setAttribute('onclick', 
                'setRadio("unread")')
                newEntry.appendChild(unreadRadio)
                const submitButton = document.createElement('button')
                submitButton.setAttribute('type', 'button')
                submitButton.setAttribute('onclick', 'submitBook()')
                submitButton.className = 'submit-book'
                submitButton.innerText = "Submit"
                newEntry.appendChild(submitButton)
            }
            count--
        }
    }
    formSetup('.p-input')
    formSetup('.new-input')
    entryForms = document.querySelector('.new-entry-forms')
    formActive = true

}

function setRadio(radioVal){
    currRadio = radioVal
}

function submitBook(){
    myVals =  document.querySelectorAll('.new-input')
    for(i = 0; i < 1; i++){
        if(myVals[i].value != ""){
            addBookToLibrary(
                myVals[0].value, myVals[1].value, myVals[2].value, currRadio)
        }
    }
    destroyForms(entryForms)
    myCurrentBook = myVals[0].value.toLowerCase()
    refreshBook()
    myVals = ''
    let formUpdate = document.querySelector('#book-selector')
    formUpdate.value = myCurrentBook
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
    for (i = 0; i < formEntry.length; i++){
        if(formEntry[i].className == 'new-input'){
            if(formEntry[i] == formEntry[2]){
                formEntry[i].setAttribute('type', 'number')
                formEntry[i].setAttribute('min', "1")
                formEntry[i].setAttribute('max', "10000")   
            }
        }
    }
}


function addBookToLibrary(title, author, pages, read){
    let book = new Book(title, author, pages, read)
    myLibrary.push(book)
    addBooksToList()
    saveToStorage()
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
    if(myLibrary.length == 0){
        cardTitle.textContent = 'No Books in Library'
        cardAuthor.textContent = ``
        cardPages.textContent = ``
        cardRead.textContent = ``
        return
    }
    if(firstLoad == true){
        myCurrentBook = myLibrary[0].title.toLowerCase()
        cardTitle.textContent = myLibrary[0].title
        cardAuthor.textContent = `Author: ${myLibrary[0].author}`
        cardPages.textContent = `Total Pages: ${parseInt(myLibrary[0].pages)}`
        cardRead.textContent = `Book Status: ${myLibrary[0].read}`
        firstLoad = false
    }
    const eListener = dropdown.addEventListener('change', function(e){
        for(i = 0; i < myLibrary.length; i++){
            if(myLibrary[i].title.toLowerCase() == e.target.value){
                myCurrentBook = e.target.value
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

function deleteBook(){
    for(i=0; i < myLibrary.length; i++){
        if(myLibrary[i].title.toLowerCase() == myCurrentBook){
            myLibrary.splice(i, 1)
            localStorage.removeItem(localStorage.key(i))
        }
    }
    addBooksToList()
    firstLoad = true
    selectBook()
}

function destroyForms(parent) {
    while(parent.firstChild) {
        parent.removeChild(parent.firstChild)
    }
    formActive = false
}

loadFromStorage()
selectBook()
