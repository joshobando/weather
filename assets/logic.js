$(document).ready(function() {

    const apiKey = "16268ba07a6a60efe275cae875758b37";

    const runSearch = () => {
        //get user input from inout box
        const userInput = $("#search-value").val();
        console.log("userInput: ", userInput);
        //clear user inpt
        $("#search-value").val("")

        //generatate current weather
        generateCurrentWeather(userInput);

        //generate forcast for 5 days

        // $.ajax({
        //     type: 'GET',
        //     url:
        //       'http://api.openweathermap.org/data/2.5/forecast?q=' +
        //       searchValue +
        //       '&appid=16268ba07a6a60efe275cae875758b37&units=imperial',
        //     dataType: 'json',

        //create button
    };

    const generateCurrentWeather = (input) => {
        $.ajax({
            type: "GET",
            url: `http://api.openweathermap.org/data/2.5/weather?q=${input}&appid=${apiKey}&units=imperial`,
            dataType: "json",
            success: (data) => {
                console.log("data: ",data);
                //do stuff with data
                const currentWeatherMarkup = `
                    <div class="card">
                        <div class="card-body">
                            <h3 class="card-title">
                                ${data.name} (${new Date().toLocaleDateString()})
                                <img src="http://openweathermap.org/img/w/${data.weather[0].icon}.png">
                            </h3>
                            <p class="card-text">Temperature: ${data.main.temp} °F</p>
                            <p class="card-text">Humidity: ${data.main.humidity} %</p>
                            <p class="card-text">Wind Speed: ${data.wind.speed} MPH</p>
                        </div>
                    </div>
                `;

                $("#today").html(currentWeatherMarkup);
            }
        });
    };

    //add event listener to search btn
    $("#search-button").on("click", runSearch);

    //add event listender to the created buttons
});