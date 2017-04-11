var mysql = require('mysql');

function findRecord(id) {
  return new Promise (function(resolve, reject){

    var connection = mysql.createConnection({
      host     : 'itp460.usc.edu',
      user     : 'student',
      password : 'ttrojan',
      database : 'itp405-midterm'
    });
    connection.connect();
    connection.query('SELECT books.id, books.title, books.publisher_id, publishers.name, books.author_id, authors.first_name, authors.last_name FROM books, authors, publishers WHERE books.author_id = authors.id  AND books.publisher_id = publishers.id AND books.id = ?'
    , [ id ], function(error, book) {
      if (error){
        reject();
      }
      else {
        if (book.length ===0) {
            reject({
              message: 'Book Not Found',
            });
          } else {
            resolve(book[0]);
          }
        }
      });
    });
}

module.exports = findRecord;
