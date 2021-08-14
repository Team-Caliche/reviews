const Pool = require('pg').Pool;

const pool = new Pool({
  user: 'franciscoveranicola',
  password: '',
  database: 'sdcreview',
  host: 'localhost',
  port: '5432'
});


pool.connect();

//getReview
const getReview = (id, cb) => {
  const getQuery = `SELECT * FROM reviews LEFT JOIN reviews_photos ON reviews_photos.reviewphoto_id = reviews.id WHERE product_id = ${id} ORDER BY helpful DESC, date DESC;`;
  pool.query(getQuery, (err, result) => {
    if (err) {
      console.log(err);
      cb(err, null);
    } else {
      // console.log(photoArray)
      cb(null, result.rows);
    }
  })
}


//insert Review
const insertReview = (review, cb) => {
  // console.log(review.product_id, review.rating, review.date, review.rev_summary, review.body, review.recommended, review.reported, review.reviwer_name, review.reviwer_email, review.review_response, review.helpful)

  const queryString = `INSERT INTO reviews(product_id, rating, date, review_summary, review_Body, recommended, reported, reviwer_Name, reviwer_Email, review_Response, helpful) VALUES(${review.product_id}, ${review.rating}, current_timestamp, '${review.rev_summary}', '${review.body}', ${review.recommended}, ${review.reported}, '${review.reviwer_name}', '${review.reviwer_email}', '${review.review_response}', ${review.helpful})`;

  pool.query(queryString, (err, result) => {
    if (err) {
      console.log(err);
      cb(err, null);
    } else {
      cb(null, result);
    }
  })

  // if (review.photos.length > 0) {
  //   var photoQuery = `INSERT INTO reviews_photos(id, reviewphoto_id, url) VALUES(${review.photos}, ${}, ${})`
  //   pool.query()
  // }

  // if (review.characteristics.length > 0) {
  //   pool.query()
  // }

}



//updateReview
const updateReview = (update, cb) => {
  const queryStr = `Update reviews
   SET
   fields =
   fields =
   fields =
  `;
  const updateData = [
    update.field,
    update.filed,
    update.filed,
    Date.now()
  ]
  pool.query(queryStr, updateData, (err, result) => {
    if (err) {
      console.log(err);
      cb(err, null);
    } else {
      cb(null, results);
    }
  })
}


//deleteReview
const deleteReview = (id, cb) => {
  const queryStr = `DELETE FROM reviews WHERE id=${id};`
  pool.query(queryStr, (err, result) => {
    if (err) {
      console.log(err);
      cb(err, null);
    } else {
      cb(null, results);
    }
  })
}



module.exports = { getReview, insertReview, updateReview, deleteReview };

