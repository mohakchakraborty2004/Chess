import Button from "@/components/button";
import ChessBoard from "@/components/chessboard";

export default function Game() {

    return (
        <>
        <div className="grid grid-cols-3 h-[100vh]">
            <div className="col-span-2 bg-fuchsia-500 ">
                <ChessBoard></ChessBoard>
            </div>
            <div className="col-span-1 bg-slate-900">
                 <Button title="play" onClick="" ></Button>
            </div>
        </div>
        </>
    );
}