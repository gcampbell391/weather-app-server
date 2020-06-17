console.log('client side jaavscript is loaded')

const weatherForm = document.querySelector('form')
const messageOne = document.querySelector('#messageOne')
const messageTwo = document.querySelector('#messageTwo')
const weatherIcon = document.querySelector('#forecast_icon')


weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()
    const address = event.target.querySelector('input').value

    fetch(`http://localhost:3000/weather?address=${address}`)
        .then(resp => resp.json())
        .then(data => {
            console.log(data)
            messageOne.innerHTML = data.location
            messageTwo.innerHTML = data.forecastData.description
            weatherIcon.src = data.forecastData.forecast_icon
        })
    weatherForm.reset();
})