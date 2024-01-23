let orderAmount = [0,0,0,0,0,0,0,0,0,0,0,0];
const minOrderValueCots = 30.00;
let pickupBool = false;  


window.addEventListener('resize', handleResize);
handleResize();


function init() {
    load();
    createShoppingCard();
    createPizzaCards('cards-container1-id');
    createDessertCards('cards-container2-id');
    createDrinksCards('cards-container3-id');
}


function createShoppingCard() {
    const addToBasket = document.getElementById('order-container-id');
    if (containsOnlyZeros(orderAmount)) { 
        createDishesInfo();
    }
    else {
        createPayInfo();
        createMinOrderValueInfo(pickupBool);
        toggleVisibility('pay-info-container-id', true);
        orderAmount.forEach((amount, idx) => {
            if (amount !==0) { addToBasket.innerHTML += templateGenerateShoppingCard(menus[idx], idx, amount); }
        }) 
        updateOrderCounter();
    }
}


function saveDataToLocalStorage(key, data) { localStorage.setItem(key, JSON.stringify(data)); }


function save() { saveDataToLocalStorage('amount', orderAmount); }


function load() { orderAmount = loadDataFromLocalStorage('amount') ||  Array(data.shortName.length).fill(0); }


function loadDataFromLocalStorage(key) {
    const dataText = localStorage.getItem(key);
    return JSON.parse(dataText);
}


function generateOrderAmountList() { for (let i = 0; i < data.shortName.length; i++) { orderAmount.push(0); } }


