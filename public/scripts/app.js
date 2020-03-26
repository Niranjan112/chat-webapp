const chatList = document.querySelector('.chat-list')
const chatForm = document.querySelector('.new-chat')
const updateNameForm = document.querySelector('.new-name')
const updateNameAlert = document.querySelector('.update-msg')
const rooms = document.querySelector('.chat-rooms')

chatForm.addEventListener('submit', e => {
  e.preventDefault()

  const message = chatForm.message.value.trim()
  chatForm.reset()

  chatroom.addChat(message)
    .then(() => chatForm.reset())
    .catch(error => console.log(error));
})

updateNameForm.addEventListener('submit', e => {
  e.preventDefault()

  const newUsername = updateNameForm.name.value.trim()

  chatroom.updateUsername(newUsername)
  updateNameForm.reset()

  updateNameAlert.innerText = `You name updated to ${newUsername}`
  setTimeout(() => {
    updateNameAlert.innerText = ''
  }, 3000)
})

rooms.addEventListener('click' , e => {
  if(e.target.tagName === 'BUTTON') {
    ui.clear()
    chatroom.updateRoom(e.target.getAttribute('id'))
    chatroom.getChats(chat => ui.render(chat))
  }
})

const username = localStorage.username ? localStorage.username : 'anonymous';

const ui = new ChatUI(chatList)
const chatroom = new Chatroom('gaming', username)

chatroom.getChats(data => ui.render(data))
