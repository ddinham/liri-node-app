require("dotenv").config();
var action = process.argv[2];
var value = process.argv[3];
var Twitter = require("twitter");
var Spotify = require("spotify");
var keys = require("./keys.js");

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);
var params = {
  screen_name: "DdTEST13",
  count: 20
}

var fs = require("fs");

switch (action) {
  case "my-tweets":
    myTweets();
    break;
  case "spotify-this-song":
    spotifyThisSong(value);
    break;
  case "movie-this":
    moveThis(value);
    break;
  case "random":
    random();
    break;
}

// code instructions to hold twitter and spotify information.



var nodeArgs = process.argv;

var value = "";


for (var i = 2; i < nodeArgs.length; i++) {

  if (i > 2 && i < nodeArgs.length) {

    value = value + "+" + nodeArgs[i];

  } else {

    value += nodeArgs[i];

  }
}

function moveThis(value) {
  if (value == null) {
    value = 'mrnobody';
  }


  var queryUrl = "http://www.omdbapi.com/?t=" + value + "&y=&plot=short&apikey=trilogy";

  request(queryUrl, function (error, response, body) {

      // If the request is successful
      if (!error && response.statusCode === 200) {

        console.log("Title of the movie:  " + JSON.parse(body).Title + "\nRelease Year: " + JSON.parse(body).Year +
          "\nIMDB Rating:  " + JSON.parse(body).imdbRating + "\nRotten Tomatoes Score:  " + JSON.parse(body).incTomatoes +
          "\nCountry: " + JSON.parse(body).Country + "\nLanguage: " + JSON.parse(body).Language +
          "\nPlot: " + JSON.parse(body).Plot + "\nActors: " + JSON.parse(body).Actors);

      }
    });
  }

function random() {
  fs.readFile("random.txt", "utf8",
    function (error, data) {
      if (error) {
        console.log(error);
      } else {
        var dataArr = data.split(",");
        if (dataArr[0] === "spotify-this-song") {
          spotifyThisSong(dataArr[1]);
        }
        if (dataArr[0] === "movie-this") {
        moveThis(dataArr[1]);
        }
      }

    });
  }