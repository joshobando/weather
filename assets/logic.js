// $(document).ready(function () {

//     const apiKey = "16268ba07a6a60efe275cae875758b37";

//     const runSearch = () => {
//         //get user input from inout box
//         const userInput = $("#search-value").val();
//         console.log("userInput: ", userInput);
//         //clear user inpt
//         $("#search-value").val("")

//         //generatate current weather
//         generateCurrentWeather(userInput);

//         //generate forcast for 5 days

//         // $.ajax({
//         //     type: 'GET',
//         //     url:
//         //       'http://api.openweathermap.org/data/2.5/forecast?q=' +
//         //       searchValue +
//         //       '&appid=16268ba07a6a60efe275cae875758b37&units=imperial',
//         //     dataType: 'json',

// <<<<<<< HEAD
//         //check for duplicates
//         if ($.inArray(userInput, history) === -1) {
//             //store cities in local storage
//             history.push(userInput);
//             //add updated history to local storage
//             localStorage.setItem("history", JSON.stringify(history));
//         };
// =======
//         //create button
// >>>>>>> parent of 89deb21... finished logic for forecast
//     };

//     const generateCurrentWeather = (input) => {
//         $.ajax({
//             type: "GET",
//             url: `http://api.openweathermap.org/data/2.5/weather?q=${input}&appid=${apiKey}&units=imperial`,
//             dataType: "json",
//             success: (data) => {
//                 console.log("today data: ", data);
//                 //do stuff with data
//                 const currentWeatherMarkup = `
//                     <div class="card">
//                         <div class="card-body">
//                             <h3 class="card-title">
//                                 ${data.name} (${new Date().toLocaleDateString()})
//                                 <img src="http://openweathermap.org/img/w/${data.weather[0].icon}.png">
//                             </h3>
//                             <p class="card-text">Temperature: ${data.main.temp} °F</p>
//                             <p class="card-text">Humidity: ${data.main.humidity} %</p>
//                             <p class="card-text">Wind Speed: ${data.wind.speed} MPH</p>
//                         </div>
//                     </div>
//                 `;

//                 $("#today").html(currentWeatherMarkup);
//             }
//         });
//     };

//     const generateForecast = (input) => {
//         $.ajax({
//             type: "GET",
//             url: `http://api.openweathermap.org/data/2.5/forecast?q=${input}&appid=${apiKey}&units=imperial`,
//             dataType: "json",
//             success: (data) => {
//                 console.log("forcast data: ", data);
//                 //do stuff with data
//                 let forecastWeatherMarkup = "";

//                 for (let i = 0; i < data.list.length; i++) {
//                     if (data.list[i].dt_txt.indexOf("9:00:00") > -1) {
//                         forecastWeatherMarkup += `
//                             <div class="col-md-2"
//                                 <div class="card bg-primary text-white">
//                                     <div class="card-body p-2">
//                                         <h5 class="card-title">${new Date(data.list[i].dt_txt).toLocaleDateString()}</h5>
//                                         <img src="http://openweathermap.org/img/w/${data.list[i].weather[0].icon}.png">
//                                         <p class="card-text">Temp: ${data.list[i].main.temp} °F</p>
//                                         <p class="card-text">Humidity: ${data.list[i].main.humidity}%</p>
//                                     </div>
//                                 </div>
//                             </div>
//                         `;
//                     }
//                 }

//                 $("#forecast").html(forecastWeatherMarkup);
//             }
//         });
//     };

//     //initilaize all butns
//     for (let i = 0; i < history.length; i++) {
//         createButton(history[i]);
//     }

//     //add event listener to search btn
//     $("#search-button").on("click", runSearch);

//     //add event listender to the created buttons
// });

$(document).ready(function() {

    const apiKey = "16268ba07a6a60efe275cae875758b37";

    const history = JSON.parse(localStorage.getItem("history")) || [];

    const runSearch = () => {
        //get user input from inout box
        const userInput = $("#search-value").val();
        console.log("userInput: ", userInput);
        //clear user inpt
        $("#search-value").val("")

        //generatate current weather
        generateCurrentWeather(userInput);

        //generate forcast for 5 days
        generateForecast(userInput);

        //create button
        createButton(userInput);

        //check for duplicates
        if ($.inArray(userInput,history) === -1) {
            //store cities in local storage
            history.push(userInput);
            //add updated history to local storage
            localStorage.setItem("history",JSON.stringify(history));
        };
    };

    //add event listender to the created buttons
    const createButton = (input) => {
        //create the button markup
        let cityButton = $("<button>");
        cityButton.addClass(".city-btn");
        cityButton.text(input);
        //add button to list
        $(".history").append(cityButton);
        //add event listener
        cityButton.on("click", () => {
            //generatate current weather
            generateCurrentWeather(input);

            //generate forcast for 5 days
            generateForecast(input);
        });
    }

    const generateCurrentWeather = (input) => {
        $.ajax({
            type: "GET",
            url: `https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=${apiKey}&units=imperial`,
            dataType: "json",
            success: (data) => {
                console.log("today data: ",data);
                //do stuff with data
                const currentWeatherMarkup = `
                    <div class="card">
                        <div class="card-body">
                            <h3 class="card-title">
                                ${data.name} (${new Date().toLocaleDateString()})
                                <img src="https://openweathermap.org/img/w/${data.weather[0].icon}.png">
                            </h3>
                            <p class="card-text">Temperature: ${data.main.temp} °F</p>
                            <p class="card-text">Humidity: ${data.main.humidity}%</p>
                            <p class="card-text">Wind Speed: ${data.wind.speed} MPH</p>
                        </div>
                    </div>
                `;

                $("#today").html(currentWeatherMarkup);
            }
        });
    };
    
    const generateForecast = (input) => {
        $.ajax({
            type: "GET",
            url: `https://api.openweathermap.org/data/2.5/forecast?q=${input}&appid=${apiKey}&units=imperial`,
            dataType: "json",
            success: (data) => {
                console.log("forcast data: ",data);
                //do stuff with data
                let forecastWeatherMarkup = "";
                
                for (let i = 0; i < data.list.length; i++) {
                    if (data.list[i].dt_txt.indexOf("9:00:00") > -1) {
                        forecastWeatherMarkup += `
                            <div class="col-md-2"
                                <div class="card bg-primary text-white">
                                    <div class="card-body p-2">
                                        <h5 class="card-title">${new Date(data.list[i].dt_txt).toLocaleDateString()}</h5>
                                        <img src="https://openweathermap.org/img/w/${data.list[i].weather[0].icon}.png">
                                        <p class="card-text">Temp: ${data.list[i].main.temp} °F</p>
                                        <p class="card-text">Humidity: ${data.list[i].main.humidity}%</p>
                                    </div>
                                </div>
                            </div>
                        `;
                    }
                }

                $("#forecast").html(forecastWeatherMarkup);
            }
        });
    };

    //initilaize all butns
    for (let i = 0; i < history.length; i++) {
        createButton(history[i]);
    }

    //add event listener to search btn
    $("#search-button").on("click", runSearch);
});