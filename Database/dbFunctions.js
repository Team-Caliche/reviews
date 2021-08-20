const pool = require('./db.js');
const { mapCharacteristics, mapRecos, mapRatings } = require('./helperFunc.js');

/************Get all Reviews matching Product ID ******************************** */
const getReview = (request, cb) => {
  // console.log(request)
  let product = request;
  let page = request.page || 5;
  let count = request.count || 1;
  let results;

  let resultObj = {
    'product': parseInt(product),
    'page': page,
    'count': count,
    'result': results
  }

  const getQ = `SELECT reviews.id AS review_id, rating, date, review_summary, review_Body, recommended, reported, reviwer_Name, reviwer_Email, review_Response, helpful, ARRAY_AGG(json_build_object('id', reviews_photos.id, 'url', url)) as photos FROM reviews LEFT JOIN reviews_photos ON reviews_photos.reviewPhoto_id = reviews.id WHERE product_id = ${product} AND reported != true
  GROUP BY reviews.id
  ORDER BY helpful DESC, date DESC;`

  // const getQuery = `SELECT * FROM reviews review_id LEFT JOIN reviews_photos ON reviews_photos.reviewphoto_id = reviews.id WHERE product_id = ${product} ORDER BY helpful DESC, date DESC;`;
  pool.query(getQ, (err, data) => {
    if (err) {
      console.log(err);
      cb(err, null);
    } else {
      // console.log(data.rows)
      resultObj['results'] = data.rows;
      cb(null, resultObj);
    }
  })
};

/************Insert Review with Photos and Characteristics ******************************** */
const insertReview = (review, cb) => {
  let keys = [];
  let values = [];
  Object.entries(review.characteristics).forEach(([key, value]) => {
    keys.push(+key); values.push(value)
  });

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
   RETURNING id
 )
 INSERT INTO characteristics_reviews(char_reviewid, char_id, value_reviews)
 values
 ((SELECT id FROM first_insert), unnest(($12)::int[])),  unnest(($13)::int[]));`

 const reviewData = [
  review.product_id,  //1
  review.rating, //2
  //time stamp
  review.rev_summary, //3
  review.body, //4
  review.recommended, //5
  review.reported, //6
  review.reviwer_name, //7
  review.reviwer_email, //8
  review.review_response, //9
  review.helpful, //10
  review.photos, //11
  keys, //12
  values //13
 ];

  pool.query(queryString, reviewData, (err, result) => {
    if (err) {
      console.log(err);
      cb(err, null);
    } else {
      cb(null, result);
    }
  })

};

/************Update Review to incrememnt Helpful category******************************** */
const updateReview = (update, cb) => {
  // console.log(update);
  const queryStr = `UPDATE reviews
   SET helpful = helpful + 1
   WHERE id = ${update}
  `;

  pool.query(queryStr, (err, result) => {
    if (err) {
      console.log(err);
      cb(err, null);
    } else {
      cb(null, result);
    }
  })
};

/************Report Review (change false to true) ******************************** */
const reportReview = (id, cb) => {
  // console.log(id)
  const queryStr = `UPDATE reviews
  SET reported = true
  WHERE id=${id};`
  pool.query(queryStr, (err, result) => {
    if (err) {
      console.log(err);
      cb(err, null);
    } else {
      cb(null, result);
    }
  })
};

/************Get MetaData :( ******************************** */
const getMetaData = (product, cb) => {
  // console.log(product.product_id)
  const metaQuery = ` SELECT char_name, product_id, char_id, AVG(characteristics_reviews.value_reviews) FROM characteristics INNER JOIN characteristics_reviews ON characteristics_reviews.char_id = characteristics.id
  WHERE product_id = ${product.product_id}
  GROUP BY product_id, char_id, char_name `;

 const metaQuery2 = `SELECT rating, recommended FROM reviews WHERE product_id =  ${product.product_id}`;

  var metaDataObj = {
  'product_id': product.product_id,
  'ratings': '',
  'recommended': '',
  'characteristics': ''
 }

  pool.query(metaQuery, (err, result) => {
    if (err) {
      console.log(err);
      cb(err, null);
    } else {
     var chars = mapCharacteristics(result.rows)
     metaDataObj['characteristics'] = chars;

     pool.query(metaQuery2, (err, result2) => {
      if (err) {
        console.log(err);
        cb(err, null);
      } else {
        // console.log(result2.rows)
        //helper function to
        var recos = mapRecos(result2.rows);
        var ratings = mapRatings(result2.rows);

        metaDataObj['recommended'] = recos;
        metaDataObj['ratings'] = ratings;
        cb(null, metaDataObj);
      }
    });

    }
  });

};
/************End of DB Functions ******************************** */

module.exports = { getReview, insertReview, updateReview, reportReview, getMetaData };



