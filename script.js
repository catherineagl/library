const container = document.getElementById('container')
const library = document.getElementById('library');
/*form*/
const form = document.getElementById('form');
const sendBookBtn = document.getElementById('send-btn');
/*modal variables*/
const closeModal = document.getElementById('close-modal');
const addBook = document.getElementById('add-btn');
const modal = document.getElementById('modal');
/*end modal variables*/
/*filter options*/
const searchBar = document.forms['search-book'].querySelector('input');
const filterOptions = document.getElementById('filter');
const showSearch = document.querySelector('.search');

let myLibrary = [];

class Book {
    constructor(title, author, pages, read) {
        this._title = title;
        this._author = author;
        this._pages = pages;
        this._read = read;
    }
    get read() {
        return this._read;
    }
    set read(bool) {
        this._read = bool;
    }
    showInfo() {
        return this._read ? `
        <button class="trash-btn"><i class="fas fa-trash-alt trash"></i></button>
        <h2>${this._title}</h2>
        <h3>Author: <span>${this._author}</span></h3>
        <h3>Pages: <span>${this._pages}</span></h3>
        <h3>Read: <i class="far fa-check-circle green"></i></h3>`
        : `
        <button class="trash-btn"><i class="fas fa-trash-alt trash"></i></button>
        <h2>${this._title}</h2>
        <h3>Author: <span>${this._author}</span></h3>
        <h3>Pages: <span>${this._pages}</span></h3>
        <h3>Read: <i class="far fa-times-circle red"></i></h3>`
    }
}


//=================FUNCTIONS
const printBook = () => {
    myLibrary = myLibrary.filter(item => item)
    if(library.hasChildNodes) {
        library.textContent = "";
    }
    for(let x in myLibrary) {
            let div = document.createElement('div');
            div.classList.add('book');
            div.setAttribute('data-id', x);
            div.innerHTML = new Book(myLibrary[x].title,myLibrary[x].author,myLibrary[x].pages,myLibrary[x].read).showInfo();   
            library.appendChild(div);
        }

}

const addBookToLibrary = (e) => {
    e.preventDefault();
    let title = document.getElementById('title').value;
    let author = document.getElementById('author').value;
    let pages = document.getElementById('pages').value;
    let read = document.querySelector('input[name="read"]:checked').value;
    read === "Yes" ? read = true : read = false
    myLibrary.push({title,author,pages,read});
    saveToLocalStorage({title,author,pages,read})
    printBook();
    form.reset();
    showModal();
    toastNotification("added");
}
const showModal = () => {
    modal.classList.toggle('active')
}
const changeReadStatusTrue = (e) => {
    let data = e.target.parentElement.parentElement.dataset.id;
    myLibrary[data].read = false;
    e.target.classList.replace('green', "red");
    e.target.classList.replace('fa-check-circle', "fa-times-circle");
}

const changeReadStatusFalse = (e) => {
    let data = e.target.parentElement.parentElement.dataset.id;
    myLibrary[data].read = true;
    e.target.classList.replace('red', "green");
    e.target.classList.replace('fa-times-circle', "fa-check-circle")
}

const deleteBook = (e) => {
    let data = e.target.parentElement.dataset.id;
    let book = e.target.parentElement;
    if(confirm('Are you sure you want to delete this book?')) {
        delete myLibrary[data];
        book.classList.add('fall');
        clearLocalStorage(book);
        book.addEventListener('transitionend', () => book.remove());
        toastNotification("removed");
    }
    else return
}

const toastNotification = (action) => {
    let toast = document.createElement('div');
    toast.classList.add('toast', 'greenBg');
    toast.textContent = `Book ${action} correctly`;
    container.append(toast)
    setTimeout(()=>{
        toast.remove()
    },3000)
}

const btnInteraction = (e) => {
    if(e.target.classList.contains('far')) {
        if(e.target.classList.contains('green')) changeReadStatusTrue(e);
        else changeReadStatusFalse(e);
    };
    if(e.target.classList.contains('trash-btn')) deleteBook(e);
    else return;
}

const searchBook = (e) => {
    const term = e.target.value.toLowerCase();
    const books = document.querySelectorAll('.book');
    Array.from(books).forEach(book => {
        const title = book.children[1].textContent;
        if(title.toLowerCase().includes(term)) book.style.display = "block"
        else book.style.display = "none"
    })
}


const filterBooks = (e) => {
    const books = library.childNodes;
    books.forEach(book => {
        const readStatus = book.children[4].children[0]
        switch(e.target.value) {
            case "all":
                book.style.display = "block";
                break;
            case "read":
                if(readStatus.classList.contains('green')) {
                    book.style.display = "block";
                } else {
                    book.style.display = "none"
                }
                break;
            case "unread":
                if(readStatus.classList.contains('red')) {
                    book.style.display = "block";
                } else {
                    book.style.display = "none"
                }
                break;
        }
    })
}



/*Local storage functions */
const saveToLocalStorage = (book) => {
    let books;
    if(localStorage.getItem('books') === null) {
        books = [];
    } else {    
        books = JSON.parse(localStorage.getItem('books'))   
    }
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books))
}

const getBooks = () => {
    let books;
    if(localStorage.getItem('books') === null) {
        books = [];
    } else {
        books = JSON.parse(localStorage.getItem('books'))
    }
    books.forEach(book => {
        myLibrary.push(book)
    })
}

const clearLocalStorage = (book) => {
    let books;
    if(localStorage.getItem('books') === null) {
        books = [];
    } else {  
        books = JSON.parse(localStorage.getItem('books'))
    }
    let index = book.children[1].textContent;
    for(let x in books) {
        if(books[x].title === index) {
            books.splice(x,1)
        }
    }
    localStorage.setItem('books', JSON.stringify(books))
} 

const showSearchBar = () => {
    searchBar.classList.toggle('active');
}
//================EVENTS
window.addEventListener('DOMContentLoaded', getBooks);
sendBookBtn.addEventListener('click', addBookToLibrary);
closeModal.addEventListener("click", showModal);
addBook.addEventListener('click', showModal);
document.addEventListener('click', btnInteraction);
searchBar.addEventListener('keyup', searchBook);
filterOptions.addEventListener('click', filterBooks)
addEventListener('DOMContentLoaded', printBook);
showSearch.addEventListener('click', showSearchBar)