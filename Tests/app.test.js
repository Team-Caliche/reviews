const app = require('../Server/app.js');
const request = require('supertest');
const db = require('../Database/db.js');




describe('Should GET reviews from DB', () => {
  test('Should return 200 status code', () => {
    return request(app)
    .get('/api/reviews')
    .query({id: 12})
    .then(response => {
      expect(response.statusCode).toBe(200);
    });
  }, 30000);
});


describe('Should GET metadata from DB', () => {
  test('Should return 200 status code', () => {
    return request(app)
    .get('/api/reviews/metadata/12')
    // .params({product_id: 12})
    .then(response => {
      expect(response.statusCode).toBe(202);
    });
  }, 30000);
});


describe('Should Fail to get reviews', () => {
  test('Should return 200 status code', () => {
    return request(app)
    .get('/api/reviews')
    .query()
    .then(response => {
      expect(response.statusCode).toBe(404);
    });
  }, 30000);
});

describe('Should Fail to get reviews', () => {
  test('Should return 200 status code', () => {
    return request(app)
    .get('/api/reviews/metadata/')
    .then(response => {
      expect(response.statusCode).toBe(404);
    });
  }, 30000);
});

describe('Should update Helpful', () => {
  test('Should return 200 status code', () => {
    return request(app)
    .put('/api/reviews/56/helpful')
    .then(response => {
      expect(response.statusCode).toBe(202);
    });
  }, 30000);
});

describe('Should update Report', () => {
  test('Should return 200 status code', () => {
    return request(app)
    .put('/api/reviews/55/report')
    .then(response => {
      expect(response.statusCode).toBe(203);
    });
  }, 30000);
});



// describe('Should POST a review to DB', () => {
//   test('Should return 201 status code', () => {
//     return request(app)
//     .post('/api/reviews')
//     .send({
//       "id": 10,
//          "product_id": 12,
//         "rating": 6,
//         "date": 1,
//         "rev_summary": "product",
//         "body": "Great poduct!",
//         "recommended": true,
//         "reported": false,
//         "reviwer_name": "Juan Thique",
//         "reviwer_email": "Jthique@gmail.com",
//         "review_response": "null",
//         "helpful": 9,
//         "photos": ["source.unsplash.com/random"],
//         "characteristics": {
//             "2": 1
//         }
//     }).then(response => {
//       expect(response.statusCode).toBe(201);
//     })
//   });
// });

