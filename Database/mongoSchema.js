


let reviewSchema = mongoose.Schema({
  reviewID: Number,
  productID: Number,
  rating: Number,
  summary: String,
  recommended: Boolean,
  response: Boolean,
  body: String,
  date: Number,
  reviwerName: String,
  helpful: Number
});

let reviewPhotoSchema = mongoose.Schema({
  id: Number,
  reviewID: Number,
  url: String
})

let metaDataSchema = mongoose.Schema({
  id: Number,
  productID: Number,
  ratings: Number,
  recommended: Boolean,
})