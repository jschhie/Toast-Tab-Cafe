# Toast Tab Cafe Simulation

> Flask, Python,  SQLAlchemy, HTML, CSS, Bootstrap, JavaScript, Jinja

## Overview
* Responsive Flask web app that simulates Toast Tab's online ordering system for cafes


## 🔖 Table of Contents
* [Website Demo](https://github.com/jschhie/toast-tab-cafe/blob/main/README.md#website-demo)
* [Running the Website Manually](https://github.com/jschhie/toast-tab-cafe/blob/main/README.md#running-the-site-manually)

## Website Demo

### Cafe Menu
> (work in progress)
<img src="https://github.com/jschhie/toast-tab-cafe/blob/main/demos/updated-home-1.png">

### Customize Drink 
> Required: sweetness, ice level, and milk type
<img src="https://github.com/jschhie/toast-tab-cafe/blob/main/demos/updated-modal-1.png">

> Optional: toppings
<img src="https://github.com/jschhie/toast-tab-cafe/blob/main/demos/updated-modal-2.png">

### Cart 
<img src="https://github.com/jschhie/toast-tab-cafe/blob/main/demos/updated-cart-2.png">

<hr>

## Running the Site Manually
To run this website manually (via your ```localhost```), download the required packages and this repository, as described below.

The packages and libraries needed to run this website are listed in the ```requirements.txt``` file. 
The following command will install all the required packages:

```bash
pip3 install -r requirements.txt
```

Next, to clone this repository, enter:
```bash 
git clone https://github.com/jschhie/toast-tab-cafe.git [folderNameHere]
```

Next, go into the folder: 

```bash 
cd [folderNameHere]
```

Finally, enter:

```bash
python3 main.py
```

The application will then automatically generate a ```cafe_database.db``` database, using SQLAlchemy, in the ```website``` directory.

<hr>

The user can then access and interact with the website at http://127.0.0.1:5000/ via any web browser. 


<hr>

## todo's
* nav bar for menu
  * [x] offcanvas: cart button in navbar
  * [ ] display, calc # (icon) of cart items
* secondary nav bar: filter, search
  * [x] dropdown filters for each drink category
  * [ ] search bar
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