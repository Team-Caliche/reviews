const express = require('express');
const app = express();
const pool = require('/Users/franciscoveranicola/HackReactorSEI/reviews/Database/db.js'); //remove absolute path later

app.use(express.json()); //req.body


//ROUTES








//app listen
app.listen(3000, () => {
  console.log('server is listening on port 3000')
})