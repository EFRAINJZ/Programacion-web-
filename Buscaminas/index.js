import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
var set =new Set(); // para las bombas 
var datos=[]        // para el tablero
var squaresgen // temporal


var lost=false//para el timer
var winner=false// para el timer
cargaBombas();
function cargaBombas(){
      for(var i=0;i<81;i++,datos.push(0));
     // alert(datos)
       while(set.size<10)
           set.add(Math.floor(Math.random() * 81));
      //alert(set.size)
      for (let value of set){
        datos[value]=-1; // hay una bomba
        var j;

        i=Math.floor(value/9);
        j=value%9;
         /*[i-1,j-1]   [i-1,j]   [i-1,j+1  ]
             [i,j-1  ]   [i,j  ]   [i,j+1    ]
             [i+1,j-1]   [i+1,j]   [i+1,j+1  ]
             
           */
        // superiores
        if(i-1>=0){
            datos[(i-1)*9+j]=(datos[(i-1)*9+j]==-1)?-1:datos[(i-1)*9+j]+1;
             if(j-1>=0)
                datos[(i-1)*9+j-1]=(datos[(i-1)*9+j-1]==-1)?-1:datos[(i-1)*9+j-1]+1;  
             if(j+1<9) 
               datos[(i-1)*9+j+1]=(datos[(i-1)*9+j+1]==-1)?-1:datos[(i-1)*9+j+1]+1; 
        }
       //left

        if(j-1>=0){
           datos[(i)*9+j-1]=(datos[(i)*9+j-1]==-1)?-1:datos[(i)*9+j-1]+1;
        }
        //right
       
        if(j+1<9){
           datos[(i)*9+j+1]=(datos[(i)*9+j+1]==-1)?-1:datos[i*9+j+1]+1;
        }
        // inferiores
       
        if(i+1<9){
              datos[(i+1)*9+j]=(datos[(i+1)*9+j]==-1)?-1:datos[(i+1)*9+j]+1;
             if(j-1>=0)
                datos[(i+1)*9+j-1]=(datos[(i+1)*9+j-1]==-1)?-1:datos[(i+1)*9+j-1]+1;  
             if(j+1<9) 
               datos[(i+1)*9+j+1]=(datos[(i+1)*9+j+1]==-1)?-1:datos[(i+1)*9+j+1]+1; 
        }

           
      }
      var cadena="";
      for ( i = 0; i < 9; i++) {
        for ( j = 0; j < 9; j++) {
           cadena=cadena+"["+datos[i*9+j]+"]"
        }
        cadena=cadena+"\n"
      }
    //console.log(cadena)
  
      return ;
   }

function Square(props) {
   //console.log(Math.floor(props.id/9)+","+props.id%9)
  return (
    <button className={"square"+(props.id)%2} id={props.id} onClick={props.onClick}>
      {props.value}
    </button>
  );
}
             // reloj


class LightningCounter extends React.Component{

   constructor(props,context){
      super(props,context);
      this.state={
        strikes:0
      };
      this.timerTick=this.timerTick.bind(this);
   }
  
   timerTick(){
       if(!lost && !winner)
       this.setState((state, props) => ({
           strikes: this.state.strikes+1
       }));
     
   }
  
   componentDidMount(){
      setInterval(this.timerTick,1000);
   }
  
   render(){
      var tot;
      if(this.state.strikes<10)
        tot="000"+this.state.strikes;
      else if(this.state.strikes<100)
              tot="00"+this.state.strikes;
       else if(this.state.strikes<1000)
              tot="0"+this.state.strikes;
         else 
                tot=this.state.strikes;

      return ( 
      <h1>{tot}</h1>
      );
        
   } 

}
              // Tablero

class Board extends React.Component {
  
