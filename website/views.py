from flask import Blueprint, render_template, request, redirect, flash

from . import db
from .models import Drink, Topping, MilkType

#import datetime

from sqlalchemy import select, or_

views = Blueprint('views', __name__)

'''
day_of_week_map = {0: 'Mondays', 1: 'Tuesdays', 2: 'Wednesdays', 3: 'Thursdays', 4: 'Fridays', 5: 'Saturdays', 6: 'Sundays'}
day_of_week_index = datetime.datetime.today().weekday() # where 0: Monday, ...  
day_of_week = day_of_week_map[day_of_week_index]
'''

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
        user_query = request.form['user-query']
        if (len(user_query)):
            # Fetch matching drinks
            matching_drinks = Drink.query.filter(or_(Drink.name.contains(user_query), Drink.tag.contains(user_query), Drink.desc.contains(user_query)))
            if (matching_drinks.first()): 
                # At least one matching drink
                # todo: save current cart before refreshing
                return render_template('home.html', all_drinks=all_drinks, toppings=toppings, milk_types=milk_types, matching_drinks=matching_drinks, query_flag=True)

    # todo: save current cart before refreshing
    return render_template('home.html', all_drinks=all_drinks, toppings=toppings, milk_types=milk_types, matching_drinks=None, query_flag=False)



@views.route('/checkout', methods=['POST', 'GET'])
def checkout():
    return render_template('checkout.html')




@views.route('/error')
def page_not_found():
    return render_template('error.html')