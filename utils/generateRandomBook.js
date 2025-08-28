// utils/generateRandomBook.js
const usedTitles = new Set();

const sampleBooks = [
  { title: "Harry Potter and the Sorcerer's Stone", genre: "Fantasy", publication_year: 1997 },
  { title: "A Game of Thrones", genre: "Fantasy", publication_year: 1996 },
  { title: "Norwegian Wood", genre: "Romance", publication_year: 1987 },
  { title: "Things Fall Apart", genre: "Historical Fiction", publication_year: 1958 },
  { title: "Murder on the Orient Express", genre: "Mystery", publication_year: 1934 },
  { title: "The Great Gatsby", genre: "Classic", publication_year: 1925 },
  { title: "To Kill a Mockingbird", genre: "Classic", publication_year: 1960 },
  { title: "1984", genre: "Dystopian", publication_year: 1949 },
  { title: "The Catcher in the Rye", genre: "Classic", publication_year: 1951 },
  { title: "The Hobbit", genre: "Fantasy", publication_year: 1937 },
  { title: "The Alchemist", genre: "Philosophical", publication_year: 1988 },
  { title: "Pride and Prejudice", genre: "Romance", publication_year: 1813 },
  { title: "Brave New World", genre: "Science Fiction", publication_year: 1932 },
  { title: "Jane Eyre", genre: "Romance", publication_year: 1847 },
  { title: "Wuthering Heights", genre: "Romance", publication_year: 1847 },
];

function generateUniqueRandomBook(authorObjectId) {
  let attempts = 0;
  let book;

  do {
    book = sampleBooks[Math.floor(Math.random() * sampleBooks.length)];
    attempts++;
  } while (usedTitles.has(book.title) && attempts < 20);

  if (usedTitles.has(book.title)) {
    return null; // All titles used
  }

  usedTitles.add(book.title);

  return {
    ...book,
    authorId: authorObjectId,
    quantity: Math.floor(Math.random() * 10) + 1,
  };
}

module.exports = generateUniqueRandomBook;
