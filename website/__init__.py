from flask import Flask, render_template
from flask_sqlalchemy import SQLAlchemy
from os import path

db = SQLAlchemy()
DB_NAME = "cafe_database.db"



def create_app():
    app = Flask(__name__)
    app.config['SECRET_KEY'] = '88285146618c47c6abc24603791d7dfd' # enable sessions and flashed messages
    app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{DB_NAME}'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    db.init_app(app)

    # register blueprints and views into app
    from .views import views

    app.register_blueprint(views, url_prefix='/')

    # create or retrieve existing DB
    from .models import Drink, Topping, MilkType
    create_database(app)

    return app



def create_database(app):
    if not path.exists('website/' + DB_NAME):
        with app.test_request_context():
            from .models import Drink, Topping, MilkType
            db.create_all(app=app)

            ###### Insert drinks into database ######
            drink_names = ["jasmine milk tea", 
                           "brown sugar milk tea",
                           "sunright fruit tea",
                           "jasmine cheese foam", 
                           "matcha", 
                           "red bean frosty"]
            
            drink_prices = ["$5.40",
                            "$5.80",
                            "$6.00",
                            "$6.50",
                            "$6.00",
                            "$5.50"]
            
            drink_thumbnail_urls = ["https://live.staticflickr.com/65535/53913164349_95672ab926_o.png",
                                    "https://live.staticflickr.com/65535/53913257610_eba4cb8607_o.png",
                                    "https://live.staticflickr.com/65535/53913257605_f5afb6fcaf_o.png",
                                    "https://live.staticflickr.com/65535/53911926957_9c83e77b23_o.png",
                                    "https://live.staticflickr.com/65535/53913164409_252825eafc_o.png",
                                    "https://live.staticflickr.com/65535/53913257685_c0d70ebcc7_o.png"]

            drink_img_urls = ["https://live.staticflickr.com/65535/53895278327_bef733e6a8_o.png",
                              "https://live.staticflickr.com/65535/53896197936_71b9ec7ddc_o.png",
                              "https://live.staticflickr.com/65535/53896620645_3487cee785_o.png",
                              "https://live.staticflickr.com/65535/53896440573_d7fc19cc04_o.png",
                              "https://live.staticflickr.com/65535/53895278337_1957dc54b1_o.png",
                              "https://live.staticflickr.com/65535/53896620635_5d8029006a_o.png"]
            
            drink_desc = ["Jasmine green tea combined with our signature house milk",
                          "#1 customer favorite. We expertly brew Ceylon black tea then perfectly blend in our signature house milk, drizzle in freshly made brown sugar syrup and top it off with a scoop of our deliciously chewy brown sugar boba.",
                          "Our signature fruit tea is made with four seasons tea, freshly squeezed orange juice, passionfruit and served with lemon orange slices",
                          "Jasmine green tea topped with a layer of freshly made sea-salt cheese foam",
                          "Premium matcha imported from Japan combined with our four seasons tea and signature house milk",
                          "Try a Sunright twist on a classic Hong Kong dessert! We took our fan favorite Hokkaido frostie, known for its creamy butterscotch flavor and layered it with our sweetened red beans to recreate this nostalgic sweet treat."]
        
            drink_tags = ["milk tea", 
                          "milk tea", 
                          "fruit",
                          "cheese foam",
                          "milk tea", 
                          "frosty"]

            for name, price, img_url, thumbnail_url, desc, tag in zip(drink_names, drink_prices, drink_img_urls, drink_thumbnail_urls, drink_desc, drink_tags):
                new_drink = Drink(name=name, price=price, img_url=img_url, thumbnail_url=thumbnail_url, desc=desc, tag=tag)
                db.session.add(new_drink)
                db.session.commit()

            ###### Insert toppings into database ######
            toppings_name = ["boba",
                             "grass jelly",
                             "red bean",
                             "cream brulee"]
            
            toppings_prices = ["$0.75",
                               "$0.75",
                               "$1.00",
                               "$1.00"]
            
            for name, price in zip(toppings_name, toppings_prices):
                new_topping = Topping(name=name, price=price)
                db.session.add(new_topping)
                db.session.commit()

            ###### Insert milk types into database ######
            milk_names = ["house",
                          "almond",
                          "oat",
                          "fresh"]
        
            milk_prices = ["$0.00",
                           "$1.50",
                           "$1.50",
                           "$0.00"]
            
            for name, price in zip(milk_names, milk_prices):
                milk_type = MilkType(name=name, price=price)
                db.session.add(milk_type)
                db.session.commit()