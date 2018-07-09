process.env["NTBA_FIX_319"] = 1;

const TelegramBot = require('node-telegram-bot-api')
const request= require('request')
require('dotenv').config()

const token = process.env.TELEGRAM_KEY
const weatherToken = process.env.WEATHER_KEY


const bot = new TelegramBot(token, {polling: true})

function getDatos(datos){
    let d = JSON.parse(datos);

    let imgStream = request.get(`http://openweathermap.org/img/w/${d.weather[0].icon}.png`)

    return {
        info: `${d.main.temp}°C`,
        imagen: imgStream
    }
}

bot.on('message', (msg) => {

    //obtengo el texto y lo paso a lowercase
    let texto = msg.text.toString().toLowerCase()
    //limpio acentos y cosas así
    let cleaned = texto.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
    //url para hacer petición
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${cleaned}&appid=${weatherToken}&units=metric`;

    const fileOptions = {
        height: 50,
        width: 50
    }

    //request a la api
    return request(url, (err, resp, body)=>{
        let result = getDatos(body);
        bot.sendPhoto(msg.chat.id, result.imagen,{caption: result.info}, {}, fileOptions, {parse_mode: "HTML"})
    })

})