function initScenes(controller) {

    // build scene
    new ScrollMagic.Scene({
            triggerElement: "#trigger1",
            triggerHook: 1, // show, when scrolled 10% into view
            duration: "100%", // hide 10% before exiting view (n% + 10% from bottom)
            offset: 50 // move trigger to center of element
        })
        .setClassToggle("#reveal1", "visible") // add class to reveal
        .addTo(controller);

    // build scene
    new ScrollMagic.Scene({
            triggerElement: "#trigger2",
            triggerHook: 1, // show, when scrolled 10% into view
            duration: "120%", // hide 10% before exiting view (n% + 10% from bottom)
            offset: 50 // move trigger to center of element
        })
        .setClassToggle("#reveal2", "visible") // add class to reveal
        .addTo(controller);

    // build scene
    new ScrollMagic.Scene({
            triggerElement: "#trigger3",
            triggerHook: 1, // show, when scrolled 10% into view
            duration: "220%", // hide 10% before exiting view (n% + 10% from bottom)
            offset: 50 // move trigger to center of element
        })
        .setClassToggle("#reveal3", "visible") // add class to reveal
        .addTo(controller);
}



$(function() {

    $("#accordion").accordion({
        active: false,
        collapsible: true,
        heightStyle: "content"
    });

    $('a[href*="#"]').on('click', function(e) {
        // Prevent event bubling (i.e. the browser will not add #element_id in address bar)
        e.preventDefault();

        // Scroll the page to the selected element
        $('html, body').animate({ scrollTop: $($(this).attr('href')).offset().top }, 100, 'linear');
    });

    let controller = new ScrollMagic.Controller();
    initScenes(controller);

    let paraTemp = $("#vTemp");
    let paraPressure = $("#vPressure");
    let paraHum = $("#vHum");
    let paraPM10 = $('#vPM10');
    let paraPM25 = $('#vPM25');
    let paraUpdate = $('#vUpdate');

    function dateToISOLocalDate(date) {
        const offsetMs = date.getTimezoneOffset() * 60 * 1000;
        const msLocal = date.getTime() - offsetMs;
        const dateLocal = new Date(msLocal);
        const iso = dateLocal.toISOString();
        let isoLocal = iso.slice(0, 19);
        isoLocal = isoLocal.replace('T', ' ');
        return isoLocal;
    }

    $.getJSON("https://data.sensor.community/airrohr/v1/sensor/38303/", function(data) {

        if (data.length == 0) {
            return;
        }

        let LastUpdate = 0;
        let temperature = 0;
        let pressure = 0;
        let humidity = 0;

        LastUpdate = dateToISOLocalDate(new Date(data[0].timestamp + "Z"));

        // Calculating the sum of all values
        for (var i = 0; i < data.length; i++) {
            // console.log("i == " + i + ": " + parseFloat(data[i].sensordatavalues[0].value));
            temperature += parseFloat(data[i].sensordatavalues[0].value);
            pressure += parseFloat(data[i].sensordatavalues[1].value);
            humidity += parseFloat(data[i].sensordatavalues[2].value);
        }

        // Calculating average values
        temperature /= data.length;
        pressure /= data.length * 100;
        humidity /= data.length;

        // Displaying the result
        paraTemp.text(temperature.toFixed(2));
        paraPressure.text(pressure.toFixed(2));
        paraHum.text(humidity.toFixed(2));
        paraUpdate.text(LastUpdate);

    });

    $.getJSON("https://data.sensor.community/airrohr/v1/sensor/38302/", function(data) {

        // After receiving a response we perform data validateion check
        if (data.length == 0) {
            return;
        }

        let PM10 = 0;
        let PM25 = 0;

        // Calculating the sum of all values
        for (var i = 0; i < data.length; i++) {
            PM10 += parseFloat(data[i].sensordatavalues[0].value);
            PM25 += parseFloat(data[i].sensordatavalues[1].value);
        }

        // Calculating average values
        PM10 /= data.length;
        PM25 /= data.length;

        // Displaying the result
        paraPM10.text(PM10.toFixed(2));
        paraPM25.text(PM25.toFixed(2));

    });

});

function showdaily() {
    var x = document.getElementById("GraphsDaily");
    if (x.style.display === "none") {
        x.style.display = "block";
        $("#buttongraphday")
            .text("Hide daily graphs");
    } else {
        x.style.display = "none";
        $("#buttongraphday").text("Show daily graphs");
    }

}

function showweekly() {
    var x = document.getElementById("GraphsWeekly");

    if (x.style.display === "none") {
        x.style.display = "block";
        $("#buttongraphweek").text("Hide weekly graphs");
    } else {
        x.style.display = "none";
        $("#buttongraphweek").text("Show weekly graphs");
    }

}

function showmonthly() {
    var x = document.getElementById("GraphsMonthly");
    if (x.style.display === "none") {
        x.style.display = "block";
        $("#buttongraphmonth").text("Hide monthly graphs");
    } else {
        x.style.display = "none";
        $("#buttongraphmonth").text("Show monthly graphs");
    }

}