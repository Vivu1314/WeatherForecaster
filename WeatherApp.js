let search = document.querySelector('.search')
let city = document.querySelector('.city')
let country = document.querySelector('.country')
let time = document.querySelector('.time')
let TempC = document.querySelector('.temC')
// let TempF = document.querySelector('.temF')
let ShortDesc = document.querySelector('.short-desc')
let visibility = document.querySelector('.visibility span')
let wind = document.querySelector('.wind span')
let humidity = document.querySelector('.humidity .humid')
let body = document.querySelector('body')
let weather = document.querySelector('#weather')

//Hàm Lấy giá trị thời gian hiện tại trên máy tính
// function currentDate() {
//     const now = new Date();

//     let date = now.getDate(); // Lấy giá trị ngày hiện tại
//     let month = now.getMonth() + 1; // Lấy giá trị tháng hiện tại (chú ý: tháng bắt đầu từ 0)
//     let year = now.getFullYear(); // Lấy giá trị năm hiện tại
//     // var hours = now.getHours(); // Lấy giá trị giờ hiện tại
//     // var minutes = now.getMinutes(); // Lấy giá trị phút hiện tại

//     const options = {
//         hour: 'numeric',
//         minute: 'numeric',
//         hour12: true,
//         day: "numeric",
//         month: "numeric",
//         year: "numeric",
//     };
//     // Hiển thị ngày và giờ hiện tại
//     const timeString = now.toLocaleTimeString('en-US', options);
//     time.innerText = timeString
// }

//Call API
async function changeWeatherUI() {
    try {
        let capitalSearch = search.value.trim()
        let APIURL = `http://api.weatherapi.com/v1/current.json?key=b73756f5a41c478d905142804230204&q=${capitalSearch}&aqi=no`
        let data = await fetch(APIURL).then(res => res.json())
        console.log(data)
        city.innerText = data.location.name
        country.innerText = data.location.country
        time.innerText = data.location.localtime
        TempC.innerHTML = data.current.temp_c
        // TempF.innerHTML = data.current.temp_f
        ShortDesc.innerText = data.current.condition.text
        visibility.innerText = data.current.vis_km * 1000 + " m"
        wind.innerText = data.current.wind_kph + " kph"
        humidity.innerText = data.current.humidity + " %"

        //change body background
        const imageBodyName = data.current.condition.text.toLowerCase()
        const imageBodyPath = `linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.3)), url('Images/background/${imageBodyName}.jpg') no-repeat center/cover`
        document.body.style.background = imageBodyPath

        //change weather background
        let tempCompare = data.current.temp_c
        console.log(tempCompare)
        if (tempCompare >= 30) {
            weather.setAttribute('class', 'hot')
        } else if (tempCompare >= 20) {
            weather.setAttribute('class', 'warm')
        } else if (tempCompare >= 10) {
            weather.setAttribute('class', 'cool')
        } else {
            weather.setAttribute('class', 'cold')
        }
    } catch (error) {
        city.innerText = 'No matching location found'
        country.innerText = ''
        time.innerText = ''
        TempC.innerHTML = ''
        // TempF.innerHTML = data.current.temp_f
        ShortDesc.innerText = ''
        visibility.innerText = " m"
        wind.innerText = " kph"
        humidity.innerText = " %"
        document.body.style.background = imageBodyPath
        // body.setAttribute('class', 'nothing')
    }
}

//resizeText

// function resizeText() {
//     const offsetHeightBefore = country.offsetHeight;    
//     console.log('offsetHeightBefore',offsetHeightBefore)
//     setTimeout(function() {
//         // Lấy lại giá trị chiều cao của element
//         const offsetHeightAfter = country.offsetHeight;
//         console.log("offsetHeightAfter", offsetHeightAfter);
//       }, 500);
//     if (offsetHeightAfter > offsetHeightBefore) {
//         // const fontSize = parseInt(window.getComputedStyle(country).fontSize);
//         // const newFontSize = Math.floor(containerWidth / (textWidth / fontSize));
//         // country.style.fontSize = newFontSize + 'px';
//         console.log('hello')
//     }
// } //vẫn chưa ra =))

// window.addEventListener('resize', resizeText);

// run function
// currentDate()
// resizeText();

//Lấy giá trị search là Ha Noi khi vừa load trang
document.addEventListener('DOMContentLoaded', function () {
    search.value = 'Ha Noi';
    changeWeatherUI();
});
search.addEventListener('keypress', function (e) {
    // console.log(e.code)
    if (e.code === 'Enter' || e.code === 'NumpadEnter') {
        changeWeatherUI()
        search.value = ''
    }
})