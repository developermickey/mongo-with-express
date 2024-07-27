const express = require('express');
const app = express();
const port = 8080;
const path = require('path');
const mongoose = require('mongoose');

const Chat = require('./models/chat');

const methodOverride = require('method-override')


app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(methodOverride('_method'))
main()
.then((res) => {
    console.log("Connection established");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}


// let chat1 = new Chat({
//     from: "neha",
//     to: "priya",
//     msg: "Send me your exam sheet",
//     created_at: new Date()
// })


// chat1.save()
// .then((res) => {
//     console.log(res);
// })
// .catch((err) => {
//     console.log(err);
// });



// Index Route
app.get('/chats', async (req, res) => {
    let chats = await Chat.find();

    res.render('index', { chats });
    
});

app.get('/', (req, res) => {
    res.send("Welcome To Root")
});

app.get('/chats/new', (req, res) => {
   
    res.render('new');
    
});

app.post("/chats", (req, res) => {
    let {from, msg, to } = req.body;

    let newChat = new Chat({
        from: from,
        msg: msg,
        to: to,
        created_at: new Date()
    })

    newChat.save()
    .then((res) => {
        console.log("Chat saved");
    })
    .catch((err) => {
        console.log(err);
    });

    res.redirect("/chats");
})



// edit route 

app.get('/chats/:id/edit', async (req, res) => {

    let {id} = req.params;
    let chat = await Chat.findById(id);
    res.render("edit", {chat});
});


app.put("/chats/:id", async (req, res) =>{
    let {id} = req.params;
    let { msg: newMsg } = req.body;
    console.log(newMsg);

    let updatedChat = await Chat.findByIdAndUpdate(
        id, 
        {msg: newMsg}, 
        {runValidators: true, new: true}
    );
    console.log(updatedChat);
    res.redirect("/chats");

})


app.delete("/chats/:id", async (req, res) => {
    let {id} = req.params;
    let deletedChat = await Chat.findByIdAndDelete(id);
    console.log(deletedChat);
    res.redirect("/chats");

})

app.listen(port, () => {
    console.log(`listening on port ${port}`);
})

