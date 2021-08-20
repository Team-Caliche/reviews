const express = require('express');
const request = require('supertest');
const pool = require('../Database/dbFunctions.js');
const app = express();
// const cors = require('cors');

app.use(express.json()); //req.body
// app.use(cors());


//ROUTES
/***************************************************** */
//get reviews
app.get('/api/reviews', (req, res) => {
  // console.log('id', req.query.id)
  const id = req.query.id;
  if (!id) {
    res.status(404).end();
  }
  pool.getReview(id, (err, data) => {
    if (err) {
      console.log('There was an error retrieving reviews', err);
      res.status(500).end();
    } else {
      res.status(200).send(data);
    }
  });
});

//get Metadata
app.get('/api/reviews/metadata/:product_id', (req, res) => {
  // console.log(req.params)
  const id = req.params
  if (!id) {
    res.status(404).end();
  }

  pool.getMetaData(id, (err, data) => {
    if (err) {
      console.log('There was an error retrieving metadata', err);
      res.status(500).end();
    } else {
      res.status(202).send(data);
    }
  });

});


//post reviews
app.post('/api/reviews', (req, res) => {
  const request = req.body;
  // console.log('request body', req.body);

  pool.insertReview(request, (err, data) => {
    if (err) {
      console.log('There was an error inserting review', err);
      res.status(500).end();
    } else {
      console.log('successfully posted review to DB');
      res.status(201).send('success');
    }
  });

})

//put (update reviews)
app.put('/api/reviews/:review_id/:type', (req, res) => {
  const type = req.params.type
  const review = req.params.review_id;
  // console.log('type', type)
  // console.log('review', review)
  if (!review) {
    res.status(404).end();
  }

  if (type === 'helpful') {
    pool.updateReview(review, (err) => {
      if (err) {
        console.log(err);
        res.status(400).end();
      } else {
        console.log('Successfully updated DB');
        res.status(202).send('success');
      }
    });
  }

  if (type === 'report') {
    pool.reportReview(review, (err) => {
      if (err) {
        console.log(err);
        res.status(400).end();
      } else {
        console.log('Successfully reported to DB');
        res.status(203).send('success');
      }
    });
  }

});

app.get('/loaderio-c0341c98129bb5ebfe772fc641c829c7.txt', (req, res) => {
    res.status(200).send('loaderio-c0341c98129bb5ebfe772fc641c829c7')
});



module.exports = app;