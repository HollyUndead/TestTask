document.addEventListener('DOMContentLoaded', LoadCarte());

function ById(id){return document.getElementById(id)}

function ByClass(className){return document.getElementsByClassName(className)}

function LoadCarte()
{
    const cart = localStorage.getItem('cart');
    const shopName = localStorage.getItem('shopName')
    if (cart == null)
    {
        const div = document.createElement('div');
        const span = document.createElement('span');
        const a = document.createElement('a');
        div.id = 'emptyLocalStorage';
        a.id = 'shopPage';
        a.innerText = 'Go to the Shop';
        a.href = './index.html';
        span.id = 'emptyLocal';
        span.innerText = 'Cart is empty';
        ById('orderPlate').append(div);
        div.append(span);
        div.append(a);
        return;
    }
    MakeRequestToJSON(cart, shopName);
}

function MakeRequestToJSON(cart, shopName)
{
    let requestURlT = 'https://raw.githubusercontent.com/HollyUndead/TestTask/main/JSON%20Data%20Base/';
    const requestURl = requestURlT + shopName + '.json'
    MakeOrderPlate(requestURl, cart);
}



function GetUrl()
{
    const shopName = localStorage.getItem('shopName')
    let requestURlT = 'https://raw.githubusercontent.com/HollyUndead/TestTask/main/JSON%20Data%20Base/';
    const requestURl = requestURlT + shopName + '.json'
    return requestURl;
}

async function MakeOrderPlate(requestURl, cart)
{
    const request = new Request(requestURl);
    const response = await fetch(request);
    const array = await response.json();
    CreatePlateForCart(array, cart);
}

function CreatePlateForCart(array, cart)
{
    const cartList = JSON.parse(cart)
    cartList.shift();
    cartList.forEach((a) =>
    {
        let PriceNum = parseInt(array[a.name].price);
        const div = document.createElement('div');
        ById('orderPlate').append(div);
        const name = document.createElement('span');
        const img = document.createElement('img');
        const price = document.createElement('p');
        const number = document.createElement('input');
        div.append(img);
        div.append(name);
        div.append(price);
        div.append(number);
        price.className = 'Price';
        price.id = 'price' + a.name;
        number.type = 'number';
        number.max = 99;
        div.id = 'div' + a.name;
        div.className = 'ThingDiv';
        img.src = array[a.name].img;
        name.innerText = array[a.name].name;
        price.innerText = 'Price: ' + (PriceNum * a.number);
        number.min = 1;
        number.value = a.number;
        number.id = a.name;
        number.setAttribute('onchange', 'CalcPrice(id)')
        const delet = document.createElement('button');
        div.append(delet)
        delet.innerText = 'Delete position'
        delet.style = 'margin-left: 15px'
        delet.id = 'delet' + a.name;
        delet.setAttribute('onclick', 'deletePosition(id)')
    })
    TotalPrice();
}

function TotalPrice()
{
    const allPrices = Array.from(ByClass('Price'));
    let TotalPrice = 0;
    allPrices.forEach((a) =>
    {
        TotalPrice += parseInt(a.innerText.slice(7));
    })
    ById('totalPrice').innerText = 'Total price: ' + TotalPrice;
}

async function CalcPrice(id)
{
    const requestURl = GetUrl();
    const request = new Request(requestURl);
    const response = await fetch(request);
    const array = await response.json();

    const number = ById(id).value;
    const price = parseInt(array[id].price);
    let CalculatedPrice = number * price;
    ById('price' + id).innerText = 'Price: ' + CalculatedPrice;

    let cart = JSON.parse(localStorage.getItem('cart'));

    cart.forEach((a) =>
    {
        if (a.name == id)
        {
            a.number = number;
        }
    })
    localStorage.setItem('cart', JSON.stringify(cart))

    TotalPrice()
}

function MakeOrder()
{
    let inputs = Array.from(ByClass('contactInfo'));
    for (let i=0; i<inputs.length; i++)
    {
        if (inputs[i].value == '')
        {
            alert('Please, enter ' + inputs[i].id)
            return;
        }
    }
    localStorage.clear();
    alert('Order is accepted')
    location.reload();
}

function deletePosition(id)
{
    let d = '' + id.slice(5)
    const cart = JSON.parse(localStorage.getItem('cart'));
    const del = cart.find(a => a.name == d);
    let myIndex = cart.indexOf(del);
    cart.splice(myIndex, 1);
    localStorage.setItem('cart', JSON.stringify(cart))
    ById('div'+d).remove();
}