const searchInput = document.querySelector('.search-input');
const searchBtn = document.querySelector('.search-button');
const historyBtn = document.getElementById('history-btn');
const result = document.getElementById('result');   
let sound = document.getElementById('sound')

var search = [];

searchBtn.addEventListener('click', ()=>{
    let value = searchInput.value;
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${value}`)
    .then((res)=> res.json())
    .then((output)=>{  
        let description = output[0].meanings[0].definitions[0].definition   
        let wordBox = `<div class="word">
                                <div class="word-head">
                                    <audio id="sound"></audio>
                                    <h2>Word: ${value}</h2>
                                    <button onclick="onClickFnSound()" class="btn"><i class="fa-solid fa-volume-high" ></i></button>
                                </div>
                                <p>Defination: ${description}</p>
                            </div>`;
        result.innerHTML = wordBox
        search.push({word: value, meaning: description});
        localStorage.setItem("datas", JSON.stringify(search));
        sound.setAttribute('src', output[0].phonetics[0].audio);         
    })
    .catch(()=>{
        alert("Please enter correct word.......!")
        result.innerText = "Wrong word ! Please enter new word."
    })
})

console.log(search);
const history = document.getElementById('history');

historyBtn.addEventListener('click', ()=>{
    history.innerHTML=""
    search.forEach((words)=>{   
        console.log(words);
        let historyBox = 
        `<div class="history-wrap">
        
                                <h2>${words.word}</h2>   
                                <p>${words.meaning}</p>
                                <button style ="align-items: center; color: red;font-size:24px" onclick="deleteItem('${words}')"><i class="fa fa-trash" aria-hidden="true"></i></button>
                                 </div>`
                            
        history.innerHTML = history.innerHTML+historyBox;
    })
    
})
const button1 = document.getElementById("delete-btn");


function deleteItem(word){
    history.remove()
}

function onClickFnSound(){
    sound.play();
}


