let menus = ['Pizza Giardino Esotico', 'Pizza Foresta Mistica','Pizza Seduzione Tropicale','Pizza Fusione Ardente','Pizza Sogno Orientale','Pizza L\'armonia dell\'Himalaya'];
let orderAmount = [];
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
    'price': ['7,50','8,00', '10,50', '7,50', '5,50', '7,50'],
    'priceFloat': [7.50, 8.00, 10.50, 7.50, 5.50, 7.50]
}


function init() {
    generateOrderAmountList(),
    createPizzaCards('cards-container1-id');
    createPizzaCardsDummy('cards-container2-id');
    createDishesInfo(); 
}

function generateOrderAmountList() { for (let i = 0; i < data.shortName.length; i++) { orderAmount.push(0); } 
}

// -----creates---------------

function createPizzaCards(box1) {
    let pizzaCardBox1 = document.getElementById(box1);
    pizzaCardBox1.innerHTML = '';
    menus.forEach((menu, idx) => {
        pizzaCardBox1.innerHTML += templatePizzaCard(
            idx, menu, 
            data.shortName[idx], 
            data.topping[idx],
            data.sauce[idx],
            data.description[idx],
            data.price[idx]
        );
    });
}
function createPizzaCardsDummy(box1) {
    let pizzaCardBox1 = document.getElementById(box1);
    pizzaCardBox1.innerHTML = '';
    menus.forEach((menu, idx) => {
        pizzaCardBox1.innerHTML += templatePizzaCardDummy(
            idx, menu, 
            data.shortName[idx], 
            data.topping[idx],
            data.sauce[idx],
            data.description[idx],
            data.price[idx]
        );
    });
}

function createDishesInfo() {
    let addDishesInfo = document.getElementById('order-container-id');
    addDishesInfo.innerHTML = templateDishesInfo();
}


function createPayInfo() {
    let price = calPayment();
    let payInfoCon = document.getElementById('pay-info-container-id');
    payInfoCon.innerHTML = templatePayInfo(price);
}


function toggleVisibility(elementId, show = true) {
    let element = document.getElementById(elementId);
    show ? element.classList.remove('d-none') : element.classList.add('d-none');
}

// -----logic---------------

function add(pizzaName, index, addToBasket) {
    let pizzaId = `pizza${index}`;
    let existingPizza = isPizzaInBasket(addToBasket, pizzaId);

    if (!existingPizza) {
        let amount = 1;
        addToBasket.innerHTML += templateGenerateShoppingCard(pizzaName, index, amount);
        orderAmount[index] = 1;
        toggleVisibility('add-dishes-info', false);
        toggleVisibility('pay-info-container-id', true);
        createPayInfo();
    }
    else {
        changeQuantity(1, index)
    }
}


function getPizzaIndex(index) { return  data.shortName.indexOf(index); }


function isPizzaInBasket(addToBasket, pizzaId) { return addToBasket.querySelector(`#${pizzaId}`); }


function addPizza(name) {
    let pizzaIndex = getPizzaIndex(name)
    let addToBasket = document.getElementById('order-container-id');
    toggleCardBorderFeedback(`card${pizzaIndex}`);
    if (pizzaIndex == -1) {return 1;}
    add(menus[pizzaIndex], pizzaIndex, addToBasket);
}

function toggleCardBorderFeedback(activeCard) { 
    toggleCardBorderColor(activeCard, true)
    setTimeout(() => { 
        toggleCardBorderColor(activeCard, false)
     }, 500);
}


function calPayment() {
    let result = 0;
    orderAmount.forEach((amount, idx) => {
        result += +data.priceFloat[idx] * amount;
    });
    return result.toFixed(2).replace('.', ',');
}


function changeQuantity(increment, idx) {
    let quantityElement = document.getElementById(`quantity${idx}`);
    let quantity = +quantityElement.innerText + increment;
    if (quantity < 1) { removeOrder(idx); } 
    else { updateQuantity(idx, quantity); }
}

function removeOrder(idx) {
    let deleteOrder = document.getElementById(`pizza${idx}`);
    deleteOrder.parentNode.removeChild(deleteOrder);
    orderAmount[idx] = 0;
    countOrders(); 
    createPayInfo(); 
    if (orderAmount.every(amount => amount === 0)) { toggleVisibility('add-dishes-info', true); }
}

