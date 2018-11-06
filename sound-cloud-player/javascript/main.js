/* 1. 검색 */

const inputArea = document.querySelector(".js-search");
inputArea.addEventListener("keyup", e => {
  if (e.keyCode === 13) {
    SoundCloudAPI.getTracks(inputArea.value);
  }
});

const button = document.querySelector(".js-submit");
button.addEventListener("click", () => {
  SoundCloudAPI.getTracks(inputArea.value);
});

const resetButton = document.querySelector("#js-reset");
resetButton.addEventListener("click", () => {
  localStorage.clear();
  sidebar.innerHTML = null;
});

const sidebar = document.querySelector("#js-playlist");
sidebar.innerHTML = localStorage.getItem('playlist');
/* 2. SoundCloud API  사용하기 */
const SoundCloudAPI = {
  init: () => {
    SC.initialize({
      client_id: "cd9be64eeb32d1741c17cb39e41d254d"
    });
  },

  getTracks: inputValue => {
    SC.get("/tracks", {
      q: inputValue
    }).then(function(tracks) {
      SoundCloudAPI.renderTracks(tracks);
    });
  }
};

SoundCloudAPI.init();
// SoundCloudAPI.getTrack("busker");
// find all tracks with the genre 'punk' that have a tempo greater than 120 bpm.

/* 3. 카드 보여주기 */
SoundCloudAPI.renderTracks = tracks => {
  let searchResults = document.querySelector("#js-search-results");
  searchResults.innerHTML = null;
  tracks.forEach(track => {
    //console.log(track);

    const card = document.createElement("div");
    card.classList.add("card");

    const imgDiv = document.createElement("div");
    imgDiv.classList.add("image");

    const imageImg = document.createElement("img");
    imageImg.classList.add("image_img");
    imageImg.src =
      track.artwork_url || "http://lorempixel.com/100/100/abstract";
    imgDiv.appendChild(imageImg);

    const content = document.createElement("div");
    content.classList.add("content");

    const header = document.createElement("div");
    header.classList.add("header");

    const link = document.createElement("a");
    link.href = track.permalink_url;
    link.target = "_blank"; //새탭에서 띄우기
    link.text = track.title;
    header.appendChild(link);
    content.appendChild(header);

    const button = document.createElement("div");
    button.classList.add("ui", "bottom", "attached", "button", "js-button");

    button.addEventListener("click", e => {
      SoundCloudAPI.addPlaylist(track.permalink_url);
    });

    const icon = document.createElement("i");
    icon.classList.add("add", "icon");

    const buttonText = document.createElement("span");
    buttonText.textContent = "Add to playlist";
    icon.appendChild(buttonText);
    button.appendChild(icon);

    card.appendChild(imgDiv);
    card.appendChild(content);
    card.appendChild(button);

    //console.log(card);

    searchResults.appendChild(card);
  });
};
//SoundCloudAPI.renderTracks(SoundCloudAPI.getTrack("coffee"));
/* 4. Playlist 에 추가하고 실제로 재생하기 */
SoundCloudAPI.addPlaylist = trackURL => {
  SC.oEmbed(trackURL, {
    auto_play: true
  }).then(function(embed) {
    console.log(embed.html);
    const playbox = document.createElement("div");
    playbox.innerHTML = embed.html;
    sidebar.insertBefore(playbox, sidebar.firstChild);

    //local storage
    localStorage.setItem("playlist", sidebar.innerHTML);


  });
};
