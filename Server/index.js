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
      res.status(200).send(data);
    }
  });

})


//put (update reviews)



//delete review


//app listen
app.listen(port, () => {
  console.log('server is listening on port 3000')
})