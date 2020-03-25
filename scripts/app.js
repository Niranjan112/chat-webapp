const chatList = document.querySelector('.chat-list')

const ui = new ChatUI(chatList)
const chatroom = new Chatroom('gaming','name')
chatroom.getChats(data => ui.render(data))
