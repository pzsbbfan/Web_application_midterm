/* File Name: COMP229-F2020-MidTerm-301250119
   Author Name: Lucas Fan
   Student ID: 301250119
   Web App Name: Book List*/
// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// define the book model
let book = require('../models/books');

/* GET books List page. READ */
router.get('/', (req, res, next) => {
  // find all books in the books collection
  book.find( (err, books) => {
    if (err) {
      return console.error(err);
    }
    else {
      // no error then go to books/index.ejs page
      res.render('books/index', {
        title: 'Books',
        books: books
      });
    }
  });

});

//  GET the Book Details page in order to add a new Book
router.get('/add', (req, res, next) => {

  book.find( (err, books) => {
    if (err) 
    {
      return console.error(err);
    }
    else {
      // no error then go to books/details.ejs page having title and books object
        res.render('books/details', {
        title: 'Books',
        books: books
      });
    }
  });

});

// POST process the Book Details page and create a new Book - CREATE
router.post('/add', (req, res, next) => {

  //create new book object
  let newBook = book({
    "Title": req.body.Title,
    "Description" : req.body.Description,
    "Price" : req.body.Price,
    "Author": req.body.Author,
    "Genre" : req.body.Genre
});

  // writes book object into database
book.create(newBook, (err,book)=>{
    if (err) {
        console.log(err);
        res.end(err);
    }
    else{
        //refresh the book list
        res.redirect('/books');
    }
    
});

});

// GET the Book Details page in order to edit an existing Book
router.get('/:id', (req, res, next) => {
  // get the book object with its id
  let id = req.params.id;
    
  book.findById(id, (err, bookToEdit) =>{
      if (err)
      {
          console.log(err);
          res.end;
      }
      else
      {
          //show the details view
          res.render('books/details', 
          {title:'Edit Book', 
          books:bookToEdit
          }); 
      }
  });
});

// POST - process the information passed from the details form and update the document
router.post('/:id', (req, res, next) => {

  let id = req.params.id;

  // create book object for update
  let updatedBook = book({
      "_id":id,
      "Title": req.body.Title,
      "Description" : req.body.Description,
      "Price" : req.body.Price,
      "Author": req.body.Author,
      "Genre" : req.body.Genre
  });
  // updateOne function to manipulate data in the DB
  book.updateOne({_id:id}, updatedBook,(err) =>{
      if  (err){
          console.log(err);
          res.end;
      }
      else{
          //refresh book list
          res.redirect('/books');
      }
  });
});

// GET - process the delete by user id
router.get('/delete/:id', (req, res, next) => {

  let id = req.params.id;

  // remove the object using its ID
  book.remove({_id:id},(err)=>{
      if (err){
          console.log(err);
          res.end;
      }
      else{
          //refresh book list
          res.redirect('/books');
      }
  });
});


module.exports = router;
