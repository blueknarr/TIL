/* 1. 검색 */

/* 2. SoundCloud API  사용하기 */
const SoundCloudAPI = {
  init: () => {
    SC.initialize({
      client_id: "cd9be64eeb32d1741c17cb39e41d254d"
    });
  },

  getTrack: (inputValue) => {
    SC.get("/tracks", {
      q: inputValue
    }).then(function(tracks) {
      console.log(tracks);
    });
  }
};

SoundCloudAPI.init();
SoundCloudAPI.getTrack();

// find all tracks with the genre 'punk' that have a tempo greater than 120 bpm.

/* 3. 카드 보여주기 */
SoundCloudAPI.renderTracks = (tracks) => {
    tracks.forEach(() => {
        
    });

    const card = document.createElement('div');
    card.classList.add("card");

    const imgDiv = document.createElement('div');
    imgDiv.classList.add("image");

    const imageImg = document.createElement('img');
    imageImg.classList.add("image_img");
    imageImg.src = 'http://www.placekitten.com/290/290';
    imgDiv.appendChild(imageImg);
    
    const content = document.createElement('div');
    content.classList.add('content');

    const header = document.createElement('div');
    header.classList.add('header');

    const link = document.createElement('a');
    link.href = 'http://lorempixel.com/100/100/abstract/';
    link.target = '_blank';
    link.text = 'This is card';
    header.appendChild(link);
    content.appendChild(header);

    const button = document.createElement('div');
    button.classList.add('ui', 'bottom', 'attached', 'button', 'js-button');

    const icon = document.createElement('i');
    icon.classList.add('add','icon'); 

    const buttonText = document.createElement('span');
    buttonText.textContent = 'Add to playlist'; 
    icon.appendChild(buttonText);
    button.appendChild(icon);
    
    card.appendChild(imgDiv);
    card.appendChild(content);
    card.appendChild(button);

    console.log(card); 

    const searchResults = document.querySelector('#js-search-results');
    searchResults.appendChild(card);
}; 
SoundCloudAPI.renderTracks();
/* 4. Playlist 에 추가하고 실제로 재생하기 */
