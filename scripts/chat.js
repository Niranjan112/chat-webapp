class Chatroom {
  constructor(room, username) {
    this.room = room
    this.username = username
    this.chats = db.collection('chat')
  }

  async addChat(message) {
    const now = new Date()
    const chat = {
      message,
      room: this.room,
      username: this.username,
      created_at: firebase.firestore.Timestamp.fromDate(now)
    }

    const response = await this.chats.add(chat)
    return response
  }

  getChats(callback) {
    this.chats
      .onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
          callback(change.doc.data())
        })
      })
  }
}

const c = new Chatroom('general', 'john')
c.getChats(data => {
  console.log(data)
})