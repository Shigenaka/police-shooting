var map = L.map('map').setView([40, -100], 4)

// Function to draw your map
var drawMap = function() {

  // Create map and set view

  // Create a tile layer variable using the appropriate url
  var layer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
	attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map)

  // Add the layer to your map
  layer.addTo(map)

  // Execute your function to get data
  getData();
}

// Function for getting data
var getData = function() {
  // Execute an AJAX request to get the data in data/response.js
  	$.getJSON( "data/response.json", function(data) {
  		customBuild(data);
  	})

  // When your request is successful, call your customBuild function
}

// Loop through your data and add the appropriate layers and points
var customBuild = function(data) {
	var unknown = L.layerGroup();
	var white = L.layerGroup();
	var black = L.layerGroup();
	var asian = L.layerGroup();
	var aian = L.layerGroup();
	var pacific = L.layerGroup();
	var whiteCount = 0;
	var nonWhiteCount = 0;
	var wMen = 0;
	var wOther = 0;
	var men = 0;
	var other = 0;

	$.each(data, function(i, data) {
  		//console.log(data);
  		var link = data['Source Link']
  		console.log(link);
  		var circle = L.circleMarker([data['lat'], data['lng']], {
  			color: (data['Hit or Killed?'] == 'Killed') ? 'red' : 'black'
  		}).bindPopup('<b>Summary</b>: ' + data['Summary'] + ' ' + '<a href="link" target="_blank">(link)</a>' + '<br>' + '<b>City</b>: ' + data['City'] + '<br>' + '<b>State</b>: ' + data['State'])
  		if (data['Race'] == 'Unknown') {
  			circle.addTo(unknown)
  			nonWhiteCount++
  		} else if (data['Race'] == 'White') {
  			circle.addTo(white)
  			whiteCount++
  		} else if (data['Race'] == 'Black or African American') {
  			circle.addTo(black)
  			nonWhiteCount++
  		} else if (data['Race'] == 'Asian') {
  			circle.addTo(asian)
  			nonWhiteCount++
  		} else if (data['Race'] == 'American Indian or Alaska Native') {
  			circle.addTo(aian)
  			nonWhiteCount++
  		} else if (data['Race'] == 'Native Hawaiian or Other Pacific Islander') {
  			circle.addTo(pacific)
  			nonWhiteCount++
  		}

  		if (data['Race'] == 'White') {
  			if (data['Victim\'s Gender'] == 'Male') {
  				wMen++
  			} else {
  				wOther++
  			}
  		} else {
  			if (data['Victim\'s Gender'] == 'Male') {
  				men++
  			} else {
  				other++
  			}
  		}
  	})
	$('#whiteMen').text(wMen)
	$('#whiteOther').text(wOther)
	$('#otherMen').text(men)
	$('#otherOther').text(other)
	// Be sure to add each layer to the map
	// Once layers are on the map, add a leaflet controller that shows/hides layers
  	L.control.layers(null, {
  		'Unknown':unknown, 
  		'White':white, 
  		'Black or African American':black, 
  		'Asian':asian, 
  		'American Indian or Alaska Native':aian, 
  		'Native Hawaiian or Other Pacific Islander':pacific
  	}).addTo(map);

  	unknown.addTo(map)
  	white.addTo(map)
  	black.addTo(map)
  	asian.addTo(map)
  	aian.addTo(map)
  	pacific.addTo(map)
}


