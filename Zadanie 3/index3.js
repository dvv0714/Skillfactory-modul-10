let url = 'wss://echo.websocket.org/'

let infoOutput = document.querySelector('.info_output')
let chatOutput = document.querySelector('.chat_output')
let input = document.querySelector('input')
let sendBtn = document.querySelector('.btn_send')
let btnOpen = document.querySelector('.btn_open')
let btnClose = document.querySelector('.btn_close')
let btnLocation = document.querySelector('.btn_getLocation')

let websocket

btnOpen.addEventListener('click', () => {
    websocket = new WebSocket(url)

    websocket.onopen = (event) => {
        infoOutput.innerHTML = '<span style="color: blue;">Соединение установлено</span>'
    }

    websocket.onclose = (event) => {
        infoOutput.innerHTML = '<span style="color: red;">Соединение закрыто</span>'
    }

    websocket.onmessage = (event) => {
        writeToChat(event.data, true)
    }

    websocket.onerror = (event) => {
        infoOutput.innerHTML = 'При передаче данных произошла ошибка'
    }

    sendBtn.addEventListener('click', function() {
        if (!input.value) return
        websocket.send(input.value)
        writeToChat(input.value, false)
        input.value === ''
    })

    btnClose.addEventListener('click', () => {
        websocket.close()
        websocket = null
    })

    function writeToChat(message, isRecieved) {
        let messageHTML = `
        <div class="${isRecieved? "recieved" : "sent"}">${message}</div>`
        chatOutput.innerHTML += messageHTML
    }


    btnLocation.addEventListener('click', function() {
        if (!navigator.geolocation) {
            infoOutput.textContent = 'Geolocation не поддерживается вашим браузером' 
        } else {
            navigator.geolocation.getCurrentPosition((position) => {
                let latitude = position.coords.latitude
                let longitude = position.coords.longitude
                let mapLink = document.createElement('a')
                let geo_url = 
                `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`
                mapLink.href = geo_url
                mapLink.textContent = 'Моя локация'
                websocket.send(geo_url)
                writeToChat(mapLink.outerHTML, false)
                
            })
        }
    })
})

