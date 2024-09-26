import { WebSocket } from "ws";

export class GameManager {
    private static instance : GameManager;
    private games: Game[]

    private constructor() {
        this.games = [];
    }

    public static getInstance() {
       if(!GameManager.instance){
        GameManager.instance = new GameManager();
       }
       return GameManager.instance
    }

    public addUser(socket: WebSocket) {
        
    }

    public removeUser( socket : WebSocket){


    }

    private handleMessage() {

    }
}