const mongoose = require('mongoose');
const Chat = require('./models/chat');

main()
.then((res) => {
    console.log("Connection established");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}


let allChat = [
{
    from: "neha",
    to: "priya",
    msg: "Send me your exam sheet",
    created_at: new Date()
}, {
    from: "rohit",
    to: "mohit",
    msg: "teach me js call backs",
    created_at: new Date()
}, {
    from: "mukeh",
    to: "srishti",
    msg: "Hi how are you",
    created_at: new Date()
}, {
    from: "srishti",
    to: "mukesh",
    msg: "i am good",
    created_at: new Date()
}, {
    from: "mike",
    to: "mickye",
    msg: "teach me Node JS",
    created_at: new Date()
}
];

Chat.insertMany(allChat);