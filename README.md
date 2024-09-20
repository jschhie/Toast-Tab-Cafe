# Toast Tab Cafe

> Flask, Python,  SQLAlchemy, HTML, CSS, Bootstrap, JavaScript, Jinja

## Overview
* Responsive online cafe ordering system using Flask and SQLite, implementing customizable drink options, search/filter features, and business hours restrictions
* Features an intuitive, secure admin dashboard for managing cafe database
* Hosted on PythonAnywhere; you may interact with the website at: https://sunrightcafe.pythonanywhere.com/

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
To run this website manually (via your ```localhost```), first, clone this repository:
```bash 
git clone https://github.com/jschhie/toast-tab-cafe.git [folderNameHere]
```

Next, go into the folder: 

```bash 
cd [folderNameHere]
```

Next, download the required packages and this repository, as described below.

The packages and libraries needed to run this website are listed in the ```requirements.txt``` file. 
The following command will install all the required packages:

```bash
pip3 install -r requirements.txt
```

Finally, enter:

```bash
python3 main.py
```

<p>The application will then automatically generate a ```cafe_database.db``` database, using SQLAlchemy, in the ```website``` directory.</p>

<p>The user can then access and interact with the website at http://127.0.0.1:5000/ via any web browser. </p>

<p>Admin users can access the CRUD dashboard at http://127.0.0.1:5000/admin (as well as: http://127.0.0.1:5000/admin/test) after providing the proper credentials (admin username & password), which can be configured in the <code>__init__.py</code> file.</p>
