"use client";

import { Color, PieceSymbol, Square } from "chess.js";
import { useState } from "react";

export default function ChessBoard({ board , socket }: {
    board: ({
        square: Square;
        type: PieceSymbol;
        color: Color;
    } | null)[][] ,
    socket : WebSocket
}) {

    const [from , setFrom] =  useState<Square | string | null>(null)
    const [to , setTo] = useState<Square | string | null>(null)

    const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    function HandleSquare(i : number, j : number) {
        const squareName = `${files[j]}${8 - i}`;
        
        
        if(!from){
            setFrom(squareName)
            console.log(from)
        }else{
            setTo(squareName)
            socket.send(JSON.stringify({
                type : "move",
                payload : {
                    from : from,
                    to : to
                }
            }))
        }

        setFrom(null)
        setTo(null)
    }
    // Array for the files (columns) in chess notation
 //   

    return (
        <div>
            {board.map((row, i) => {
                return <div key={i} className="flex">
                    {row.map((square, j) => {
                        // Calculate the square name (like 'a8', 'b7', etc.)
                      //  
                        return (
                            <div key={j} className={`h-20 w-20 ${(i + j) % 2 == 0 ? 'bg-sky-800' : 'bg-blue-400'} flex justify-center items-center`}
                             onClick={() => {HandleSquare(i, j)}}
                            >
                                <div className="">
                                    {square ? square.type : ""}
                                <div className="absolute text-xs text-white"></div>
                                </div>
                               
                            </div>
                        );
                    })}
                </div>
            })}
        </div>
    );
}
