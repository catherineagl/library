const library = document.getElementById('library');
/*form*/
const form = document.getElementById('form');
const sendBookBtn = document.getElementById('send-btn');
/*modal variables*/
const closeModal = document.getElementById('close-modal');
const addBook = document.getElementById('add-btn');
const modal = document.getElementById('modal');
/*end modal variables*/

let myLibrary = [
    {
        title: "Game Of Thrones",
        author: "Author",
        pages: 144,
        read: true
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

const printBook = () => {
    myLibrary.forEach(x => {

        let div = document.createElement('div');
        div.classList.add('book');
        
        div.innerHTML = new Book(x.title,x.author,x.pages,x.read).showInfo();
        
        library.append(div);
    })
    
}

const createBook = (e) => {
    e.preventDefault();
    let title = document.getElementById('title').value;
    let author = document.getElementById('author').value;
    let pages = document.getElementById('pages').value;
    let read = document.querySelector('input[name="read"]:checked').value;
    read === "Yes" ? read = true : read = false

    myLibrary.push({
        title,
        author,
        pages,
        read
    })

form.reset()
}

//functions & events
const showModal = () => {
    modal.classList.toggle('active')
}

const deleteElement = (e) => {
    e.target.parentElement.remove()
}


sendBookBtn.addEventListener('click', createBook)
closeModal.addEventListener("click", showModal);
addBook.addEventListener('click', showModal);
document.addEventListener('click', (e) => {
    if(!e.target.classList.contains('trash-btn')) return
    if(e.target.classList.contains('trash-btn')) {
        if(confirm('Are you sure you want to delete this book?')) e.target.parentElement.remove();
        else return 
    }
})