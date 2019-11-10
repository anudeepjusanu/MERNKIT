$(document).ready(function () {
  var finalValues = {
    water: 0,
    food: 0,
    medicine: 0,
    sanitation: 0
  };
  $('input[type=range]').change(function (evt) {
    finalValues[$(evt.target).data('type')] = evt.target.value;
    console.log(finalValues);
  })

  $('#createSms').on('click', function () {
    console.log(finalValues);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    }
  });
  function success(data) {
    console.log(data);
  };


  function showPosition(position) {
    // x.innerHTML = "Latitude: " + position.coords.latitude + "<br>Longitude: " + position.coords.longitude;
    console.log(position.coords);
    var data = {
      "longitude": position.coords.longitude,
      "latitude": position.coords.latitude,
      "things": [{
        "name": "food",
        "quantity": finalValues.food
      }, {
        "name": "medicine",
        "quantity": finalValues.medicine
      }, {
        "name": "sanitation",
        "quantity": finalValues.sanitation
      }, {
        "name": "water",
        "quantity": finalValues.water
      }]
    }
    $.ajax({
      type: "POST",
      url: 'http://localhost:3001/api/v1/requirement',
      contentType: 'application/json',
      data: JSON.stringify(data),
      success: success,
      dataType: 'json'
    });
  }

});



