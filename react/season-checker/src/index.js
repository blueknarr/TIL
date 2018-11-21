import React from 'react';
import ReactDOM from 'react-dom';
import SeasonDisplay from './SeasonDisplay';
import Spinner from './Spinner';

/*
1. 브라우저 JS 파일 불러옴

2. <App /> 컴포넌트 생성

3. GeolocationAPI가 위치정보 받기 시작

4. React App이 JSX 리턴하며 HTML 렌더링

5. 

6. 사용자 위치정보 GET

7. state 객체를 this.setState()로 업뎃

8. React가 Componenet의 state 없뎃을 눈치쳄

9. Reat가 componenet의 render()를 실행

10. render() 가 바뀐 state를 담은 JSX를 리턴 내용 변경

11. React가 바뀐 JSX 렌더

lat: value / errorMessage: x
lat: x / errorMessage: o 
lat: x / errorMessage: x  loading... 

*/

//함수형
// const App = () => {

//     window.navigator.geolocation.getCurrentPosition(
//         position => console.log(position),
//         error => console.error(error)
//     )

//     return(
//         <div>
//             <SeasonDisplay/>
//         </div>
//     )
// };

//클래스형 state는 class-based-component에서 사용 가능
//setState
class App extends React.Component{
    
    //App도 무엇인가 상속을 받기때문에 생성자에서 props 사용
    //props는 부모의 자식에서 사용
    // constructor(props){
        //component 초기화가 안된다.
        // super(props);

    //Data initialize
    state = {
        lat: null,
        errorMessage: '',
    };

    renderContent(){
        if(this.state.errorMessage && !this.state.lat){
            return (<SeasonDisplay errorMessage={this.state.errorMessage}/>)
        }
        if(!this.state.errorMessage && this.state.lat){
            return (<SeasonDisplay lat={this.state.lat}/>)
        }
       
        return (<Spinner message="Loading.."/>)
    }

    render () {
        return (
            <div style = {{border: 'solid red 10px'}}>
                {this.renderContent()}
            </div>
        )  
            
            // <div>
            //     <p>위도(latitude): {this.state.lat}</p>
            //     <p>Error: {this.state.errorMessage}</p>
            //     <SeasonDisplay/>
            // </div>
    }
    //첫번째 로드해야하는 데이터
    componentDidMount(){
        window.navigator.geolocation.getCurrentPosition(
            position => {
                //this.state.lat = position 직접 변경불가능. 반드시 setState함수를 사용해야함
                this.setState({lat:position.coords.latitude});
            },
            error => {
                this.setState({errorMessage:error.message})
            }
        )
    }
}

ReactDOM.render(<App/>, document.querySelector('#root'))