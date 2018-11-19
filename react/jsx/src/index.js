//1. React와 ReactDOM 라이브러리 import
import React from 'react';
import ReactDOM from 'react-dom';

//2. React 컴포넌트 생성
//HTML 생성 사용자에게 보여줌. 이벤트 핸들링
//dash 대신에 대문자
//배열을 넣으면 인자를 합쳐서 나타냄
function getButtonText(){
    return 'ClickMe'
};

function getTime(){
    return (new Date().toLocaleTimeString());
}

const App = () => {
    const buttonText = {happy: 'hacking'};
    return (
    <div>
        <h3>현재시간: {getTime()}</h3>
        <label htmlfor="name" class="name_label">Eenter name: </label>
        <input type="text" id="name"/>
        <button style={{backgroundColor:'blue', color: 'white',border: 'solid 1px black'}}> 
            {buttonText.happy}         
        </button>
    </div>
    )
}

//3. 화면에 HTML을 띄우기
//DOM: 브라우저 화면
ReactDOM.render(
    <App />,
    document.querySelector('#root')
)