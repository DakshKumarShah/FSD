async function fetchWeather(city) {
    const apiKey = "ebd1469062de7ede5e1bac3d3a77fc5a";
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod === 200) {
            document.getElementById('weather').innerHTML = `
                <h2>Weather is : </h2><p>${data.main.temp}°C </p>
            `;
        } else {
            document.getElementById('weather').innerHTML = `<p>Error: ${data.message}</p>`;
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
        document.getElementById('weather').innerHTML = `<p>Unable to fetch weather data.</p>`;
    }
}
document.addEventListener('DOMContentLoaded',() => {
    const stateCityMap = {
        'Andaman and Nicobar': 'Port Blair',
        'Andhra Pradesh' : 'Amaravati',
        'Arunachal Pradesh': 'Itanagar',
        'Assam' : 'Dispur',
        'Bihar' : 'Patna',
        'Chandigarh' : 'Chandigarh',
        'Chhattisgarh' : 'Raipur',
        'Daman and Diu' : 'Daman',
        'Delhi' : 'Delhi',
        'Dadra and Nagar Haveli' : 'Silvassa',
        'Goa' : 'Panaji',
        'Gujarat' : 'Gandhinagar',
        'Himachal Pradesh' : 'Shimla',
        'Haryana' : 'Chandigarh',
        'Jharkhand' : 'Ranchi',
        'Jammu and Kashmir' : 'Srinagar',
        'Karnataka' : 'Bengaluru',
        'Kerala' : 'Thiruvananthapuram',
        'Lakshadweep' : 'Kavaratti',
        'Maharashtra' : 'Mumbai',
        'Meghalaya' : 'Shillong',
        'Manipur' : 'Imphal',
        'Madhya Pradesh' : 'Bhopal',
        'Mizoram' : 'Aizawl',
        'Nagaland' : 'Kohima',
        'Odisha' : 'Bhubaneswar',
        'Punjab' : 'Chandigarh',
        'Puducherry' : 'Pondicherry',
        'Rajasthan' : 'Jaipur',
        'Sikkim' : 'Gangtok',
        'Telangana' : 'Hyderabad',
        'Tamil Nadu' : 'Chennai',
        'Tripura' : 'Agartala',
        'Uttar Pradesh' : 'Lucknow',
        'Uttarakhand' : 'Dehradun',
        'West Bengal' : 'Kolkata'
        
    };
    const state = document.body.getAttribute('data-state');
    if(state && stateCityMap[state]){
        fetchWeather(stateCityMap[state]);
    }
})
