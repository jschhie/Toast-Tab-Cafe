from flask import Blueprint, render_template, request, redirect, flash, url_for

from . import db
from .models import Drink, Topping, MilkType, Order, CustomDrink

from datetime import datetime

from sqlalchemy import select, or_

import json

views = Blueprint('views', __name__)



@views.route('/', methods=['POST', 'GET'])
def home():
    # Fetch all drinks, toppings, milk types
    all_drinks = dict()
    all_drinks["milk tea"] = Drink.query.filter(Drink.tag == "milk tea")
    all_drinks["fruit"] = Drink.query.filter(Drink.tag == "fruit")
    all_drinks["cheese foam"] = Drink.query.filter(Drink.tag == "cheese foam")
    all_drinks["frosty"] = Drink.query.filter(Drink.tag == "frosty")

    toppings = Topping.query.all()
    milk_types = MilkType.query.all()

    # Searchbar feature
    if request.method == 'POST':
        # Determine if searchbar query or checkout button clicked
        if request.form['action'] == "searchbar":
            user_query = request.form['user-query']
            if (len(user_query)):
                # Fetch matching drinks
                matching_drinks = Drink.query.filter(or_(Drink.name.contains(user_query), Drink.tag.contains(user_query), Drink.desc.contains(user_query)))
                if (matching_drinks.first()): 
                    # At least one matching drink
                    # todo: save current cart before refreshing
                    return render_template('home.html', all_drinks=all_drinks, toppings=toppings, milk_types=milk_types, matching_drinks=matching_drinks, query_flag=True)
        elif request.form['action'] == "checkout":
            # Add new Order into DB
            total_price = request.form['total-order-price']
            now = datetime.now()
            purchase_date = now.strftime("%m/%d/%Y") # 'formatted example: 09/19/2024'
            new_order = Order(total_price=total_price, purchase_date=purchase_date) # example: '$10.50'
            db.session.add(new_order)
            db.session.commit()

            # Create and connect new CustomDrink to new Order
            json_cart_rows_string = request.form['hidden-cart-row-items']
            json_cart_rows = json.loads(json_cart_rows_string)

            for cart_row in json_cart_rows:
                print(cart_row)
                custom_price = cart_row['custom_price']
                qty = cart_row['qty']
                drink_name = cart_row['drink_name']
                sugar_lvl = cart_row['sugar_lvl']
                ice_lvl = cart_row['ice_lvl']
                milk_type = cart_row['milk_type']
                toppings = str(cart_row['toppings']) # convert list to string type 
                # TODO: retrieve drink_id, topping_id, milk_type_id instead of storing them as strings
                custom_drink = CustomDrink(custom_price=custom_price, 
                                           qty=qty, 
                                           order_id=new_order.id,
                                           drink_name=drink_name,
                                           sugar_lvl=sugar_lvl,
                                           ice_lvl=ice_lvl,
                                           milk_type=milk_type,
                                           toppings=toppings)
                db.session.add(custom_drink)
                db.session.commit()

            return redirect(url_for('views.checkout'))

    # TODO: save current cart before refreshing
    return render_template('home.html', all_drinks=all_drinks, toppings=toppings, milk_types=milk_types, matching_drinks=None, query_flag=False)



@views.route('/checkout', methods=['POST', 'GET'])
def checkout():
    return render_template('checkout.html')




@views.route('/error')
def page_not_found():
    return render_template('error.html')