<div class="main">
  <h1>Spammer</h1>
  <button on:click={() => {paused = !paused}}>{paused ? "Resume" : "Pause"}</button>
  <!-- svelte-ignore a11y-missing-attribute -->
  <img src={photo} sizes="">
  <p><b>Message:</b> {msg}</p>
  <p><b>Iteration:</b> {iteration}</p>
  <p><b>Status:</b> {paused ? "Paused" : curr_status}</p>
<p><b>URL:</b> {url_clean}</p>
</div>


<script>
import axios from 'axios'
import {tg} from "../lib/index"
import {onMount} from 'svelte'
import {cursed_text} from "../lib/text"
import {cursed_images} from "../lib/images"

const cursed_arr = cursed_text
const cursed_length = 100
const max_iteration = 1000
const interval = 2000
const status = {SUCCESS: "Success", FAILED: "Failed, retrying..."}

let photo = ""
let paused = true
let msg = ""
let iteration = 0
let url_clean = ""
let curr_status = status.FAILED

function send() {
  var rand_i = Math.floor(Math.random() * cursed_images.length)
  photo = cursed_images[rand_i]
  
  url_clean = `https://api.telegram.org/bot${tg.token}/getMe`
  const url = `https://api.telegram.org/bot${tg.token}/sendPhoto?chat_id=${tg.chat_id}&photo=${photo}&caption=${msg}`
  
  axios.get(url)
    .then((res) => {
      if (res.status === 200){
        curr_status = status.SUCCESS
        
      }
      else {
        curr_status = status.FAILED
      }
    })
  }

onMount(() => {
  setInterval(()=>{

    if (paused === true) return
    send()
    if (curr_status !== status.SUCCESS) return

    if (msg.length > cursed_length){
        msg = ""
      }
    if (iteration <= max_iteration){
      const rand_arr = Math.floor(Math.random() * cursed_length)
      for (var i = 1; i <= rand_arr; i++){
        var rand_i = Math.floor(Math.random() * cursed_arr.length)
        msg += ` ${cursed_arr[rand_i]}`
      }
    }
    
    iteration += 1
  }, interval)
})

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
    height: auto;
  }
  .main button{
    width: 100px;
    padding: 3px;
    margin-top: 10px;
    margin-bottom: 10px;
  }
</style>