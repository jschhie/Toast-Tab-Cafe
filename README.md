# Toast Tab Cafe Simulation

> Flask, Python,  SQLAlchemy, HTML, CSS, Bootstrap, JavaScript, Jinja

## Overview
* Responsive Flask web app that simulates Toast Tab's online ordering system for cafes

## Website Demo
* coming soon

## todo's
* nav bar for menu
* search bar for menu
* menu modal
  * toppings: max 3 options
* cart
  * total price for a single drink & entire order 
  * add a single item/drink to cart
  * edit item
  * remove item
  * multiply item    
* checkout page
* receipt page
* (relational) database updates
  * Customer: name, email, password, list of Order(s)
  * Order: Customer & list of CustomDrink(s)
  * CustomDrink: sugar, ice, milk type, toppings, total price
  * Drink: "out of stock" tag
