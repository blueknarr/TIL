import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectSong } from '../actions';

 class SongList extends Component {
  render() {
      return (
          <div className="ui divided list">
            {this.renderList()}
          </div>
      )
  }

  renderList(){
    return this.props.songs.map(song => {
        return (
          <div key={song.title} className="item">
              <div className="content">
                  {song.title}
              </div>
              
              <div className="right float content">
                  <button 
                    className="ui button primary"
                    onClick={ () => this.props.selectSong(song) }
              >
                      Select
                  </button>
              </div>
          </div>
        );
    })
  }
}

const mapStateToProps = (state) => {
    //state 변화마다 재실행되는 함수
    console.log(state); //redux 상의 state
    return {
        songs:state.songs
    }
}

//함수의 리턴값이 함수고 바로 실행
export default connect(mapStateToProps,
    { selectSong }
    )(SongList);

// function myFunction{
//     return (text) => {
//         console.log(text);
//     }
// }

// myFunction()('hi');