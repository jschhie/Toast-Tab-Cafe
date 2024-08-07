# Toast Tab Cafe Simulation

> Flask, Python,  SQLAlchemy, HTML, CSS, Bootstrap, JavaScript, Jinja

## Overview
* Responsive Flask web app that simulates Toast Tab's online ordering system for cafes

## Website Demo

### Cafe Menu
> (work in progress)
<img src="https://github.com/jschhie/toast-tab-cafe/blob/main/demos/new-menu.png">

### Customize Drink 
> Required: sweetness, ice level, and milk type
<img src="https://github.com/jschhie/toast-tab-cafe/blob/main/demos/qty-btn-1.png">

> Optional: toppings (max == 3)
<img src="https://github.com/jschhie/toast-tab-cafe/blob/main/demos/qty-btn-2.png">

### Cart 
> (work in progress)
<img src="https://github.com/jschhie/toast-tab-cafe/blob/main/demos/cart-draft-qty-btn.png">

## todo's
* nav bar for menu
* search bar for menu
* menu modal
  * [x] toppings: max 3 options
* cart
  * [x] total price for a single drink: base price + milk type + toppings 
    * [x] Drink Modal:: Add to Cart Button: update label with total price
  * [ ] total price for entire order 
  * [x] add a single drink to cart
  * [ ] edit item/customizations
  * [ ] remove item
  * [x] multiply item: min = 1, max = 10
* checkout page
* receipt page
* (relational) database updates
  * [ ] Customer: name, email, password, list of Order(s)
  * [ ] Order: Customer & list of CustomDrink(s)
  * [ ] CustomDrink: sugar, ice, milk type, toppings, total price
  * [ ] Drink: "out of stock" tag // not as important
