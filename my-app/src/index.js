import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

//Square 컴포넌트
//Board의 자식 컴포넌트 
class Square extends React.Component {
    //constructor는 class의 인스턴스 객체를 새로 생성할 때 사용
    constructor(props) {
        //super는 부모 object의 함수를 호출할 때 사용
        //this 키워드가 사용되기 전에 호출되어야 함
        super(props);
        //state : 기억하기 위해
        //state 초기화
        this.state = {
            value: null,
        };
    }

    render() {
      return (
        //setState()는 컴포넌트 state 객체에 대한 업데이트 실행 - state변경 -> 컴포넌트 리렌더링
        //this.setState 호출로 button 클릭할 때 Square가 다시 렌덕링해야 한다고 알림
        <button 
            className="square" 
            onClick={() => this.setState({value: 'X'})}
        >
        {/* Square를 클릭할 때 현재 state값 표시 */}
          {this.state.value}
        </button>
      );
    }
  }
  
  //Board 컴포넌트
  //Square의 부모 컴포넌트 
  class Board extends React.Component {
    renderSquare(i) {
      return <Square value={i} />;
    }
  
    render() {
      const status = 'Next player: X';
  
      return (
        <div>
          <div className="status">{status}</div>
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
  
  //Game 컴포넌트
  class Game extends React.Component {
    render() {
      return (
        <div className="game">
          <div className="game-board">
            <Board />
          </div>
          <div className="game-info">
            <div>{/* status */}</div>
            <ol>{/* TODO */}</ol>
          </div>
        </div>
      );
    }
  }
  
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
  