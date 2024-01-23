function containsOnlyZeros(list) {
    return list.every(item => item === 0);
}


function toggleVisibility(elementId, show = true) {
    const element = document.getElementById(elementId);
    show ? element.classList.remove('d-none') : element.classList.add('d-none');
}


function toggleBorderDefault(elementId, show = true) {
    const element = document.getElementById(elementId);
    show ? element.classList.remove('border-default') : element.classList.add('border-default');
}


function toggleBorderHighlight(elementId, show = true) {
    const element = document.getElementById(elementId);
    show ? element.classList.remove('border-highlight') : element.classList.add('border-highlight');
}


function toggleCardBorderColor(activeCard, show = true) { 
    if (show) { document.getElementById(activeCard).classList.add('clicked'); }
    else { document.getElementById(activeCard).classList.remove('clicked'); }
}


function toggleCardBorderFeedback(activeCard) { 
    toggleCardBorderColor(activeCard, true)
    setTimeout(() => { 
        toggleCardBorderColor(activeCard, false)
     }, 500);
}


function toggleMobileShoppingCard(open) {
    const shoppingCard = document.getElementById('shopping-card-container-id');
    if (open) {
        toggleVisibility('show-close-btn-id', show = true);
        toggleVisibility('mobile-popup-bg-id', show = true);
        shoppingCard.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    } else {
        toggleVisibility('show-close-btn-id', show = false);
        toggleVisibility('mobile-popup-bg-id', show = false);
        shoppingCard.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    updateOrderCounter();
}


function orderSum() { return orderAmount.reduce(function (accumulator, currentNumber) { return accumulator + currentNumber; }, 0); }


function getPizzaIndex(index) { return  data.shortName.indexOf(index); }


function isPizzaInBasket(addToBasket, pizzaId) { return addToBasket.querySelector(`#${pizzaId}`); }
