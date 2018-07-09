const TelegramBot = require('node-telegram-bot-api')
require('dotenv').config()

const token = process.env.TELEGRAM-KEY
const weatherToken = process.env.WEATHER_KEY;

const bot = new TelegramBot(token, {polling: true})

bot.on('message', (msg) => {
    var hi = "hola";
    if(msg.text.toString().toLowerCase().indexOf(hi)===0){
        bot.sendMessage(msg.chat.id, `Hola ${msg.from.first_name}`);
    }
})

'230c6f8418242ce57fbfae6b311a1f75'