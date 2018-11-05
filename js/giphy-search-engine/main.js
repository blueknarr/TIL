//1. <input> 테그 안의 값을 잡는다.
const inputValue = document.querySelector('#js-input').value;
const button = document.querySelector('#js-button');
const inputArea = document.querySelector('#js-input');

button.addEventListener('click',() => {
    const inputValue = document.querySelector('#js-input').value;
    pushToDOM(inputValue);
});

//enter key를 눌렀을 때 이벤트를 잡는다.
inputArea.addEventListener('keyup',(e) =>{
    const inputValue = document.querySelector('#js-input').value;
    if(e.which ===13){
        pushToDOM(e);
    }
});

//2. API를 활용하여 data를 받는다. 가공한다.
const API_KEY = 'XgPTvyw9a8ogUJdDfyjCun5HBDEAzX2c';
let keyword = 'car';
const URL = `https://api.giphy.com/v1/gifs/search?q=${keyword}&api_key=${API_KEY}`;

//Ajax request 
const GiphyAJAXCall = new XMLHttpRequest();
GiphyAJAXCall.open('GET',URL);
GiphyAJAXCall.send();
GiphyAJAXCall.addEventListener('load',(e) =>{
    const rawData = e.target.response;
    const parsedData = JSON.parse(rawData); 
    pushToDOM(parsedData);
});



//3. GIF 파일들을 index.html 에 밀어 넣는다.
const pushToDOM = (parsedData) => {
   const resultArea = document.querySelector('#result-area');
   const imgURL = parsedData.data[0].images.fixed_height.url;
   console.log(imgURL);
   resultArea.innerHTML = `<img src=${imgURL} alt="dogs"/>`;
   //console.log(parsedData.data[0].images.fixed_height.url);

}