import { useState,useEffect } from 'react'

import './App.css'
import io from 'socket.io-client'




const socket = io.connect("http://localhost:5000")




function App() {
const [message,setMessage]= useState('')

const [chat,setChat]= useState([])

const sendchat =(e)=>{
  e.preventDefault()

  socket.emit("chat",{message})
  setMessage('')
}
useEffect(()=>{
  socket.on("chat",(payload)=>{
    setChat([...chat,payload])
  })
})
  return (
    <>
      <div>
     <h1>Chatty app</h1>
{chat.map((payload,index)=>{
  return (
    <p key={index}>{payload.message}</p>
  )
})}



     <form onSubmit={sendchat}>

<input type="text" name="chat" placeholder='send text' value={message} 
onChange={(e)=>{
  setMessage(e.target.value)
}}
/>
<button type='submit'></button>

     </form>
      </div>
    </>
  )
}

export default App
