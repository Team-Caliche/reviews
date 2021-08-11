CREATE DATABASE sdcReview;

CREATE TABLE reviews(
    id SERIAL NOT NULL,
    product_id INT PRIMARY KEY,
    rating INT NOT NULL,
    date timestamp NOT NULL DEFAULT now(),
    review_summary text,
    review_Body text,
    recommended text NOT NULL,
    reported text NOT NULL,
    reviwer_Name text NOT NULL,
    reviwer_Email text NOT NULL,
    review_Response text NOT NULL,
    helpful INT NOT NULL DEFAULT 0
);

CREATE TABLE reviews_photos(
  id INT NOT NULL,
  url VARCHAR(1000) NOT NULL,
  FOREIGN KEY (review_id) REFERENCES reviews(id)
);