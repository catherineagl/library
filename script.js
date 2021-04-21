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
const searchBar = document.forms['search-book'].querySelector('input');


let myLibrary = [
    {
        title: "Book One",
        author: "Author",
        pages: "144",
        read: true
    },
    {
        title: "Book Two",
        author: "Author Two",
        pages: "256",
        read: false
    }
];

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
        <button class="trash-btn"><i class="fas fa-trash trash"></i></button>
        <h2>${this._title}</h2>
        <h3>Author: <span>${this._author}</span></h3>
        <h3>Pages: <span>${this._pages}</span></h3>
        <h3>Read: <i class="far fa-check-circle green"></i></h3>`
        : `
        <button class="trash-btn"><i class="fas fa-trash trash"></i></button>
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
    if(confirm('Are you sure you want to delete this book?')) {
        delete myLibrary[data]
        e.target.parentElement.remove();
        toastNotification("removed")
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

const searchBook = () => {
    
}

searchBar.addEventListener('keyup', (e) => {
    const term = e.target.value.toLowerCase();
    //console.log(term)
})

//================EVENTS

sendBookBtn.addEventListener('click', addBookToLibrary);
closeModal.addEventListener("click", showModal);
addBook.addEventListener('click', showModal);
document.addEventListener('click', (e) => {
    if(e.target.classList.contains('far')) {
        if(e.target.classList.contains('green')) changeReadStatusTrue(e);
        else changeReadStatusFalse(e);
    };
    if(e.target.classList.contains('trash-btn')) deleteBook(e);
    else return;
})

addEventListener('DOMContentLoaded', printBook);