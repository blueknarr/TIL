//Action Creator : 함수
//Action : object

//Action Creator
export const selectSong = (song) => {
    return {
        type: 'SONG_SELECTED',
        payload: song
    }
};

