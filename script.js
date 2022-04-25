const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const charcterName = document.getElementById('name');
const twitterBtn= document.getElementById('twitter');
const newquoteBtn= document.getElementById('new-quote');
const loader  = document.getElementById('loader');

// laoding spinner functions
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
  }
  
  // Remove Loading Spinner
  function complete() {
      if(!loader.hidden)
    quoteContainer.hidden = false;
    loader.hidden=true;
  }

//get quote from api
async function getQuote(){
    loading();
    const apiUrl = 'https://animechan.vercel.app/api/random';
    try{
      const response = await fetch(apiUrl);
      const data = await response.json();
    //   if data in chracter name is blank
    if(data.character === ''){
        authorText.innerText = 'Unkonwn';
    }else{
        authorText.innerText = data.character;
    }
    // reduce the font size of longer quotes
    if(data.quote.length>120){
        quoteText.classList.add('long-quote');
    }else{
        quoteText.classList.remove('long-quote');
    }
      quoteText.innerText = data.quote;

      charcterName.innerText = data.anime;
    //   stop loader
    complete();
    }catch(error){
        getQuote();
        console.log("woops an error occured here",error);
    }
}
// tweet quote

function tweetQuote(){

    const quote = quoteText.innerText;
    const character = charcterName.innerText;
    const anime = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${anime}`;
    window.open(twitterUrl,'_blank');

}

// event listner
newquoteBtn.addEventListener('click',getQuote);
twitterBtn.addEventListener('click',tweetQuote);

// calling of our function 
getQuote();