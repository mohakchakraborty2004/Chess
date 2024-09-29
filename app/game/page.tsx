"use client";
import Button from "@/components/button";
import ChessBoard from "@/components/chessboard";
import { useSocket } from "@/hooks/useSocket";
import { Chess } from "chess.js";
import { useEffect, useState } from "react";

export default function Game() {



const [chess, setChess] =  useState(new Chess());
const [board, setBoard] = useState(chess.board())

 
    const socket = useSocket();

    useEffect(() => {
         
        if(!socket){
            return;
        }

        socket.onmessage = (event) => {
            const message = JSON.parse(event.data);
            console.log(message)

            if(message.type === "init_game"){
            // when the game is initialized a new chess instance is initiated
             
             // when the new chess instance is initiated , a new chess board is initiated with the starting positions in a 2d array
             setBoard(chess.board())

             console.log("game initialized")

            }
            
            if(message.type === "move"){
              console.log("move elif block")
                //fetch the move
            const move =  message.payload.move ;
            console.log(move)
            //     // make the move using chess's instance
            chess.move(move);
                // update the board after the move is successfull
             setBoard(chess.board());
            

                console.log("move made");
            }
            
            if(message.type === "game_over"){

                 console.log("game over")
            }
                

            }
        

    }, [socket])

    if(!socket) {
        return <div>
            connecting to game
        </div>
    }


    return (
         

        <>
        <div className="grid grid-cols-3 h-[100vh]">
            <div className="col-span-2 flex justify-center items-center">
                <ChessBoard chess={chess} setBoard={setBoard} board={board} socket={socket}></ChessBoard>
            </div>
            <div className="col-span-1 bg-slate-900">
                 <Button title="play" onClick={()=> {
                      socket.send(JSON.stringify({
                        type : "init_game"
                      }))
                 }} ></Button>
            </div>
        </div>
        </>
    );
}