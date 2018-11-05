//1. <input> 테그 안의 값을 잡는다.
const inputValue = document.querySelector('#js-input').value;
const button = document.querySelector('#js-button');
const inputArea = document.querySelector('#js-input');

button.addEventListener('click',() => {
    const inputValue = document.querySelector('#js-input').value;
    pushToDOM(inputValue);
});

inputArea.addEventListener('keyup',(e) =>{
    const inputValue = document.querySelector('#js-input').value;
    if(e.which ===13){
        pushToDOM(e);
    }
});

//2. API를 활용하여 data를 받는다. 가공한다.


//3. GIF 파일들을 index.html 에 밀어 넣는다.
const pushToDOM = (data) => {
   const resultArea = document.querySelector('#result-area');
   resultArea.innerHTML = data;
}