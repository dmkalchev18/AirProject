


$(function () {

  let paraTemp = $("#vTemp");

  //paraTemp.text("Hello Jelyazko!");

  $.getJSON("http://data.sensor.community/airrohr/v1/sensor/38303/", function (data) {
    console.log(data);

    let temp1 = parseFloat(data[0].sensordatavalues[0].value);
    let temp2 = parseFloat(data[1].sensordatavalues[0].value);
    let temp = (temp1 + temp2) / 2;
    console.log(temp.toFixed(2));
    paraTemp.text(temp.toFixed(2));
  });



});