const requestURL = 'https://raw.githubusercontent.com/HollyUndead/TestTask/main/JSON%20Data%20Base/Petrovka_horeca.json';

function ById(id){return document.getElementById(id)}

function byClassName(ClassName){return document.getElementsByClassName(ClassName)}

async function imgs(){
    const requset = new Request(requestURL);
    const respons = await fetch(requset);
    const array = await respons.json();
    console.log(array)
    let img = document.createElement('img')
    img.src=array.syrupHalva.img;
    img.style.display='block';
    ById('plateWithThings').append(img);
}

imgs()

