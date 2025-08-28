// seed.js
const mongoose = require('mongoose');
const Author = require('../model/Author');
const Book = require('../model/Books');
const generateRandomAuthor = require('./generateRandomAuthor');
const generateUniqueRandomBook = require('./generateRandomBook');

async function seedData() {
  try {
    await mongoose.connect('mongodb+srv://ashish-mern:ashish123@cluster0.s343uje.mongodb.net/LibraryDatabase?retryWrites=true&w=majority&appName=Cluster0');

    await Author.deleteMany();
    await Book.deleteMany();

    const authors = [];

    // Create and save authors
    for (let i = 0; i < 5; i++) {
      const authorData = generateRandomAuthor();
      const author = await Author.create(authorData);
      authors.push(author);
    }

    // Create up to 2 unique books per author
    for (const author of authors) {
      for (let i = 0; i < 2; i++) {
        const bookData = generateUniqueRandomBook(author._id);
        if (bookData) {
          await Book.create(bookData);
        } else {
          console.warn('No more unique book titles available.');
          break;
        }
      }
    }

    console.log('✅ Seeding complete');
  } catch (err) {
    console.error('❌ Error seeding data:', err);
  } finally {
    await mongoose.disconnect();
  }
}

seedData();
