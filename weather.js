var key = '67c7ce236adf1f23df2005bdcd06a10f';
var city = "Minneapolis"
var date = moment().format('dddd, MMMM Do YYYY');
var dateTime = moment().format('YYYY-MM-DD HH:MM:SS');
var cityHistory = [];

$('.search').on("click", function (event) {
    event.preventDefault();
    city = $(this).parent('.btnPar').siblings('.textVal').val().trim();
    if (city === "") {
        return;
    };
    cityHistory.push(city);
    localStorage.setItem('city', JSON.stringify(cityHistory));
	fiveForecastEl.empty();
	getHistory();
	getWeatherToday(city);
	// getFiveday(city);
});

var contHistEl = $('.cityHist');
function getHistory() {
    contHistEl.empty();
for (let i = 0; i < cityHistory.length; i++) {
    
    var rowEl = $('<row>');
	var btnEl = $('<button>').text(`${cityHistory[i]}`)

        rowEl.addClass('row histBtnRow');
		btnEl.addClass('btn histBtn');
		btnEl.attr('type', 'button');

		contHistEl.prepend(rowEl);
		rowEl.append(btnEl);
	} if (!city) {
		return;
	}

	$('.histBtn').on("click", function (event) {
		event.preventDefault();
		city = $(this).text();
		fiveForecastEl.empty();
		getWeatherToday(city);
	});


};

var todayForecast = $('.containForecast')

function getWeatherToday(city) {
var currentUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=67c7ce236adf1f23df2005bdcd06a10f`;
$(todayForecast).empty();

$.ajax({
	url: currentUrl,
	method: 'GET',}).then(function (response) {$('.cardTodayCityName').text(response.name);
	$('.cardTodayDate').text(date);
	$('.icons').attr('src', `https://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png`);
	var elTempfeel = $('<p>').text(`Temperature: ${response.main.temp} °F`);
	todayForecast.append(elTempfeel);
	var elTemp = $('<p>').text(`Feels Like: ${response.main.feels_like} °F`);
	todayForecast.append(elTemp);
	var elHumid = $('<p>').text(`Humidity: ${response.main.humidity} %`);
	todayForecast.append(elHumid);
	var elWind = $('<p>').text(`Wind Speed: ${response.wind.speed} MPH`);
	todayForecast.append(elWind);
	
})

};
var fiveForecastEl = $('.Fiveforecast');

function getFiveday(city) {
	var weathArray = [];
	var fiveUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=67c7ce236adf1f23df2005bdcd06a10f`;
$.ajax({
	url: fiveUrl,
	method: 'GET', }).then(function (response) {
		var fiveDayarray = response.list;
		
		$.each(fiveDayarray, function (index, value) {
			weathObj = {
				date: value.dt_txt.split(' ')[0],
				time: value.dt_txt.split(' ')[1],
				temp: value.main.temp,
				feels_like: value.main.feels_like,
				icon: value.weather[0].icon,
				humidity: value.main.humidity
			}
			weathArray.push(weathObj);
			if (value.dt_txt.split(' ')[1] === "12:00:00") {
				
			}
		})
console.log(weathArray);
	for (let i = 0; i < 5; i++) {
		var elCard = $('<div>');
		elCard.attr('class','card');
		elCard.attr('style','max-width: 300px;');
		fiveForecastEl.append(elCard);

		var elHeader = $('<div>'); 
		elHeader.attr('class','card-header');
		var datee = moment(`${weathArray[i].date}`).format('MM-DD-YYYY');
		elHeader.text(datee);
		elCard.append(elHeader);

		var elBody = $('<div>');
		elBody.attr('class','card-body');
		elCard.append(elBody);

		var elIcon = $('<img>');
		elIcon.attr('class','icons');
		elIcon.attr('src', `https://openweathermap.org/img/wn/${weathArray[i].icon}@2x.png`);
		elBody.append(elIcon);


			
	var elTempfeel = $('<p>').text(`Temperature: ${weathArray[i].temp} °F`);
	elBody.append(elTempfeel);
	var elTemp = $('<p>').text(`Feels Like: ${weathArray[i].feels_like} °F`);
	elBody.append(elTemp);
	var elHumid = $('<p>').text(`Humidity: ${weathArray[i].humidity} %`);
	elBody.append(elHumid);
	}
});


	
};
function loadAll() {
	var cityData = JSON.parse(localStorage.getItem('city'));
	if(cityData !== null) {cityHistory = cityData}
	getHistory();
	getWeatherToday();


};
loadAll();