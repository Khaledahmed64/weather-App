// // today vars
// var todayName = document.getElementById("todayDateDayName")
// var todayNumber = document.getElementById("todayDateDayNo")
// var todayMonth= document.getElementById("todayDateMonth")
// var todayLocation = document.getElementById("todayLocation")
// var todayTemp =document.getElementById("todayTemp")
// var todayConditionImg = document.getElementById("todayConditionImg")
// var todayConditionText =document.getElementById("todayConditinText")
// var humidity = document.getElementById("humidity")
// var wind =document.getElementById("wind")
// var windDirection = document.getElementById("windDirection")


// // next Data
// var nextDay =document.getElementsByClassName("nextDayName")
// var nextMaxTemp =document.getElementsByClassName("nextMaxTemp")
// var nextMinTemp =document.getElementsByClassName("nextMinTemp")
// var nextConditionImg = document.getElementsByClassName("nextConditionImg")
// var nextConditionText = document.getElementsByClassName("nextConditionText")

// // search input
// var searchInput = document.getElementById("search")


// // fetch api Data
// async function getWeatherData()
// {
//    var weatherResponse = await fetch("https://api.weatherapi.com/v1/search.json?key=2a11f47305e5424c90832323240907&q=${a}&days=3")
//    var weatherData =  await weatherResponse.json()
//    return(weatherData);

// }
// getWeatherData()



// // display todayData
// function displayTodayData(data){
//     todayLocation.innerHTML = data.name
//     todayTemp.innerHTML = data.current.temp

// }

// //display next data

// //start app
// async function startApp(){
//    var weatherData =  await getWeatherData()
//    displayTodayData(weatherData)

// }
// startApp()










async function search(a) {
   let t = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=2a11f47305e5424c90832323240907&q=${a}&days=3`);
   if (t.ok && 400 != t.status) {
       let a = await t.json();
       displayCurrent(a.location, a.current),
       displayAnother(a.forecast.forecastday)
   }
}
document.getElementById("search").addEventListener("keyup", a=>{
   search(a.target.value)
}
);
var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
function displayCurrent(a, t) {
   if (null != t) {
       var e = new Date(t.last_updated.replace(" ", "T"));
       let n = `<div class="today forecast">\n    <div class="forecast-header"  id="today">\n    <div class="day">${days[e.getDay()]}</div>\n    <div class=" date">${e.getDate() + monthNames[e.getMonth()]}</div>\n    </div> \x3c!-- .forecast-header --\x3e\n    <div class="forecast-content" id="current">\n    <div class="location">${a.name}</div>\n    <div class="degree">\n        <div class="num">${t.temp_c}<sup>o</sup>C</div>\n      \n        <div class="forecast-icon">\n            <img src="https:${t.condition.icon}" alt="" width=90>\n        </div>\t\n    \n    </div>\n    <div class="custom">${t.condition.text}</div>\n    <span><img src="imgs/fotos4.png" alt="">20%</span><span><img src="imgs/fotos5.png" alt="">18km/h</span><span><img src="imgs/fotos6.png" alt="">East</span>\n    </div>\n</div>`;
       document.getElementById("forecast").innerHTML = n
   }
}
function displayAnother(a) {
   let t = "";
   for (let e = 1; e < a.length; e++)
       t += `\t<div class="forecast">\n        <div class="forecast-header">\n            <div class="day">${days[new Date(a[e].date.replace(" ", "T")).getDay()]}</div>\n        </div> \x3c!-- .forecast-header --\x3e\n        <div class="forecast-content">\n            <div class="forecast-icon">\n                <img src="https:${a[e].day.condition.icon}" alt="" width=48>\n            </div>\n            <div class="degree">${a[e].day.maxtemp_c}<sup>o</sup>C</div>\n            <small>${a[e].day.mintemp_c}<sup>o</sup></small>\n            <div class="custom">${a[e].day.condition.text}</div>\n        </div>\n        </div>`;
   document.getElementById("forecast").innerHTML += t
}
search("cairo");
