const app = require('./app.js');
const port = 3000;
// //app listen
app.listen(port, () => {
  console.log(`server is listening on port ${port}`)
})




// artillery quick --count 20 -n 40 http://localhost:3000/api/reviews/?id=12