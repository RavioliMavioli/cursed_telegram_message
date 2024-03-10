<div class="main gap-3">
  <h1>Spammer</h1>

  <p1><b>Token:</b></p1> <input class="text-[--theme-white] h-10 translucent" bind:value={$token} placeholder="Example: 6787834603:AAHErySM44OnatbhBcomde2emS6mU7oay0g" />
  <p1><b>Chat ID:</b></p1> <input class="text-[--theme-white] h-10 translucent" bind:value={$chat_id} placeholder="Example: 924181004" />
  <p1><b>Interval:</b></p1> <button class="bg-[--theme-white] hover:bg-[--theme-black] hover:text-[--theme-white] text-[--theme-black] font-bold py-2 px-4 rounded" on:click={() => {speed_clicked = !speed_clicked}}>{interval + "ms"}</button>
    {#if (speed_clicked === true)}
      <button class="bg-[--theme-blue] hover:bg-[--theme-black] hover:text-[--theme-white] text-[--theme-black] font-bold py-2 px-4 rounded" on:click={() => {interval = 3000; speed_clicked = false}}>3000ms</button>
      <button class="bg-[--theme-blue] hover:bg-[--theme-black] hover:text-[--theme-white] text-[--theme-black] font-bold py-2 px-4 rounded" on:click={() => {interval = 1500; speed_clicked = false}}>1500ms</button>
      <button class="bg-[--theme-blue] hover:bg-[--theme-black] hover:text-[--theme-white] text-[--theme-black] font-bold py-2 px-4 rounded" on:click={() => {interval = 1000; speed_clicked = false}}>1000ms</button>
      <button class="bg-[--theme-blue] hover:bg-[--theme-black] hover:text-[--theme-white] text-[--theme-black] font-bold py-2 px-4 rounded" on:click={() => {interval = 500; speed_clicked = false}}>500ms</button>
      <button class="bg-[--theme-blue] hover:bg-[--theme-black] hover:text-[--theme-white] text-[--theme-black] font-bold py-2 px-4 rounded" on:click={() => {interval = 100; speed_clicked = false}}>100ms</button>
      <button class="bg-[--theme-blue] hover:bg-[--theme-black] hover:text-[--theme-white] text-[--theme-black] font-bold py-2 px-4 rounded" on:click={() => {interval = 10; speed_clicked = false}}>10ms</button>

    {/if}
    <p1><b>Custom message:</b></p1> <input class="text-[--theme-white] h-10 translucent" bind:value={$custom_msg} placeholder="Displayed at the first line the message. Example: t.me/conts" />
  <button class="p-2 bg-[--theme-white] hover:bg-[--theme-black] hover:text-[--theme-white] text-[--theme-black] font-bold rounded" on:click={() => {paused = !paused}}>{paused ? "Resume" : "Pause"}</button>
  <div class="flex items-center text-center align-middle self-center p-2 rounded-md 
              {bg_status}">
    <p1><b>Status: </b>{paused ? "Paused" : curr_status}</p1>
  </div>
  <!-- svelte-ignore a11y-missing-attribute -->
  <img src={photo}>
  <p1><b>URL: </b><a href={url} target="_blank" class="px-2 py-1 bg-slate-500 rounded-lg hover:bg-slate-400 font-bold">{url_clean}</a></p1>
  <!-- svelte-ignore a11y-missing-content -->
  <p1><b>Target bot: </b><a href="https://t.me/{bot_name}" target="_blank" class="text-blue-300 underline">{bot_name} (ID: {bot_id})</a></p1>
  <p1><b>Target name:</b> {target_name} (ID: {target_id})</p1>
  <p1><b>Tries:</b> {msg_try}</p1>
  <p1><b>Message sent:</b> {sent}</p1>
  <p1><b>Message:</b> {msg}</p1>
</div>


<script>
import "../app.css"
import axios from 'axios'
import {token, chat_id, custom_msg} from "../lib/store"
import {cursed_text} from "../lib/text"
import {cursed_images} from "../lib/images"

const cursed_arr = cursed_text
const cursed_length = 100
const status = {SUCCESS: "Success", FAILED: "Retrying..."}

let bot_id = ""
let bot_name = ""
let target_name = ""
let target_id = ""
let bg_status = ""
let photo = ""
let msg = ""
let url = ""
let url_clean = ""
let curr_status = "Connecting..."
let interval = 1000
let speed_clicked = false
let paused = true
let msg_try = 0
let sent = 0

function send_msg() {
  var rand_i = Math.floor(Math.random() * cursed_images.length)
  photo = cursed_images[rand_i]

  url_clean = `https://api.telegram.org/bot${$token}/getMe`
  url = `https://api.telegram.org/bot${$token}/sendPhoto?chat_id=${$chat_id}&photo=${photo}&caption=${$custom_msg}%0A${msg}`
  
  axios.get(url)
    .then((res) => {
      if (res.status === 200){
        if (paused === false) bg_status ="bg-[--theme-green]"
        curr_status = status.SUCCESS
        target_name = res.data.result.chat.first_name + " " + res.data.result.chat.last_name
        target_id = res.data.result.chat.id

        bot_name = res.data.result.from.username
        bot_id = res.data.result.from.id
        
        sent += 1
      }
    })
    .catch((res) => {
      bg_status ="bg-[--theme-red]"
      curr_status = `${res.code}, `
      console.log(res.message + " " + res.code)

      if (res.message.includes("400")){
        curr_status += "make sure the chat_id is correct."
        return
      }

      if (res.message.includes("401")){
        curr_status += "make sure the Token is correct."
        return
      }

      if (res.message.includes("404")){
        curr_status += "link not found, fill the token and chat_id, or maybe they no longer work."
        return
      }

      if (res.message.includes("429")){
        curr_status += "target overloaded due to too many requsts. Retrying..."
        return
      }

      curr_status += status.FAILED
    })
}

function send(){
  if (paused === true) return
  send_msg()
  msg_try += 1
  if (curr_status !== status.SUCCESS) return
  if (msg.length > cursed_length){
      msg = ""
    }
  const rand_arr = Math.floor(Math.random() * cursed_length)
  for (var i = 1; i <= rand_arr; i++){
    var rand_i = Math.floor(Math.random() * cursed_arr.length)
    msg += ` ${cursed_arr[rand_i]}`
  }
}

function loop(){
  setTimeout(()=>{
    send()
    loop()
  }, interval)
}

$:{
  loop()
}

</script>


<style>
  .main{
    display: flex;
    flex-direction: column;
    width: 90%;
    height: 100%;
    padding: 20px;
  }
  .main img {
    width: 250px;
    height: 250px;
  }
  .main button {
    @apply w-24
  }
</style>
