

initScenes(){

   // build scene
   new ScrollMagic.Scene({
    triggerElement: "#trigger1",
    triggerHook: 0.9, // show, when scrolled 10% into view
    duration: "80%", // hide 10% before exiting view (80% + 10% from bottom)
    offset: 50 // move trigger to center of element
})
    .setClassToggle("#reveal1", "visible") // add class to reveal
    .addTo(controller);

  // build scene
  new ScrollMagic.Scene({
    triggerElement: "#trigger2",
    triggerHook: 0.9, // show, when scrolled 10% into view
    duration: "80%", // hide 10% before exiting view (80% + 10% from bottom)
    offset: 50 // move trigger to center of element
})
    .setClassToggle("#reveal2", "visible") // add class to reveal
    .addTo(controller);

}

$(function () {

  initScenes();

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