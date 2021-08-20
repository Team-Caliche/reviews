
const mapCharacteristics = (rows) => {
  var allObj = {};

  for (var i = 0; i < rows.length; i++) {
    var charObj = {
      'id': '',
      'value': ''
    }

    charObj['id'] = rows[i].char_id;
    charObj['value'] = rows[i].avg;

    allObj[rows[i].char_name] = charObj;
  }
  // console.log(allObj)
  return allObj;
};


const mapRatings = (rows) => {

  var ratings = {};

  rows.forEach(rateObj => {
    ratings[rateObj.rating] = ++ratings[rateObj.rating] || 1;
  })

  // console.log(ratings);

  return ratings;

}

const mapRecos = (rows) => {

  var recos = {};

  rows.forEach(recObj => {
    recos[recObj.recommended] = ++recos[recObj.recommended] || 1;
  })

  // console.log(recos);

  return recos;
}




module.exports = { mapCharacteristics, mapRatings, mapRecos };