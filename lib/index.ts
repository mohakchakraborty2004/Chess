import { WebSocketServer } from "ws";
import { GameManager } from "./gameManager";

const port = 8080;
const wss = new WebSocketServer({port : port});

wss.on("connection", function connection(socket){
     
    GameManager.getInstance().addUser(socket)
    socket.send("hellow !");
    socket.on("disconnect", ()=> GameManager.getInstance().removeUser(socket))

    
})
