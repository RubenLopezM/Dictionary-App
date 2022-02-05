const resultDiv = document.querySelector(".result");
const searchWord=document.querySelector(".search-field")
const wordEle = document.querySelector("#word");
const btn= document.querySelector(".search-btn")
const phonetics = document.querySelector(".phonetics");
const audio = document.querySelector("audio");
const exampleEl=document.querySelector(".word-example")
const wordMeaning = document.querySelector(".word-definition");
const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";


btn.addEventListener('click', ()=>{handle()} )

const handle = async () => {
    
        const word = searchWord.value
        
        const result = await fetch(url.concat(word));

        resultDiv.style.display = "block";
        const data = await result.json();
        
        if (result.status==200) {

            document.querySelectorAll(".wordmeaning")[0].style.removeProperty("display");
            document.querySelectorAll(".wordmeaning")[1].style.removeProperty("display");
            exampleEl.style.removeProperty("display");
            phonetics.style.removeProperty("display");
            audio.style.removeProperty("display");
            document.querySelector(".synonyms").style.removeProperty("display");
            wordEle.innerText = data[0].word;
            phonetics.innerText = data[0].phonetics[0].text;
            audio.src = data[0].phonetics[0].audio;
            wordMeaning.innerText = data[0].meanings[0].definitions[0].definition;
            exampleEl.innerText = data[0].meanings[0].definitions[0].example;
            const synonymsArray = data[0].meanings[0].definitions[0].synonyms;
            let synonymsData = "";
            if (synonymsArray.length>0) {
                synonymsArray.forEach(element => {
                    synonymsData += `<p class="pills">${element}</p>`;
                });
            }
            else {
                synonymsData = `<p class="pills">No Synonyms Available</p>`;
            }
            document.querySelector(".synonyms").innerHTML = synonymsData;
        } else {
            audio.style.display = "none";
            wordEle.innerText = data.title;
            document.querySelectorAll(".wordmeaning")[0].style.display = "none";
            document.querySelectorAll(".wordmeaning")[1].style.display = "none";
            exampleEl.style.display = "none";
            phonetics.style.display = "none";
            wordMeaning.innerText = "There are no definitions available"
            document.querySelector(".synonyms").style.display = "none";
        }
}