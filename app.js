window.addEventListener("load", () => {
  let long;
  let lat;
  let temperatureDescription = document.querySelector(
    ".temperature-description"
  );
  let temperatureDegree = document.querySelector(".temperature-degree");
  let locationTimezone = document.querySelector(".location-timezone");
  let temperatureSection = document.querySelector(".temperature");
  const temperatureSpan = document.querySelector(".temperature span");

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=a91dc4f621cbeae0e61c58b5d0849c5d`;
   
      https: fetch(api)
        .then((response) => {
          return response.json();
          
        })
        .then((data) => {
          console.log(data);
          const temp = data.main.temp;
          const iconData = data.weather[0].icon;

          //turn kelvin to fahrenheit
          const tempFahrenheit = Math.floor(((temp - 273.15) * 9) / 5 + 32);
          //formula for Celsius
          let celsius = (tempFahrenheit - 32) * (5 / 9);

          //Set DOM Elements from the API
          temperatureDegree.textContent = tempFahrenheit;
          locationTimezone.textContent = data.timezone;

          //Set Icon
          let icon = document.querySelector(".icon");
          icon.src = `https://openweathermap.org/img/w/${iconData}.png`;
          
          //Set location
          let location = document.querySelector(".temperature-location");
          location.innerText = data.name;

          //Change temperature to Celsius/Fahrenheit
          temperatureSection.addEventListener("click", () => {
            if (temperatureSpan.textContent === "F") {
              temperatureSpan.textContent = "C";
              temperatureDegree.textContent = Math.floor(celsius);
            } else if (temperatureSpan.textContent === "C") {
              temperatureSpan.textContent = "F";
              temperatureDegree.textContent = tempFahrenheit;
            }
          });
        });
    });
  }
});

