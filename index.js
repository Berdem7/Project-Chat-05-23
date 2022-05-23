const express = require("express");
const app = express();
const fs = require("fs");
const router = express.Router();
app.use(express.json());
const bodyparser = require("body-parser");
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
const { body, validationResult } = require("express-validator");

const port = 3000;
const querystring = require("querystring");
const e = require("express");
// const { Socket } = require("socket.io");
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("view options", { layout: false });

const http = require("http").Server(app);

const io = require("socket.io")(http); // The port should be different of your HTTP server.
// var socket = io();
// const server = require("http").Server(app);

// io.on("connection", (socket) => {
//   console.log("a user is connected");
//   socket.emit("chat", JSON.parse(data).messages);
// });

// io.connect("http://localhost/3000/public").on("publicchat2",function(msg){
//   $
// })

// , (socket) => {
//   // console.log("connected");
//   socket.on("publicchat2", function (data) {});
// });

// io.on("connection", (socket) => {
//   socket.on("publicchat", (chatdata) => {
//     router.post(
//       `http://localhost:${port}/public`,

//       (req, res) => {
//         console.log("working");
//         fs.readFile("data/chat.json", (error, data) => {
//           if (error) {
//             throw error;
//           } else {
//             console.log(user + chatmsg);
//             // let parsedChat = JSON.parse(chatdata);
//             let chat = JSON.parse(data);
//             chat.messages.push(chatdata);
//             let newchat = JSON.stringify(chat);
//             fs.writeFile("data/chat.json", newchat, (error) => {
//               if (error) {
//                 console.log(error);
//               } else {
//                 //   io.emit("chat", "update");

//                 res.render("index.ejs", { chat: chat.messages, port: port });
//               }
//             });
//           }
//         });
//       }
//     );
//   });
// });

app.use("/", router);
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// io.on("connection", function (socket) {
//   // Notify for a new connection and pass the socket as parameter.
//   console.log("new connection");

//   var incremental = 0;
//   setInterval(function () {
//     // console.log("emit new value", incremental);

//     socket.emit(
//       router.get("/public", function (req, res) {
//         fs.readFile("data/chat.json", (error, data) => {
//           let chat = JSON.parse(data);
//           if (error) {
//             throw error;
//           } else {
//             console.log(chat);
//             res.render("index.ejs", { chat: chat, port: port });
//             //   res.send(chat.messages);
//           }
//         });
//       }),
//       incremental
//     ); // Emit on the opened socket.
//     incremental++;
//   }, 100);
// });

// const liveReloadServer = livereload.createServer();
// liveReloadServer.server.once("connection", () => {
//   setTimeout(() => {
//     liveReloadServer.refresh("/public");
//   }, 100);
// });

// app.use(connectLiveReload());

// app.post("/messages", (req, res) => {
//   var message = new Message(req.body);
//   message.save((err) => {
//     if (err) sendStatus(500);
//     io.emit("message", req.body);
//     res.sendStatus(200);
//   });
// });

router.get("/public", function (req, res) {
  fs.readFile("data/chat.json", (error, data) => {
    let chat = JSON.parse(data);
    if (error) {
      throw error;
    } else {
      // console.log(chat);

      res.render("index.ejs", { chat: chat.messages, port: port });
      //   res.send(chat.messages);
    }
  });
});

router.get("/chatdata", function (req, res) {
  fs.readFile("data/chat.json", (error, data) => {
    let chat = JSON.parse(data);
    if (error) {
      throw error;
    } else {
      res.send(chat);
    }
  });
});

router.post("/public", (req, res) => {
  fs.readFile("data/chat.json", (error, data) => {
    if (error) {
      throw error;
    } else {
      let chat = JSON.parse(data);
      chat.messages.push(req.body);
      let newchat = JSON.stringify(chat);
      fs.writeFile("data/chat.json", newchat, (error) => {
        if (error) {
          console.log(error);
        } else {
          //   io.emit("chat", "update");
          io.on("connection", (socket) => {
            console.log("connectedfas");
            socket.on("publicchat1", function (data) {
              socket.emit("publicchat", "update");
            });
          });
          //   io.emit("publicchat", "update");
          res.render("index.ejs", { chat: chat.messages, port: port });
        }
      });
    }
  });
});

http.listen(port);
// server.listen(8080);
