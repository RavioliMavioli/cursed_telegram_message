import { writable } from 'svelte/store'
import { browser } from '$app/environment'


export const token = writable(browser && localStorage.getItem("token") || "")
export const chat_id = writable(browser && localStorage.getItem("chat_id") || "")
export const custom_msg = writable(browser && localStorage.getItem("custom_msg") || "")

token.subscribe((val) => {
  browser && localStorage.setItem("token", val)
})

chat_id.subscribe((val) => {
  browser && localStorage.setItem("chat_id", val)
})

custom_msg.subscribe((val) => {
  browser && localStorage.setItem("custom_msg", val)
})