  // para poner las variables locales y guardar valores  
  constructor(props){
     super(props);
     this.state={
       squares:Array(64).fill(null),
       lost:false,
       winner:false,
       desbloqueado:new Set(),
        // controla el valor 
       //actual de cada celda del tablero me permite saber que hacer
       // 0 ninguna de las 8 casillas de alrededor 
               //tiene bomba  
        //-1 tiene bomba            

     };
  }
  floodfill(id){
    this.state.desbloqueado.add(id)
   var div=document.getElementById(id);
   div.className="square"+((id%2)+2);     
   var i=Math.floor(id/9);
   var j=id%9;
   //alert(i+" "+j)
    // superiores
   if(!datos[id]){
     datos[id]=-2
    if(i-1>=0 && datos[(i-1)*9+j]>=0)
        this.floodfill((i-1)*9+j);     
    if(j-1>=0 &&datos[(i)*9+j-1]>=0)
      this.floodfill((i)*9+j-1);
    if(j+1<9 && datos[(i)*9+j+1]>=0)
       this.floodfill((i)*9+j+1);
    if(i+1<9 &&datos[(i+1)*9+j]>=0)
      this.floodfill((i+1)*9+j);
    
   }else if(datos[id]>0){

      squaresgen[id]=datos[id];
      datos[id]=-2
    }
}
  // actualiza en cada click del mouse
  handleClick(i){

    if(this.state.winner  ){
      alert("ganaste!!");

       return ;
     }
     if(this.state.lost ){
              alert("perdiste!!")

       return ;
     }
    
          const squares=this.state.squares.slice();

     //if (calculateWinner(squares) || squares[i]) { 
        //  return;   
      //}
        
    var div=document.getElementById(i)
    if(datos[i]>0){
       this.state.desbloqueado.add(i)
       squares[i]=datos[i];
       div.className="square"+((i%2)+2)
       this.setState({squares:squares,
    
    });
     }else 
      if(!datos[i]){
        squaresgen=this.state.squares.slice();
              this.floodfill(i); 
              this.setState({squares:squaresgen,
    
        });
            }
      else if(datos[i]==-1){
        squares[i]=<img src="bomba.svg" width='50px' />;
        for (let value of set)
            squares[value]=<img src="bomba.svg" width='50px' />;

        this.setState({squares:squares,lost:true,
    
        });
        lost=true;
        alert("perdiste!!")
     }


    
    //console.log(this.state.desbloqueado.size)
    if(this.state.desbloqueado.size==71){
          const squares=this.state.squares.slice();
      for (let value of set)
            squares[value]=<img src="bandera.svg" width='30px' />;
       this.setState({squares:squares,winner:true,
    
        });
            winner=true
             alert("ganaste!!");

      
    }
    // actualiza el estado del tablero
  }
   // para inicializar
  renderSquare(i) {
     // aqui inicializo el vector de las que tendran bombas


    return <Square value={this.state.squares[i]} id={i}
      onClick={()=>this.handleClick(i)}/>;
  

  }
  render() {   
  var divStyleimg={
    
      textAlign:"center",
      backgroundColor:"FFF",
     
      borderBottom: '10px solid #fff', 
        
     
      fontFamily:"sans-serif",
      color:"#999",
      borderRaidus:20
    };
      
   var divStyle={    
      textAlign:"center",
      backgroundColor:"#f8e2cf",
      borderRight: '5px solid #faf7f5',
      borderLeft: '5px solid #faf7f5',
      borderTop: '5px solid #faf7f5',
      borderBottom: '5px solid #faf7f5', 
      paddingLeft:5,
      paddingRight:5, 
      width:90,
      height:60,
      paddingBottom:5,
      fontFamily:"sans-serif",
      color:"#842d",
      borderRaidus:20
    };
   
    return (
       
      <div>             
       <div className="Estado1" >

         <div className="Estado">
              <div style={divStyleimg}> <img src="reloj.svg" width='80px' /> </div>
              <div style={divStyle}><LightningCounter/> </div> 
         </div>
         <div className="Estado">
             <div style={divStyleimg}><img src="bomba.svg" width='80px' align="center"/></div>
             <div style={divStyle}><h1>10</h1></div>
         </div>
       </div>                    
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
        <div className="board-row">
          {this.renderSquare(9)}
          {this.renderSquare(10)}
          {this.renderSquare(11)}
          {this.renderSquare(12)}
          {this.renderSquare(13)}
          {this.renderSquare(14)}
          {this.renderSquare(15)}
          {this.renderSquare(16)}
          {this.renderSquare(17)}
        </div>
          <div className="board-row">
          {this.renderSquare(18)}
          {this.renderSquare(19)}
          {this.renderSquare(20)}
          {this.renderSquare(21)}
          {this.renderSquare(22)}
          {this.renderSquare(23)}
          {this.renderSquare(24)}
          {this.renderSquare(25)}
          {this.renderSquare(26)}
        </div>
        <div className="board-row">
          {this.renderSquare(27)}
          {this.renderSquare(28)}
          {this.renderSquare(29)}
          {this.renderSquare(30)}
          {this.renderSquare(31)}
          {this.renderSquare(32)}
          {this.renderSquare(33)}
          {this.renderSquare(34)}
          {this.renderSquare(35)}
          
        </div>
          <div className="board-row">
          {this.renderSquare(36)}
          {this.renderSquare(37)}
          {this.renderSquare(38)}
          {this.renderSquare(39)}
          {this.renderSquare(40)}
          {this.renderSquare(41)}
          {this.renderSquare(42)}
          {this.renderSquare(43)}
          {this.renderSquare(44)}
        </div>
        <div className="board-row">
          {this.renderSquare(45)}
          {this.renderSquare(46)}
          {this.renderSquare(47)}
          {this.renderSquare(48)}
          {this.renderSquare(49)}
          {this.renderSquare(50)}
          {this.renderSquare(51)}
          {this.renderSquare(52)}
          {this.renderSquare(53)}
             
        </div>
        <div className="board-row">
          {this.renderSquare(54)}
          {this.renderSquare(55)}
          {this.renderSquare(56)}
          {this.renderSquare(57)}
          {this.renderSquare(58)}
          {this.renderSquare(59)}
          {this.renderSquare(60)}
          {this.renderSquare(61)}
          {this.renderSquare(62)}
        </div>
        <div className="board-row">
          {this.renderSquare(63)}
          {this.renderSquare(64)}
          {this.renderSquare(65)}
          {this.renderSquare(66)}
          {this.renderSquare(67)}
          {this.renderSquare(68)}
          {this.renderSquare(69)}
          {this.renderSquare(70)}
          {this.renderSquare(71)}
          
        </div>
         <div className="board-row">
          {this.renderSquare(72)}
          {this.renderSquare(73)}
          {this.renderSquare(74)}
          {this.renderSquare(75)}
          {this.renderSquare(76)}
          {this.renderSquare(77)}
          {this.renderSquare(78)}
          {this.renderSquare(79)}
          {this.renderSquare(80)}
          
        </div>
      
      </div>
    );
  }
}





class Game extends React.Component {
  render() {
   
    return (
      <div className="game">

        <div className="game-board">
           <Board />
        </div>
        <div className="game-info">
            <div ></div>
            <ol>{/* TODO */}</ol>
        </div>

      </div>
    );
  }
}



// principal
// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);










