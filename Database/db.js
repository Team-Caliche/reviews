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


//get Metadata func


//insert Review
const insertReview = (review, cb) => {
  const queryString = `with first_insert as (
    insert into reviews(product_id, rating, date, review_summary, review_Body, recommended, reported, reviwer_Name, reviwer_Email, review_Response, helpful)
    values
    ($1, $2, current_timestamp, $3, $4, $5, $6, $7, $8, $9, $10)
    RETURNING id
 ),
 second_insert as (
   insert into reviews_photos(reviewphoto_id, url)
   values
   ((SELECT id from first_insert), unnest(($11)::text[]) )
 )
 INSERT INTO characteristics_reviews(char_id, char_reviewid, value_reviews)
   values
   (2, (SELECT id FROM first_insert), unnest(($12)::int[]));`

  //  unnest(($10)::text[])
  // INSERT into characteristic_reviews (review_id, characteristic_id, value)
  //   SELECT id,
  //   unnest(($8)::int[]),
  //   unnest(($9)::int[]) AS VALUE
  //   FROM revid

 const reviewData = [
  review.product_id,  //1
  review.rating, //2
  //time stamp //
  review.rev_summary, //3
  review.body, //4
  review.recommended, //5
  review.reported, //6
  review.reviwer_name, //7
  review.reviwer_email, //8
  review.review_response, //9
  review.helpful, //10
  review.photos, //11
  review.characteristics //12
 ];

 console.log(reviewData)
  pool.query(queryString, reviewData, (err, result) => {
    if (err) {
      console.log(err);
      cb(err, null);
    } else {
      cb(null, result);
    }
  })

}



//updateReview
const updateReview = (update, cb) => {
  //helpfulness
  const queryStr = `UPDATE reviews
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



  // const queryString = `INSERT INTO reviews(product_id, rating, date, review_summary, review_Body, recommended, reported, reviwer_Name, reviwer_Email, review_Response, helpful) VALUES(${review.product_id}, ${review.rating}, current_timestamp, '${review.rev_summary}', '${review.body}', ${review.recommended}, ${review.reported}, '${review.reviwer_name}', '${review.reviwer_email}', '${review.review_response}', ${review.helpful})`;


  // third_insert as (
  //   insert into characteristics_reviews(char_id, char_reviewid, value_reviews)
  //   values
  //   (2, (SELECT id FROM first_insert), $13)