

function initScenes() {

  // build scene
  new ScrollMagic.Scene({
    triggerElement: "#trigger1",
    triggerHook: 1, // show, when scrolled 10% into view
    duration: "118%", // hide 10% before exiting view (80% + 10% from bottom)
    offset: 50 // move trigger to center of element
  })
    .setClassToggle("#reveal1", "visible") // add class to reveal
    .addTo(controller);

  // build scene
  new ScrollMagic.Scene({
    triggerElement: "#trigger2",
    triggerHook: 1, // show, when scrolled 10% into view
    duration: "118%", // hide 10% before exiting view (80% + 10% from bottom)
    offset: 50 // move trigger to center of element
  })
    .setClassToggle("#reveal2", "visible") // add class to reveal
    .addTo(controller);

}

$(function () {

  initScenes();

  let paraTemp = $("#vTemp");
  let paraPressure = $("#vPressure");
  let paraHum = $("#vHum");
  let paraPM11 = $('#vPM10');

  $.getJSON("http://data.sensor.community/airrohr/v1/sensor/38303/", function (data) {

    console.log(data);

    let temp1 = parseFloat(data[0].sensordatavalues[0].value);
    let temp2 = parseFloat(data[1].sensordatavalues[0].value);
    let temp = (temp1 + temp2) / 2;
    console.log(temp.toFixed(2));
    paraTemp.text(temp.toFixed(2));

    let pressure1 = parseFloat(data[0].sensordatavalues[1].value);
    let pressure2 = parseFloat(data[1].sensordatavalues[1].value);
    let pressure = (pressure1 + pressure2) / 2;
    console.log(pressure.toFixed(2));
    paraPressure.text(pressure.toFixed(2));

    let hum1 = parseFloat(data[0].sensordatavalues[2].value);
    let hum2 = parseFloat(data[1].sensordatavalues[2].value);
    let hum = (hum1 + hum2) / 2;
    console.log(hum1.toFixed(2));
    paraHum.text(hum1.toFixed(2));

  });

  // $.getJSON("http://data.sensor.community/airrohr/v1/sensor/38302/", function (data) {

  //   console.log(data);

  //   let PM11 = parseFloat(data[0].sensordatavalues[0].value);
  //   let PM12 = parseFloat(data[0].sensordatavalues[1].value);
  //   let PM13 = parseFloat(data[1].sensordatavalues[0].value);
  //   let PM14 = parseFloat(data[1].sensordatavalues[1].value);
  //   let PM10 = (PM11 + PM12+ PM13 + PM14) / 4;
  //   console.log(PM10.toFixed(2));
  //   paraPM11.text(PM10.toFixed(2));

  // });

});