function updateQuantity(idx, quantity) {
    orderAmount[idx] = quantity;
    document.getElementById(`quantity${idx}`).innerText = quantity;
    createPayInfo();
}


function countOrders() {
    let parentElement = document.getElementById('order-container-id');
    let childs = parentElement.childElementCount;
    if (childs == 1) { toggleVisibility('pay-info-container-id', false); }
}



function toggleCardBorderColor(activeCard, show = true) { 
    if (show) { document.getElementById(activeCard).classList.add('clicked'); }
    else { document.getElementById(activeCard).classList.remove('clicked'); }
}
    






















// -----templates---------------

function templatePayInfo(price) {
    return /*html*/`
        <div id="pay-info" class="pay-btn-container">
            <button>Bezahlen (${price} €)</button>
        </div>
    `;
}


function templateGenerateShoppingCard(name, idx, amount) {
    return /*html*/`
        <div id="pizza${idx}" class="order-style">
            <div class="order-name">
                <p>${name}</p>
            </div>
            <div class="order-btn">
                <button class="add-amount" onclick="changeQuantity(-1, '${idx}')">-</button>
                <p id="quantity${idx}"> ${amount} </p>
                <button class="add-amount" onclick="changeQuantity(1, '${idx}')">+</button>
            </div>
        </div>
   
    `;
}


function templateDishesInfo() {
    return /*html*/`
        <div id="add-dishes-info" class="shopping-card-info">
            <h2>Fülle deinen Warenkorb</h2>
            <p>Brich mit dem Gewöhnlichen! Wähle deine<br>Lieblingspizza aus, füge sie dem Warenkorb hinzu und bestelle dein Essen.</p>
        </div>
    `;
}

function templatePizzaCardMobile(idx, name, shortName, topping, sauce, description, price) {
    return /*html*/`
        <input type="radio" name="slide" id="c${idx}" checked>
        <label id="card${idx}" for="c${idx}" class="card">
            <div  class="row">
                <div class="row-coloum">
                    <div class="icon">${idx}</div>
                    <h4>${name}</h4>
                </div>
                <div class="description">
                    <img src="./img/${shortName}.png" alt="">
                    <div class="description-flexrow">
                        <div class="description-flexrow-center">
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

function templatePizzaCard(idx, name, shortName, topping, sauce, description, price) {
    return /*html*/`
        <input type="radio" name="slide" id="c${idx}" checked>
        <label id="card${idx}" for="c${idx}" class="card">
            <div  class="row">
                <div class="row-coloum">
                    <div class="icon">${idx}</div>
                    <h4>${name}</h4>
                </div>
                <div class="description">
                    <img src="./img/${shortName}.png" alt="">
                    <div class="description-flexrow">
                        <div class="description-flexrow-center">
                            <p>Belag: ${topping}</p>
                            <p>Soße: ${sauce}</p>
                            <p>${description}</p>
                            <p>${price} €</p>
                        </div>
                        <div class="add-btn">
                            <button class="add" onclick="addPizza('${shortName}')">+</button>
                        </div>
                    </div>
                </div>
            </div>
        </label>
    `;
}


function templatePizzaCardDummy(idx, name, shortName, topping, sauce, description, price) {
    return /*html*/`
        <input type="radio" name="slide" id="c1${idx}" checked>
        <label id="card1${idx}" for="c1${idx}" class="card">
            <div  class="row">
                <div class="row-coloum">
                    <div class="icon">1${idx}</div>
                    <h4>${name}</h4>
                </div>
                <div class="description">
                    <img src="./img/${shortName}.png" alt="">
                    <div class="description-flexrow">
                        <div class="description-flexrow-center">
                            <p>Belag: ${topping}</p>
                            <p>Soße: ${sauce}</p>
                            <p>${description}</p>
                            <p>${price} €</p>
                        </div>
                        <div class="add-btn">
                            <button class="add" onclick="addPizza('${shortName}')">+</button>
                        </div>
                    </div>
                </div>
            </div>
        </label>
    `;
}