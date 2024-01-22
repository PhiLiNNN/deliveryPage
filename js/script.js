
let orderAmount = [0,0,0,0,0,0,0,0,0,0,0,0];

let pickupBool = false;  
window.addEventListener('resize', handleResize);
handleResize();

function init() { render(); }


function openDropdown() {
    const dropDownMenu = document.getElementById('droppdown-id');
    dropDownMenu.classList.toggle('open');
}


function render() {
    let addToBasket = document.getElementById('order-container-id');
    load();
    if (containsOnlyZeros(orderAmount)) { createDishesInfo();  }
    else {
        createPayInfo();
        toggleVisibility('pay-info-container-id', true);
        orderAmount.forEach((amount, idx) => {
            if (amount !==0) { addToBasket.innerHTML += templateGenerateShoppingCard(menus[idx], idx, amount); }
        }) 
        updateOrderIconCounter();
    }
    createPizzaCards('cards-container1-id');
    createDessertCards('cards-container2-id');
    createDrinksCards('cards-container3-id');
}


function containsOnlyZeros(list) {
    for (let i = 0; i < list.length; i++) { if (list[i] !== 0) { return false; } }
    return true;
}

function saveDataToLocalStorage(key, data) { localStorage.setItem(key, JSON.stringify(data)); }


function save() { saveDataToLocalStorage('amount', orderAmount); }


function load() { orderAmount = loadDataFromLocalStorage('amount') ||  Array(data.shortName.length).fill(0); }


function loadDataFromLocalStorage(key) {
    let dataText = localStorage.getItem(key);
    return JSON.parse(dataText);
}


function generateOrderAmountList() { for (let i = 0; i < data.shortName.length; i++) { orderAmount.push(0); } }


function createPizzaCards(box1) {
    let pizzaCardBox1 = document.getElementById(box1);
    pizzaCardBox1.innerHTML = '';
    for (let idx = 0; idx < 6; idx++) {
        pizzaCardBox1.innerHTML += templatePizzaCard(
            idx, menus[idx], 
            data.shortName[idx], 
            data.topping[idx],
            data.sauce[idx],
            data.description[idx],
            data.price[idx]
        );
    }
}
function createDessertCards(box1) {
    let pizzaCardBox1 = document.getElementById(box1);
    pizzaCardBox1.innerHTML = '';
    for (let idx = 6; idx < 10; idx++) {
        pizzaCardBox1.innerHTML += templateDessertCard(
            idx, menus[idx], 
            data.shortName[idx], 
            data.description[idx],
            data.price[idx]
        );
    }
}
function createDrinksCards(box1) {
    let pizzaCardBox1 = document.getElementById(box1);
    pizzaCardBox1.innerHTML = '';
    console.log('menus.length',menus.length);
    for (let idx = 10; idx < menus.length; idx++) {
        pizzaCardBox1.innerHTML += templateDrinksCard(
            idx, menus[idx], 
            data.shortName[idx], 
            data.description[idx],
            data.price[idx]
        );
    }
}
function createDishesInfo() {
    let addDishesInfo = document.getElementById('order-container-id');
    addDishesInfo.innerHTML = templateDishesInfo();
}


function createPayInfo() {
    let price = calPayment();
    let payInfoCon = document.getElementById('pay-info-container-id');
    payInfoCon.innerHTML = templatePayInfo(price);
    console.log(payInfoCon.innerHTML);
    
}


function toggleVisibility(elementId, show = true) {
    let element = document.getElementById(elementId);
    show ? element.classList.remove('d-none') : element.classList.add('d-none');
}


function add(pizzaName, index, addToBasket) {
    let pizzaId = `pizza${index}`;
    let existingPizza = isPizzaInBasket(addToBasket, pizzaId);
    if (containsOnlyZeros(orderAmount)) {
        createDishesInfo();
        toggleVisibility('add-dishes-info', false);
        toggleVisibility('pay-info-container-id', true);
     
    }
    if (!existingPizza) {
        orderAmount[index] = orderAmount[index] + 1;
        addToBasket.innerHTML += templateGenerateShoppingCard(pizzaName, index, orderAmount[index]);
        createPayInfo();
    
        
        
        save();
    }
    else { changeQuantity(1, index); }
}


function getPizzaIndex(index) { return  data.shortName.indexOf(index); }


function isPizzaInBasket(addToBasket, pizzaId) { return addToBasket.querySelector(`#${pizzaId}`); }


function addPizza(name) {
    let pizzaIndex = getPizzaIndex(name)
    let addToBasket = document.getElementById('order-container-id');
    toggleCardBorderFeedback(`card${pizzaIndex}`);
    if (pizzaIndex == -1) {return 1;}
    add(menus[pizzaIndex], pizzaIndex, addToBasket);
    updateOrderIconCounter();
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
    result = result + 5.00;
    if (pickupBool) {result = result - 5.00;}
    
    return result.toFixed(2).replace('.', ',');
}


