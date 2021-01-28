export class Book {
    id: string;
    bookName: string;
    author: string;
    genre: string;
    publicationYear: string;
    pages: string;
    description: string;

    constructor(id: string, bookName:string, author: string, genre: string, publicationYear: string, pages:string, description: string){
        this.id = id;
        this.bookName = bookName;
        this.author = author;
        this.genre = genre;
        this.publicationYear = publicationYear;
        this.pages = pages;
        this.description = description;

    }
}
