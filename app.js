const express = require("express");
const https = require("https");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));



app.use(express.static("public"));
const _ = require('lodash');

app.set('view engine', 'ejs');

app.get("/", function (req, res) {

    res.sendFile(__dirname + "/index.html");

});

app.get('/cityChoose', (req, res) => {
    res.sendFile(__dirname + "/city.html")
  });

app.post("/", function(req, res) {

   
    const movie = _.lowerCase(req.body.movieName);
    const movieName = movie.split(' ').join('');
    console.log(movieName);
    
    const options = {
        method: 'GET',
        hostname: 'online-movie-database.p.rapidapi.com',
        port: null,
        path: '/auto-complete?q=' + movieName,
        headers: {
            'X-RapidAPI-Key': '67f844e73cmshd4f00f313c7f764p16df7bjsn9c904b2503d3',
            'X-RapidAPI-Host': 'online-movie-database.p.rapidapi.com'
        }
    };


    https.get(options, function (apiResponse) {
        let data = '';

        apiResponse.on("data", function (chunk) {
            data += chunk;
        });

        apiResponse.on("end", function () {
            const response = JSON.parse(data);
            // Extract the required data from the response and pass it to the template
            res.render("desc", { actorNames: response.d[0].s, movieName: response.d[0].l, img: response.d[0].i.imageUrl });
        });
    });
});

// app.post("/desc", function(req, res)
// {
//     res.render("book");
// });

app.post("/payment", function(req, res)
{
    res.sendFile(__dirname + "/payment.html");
});

app.post("/cityChoose", function(req, res)
{
    res.sendFile(__dirname + "/city.html");
});

app.post("/book", function(req, res) {
    res.render("book");
})


var lat = 0;
var lon = 0;

app.post("/selectCinema", function(req, res) {
    const name = req.body.cityName;
    const cityName = _.lowerCase(name);

    const lUrl = 'https://api.openweathermap.org/geo/1.0/direct?q=' + cityName + ',&limit=1&appid=f03da1b3271bb7575aca5ff38d40bb25';

    https.get(lUrl, function(response) {
    
        response.on("data", function(data) {

            try {
                const wData = JSON.parse(data);
            const l = wData[0].lat;
            const lo = wData[0].lon;
            lat = l;
            lon = lo;

            makeMovieGluAPIRequest(res);
            }
            catch(error) {
                res.send("Entered city is not availabe");
            }
            
           
        });

        
    });

    function makeMovieGluAPIRequest(res) {
        const apiUrl = 'https://api-gate2.movieglu.com/cinemasNearby/?n=5'; // Replace with the appropriate endpoint URL
      
        const headers = {
          'x-api-key': 'Uff4FXvEPTZhoG6zOApE3pMtcKsxAHx1SVDZxM1g',
          'Authorization': 'Basic UFJPSl8zMDpkT0lhWHVhekZzbG8=',
          'geolocation': lat + ';' + lon,
          'client': 'PROJ_30',
          'territory': 'IN',
          'api-version': 'v200',
          'device-datetime': '2023-07-27T08:22:46.064Z',
        };
      
        const options = {
          headers: headers
        };
      
        https.get(apiUrl, options, (response) => {
          let data = '';
      
          response.on('data', (chunk) => {
            data += chunk;
          });
      
          response.on('end', () => {
            try {
                const d = JSON.parse(data);
                // Use 'd' here for further processing of the JSON data
                const cin0 = d.cinemas[0].cinema_name;
            const cin1 = d.cinemas[1].cinema_name;
            const cin2 = d.cinemas[2].cinema_name;
            const cin3 = d.cinemas[3].cinema_name;
            const cin4 = d.cinemas[4].cinema_name;
            
            const add0 = d.cinemas[0].address;
            const add1 = d.cinemas[1].address;
            const add2 = d.cinemas[2].address;
            const add3 = d.cinemas[3].address;
            const add4 = d.cinemas[4].address;
            
            res.render("moviehalls", {c0:cin0, c1:cin1, c2:cin2, c3:cin3, c4:cin4, a0:add0, a1:add1, a2:add2, a3:add3, a4:add4});
              } 
              
              catch (error) {
                res.send("Entered city is not availabe");
              }
            
            
           
          });
        }).on('error', (error) => {
          console.error('Error:', error.message);
        });
      }
      
      // Call the function to make the API request
     


});



app.post("/success", function(req, res)
{
    res.sendFile(__dirname + "/success.html");
});

app.post("/goback", function(req, res)
{
    res.redirect("/");
});






app.listen(3000, function()
{
    console.log("Server is running");
});