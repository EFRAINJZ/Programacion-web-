import React from 'react';
import db from './Firebaseconfig';
import firebase from 'firebase/app';
import ReactDOM from 'react-dom';
import './index.css';
var id=0
var squar,sqtemp,xs
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
function inicia(){
  if(id==0){

      id=(squar.player+1)>2?1:squar.player+1
      db.collection('estado').doc("zVe2ynq4woeyov7u73vf").update({
        player:(squar.player+1)>2?1:squar.player+1,
        squares:id==1?Array(9).fill(null):squar.squares,
        xIsNext: id==1? true:squar.xIsNext,
      }).then(function(){
        console.log("Document successfully written");
      }).catch(function(error){
        console.log("Error adding document: ",error);
      })
  }
}
function Reset(){
 
  db.collection('estado').doc("zVe2ynq4woeyov7u73vf").update({
        squares:Array(9).fill(null),
        xIsNext: true,
      }).then(function(){
        console.log("Document successfully written");
      }).catch(function(error){
        console.log("Error adding document: ",error);
      })

}
function Square(props){
 
  return(
   <button className="square"
   onClick={props.onClick}>
   {props.value}

   </button>
    );
}
//
class Board extends React.Component {
 
  constructor(props){
    super(props);
    this.state={
      p1: false,
      p2:false,
      squares:Array(9).fill(null),
      xIsNext:true,
    };
    this.update=this.update.bind(this)
  }
  handleClick(i){
    console.log(squar.p1 +"ac")
    if(squar.player!=id && id!=0){
       
    }
    if(squar.player==1  ){

      alert("Esperando otro jugador. Si eres p1 debes compartir el link y si eres p2 debes recargar tu pagina")
     return;
    }
      
    
  if((id==1 && squar.xIsNext==false) || (id==2 && squar.xIsNext==true)){
     alert("Esperando respuesta")
     return
   } 
    const squares=
    this.state.squares.slice();
    if (calculateWinner(squares) || squares[i])
     {  
         return;
      }
    squares[i]=this.state.xIsNext?'X':'O';
    this.setState({
        squares:squares,
        xIsNext:!this.state.xIsNext,
    });
    sqtemp=squares.slice()
    xs=!this.state.xIsNext
    db.collection('estado').doc("zVe2ynq4woeyov7u73vf").update({
        squares:sqtemp,
        xIsNext:xs
    }).then(function(){
        console.log("Document successfully written");
    }).catch(function(error){
        console.log("Error adding document: ",error);
    })
  }
  update(){
    if(squar)
        this.setState({
            squares:squar.squares.slice(),
            xIsNext:squar.xIsNext,
         });
  }
  componentDidMount(){
     setInterval(this.update,1000)

  }
  renderSquare(i){
    return (<Square 
         value={this.state.squares[i]}
         onClick={()=>this.handleClick(i)}
      />
    );
   }
  render() {   
   db.collection("estado").doc("zVe2ynq4woeyov7u73vf").onSnapshot(function(doc) {
      var source = doc.metadata.hasPendingWrites ? "Local" : "Server";
         squar=doc.data()
         if(squar)
         inicia();
    });

    const winner = calculateWinner(this.state.squares);    
    let status;    
    if (winner) {      
      status = 'Winner: ' + winner; 
         } 
    else {     
     status = 'Next player: ' + 
     (this.state.xIsNext ? 'X' : 'O');    
   }
   var isturno
   if(!winner){
   if(id==1 && squar.xIsNext)
     isturno="Es tu turno"
   else if(id==1 && !squar.xIsNext)
     isturno="Esperando respuesta..."
   
   if(id==2 && !squar.xIsNext)
     isturno="Es tu turno"
   else if(id==2 && squar.xIsNext)
     isturno="Esperando respuesta..."
   }else
   isturno="Juego terminado"
    return (
      <div>
        <div className="status"><h2>Jugador {id!=0?id:" "} <br/> </h2><a>{isturno} <br/> </a><a>{status}</a></div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        
        </div>
      </div>

    );

  }
}
//
class Game extends React.Component {
  

  render() {
 
     
    return (
      <div className="game">

        <div className="game-board">

          <Board />
          <br/>
          <button 
            onClick={()=>Reset()}>
                 Reiniciar

   </button>
        </div>
        <div className="game-info">
          <div></div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />
  ,
  document.getElementById('root')
);
