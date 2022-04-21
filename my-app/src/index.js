import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
/* 
?불변성이 중요한 이유?
- 직접적인 객체 변경 없이 데이터 수정하기 (불변성)
1. 복잡한 특징들을 단순하게 만듦 - 이전 동작으로 되돌아가는 기능 요구
2. 변화를 감지 - 참조하고 있는 불변 객체가 이전 객체와 다르다면 변화된 것임 (이를 감지)
3. React에서 다시 렌더링하는 시기를 결정 - 순수 컴포넌트를 만드는 데 도움을 줌
                                   (변하지 않는 데이터는 변경이 이루어졌는지 쉽게 확인 가능 - 다시 렌더링할지 결정)                        
*/

/*
[함수 컴포넌트]
- state 없이 render 함수만 가짐
- props를 입력받아 렌더링할 대상을 반환하는 함수 작성
- 클래스보다 빠르게 작성, 더 많이 처리 가능
*/



//Game > Board > Square 컴포넌트

//Square 컴포넌트
//Board의 자식 컴포넌트 
// class Square extends React.Component {
//     //constructor는 class의 인스턴스 객체를 새로 생성할 때 사용
//     // constructor(props) {
//     //     //super는 부모 object의 함수를 호출할 때 사용
//     //     //this 키워드가 사용되기 전에 호출되어야 함
//     //     super(props);
//     //     //state : 기억하기 위해
//     //     //state 초기화
//     //     this.state = {
//     //         value: null,
//     //     };
//     //} 

//     render() {
//       return (
//         //setState()는 컴포넌트 state 객체에 대한 업데이트 실행 - state변경 -> 컴포넌트 리렌더링
//         //this.setState 호출로 button 클릭할 때 Square가 다시 렌덕링해야 한다고 알림
//         // Square를 클릭하면 Board에서 넘겨받은 onClick 함수가 호출
//         <button 
//             className="square" 
//             onClick={() => this.props.onClick()}
//         >
//         /* Square를 클릭할 때 현재 state값 표시 */
//           {this.props.value}
//         </button>
//       );
//     }
//   }



//  함수 컴포넌트
  function Square(props) {
    return (
      <button className="square" onClick={props.onClick}>
        {props.value}
      </button>
    );
  }
  


  //Board 컴포넌트
  //Square의 부모 컴포넌트 
  class Board extends React.Component {

    // handleClick 정의
    // Square 컴포넌트(제어되는 컴포넌트)가 더 이상 state 유지 x 
    // -> Board 컴포넌트에서 값을 받아 클릭될 때 Board 컴포넌트로 정보 전달
/*
    handleClick(i) {
        // .slice()는 배열의 복사본을 생성해서 수정함 -> 기존 배열 수정 x
        const squares = this.state.squares.slice();
        // 누군가 승리하거나 squre가 이미 채워졌다면 board의 handleClick 함수가 클릭을 무시
        if (calculateWinner(squares) || squares[i]) {
            return;
        }

        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            squares: squares,
            xIsNext: !this.stats.xIsNext,
        });
    }
*/
    //Square에게 현재값 X, O, null 표현하도록 변경
    //Square에서 Board 변경은 불가능 -> Board에서 Square로 함수 전달, Square는 사각형 클릭할 때 함수 호출
    //Board -> Square로 value, onClick 2개 props 전달
    renderSquare(i) {
        // return 뒤에 ()를 추가하여 {} 이후 ;를 삽입하지 않아도 됨
      return (
        // 이벤트 나타내는 prop - on[Event]
        // 이벤트 처리하는 함수 - handle[Event]
        <Square 
            value={this.state.squares[i]} 
            onClick={() => this.props.onclick(i)}
        />
      );
    }
  
    render() {
      const winner = calculateWinner(this.state.squares);
      let status;
      if (winner){
          status = 'Winner: ' + winner;
      } else {
          status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
      }
  
      return (
        <div>
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
  //history state는 Game 컴포넌트에
  class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
            }],
            stepNumber: 0,
            xIsNext: true,
        };
    }

    handleClick(i) {
        const history = this.state.history.slice(0,this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{
                squares: squares
            }]),
            xIsNext: !this.state.xIsNext,
        });
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step%2) === 0,
        });
    }

    // render함수의 가장 최근 기록을 사용하도록 업데이트 -> 게임 상태를 확인하고 표시
    render() {
      const history = this.state.history;
      const current = history[this.state.stepNumber];
      const winner = calculateWinner(current.squares);

      // history mapping
      //history 배열을 순회하면서 step 변수는 현재 history 요소 값을 참조
      // move는 현재 history 요소의 인덱스를 참조
      const moves = history.map((step, move) => {
        const desc = move ?
            'Go to move #' + move:
            'Go to game start';
        return (
            <li key={move}>
                <button onClick={() => this.jumpTo(move)}>{desc}</button>
            </li>
        );
      });

      let status;
      if (winner) {
          status = 'Winner: ' + winner;
      } else {
          status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
      }

      return (
        <div className="game">
          <div className="game-board">
            <Board 
                squares={current.squares}
                onClick={(i) => this.handleClick(i)}
            />
          </div>
          <div className="game-info">
            <div>{status}</div>
            <ol>{moves}</ol>
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

/*
[key 선택하기]
: 리스트를 렌더링할 때 react는 렌더링하는 리스트 아이템에 대한 정보를 저장,
-> 리스트를 업데이트할 때 react는 무엇이 변했는지 결정해야 함 -> 리스트 아이템 : 추가,제거,재배열,업데이트

*리스트 아이템에 key prop을 지정하여 각 아이템이 다른 아이템과 다르다는 것을 알려주는 것임
 
!동적인 리스트를 만들 때마다 적절한 키를 할당할 것을 강력하게 추천!
형태
<li key={user.id}>{user.name} : {user.taskCount} tasks left </li>
*/