const express = require('express');
const app = express();
const pool = require('/Users/franciscoveranicola/HackReactorSEI/reviews/Database/db.js'); //remove absolute path later
const port = 3000;
const bodyParser = require('body-parser');

app.use(express.json()); //req.body


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
app.put('/api/reviews/:review_id/helpful', (req, res) => {
  const review = req.body;
  if (!review) {
    res.status(404).end();
  }
  pool.updateReview(review, (err) => {
    if (err) {
      console.log(err);
      res.status(400).end();
    } else {
      console.log('Successfully updated DB');
      res.status(202).send('success');
    }
  });
});


//delete review
app.delete('api/review/:review_id/report', (req, res) => {
  const review = req.query.id;
  if (!review) {
    res.status(404).end();
  }
  pool.deleteReview(review, (err) => {
    if (err) {
      console.log(err);
      res.status(400).end();
    } else {
      console.log('Successfully reported to DB');
      res.status(203).send('success');
    }
  });
});



//app listen
app.listen(port, () => {
  console.log('server is listening on port 3000')
})