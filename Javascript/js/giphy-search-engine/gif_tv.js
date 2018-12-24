var kewords = ['dogs','cats','animals'];
const upperArea = document.querySelector("#center-img");


const searchAndPush2 = (keyword) => {
    //2. API를 활용하여 data를 받는다. 가공한다.
const img = keword[0];
const API_KEY = 'XgPTvyw9a8ogUJdDfyjCun5HBDEAzX2c';
const URL = `https://api.giphy.com/v1/gifs/search?q=${img}&api_key=${API_KEY}`;

// //Ajax request 
const GiphyAJAXCall = new XMLHttpRequest();
GiphyAJAXCall.open('GET',URL);
GiphyAJAXCall.send();
GiphyAJAXCall.addEventListener('load',(e) =>{
    const rawData = e.target.response;
    const parsedData = JSON.parse(rawData); 
    pushToDOM2(parsedData);
});

};

//3. GIF 파일들을 index.html 에 밀어 넣는다.
const pushToDOM2 = (parsedData) => {
    const DataSet = parsedData.data;
    const imgURL = parsedData.data[0].images.fixed_height.url;
    
    upperArea.innerHTML = null;
    
    const imgDataSet = DataSet.forEach((imageData) =>{
         let imgURL = imageData.images.fixed_height.url;
         let alt = imageData.title;
         upperArea.innerHTML = `<img src=${imgURL} alt=${alt}/>`;
    }); 
    //console.log(parsedData.data[0].images.fixed_height.url);
 }

 searchAndPush2(kewords);
