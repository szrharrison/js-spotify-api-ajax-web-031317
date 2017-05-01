var url = "https://api.spotify.com/v1/artists/43ZHCT0cAZBISjO8DG9PnE/top-tracks?country=SE";

var dataSetProperties = {
  fillColor: 'rgba(220,220,220,0.5)',
  strokeColor: 'rgba(220,220,220,0.8)',
  highlightFill: 'rgba(220,220,220,0.75)',
  highlightStroke: 'rgba(220,220,220,1)'
};

$(function() {
  getSpotifyTracks(success);
});

// write functions to pass spec tests here outside the jQuery doc ready
// then call function within doc ready to get them to work
// and display the chart correctly in index.html

function extractTop10Tracks(tracks) {
  // your code here
  return tracks
}

function extractPopularity(tracks) {
  // your code here
  let poularities = tracks.map(function(track) {
    return track.popularity
  })
  return poularities
}

function extractNames(tracks) {
  // your code here
  let names = tracks.map(function(track) {
    return track.name
  })
  return names
}

function chartData(labels, inputData) {
  // your code here
  var data = {
	labels: labels,
	datasets: [ Object.assign( {}, dataSetProperties, { data: inputData, label: 'songs' } ) ]
}
  // use the dataSetProperties variable defined above if it helps
  return data
}

function getSpotifyTracks(callback){
  // your ajax call here, on success it should call on the
  // parameter it's passed (it's a function), and pass it's
  // parameter the data it received

  // use the url variable defined above if it helps

  $.ajax({
    url: url,
    success: callback
  })
}

function success(parsedJSON) {
  // this function will make a new bar chart, refer to this url:
  // http://www.chartjs.org/docs/#bar-chart
  // you will need to call on:
  //  1. extractTop10Tracks - pass it tracks
  let tracks = extractTop10Tracks( parsedJSON.tracks )
  //  2. extractNames -  pass it the result of #1
  let names = extractNames( tracks )
  //  3. extractPopularity - pass it the result of #1
  let popularities = extractPopularity( tracks )
  //  4. chartData - pass it results of #2 and #3
  let data = chartData( names, popularities )
  //  5. make a variable `ctx` and select the canvas with the id of spotify-chart
  //     * also make sure to specify 2d context
  let ctx = $('#spotify-chart').get(0).getContext("2d")
  //  6. make a new bar chart!
  let spotifyChart = new Chart(ctx).Bar(data)
}
