# Cafe Ordering System

> Flask, Python,  SQLAlchemy, HTML, CSS, Bootstrap, JavaScript, Jinja

## Overview
* Mobile-friendly cafe ordering system built with Flask and SQLite
* Customizable drink options, search filters, and business hours restrictions
* Intuitive, secure admin dashboard for managing the cafe database
* Hosted on PythonAnywhere at: https://sunrightcafe.pythonanywhere.com

## 🔖 Table of Contents
* [Website Demo](https://github.com/jschhie/toast-tab-cafe/blob/main/README.md#website-demo)
* [Running the Website Manually](https://github.com/jschhie/toast-tab-cafe/blob/main/README.md#running-the-site-manually)

## Website Demo

### Cafe Menu
> (work in progress)
<img src="https://github.com/jschhie/toast-tab-cafe/blob/main/demos/searchbar-1.png">

### Customize Drink 
> Required: sweetness, ice level, and milk type
<img src="https://github.com/jschhie/toast-tab-cafe/blob/main/demos/updated-modal-1.png">

> Optional: toppings
<img src="https://github.com/jschhie/toast-tab-cafe/blob/main/demos/updated-modal-2.png">

### Cart 
<img src="https://github.com/jschhie/toast-tab-cafe/blob/main/demos/updated-cart-2.png">

### Receipt
<img src="https://github.com/jschhie/toast-tab-cafe/blob/main/demos/receipt-1.png">

### Admin Dashboard
> Admin access to CRUD dashboard to manage Drinks, Toppings, MilkTypes, Orders, and CustomDrinks
<img src="https://github.com/jschhie/toast-tab-cafe/blob/main/demos/admin-view-1.png">
<img src="https://github.com/jschhie/toast-tab-cafe/blob/main/demos/admin-view-3-edit.png">

> Admin access to sample summary of Orders and CustomDrinks
<img src="https://github.com/jschhie/toast-tab-cafe/blob/main/demos/admin-view-2-summary.png">

<hr>

## Running the Site Manually
1. Clone this repository:
```bash 
git clone https://github.com/jschhie/toast-tab-cafe.git [folderNameHere]
```

2. Navigate into the folder: 
```bash 
cd [folderNameHere]
```

3. Install the required packages listed in the ```requirements.txt``` file:
```bash
pip3 install -r requirements.txt
```

4. Run the Flask app:
```bash
python3 main.py
```

<p>The application will automatically generate a ```cafe_database.db``` file in the ```website``` directory.</p>

<p>Access the website at: http://127.0.0.1:5000/ via any web browser.</p>

<p>Admin users can access the CRUD dashboard at: http://127.0.0.1:5000/admin (and http://127.0.0.1:5000/admin/test) after configuring credentials (username & password) in the <code>__init__.py</code> file.</p>
