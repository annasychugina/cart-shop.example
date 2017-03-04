let items = require('./items.json');
let cart = [];
let itemsListTemplateFn = require('../items-list.hbs');
let cartListTemplateFn = require('../cart-list.hbs');

let homeworkContainer = document.querySelector('#homework-container');
let catalogElement = document.querySelector('#catalog');
let cartElement = document.querySelector('#cart');

if (localStorage.itemsInCart) {
    let itemsInCart = JSON.parse(localStorage.itemsInCart);
    let newItems = [];

    for (let i = 0; i < items.length; i++) {
        if (itemsInCart.indexOf(items[i].id) > -1) {
            newItems.push(items[i]);
        }
    }

    cart = newItems;
}

cartElement.innerHTML = cartListTemplateFn({
    items: cart
});

if (localStorage.itemsInCatalog) {
    let itemsInCatalog = JSON.parse(localStorage.itemsInCatalog);
    let newItems = [];

    for (let i = 0; i < items.length; i++) {
        if (itemsInCatalog.indexOf(items[i].id) > -1) {
            newItems.push(items[i]);
        }
    }

    items = newItems;
}

catalogElement.innerHTML = itemsListTemplateFn({
    items: items
});

require('./index.css');

homeworkContainer.addEventListener('click', e => {
    if (!e.target.dataset.role) {
        return;
    }

    if (e.target.dataset.role == 'toCart') {
        for (let i = 0; i < items.length; i++) {
            if (items[i].id == e.target.dataset.id) {
                cart.push(items[i]);
                items.splice(i, 1);
                break;
            }
        }
    } else if (e.target.dataset.role == 'fromCart') {
        for (let i = 0; i < cart.length; i++) {
            if (cart[i].id == e.target.dataset.id) {
                items.push(cart[i]);
                cart.splice(i, 1);
                break;
            }
        }
    }

    cartElement.innerHTML = cartListTemplateFn({
        items: cart
    });
    catalogElement.innerHTML = itemsListTemplateFn({
        items: items
    });

    localStorage.itemsInCatalog = JSON.stringify(items.map(i => i.id));
    localStorage.itemsInCart = JSON.stringify(cart.map(i => i.id));
});
