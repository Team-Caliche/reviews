CREATE DATABASE sdcReview;

CREATE TABLE IF NOT EXISTS reviews(
    id SERIAL PRIMARY KEY,
    product_id INT NOT NULL,
    rating INT NOT NULL,
    date BIGINT,
    review_summary text,
    review_Body text,
    recommended bool,
    reported bool,
    reviwer_Name text NOT NULL,
    reviwer_Email text NOT NULL,
    review_Response text NOT NULL,
    helpful INT NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS reviews_photos(
  id SERIAL PRIMARY KEY NOT NULL,
  reviewPhoto_id INT NOT NULL,
  url VARCHAR(1000) NOT NULL,
  FOREIGN KEY (id) REFERENCES reviews(id)
);


CREATE TABLE IF NOT EXISTS characteristics(
  id SERIAL PRIMARY KEY NOT NULL,
  product_id INT NOT NULL,
  char_name text NOT NULL
);


CREATE TABLE IF NOT EXISTS characteristics_reviews(
  id SERIAL PRIMARY KEY NOT NULL,
  char_id INT NOT NULL,
  char_reviewID INT NOT NULL,
  value_reviews INT NOT NULL,
  FOREIGN KEY (char_reviewID) REFERENCES reviews(id),
  FOREIGN KEY (char_id) REFERENCES characteristics(id)
);



SELECT MAX(id) FROM reviews_photos
CREATE SEQUENCE reviews_photos_seq MINVALUE 1
ALTER TABLE reviews_photos ALTER id SET DEFAULT nextval('reviews_photos_seq');
ALTER SEQUENCE reviews_photos_seq OWNED BY reviews_photos.id;

psql -h remotehost -d remote_mydb -U myuser -c "\copy mytable (column1, column2)  from '/path/to/local/file.csv' with delimiter as ','"



\COPY reviews FROM '/home/ubuntu/reviews.csv' CSV HEADER DELIMITER ',';
\COPY reviews_photos FROM '/home/ubuntu/reviews_photos.csv' CSV HEADER DELIMITER ',';
\COPY characteristics FROM '/home/ubuntu/characteristics.csv' CSV HEADER DELIMITER ',';
\COPY characteristics_reviews FROM '/home/ubuntu/characteristic_reviews.csv' CSV HEADER DELIMITER ',';

/home/ubuntu/reviews.csv
/home/ubuntu/reviews_photos.csv
/home/ubuntu/characteristics.csv
/home/ubuntu/characteristic_reviews.csv

\x for vertical format in terminal

CREATE INDEX reviwerEmailIndex ON reviews USING btree
(
    reviwer_Email
);

CREATE INDEX productID_index ON reviews USING btree
(
    product_id ASC
);

 CREATE INDEX reviewPhotoId_index ON reviews_photos USING btree
(
    reviewPhoto_id ASC
);

 CREATE INDEX charName_index ON characteristics USING btree
(
    char_name
);

 CREATE INDEX charReviewID ON characteristics_reviews USING btree
(
    char_reviewID
);

 CREATE INDEX charID_index ON characteristics_reviews USING btree
(
    char_id
);

 CREATE INDEX review_summary_index ON reviews USING btree
(
    review_summary
);

CREATE INDEX review_bodyIndex ON reviews USING btree
(
    review_Body
);

 CREATE INDEX reviwerNameIndex ON reviews USING btree
(
    reviwer_Name
);

 CREATE INDEX reviwerEmailIndex ON reviews USING btree
(
    reviwer_Email
);


put file name

ALTER TABLE reviews
ALTER COLUMN date SET DATA TYPE timestamp without time zone
USING to_timestamp(date/1000),
ALTER COLUMN date SET DEFAULT current_timestamp;