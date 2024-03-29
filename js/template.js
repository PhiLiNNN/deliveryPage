function templateMinOrderValueInfo(minOrderValue) {
    return /*html*/`
        <div id="min-order-value-id" class="order-value-container-bg">
            <div class="order-value-container">
                <p >Benötigter Betrag, um den Mindestbestellwert zu erreichen:</p>
            </div>
            <div class="minOrderValue-value-container">
                <p>${minOrderValue} €</p>
            </div>
        </div>
        <p id="min-order-value-info-id">Leider kannst du noch nicht bestellen. Wir liefert erst ab einem Mindestbestellwert von 30,00 € (exkl. Lieferkosten).</p>
    `;
}


function templatePayInfo(isButtonActive, subtotal, deliveryCosts, total) {
    return /*html*/`
        <div id="pay-info" class="pay-btn-container">
            <div class="subtotals-row">
                <div class="subtotals-name">
                    <p>Zwischensumme:</p>
                    <p>Lieferkosten:</p>
                    <p>Gesamt:</p>
                </div>
                <div class="subtotals-prices">
                    <span>${subtotal} €</span>
                    <span>${deliveryCosts} €</span>
                    <span>${total} €</span>
                </div>
            </div>
            <button id="pay-button-id"onclick="clearShoppingCard()" ${isButtonActive ? 'disabled' : ''}>Bezahlen (${total} €)</button>
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
            <img src="./img/shopping_bags_3_trans.png" alt="">
            <h2>Fülle deinen Warenkorb</h2>
            <p>Brich mit dem Gewöhnlichen! Wähle deine<br>Lieblingspizza aus, füge sie dem Warenkorb hinzu und bestelle dein Essen.</p>
        </div>
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
                            <p><span class="highlight">Belag:</span> ${topping}</p>
                            <p><span class="highlight">Soße:</span> ${sauce}</p>
                            <p>${description}</p>
                            <p class="price-color highlight">${price} €</p>
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


function templateCard(idx, name, shortName, description, price) {
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
                            <p>${description}</p>
                            <p class="price-color highlight">${price} €</p>
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


function templatePopup(inputValue, textareaValue, noteID) {
    return /*html*/`
            <div class="popup">
                <input id="tempTitel" type="text"  placeholder="Titel" value="${inputValue}" >
                <textarea id="tempContent" placeholder="Notiz schreiben...">${textareaValue}</textarea>
                <button  class="button" onclick="changeNote('${noteID}')">Änderungen speichern</button> 
            </div>
        `;
}


function templateNotes(noteID, titel, content, date, time) {
    return /*html*/`
            <div id="note${noteID}" class="notes" draggable="true">
                <input class="input" type="text" value="${titel}">
                <textarea class="textarea">${content}</textarea>
                <div class="date-and-Clock-container">
                    <button class="button" onclick="deleteNote('${noteID}')">Löschen</button> 
                    <div class="date-and-Clock">
                        <p>erstellt:</p>
                        <span>${date}</span>
                        <span>${time} Uhr</span>
                    </div> 
                </div>
            </div>
        `;
}