function changeQuantity(increment, idx) {
    let quantityElement = document.getElementById(`quantity${idx}`);
    let quantity = +quantityElement.innerText + increment;
    if (quantity == 0) { 
        orderAmount[idx] = 0;
        removeOrder(idx);
        createPayInfo();
        save();
    } 
    else { updateQuantity(idx, quantity); }
}

function removeOrder(idx) {
    let deleteOrder = document.getElementById(`pizza${idx}`);
    deleteOrder.parentNode.removeChild(deleteOrder);
    if (orderAmount.every(amount => amount === 0)) { 
        createDishesInfo();
        toggleVisibility('add-dishes-info', true);
        toggleVisibility('pay-info-container-id', false);
     }
}

function updateQuantity(idx, quantity) {
    orderAmount[idx] = quantity;
    document.getElementById(`quantity${idx}`).innerText = quantity;
    createPayInfo();
    save();
}


function toggleCardBorderColor(activeCard, show = true) { 
    if (show) { document.getElementById(activeCard).classList.add('clicked'); }
    else { document.getElementById(activeCard).classList.remove('clicked'); }
}
    
function orderSum() { return orderAmount.reduce(function (accumulator, currentNumber) { return accumulator + currentNumber; }, 0); }


function handleResize() {
    let viewportWidth = window.innerWidth || document.documentElement.clientWidth;
    let openPopupBg = document.getElementById('mobile-popup-bg-id');
    let closeButton = document.getElementById('show-close-btn-id');
    let openButton = document.getElementById('show-open-btn-id');
    let shoppingCard = document.getElementById('shopping-card-container-id');
    if (viewportWidth > 1004) {
        if ((closeButton && !closeButton.classList.contains('d-none')) || (openButton && !openButton.classList.contains('d-none'))) {
            shoppingCard.style.display = 'flex';
        }
    } else {
        if (shoppingCard && openPopupBg && closeButton) {
            toggleMobileShoppingCard(false)
            updateOrderIconCounter();
            
        }
    }
}

function toggleMobileShoppingCard(open) {
    let openPopupBg = document.getElementById('mobile-popup-bg-id');
    let closeButton = document.getElementById('show-close-btn-id');
    let shoppingCard = document.getElementById('shopping-card-container-id');
    
    if (open) {
        closeButton.classList.remove('d-none');
        openPopupBg.classList.remove('d-none');
        shoppingCard.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    } else {
        closeButton.classList.add('d-none');
        openPopupBg.classList.add('d-none');
        shoppingCard.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    updateOrderIconCounter();
}



function updateOrderIconCounter() {
    let orders = document.getElementById('food-counter-id');
    let sum = orderSum();
    orders.innerText = sum;
}


function clearShoppingCard() {
    data.shortName.forEach((_, index) => {
        if (orderAmount[index] !== 0) {
            orderAmount[index] = 0;
        }
    });
    save();
    openOrderFeedbackPopup();
}

function openOrderFeedbackPopup() {
    let feedbackPopup = document.getElementById('order-popup-id');
    feedbackPopup.classList.remove('d-none');
    document.body.style.overflow = 'hidden';
    setTimeout(() => {
            feedbackPopup.classList.add('d-none');
            window.location.href = "index.html";
        }, 3000);
}
function deliveryInfo(decision) {
    
    let takeAway = document.getElementById('shopping-card-flex-right-id');
    let delivery = document.getElementById('shopping-card-flex-left-id');
    let carNone = document.getElementById('car_none');
    let carHighlight = document.getElementById('car_highlight');
    let takeAwayNone = document.getElementById('takeAway_none');
    let takeAwayHighlight = document.getElementById('takeAway_highlight');
    
    if (decision == 'delivery')  {
        if (carHighlight.classList.contains('d-none')) {
            takeAwayHighlight.classList.add('d-none');
            takeAwayNone.classList.remove('d-none');
            takeAway.classList.remove('border-highlight');

            delivery.classList.remove('border-default');
            delivery.classList.add('border-highlight');
            carNone.classList.add('d-none');
            carHighlight.classList.remove('d-none');
            pickupBool = false;
            createPayInfo();
        }
        else {
            return;
        }
    }
    else if (decision == 'takeAway') {
        
        if (takeAwayHighlight.classList.contains('d-none')) {
            takeAwayHighlight.classList.remove('d-none');
            takeAwayNone.classList.add('d-none');
            takeAway.classList.add('border-highlight');

            pickupBool = true;
            carNone.classList.remove('d-none');
            carHighlight.classList.add('d-none');
            delivery.classList.add('border-default');
            createPayInfo();
        }
        else {
            return;
        }
    }
}
