import { combineReducers } from 'redux';

const songsReducer = (action) => {
    return [
        {title:'a1',artist:'a1',duration:'1:1'},
        {title:'b1',artist:'b2',duration:'2:2'},
        {title:'c1',artist:'c2',duration:'3:3'},
        {title:'d1',artist:'d2',duration:'4:4'},
    ]
};

const selectedSongReducer = (selectedSong=null, action) => {
    if(action.type === 'SONG_SELECTED'){
        return action.payload;
    } else{
        return selectedSong;
    }
}

export default combineReducers({
    songs: songsReducer, 
    selectedSong : selectedSongReducer
});