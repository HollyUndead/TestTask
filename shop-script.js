// const requestURL = 'https://raw.githubusercontent.com/HollyUndead/TestTask/main/JSON%20Data%20Base/Petrovka_horeca.json';
const requestURL  = './JSON Data Base/Petrovka_horeca.json'
async function igms(){
    const requset = new Request(requestURL);
    const respons = await fetch(requset);
    const array = await respons.json();
    console.log(array)
}
igms()
let img = document.createElement('img')
