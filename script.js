let menus = ['Pizza Giardino Esotico', 'Pizza Foresta Mistica','Pizza Seduzione Tropicale','Pizza Fusione Ardente','Pizza Sogno Orientale','Pizza L\'armonia dell\'Himalaya'];
let amounts = [0, 0, 0, 0, 0, 0];
let data = {
            'shortName': ['giardino', 'foresta','tropicale','ardente','sogno','himalaya'],
            'topping': ['Rucola, frische Erdbeeren, Ziegenkäse, Pinienkerne',
                        'Waldpilze (wie Shiitake, Pfifferlinge), Trüffelöl, Mozzarella',
                        'Hähnchen, Ananas, Mango, Kokosraspeln',
                        'Chorizo, Jalapeños, Paprika, Manchego-Käse',
                        'Gegrilltes Lamm, Auberginen, Feta, Minze',
                        'Curry-Hühnchen, Kichererbsen, Spinat, Joghurtsauce'],
            'sauce': ['Balsamico-Glasur', 'Schwarze Knoblauchcreme', 'Schwarze Knoblauchcreme', 'Chipotle-Tomatensauce','Tahini-Joghurt', 'Mango-Chutney'],
            'description': ['Der Kontrast zwischen süßen Erdbeeren, würzigem Ziegenkäse und knusprigem Rucola verleiht dieser Pizza eine einzigartige Note',
                            'Diese Pizza bietet eine mysteriöse Mischung aus erdigen Aromen und dem Hauch von Trüffelöl.',
                            'Diese Pizza bietet eine mysteriöse Mischung aus erdigen Aromen und dem Hauch von Trüffelöl.',
                            'Für diejenigen, die es gerne etwas würziger mögen, bietet diese Pizza eine perfekte Mischung aus Schärfe und Aroma.',
                            'Diese Pizza bringt den Geschmack des Nahen Ostens mit zartem Lamm und erfrischenden Minznoten auf den Tisch.',
                            'Eine harmonische Fusion von würzigem Curry-Hühnchen, cremigen Kichererbsen, frischem Spinat und einer verführerischen Joghurtsauce. Eine köstliche Reise in die Aromen des Himalaya, die Ihren Gaumen verzaubert.'],
            'price': ['7,50','7,50', '7,50', '7,50', '7,50', '7,50']
}



function init() {
    createPizzaCards();
    createDishesInfo();

}


function addPizza(name) {
    let addToBasket = document.getElementById('order-container-id');
    let getIndex = data.shortName.indexOf(name);
    if (getIndex == -1) {return 1;}
    let pizzaId = `pizza${getIndex}`;
    let existingPizza = addToBasket.querySelector(`#${pizzaId}`);
    if (existingPizza) {return;}
    let pizzaName = menus[getIndex];
    let amount = 1;
    addToBasket.innerHTML += templateGenerateShoppingCard(pizzaName, getIndex, amount);
    hideDishesInfo();
    showePayInfo();
    createPayInfo();
}

function createDishesInfo() {
    let addDishesInfo = document.getElementById('order-container-id');
    addDishesInfo.innerHTML = templateDishesInfo();
}

function hideDishesInfo() {
    let addDishesInfo = document.getElementById('add-dishes-info');
    addDishesInfo.classList.add('d-none');
}

function createPayInfo() {
    let payInfoCon = document.getElementById('pay-info-container-id');
    payInfoCon.innerHTML = templatePayInfo();
}

function showePayInfo() {
    let payInfoClass = document.getElementById('pay-info-container-id');
    payInfoClass.classList.remove('d-none');
}


function templatePayInfo() {
    return /*html*/`
        <div id="pay-info" class="pay-btn-container">
            <button>Bezahlen (700,88 €)</button>
        </div>
    `;
}

function changeQuantity(increment, idx) {
    let quantityElement = document.getElementById(`quantity${idx}`);
    let quantity = +quantityElement.innerText + increment;
    if (quantity < 1) {
        let deleteOrder = document.getElementById(`pizza${idx}`);
        deleteOrder.parentNode.removeChild(deleteOrder);
    }
    console.log(Math.max(1, quantity));
    quantity = Math.max(1, quantity); 
    quantityElement.innerText = quantity;
}


function templateGenerateShoppingCard(name, idx, amount) {
    return /*html*/`
        <div id="pizza${idx}" class="order-style">
            <div class="order-name">
                <p>${name}</p>
            </div>
            <div class="order-btn">
                <button class="add" onclick="changeQuantity(-1, '${idx}')">-</button>
                <p id="quantity${idx}"> ${amount} </p>
                <button class="add" onclick="changeQuantity(1, '${idx}')">+</button>
            </div>
        </div>
   
    `;
}


function templateDishesInfo() {
    return /*html*/`
        <div id="add-dishes-info">
            <p>Fülle deinen Warenkorb</p>
        </div>
    `;
}



        

function createPizzaCards() {
    let pizzaCard = document.getElementById('cards-container-id');
    pizzaCard.innerHTML = '';
    
    menus.forEach((menu, idx) => {
        pizzaCard.innerHTML += templatePizzaCard(
            idx, menu, 
            data.shortName[idx], 
            data.topping[idx],
            data.sauce[idx],
            data.description[idx],
            data.price[idx]
        );
    });
}


function templatePizzaCard(idx, name, shortName, topping, sauce, description, price) {
    return /*html*/`
        <input type="radio" name="slide" id="c${idx}" checked>
        <label for="c${idx}" class="card">
            <div class="row">
                <div class="row-coloum">
                    <div class="icon">${idx}</div>
                    <h4>${name}</h4>
                </div>
                <div class="description">
                    <img src="./img/${shortName}.png" alt="">
                    <div class="description-flexrow">
                        <div >
                            <p>Belag: ${topping}</p>
                            <p>Soße: ${sauce}</p>
                            <p>${description}</p>
                            <p>${price} €</p>
                        </div>
                        <div>
                            <button class="add" onclick="addPizza('${shortName}')">+</button>
                        </div>
                    </div>
                </div>
            </div>
        </label>
    `;
}






