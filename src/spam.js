const { default: axios } = require("axios")

let i = 0
const url = "https://api.telegram.org/bot6341956598:AAFpJQvO54Xn78G7D3bcuhEwg244XyryMWY/sendMessage?parse_mode=markdown&chat_id=5801319391&text=Menyala%20abangkuh"

const spam = () => {
  axios.get(url)
    .then(() => {
      console.log(`Bliaw berhasil dispam ${i++} kali`)
      spam()
      spam()
    })
}

spam()