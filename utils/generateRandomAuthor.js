// utils/generateRandomAuthor.js
const { v4: uuidv4 } = require('uuid');

const sampleAuthors = [
  { name: "J.K. Rowling", bio: "British author, best known for the Harry Potter series.", nationality: "British" },
  { name: "George R.R. Martin", bio: "American novelist and short story writer, known for A Song of Ice and Fire.", nationality: "American" },
  { name: "Haruki Murakami", bio: "Japanese writer known for surreal and melancholic stories.", nationality: "Japanese" },
  { name: "Chinua Achebe", bio: "Nigerian novelist best known for 'Things Fall Apart'.", nationality: "Nigerian" },
  { name: "Agatha Christie", bio: "Famous British writer known for detective novels.", nationality: "British" },
];

function generateRandomAuthor() {
  const author = sampleAuthors[Math.floor(Math.random() * sampleAuthors.length)];
  return {
    ...author,
    authorId: uuidv4(), // unique string ID
  };
}

module.exports = generateRandomAuthor;
