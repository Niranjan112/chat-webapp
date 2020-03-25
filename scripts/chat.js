class Chatroom {
  constructor(room, username) {
    this.room = room
    this.username = username
    this.chats = db.collection('chat')
    this.unsub;
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
    this.unsub = this.chats
      .where('room', '==', this.room)
      .orderBy('created_at')
      .onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
          callback(change.doc.data())
        })
      })
  }

  updateRoom(room) {
    this.room = room;
    console.log('Room Updated')
    if(this.unsub) {
      this.unsub()
    }
  }

  updateUsername(username) {
    this.username = username
  }
}