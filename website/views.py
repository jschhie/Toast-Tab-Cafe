from flask import Blueprint, render_template, request, redirect, flash

from . import db
from .models import Drink, Topping

#from collections import defaultdict

views = Blueprint('views', __name__)



@views.route('/', methods=['POST', 'GET'])
def home():
    # Testing database records
    all_drinks = dict()
    all_drinks["milk tea"] = Drink.query.filter(Drink.tag == "milk tea")
    all_drinks["fruit"] = Drink.query.filter(Drink.tag == "fruit")
    all_drinks["cheese foam"] = Drink.query.filter(Drink.tag == "cheese foam")
    all_drinks["frosty"] = Drink.query.filter(Drink.tag == "frosty")

    toppings = Topping.query.all()

    return render_template('home.html', all_drinks=all_drinks, toppings=toppings)