function createPizzaCards(box1) {
    const pizzaCardBox1 = document.getElementById(box1);
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


function createCards(box1, startIdx, endIdx, cardTemplate) {
    const pizzaCardBox1 = document.getElementById(box1);
    pizzaCardBox1.innerHTML = '';
    for (let idx = startIdx; idx < endIdx; idx++) {
        pizzaCardBox1.innerHTML += cardTemplate(
            idx, menus[idx], 
            data.shortName[idx], 
            data.description[idx],
            data.price[idx]
        );
    }
}


function createDessertCards(box1) { createCards(box1, 6, 10, templateCard); }


function createDrinksCards(box1) { createCards(box1, 10, menus.length, templateCard); }


function createDishesInfo() {
    const addDishesInfo = document.getElementById('order-container-id');
    addDishesInfo.innerHTML = templateDishesInfo();
}


function checkMinOrderValue(pickupBool) {
    const price = calcPayment();
    let minOrderValue = (minOrderValueCots - price).toFixed(2);
    minOrderValue = parseFloat(minOrderValue);
    if (minOrderValue <= 0.00 || minOrderValue >= minOrderValueCots || pickupBool == true) {
        toggleVisibility('min-order-value-id', show = false);
        toggleVisibility('min-order-value-info-id', show = false); 
    }
    else {
        toggleVisibility('min-order-value-id', show = true);
        toggleVisibility('min-order-value-info-id', show = true);
    }
}


function createMinOrderValueInfo(pickupBool) {
    const price = calcPayment();
    let minOrderValue = (minOrderValueCots - price).toFixed(2);
    const minOrderValueCon = document.getElementById('min-order-value-container-id');
    minOrderValue = minOrderValue.replace('.', ',');
    minOrderValueCon.innerHTML = templateMinOrderValueInfo(minOrderValue);
    checkMinOrderValue(pickupBool);
}


function createPayInfo() {
    let price = calcPayment();
    deliveryCosts = pickupBool ? 0.00 : 4.99;
    const total = (parseFloat(price) + parseFloat(deliveryCosts)).toFixed(2).replace('.', ',');
    price = parseFloat(price);
    const buttonIsDisabled = !pickupBool && price < minOrderValueCots;
    const payInfoCon = document.getElementById('pay-info-container-id');
    payInfoCon.innerHTML = templatePayInfo(buttonIsDisabled, price.toFixed(2).replace('.', ','), deliveryCosts.toFixed(2).replace('.', ','), total);
}


function add(pizzaName, index, addToBasket) {
    const pizzaId = `pizza${index}`;
    const existingPizza = isPizzaInBasket(addToBasket, pizzaId);
    if (containsOnlyZeros(orderAmount)) {
        createDishesInfo();
        toggleVisibility('add-dishes-info', false);
        toggleVisibility('pay-info-container-id', true);
    }
    if (!existingPizza) {
        orderAmount[index] = orderAmount[index] + 1;
        addToBasket.innerHTML += templateGenerateShoppingCard(pizzaName, index, orderAmount[index]);
        createPayInfo();
        createMinOrderValueInfo(pickupBool);
        save();
    }
    else { changeQuantity(1, index); }
}


function addPizza(name) {
    const pizzaIndex = getPizzaIndex(name)
    const addToBasket = document.getElementById('order-container-id');
    toggleCardBorderFeedback(`card${pizzaIndex}`);
    if (pizzaIndex == -1) {return 1;}
    add(menus[pizzaIndex], pizzaIndex, addToBasket);
    updateOrderCounter();
}


function calcPayment() {
    let result = 0.00;
    orderAmount.forEach((amount, idx) => {
        result += +data.priceFloat[idx] * amount;
    });
    return result.toFixed(2);
}


function changeQuantity(increment, idx) {
    let quantityElement = document.getElementById(`quantity${idx}`);
    let quantity = +quantityElement.innerText + increment;
    if (quantity == 0) { 
        orderAmount[idx] = 0;
        createMinOrderValueInfo(pickupBool);
        removeOrder(idx);
        createPayInfo();
        save();
    } 
    else { updateQuantity(idx, quantity); }
}


function removeOrder(idx) {
    const deleteOrder = document.getElementById(`pizza${idx}`);
    deleteOrder.parentNode.removeChild(deleteOrder);
    if (containsOnlyZeros(orderAmount)) { 
        createDishesInfo();
        toggleVisibility('add-dishes-info', true);
        toggleVisibility('pay-info-container-id', false);
        toggleVisibility('min-order-value-id', show = false);
        toggleVisibility('min-order-value-info-id', show = false); 
     }
}


function updateQuantity(idx, quantity) {
    orderAmount[idx] = quantity;
    document.getElementById(`quantity${idx}`).innerText = quantity;
    createPayInfo();
    createMinOrderValueInfo(pickupBool);
    save();
}


function handleResize() {
    const  viewportWidth = window.innerWidth || document.documentElement.clientWidth;
    const  viewportHeight = window.innerWidth || document.documentElement.clientHeight;
    const  openPopupBg = document.getElementById('mobile-popup-bg-id');
    const  closeButton = document.getElementById('show-close-btn-id');
    const  openButton = document.getElementById('show-open-btn-id');
    const  shoppingCard = document.getElementById('shopping-card-container-id');
    if (viewportWidth > 1004 && viewportHeight > 800) {
        if ((closeButton && !closeButton.classList.contains('d-none')) || (openButton && !openButton.classList.contains('d-none'))) {
            shoppingCard.style.display = 'flex';
        }
    } else {
        if (shoppingCard && openPopupBg && closeButton) {
            updateOrderIconCounter();
            toggleMobileShoppingCard(false);
        }
    }
}


function updateOrderCounter() {
    const orders = document.getElementById('food-counter-id');
    const sum = orderSum();
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


function openDropdown() {
    const dropDownMenu = document.getElementById('droppdown-id');
    dropDownMenu.classList.toggle('open');
}


function openOrderFeedbackPopup() {
    const feedbackPopup = document.getElementById('order-popup-id');
    feedbackPopup.classList.remove('d-none');
    document.body.style.overflow = 'hidden';
    setTimeout(() => {
            feedbackPopup.classList.add('d-none');
            window.location.href = "index.html";
        }, 3000);
}


function deliveryInfo(decision) {
    const carHighlight = document.getElementById('car_highlight');
    const takeAwayHighlight = document.getElementById('takeAway_highlight');
    if (decision === 'delivery') {  handleDelivery(carHighlight); } 
    else if (decision === 'takeAway') {  handleTakeAway(takeAwayHighlight); }
}


function handleDelivery(carHighlight) {
    if (carHighlight.classList.contains('d-none')) {
        pickupBool = false;
        toggleVisibility('takeAway_highlight', false, true);
        toggleVisibility('takeAway_none', true, false);
        toggleVisibility('car_none', false, true);
        toggleVisibility('car_highlight', true, false);
        toggleBorderHighlight('shopping-card-flex-right-id', true);
        toggleBorderHighlight('shopping-card-flex-left-id', false);
        toggleBorderDefault('shopping-card-flex-left-id', true);
        createPayInfo();
        createMinOrderValueInfo(pickupBool);
    }
}


function handleTakeAway(takeAwayHighlight) {
    if (takeAwayHighlight.classList.contains('d-none')) {
        pickupBool = true;
        toggleVisibility('takeAway_highlight', true, true);
        toggleVisibility('takeAway_none', false, false);
        toggleVisibility('car_none', true, true);
        toggleVisibility('car_highlight', false, false);
        toggleBorderHighlight('shopping-card-flex-right-id', false);
        toggleBorderDefault('shopping-card-flex-left-id', false);
        createPayInfo();
        createMinOrderValueInfo(pickupBool);
    }
}
