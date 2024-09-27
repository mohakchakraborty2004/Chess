import { WebSocket } from "ws";
import { Chess } from "chess.js";

export class Game {
     Player1 : WebSocket; 
     Player2 : WebSocket;
     Chess : Chess
     private moveCount = 0
     startTime : Date; 

    private static instance : Game

    private constructor (_player1 : WebSocket, _player2 : WebSocket) {

        this.Player1 = _player1;
        this.Player2 = _player2;
        this.Chess = new Chess()
        
        this.startTime = new Date();

    }

    public static getInstance(_player1 : WebSocket, _player2 : WebSocket) {
        if(!this.instance){
          return this.instance = new Game(_player1, _player2 );
        }
        return this.instance;



    }


    public MakeMove(_player: WebSocket, move : {
        from : string,
        to : string
    }){

        //validating who has to play the move 

        if(this.moveCount % 2 === 0 && _player !== this.Player1){
             return;
             // for every even no. of moves the white moves. i.e if this is the 0th move , and black tries to move which is player2 then it will early return.
        }
        if(this.moveCount % 2 === 1 && _player !== this.Player2){
            return;
       }
       
        

        // making the move 
        try{
            this.Chess.move(move)
        }catch(e){
           console.log(e)
           return
        }


        if(this.Chess.isGameOver()){
            this.Player1.send(JSON.stringify({
                type : "game_over",
                payload : {
                    winner : this.Chess.turn() === "w" ? "black" : "white" 
                }
            }))
            return;
        }


       // sending the person their opponent's move 
       if(this.moveCount % 2 === 0 ){
          this.Player2.send(JSON.stringify({
            type : "move", 
            paylaod : move
          }))
       } else {
        this.Player1.send(JSON.stringify({
            type : "move", 
            paylaod : move
          }))
       }

      
    



    }
}