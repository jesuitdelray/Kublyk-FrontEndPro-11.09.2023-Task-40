function getWeather() {
    let city = prompt("Введіть назву міста (наприклад, LVIV):")

    while (!city || !isNaN(city)) {
        if (!city) {
            alert("Ви не ввели назву міста.")
        } else {
            alert("Назва міста не повинна бути числом.")
        }
        city = prompt("Введіть назву міста (наприклад, LVIV):")
    }

    const apiKey = "5d066958a60d315387d9492393935c19"
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${apiKey}`

    fetch(apiUrl)
        .then(response => {
            if (response.status !== 200) {
                console.error("Помилка отримання даних")
                return
            }
            return response.json()
        })
        .then(data => {
            const temperature = data.main.temp
            const pressure = data.main.pressure
            const description = data.weather[0].description
            const humidity = data.main.humidity
            const windSpeed = data.wind.speed
            const windDirection = data.wind.deg
            const weatherIcon = data.weather[0].icon

            const weatherInfo = document.getElementById("weather-info")
            weatherInfo.innerHTML = `
                <h2>Погода у місті ${city}</h2>
                <p>Температура: ${temperature}°C</p>
                <p>Тиск: ${pressure} hPa</p>
                <p>Опис: ${description}</p>
                <p>Вологість: ${humidity}%</p>
                <p>Швидкість вітру: ${windSpeed} м/с</p>
                <p>Напрям вітру: ${windDirection}°</p>
                <img src="http://openweathermap.org/img/w/${weatherIcon}.png" alt="Погодний значок">
            `
        })
        .catch(error => {
            console.error("Помилка:", error)
        })
}
