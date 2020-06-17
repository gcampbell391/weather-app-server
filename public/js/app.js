console.log('client side jaavscript is loaded')

fetch('http://localhost:3000/weather?address=woodstock')
    .then(resp => resp.json())
    .then(data =>
        console.log(data)
    )