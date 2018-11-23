import React, { Component } from 'react'

//onChange={(e) =>{console.log(e.target.value)}}
class SearchBar extends Component {
    
    // onInputChange(event){
    //     console.log(event.target.value);
    // }

    // onInputClick(event){
    //     console.log('click');
    // }

    //state 초기화 파트
    //state 바뀌면 render가 일어난다.
    state = {
        keyword: ''
    }

    componentDidUpdate(){
      
    }

    removeBadWords = (input) => {
        //state 자체를 바꾸고 싶었다
        this.setState({keyword:input}, () => {
            //문자열에 badword가 있는지 확인
            if( /.*fuck.*/i.test(this.state.keyword) ){
                //문자열에 badword가 있다면 그 부분만 교체해라
                this.setState({keyword: this.state.keyword.replace(/fuck/i,'Nope')}); 
            }
        });
    }

    //
    onFormSubmit = (event) => {
        event.preventDefault();
        this.props.onUserSubmit(this.state.keyword);
    }

    render() {
    return (
      <div className="ui segment container">
         <form onSubmit={this.onFormSubmit} className="ui form">
            <label htmlFor="keyword">Search!</label>
            <input 
            id="keyword" 
            type="text"
            onChange={ e => this.removeBadWords(e.target.value) }
            value={this.state.keyword}
            />
        </form>
      </div>
    )
  }
}

export default  SearchBar;