# Toast Tab Cafe Simulation

> Flask, Python,  SQLAlchemy, HTML, CSS, Bootstrap, JavaScript, Jinja

## Overview
* Responsive Flask web app that simulates Toast Tab's online ordering system for cafes

## Website Demo

### Cafe Menu
> (work in progress)
<img src="https://github.com/jschhie/toast-tab-cafe/blob/main/demos/updated-home.png">

### Customize Drink 
> Required: sweetness, ice level, and milk type
<img src="https://github.com/jschhie/toast-tab-cafe/blob/main/demos/updated-menu-1.png">

> Optional: toppings (max == 3)
<img src="https://github.com/jschhie/toast-tab-cafe/blob/main/demos/updated-menu-2.png">

### Cart 
> (work in progress)
<img src="https://github.com/jschhie/toast-tab-cafe/blob/main/demos/updated-cart.png">

## todo's
* nav bar for menu
  * [x] offcanvas: cart button in navbar
  * [ ] display, calc # (icon) of cart items
* search bar for menu
  * [ ] dropdown submenus for each drink category
* menu modal
  * [x] toppings: max 3 options
* cart
  * [x] total price for a single drink: base price + milk type + toppings 
    * [x] Drink Modal:: Add to Cart Button: update label with total price
  * [x] total price for entire order 
  * [x] add a single drink to cart
  * [x] edit item
    * [ ] check if user cancels / discards edits: display original customizations
  * [x] remove item
  * [x] multiply item: min = 1, max = 10
  * [x] check if "cart is empty!"  
* checkout page
* receipt page
* (relational) database updates
  * [ ] Customer: name, email, password, list of Order(s)
  * [ ] Order: Customer & list of CustomDrink(s)
  * [ ] CustomDrink: sugar, ice, milk type, toppings, total price
  * [ ] Drink: "out of stock" tag // not as important