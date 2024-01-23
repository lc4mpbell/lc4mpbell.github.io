// The value for 'accessToken' begins with 'pk...'
mapboxgl.accessToken =
  "pk.eyJ1IjoibGM0bXBiZWxsIiwiYSI6ImNscjZkb3A0bDF5bzgycW8xMnN3bzNyY2wifQ.enQBMlgq7Cm8t5zOYuAJ-Q";

const map = new mapboxgl.Map({
  container: "map", // container element id

  style: "mapbox://styles/mapbox/light-v10",

  center: [-0.089932, 51.514442],

  zoom: 14
});
const data_url =
  "https://api.mapbox.com/datasets/v1/lc4mpbell/clrqe9qxe02er1ns5rkf0dp2y/features?access_token=pk.eyJ1IjoibGM0bXBiZWxsIiwiYSI6ImNscjZkb3A0bDF5bzgycW8xMnN3bzNyY2wifQ.enQBMlgq7Cm8t5zOYuAJ-Q";

map.on("load", () => {
  //Slider interaction code goes below
  filterType = ["!=", ["get", "Crime type"], "placeholder"];
  document.getElementById("slider").addEventListener("input", (event) => {
    //Get the month value from the slider

    const month = parseInt(event.target.value);

    // get the correct format for the data

    formatted_month = "2021-" + ("0" + month).slice(-2);

    //Create a filter

    filterMonth = ["==", ["get", "Month"], formatted_month];

    //set the map filter

    map.setFilter("crimes", ["all", filterMonth, filterType]);

    // update text in the UI

    document.getElementById("active-month").innerText = month;
  });

  //Radio button interaction code goes below
  document.getElementById("filters").addEventListener("change", (event) => {
    const type = event.target.value;

    console.log(type);

    // update the map filter

    if (type == "all") {
      filterType = ["!=", ["get", "Crime type"], "placeholder"];
    } else if (type == "shoplifting") {
      filterType = ["==", ["get", "Crime type"], "Robbery"];
    } else if (type == "bike") {
      filterType = ["==", ["get", "Crime type"], "Bicycle theft"];
    } else if (type == "Anti-social behaviour") {
      filterType = ["==", ["get", "Crime type"], "Anti-social behaviour"];
    } else if (type == "Drugs") {
      filterType = ["==", ["get", "Crime type"], "Drugs"];
    } else if (type == "Violence and sexual offences") {
      filterType = [
        "==",
        ["get", "Crime type"],
        "Violence and sexual offences"
      ];
    } else {
      console.log("error");
    }

    map.setFilter("crimes", ["all", filterMonth, filterType]);
  });
  map.addLayer({
    id: "crimes",

    type: "circle",

    source: {
      type: "geojson",

      data: data_url
    },

    paint: {
      "circle-radius": 5,

      "circle-color": "#eb4d4b",

      "circle-opacity": 0.8
    }
  });

  //Slider interaction code goes below
});