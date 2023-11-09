const express = require("express");
const http = require("http");
const multer = require("multer");
const os = require("os");
const path = require("path");
const qrcode = require("qrcode-terminal");
const socketIo = require("socket.io");
const cors = require("cors")
const app = express();
const server = http.createServer(app);
const io = socketIo(server, { cors: "*" });
const fs = require("fs")

app.use(express.static("./client/dist"));
app.use(cors())
const storage = multer.diskStorage({
  destination: "./temp",
  filename: function (req, file, cb) {
    console.log(
      "\x1b[33m%s\x1b[0m",
      file.originalname,
      "\x1b[36m- Uploading...\x1b[0m"
    );
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });


const fileDetails = new Map();


const clearTemp = () => {
}

app.post("/files", upload.array("files"), (req, res) => {
  for (let file of req.files) {
    fileDetails.set(file.originalname, file.path);
  }
  
  io.emit("message", [...fileDetails.keys()]);
  res.send("uploaded successfully")
});

app.get("/file/:id",(req,res)=>{
  console.log(req.params.id);
  if (!fileDetails.has(req.params.id)) {
    res.status(404).send(`${req.params.id} - File Not found`)
    return
  }
  res.set('Content-Disposition', `attachment; filename="${req.params.id}"`);
  res.sendFile("./temp/"+req.params.id,{root:__dirname})
})


app.get("*", (req, res) => {
  res.sendFile("client/dist/index.html", { root: __dirname });
});

io.on("connection", (socket) => {
  console.log("A client connected");
  
  io.emit("message", [...fileDetails.keys()]);
  socket.on("disconnect", () => {
    console.log("A client disconnected");
  });
});




const networkInterfaces = os.networkInterfaces();

let privateIpAddress;

Object.keys(networkInterfaces).forEach((interfaceName) => {
  const networkInterface = networkInterfaces[interfaceName];

  for (const interfaceInfo of networkInterface) {
    if (!interfaceInfo.internal && interfaceInfo.family === "IPv4") {
      privateIpAddress = interfaceInfo.address;
      break;
    }
  }
});



const PORT = 5555;

server.listen(PORT, () => {
  console.log(
    `Network Link -\x1b[36m http://${privateIpAddress}:${PORT}\x1b[0m`
  );
  qrcode.generate(
    `http://${privateIpAddress}:${PORT}`,
    { small: true },
    function (qrcode) {
      console.log(qrcode);
    }
  );

  clearTemp()

});

