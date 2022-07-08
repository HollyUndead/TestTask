document.addEventListener('DOMContentLoaded', () =>
{
    let arrayShop = Array.from(document.getElementsByClassName('Shops'))
    arrayShop.forEach((a)=>
    {
        if (a.checked)
        {
            CreatePlateID(a.id)
        }
    })
})

function CreatePlateID(id){
let requestURlT = 'https://raw.githubusercontent.com/HollyUndead/TestTask/main/JSON%20Data%20Base/';
const requestURl = requestURlT + id + '.json'
checkLocal(id);
CreatePlate(requestURl);
}

function checkLocal(id)
{
    if (localStorage.getItem('shopName') != id)
    {
        localStorage.clear();
        localStorage.setItem('shopName', id);
    }
}

function ById(id){return document.getElementById(id)}

function byClassName(ClassName){return document.getElementsByClassName(ClassName)}

async function CreatePlate(requestURl)
{
    const request = new Request(requestURl);
    const response = await fetch(request);
    const array = await response.json();
    CreatePlateForThing(array);
}

function CreatePlateForThing(array)
{
    const things = array.things;
    things.forEach((a) =>
    {
    const div = document.createElement('div');
    const name = document.createElement('span');
    const img = document.createElement('img');
    const price = document.createElement('p');
    const button = document.createElement('button');
    ById('plateWithThings').append(div);
    div.appendChild(img);
    div.appendChild(name);
    div.appendChild(price);
    div.appendChild(button);
    div.className = 'PlateWithThing';
    name.innerText = array[a].name;
    name.className = 'Name'
    img.src = array[a].img;
    price.innerText = ' Prise: ' + array[a].price;
    price.className = 'Price';
    button.innerText = 'Add to cart';
    button.setAttribute('onclick', 'AddToCart(id)');
    button.id = a;
    })
}

function AddToCart(id){
    let CartT = localStorage.getItem('cart');
    let Cart = JSON.parse(CartT)
    if (Cart == null){
        Cart = [{name: '', number: ''}]
    }
    console.log(Cart)
    let t = {};
    t.name = id;
    t.number = 1;
    if (Cart.find(cart => cart.name == id) == undefined)
    {
        Cart.push(t);
    }
    else
    {
        Cart.find(names => names.name == id).number++
    }

    localStorage.setItem('cart', JSON.stringify(Cart))
}