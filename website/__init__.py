from flask import Flask, render_template
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.exc import IntegrityError

from flask_admin import Admin
from flask_admin.contrib.sqla import ModelView
from flask_basicauth import BasicAuth

from flask_babel import Babel

from os import path

db = SQLAlchemy()
DB_NAME = "cafe_database.db"



def page_not_found(e):
    return render_template('error.html'), 404



def create_app():
    app = Flask(__name__)
    app.config['SECRET_KEY'] = '88285146618c47c6abc24603791d7dfd' # enable sessions and flashed messages
    app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{DB_NAME}'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    app.register_error_handler(404, page_not_found)

    db.init_app(app)

    # register blueprints and views into app
    from .views import views

    app.register_blueprint(views, url_prefix='/')

    # create or retrieve existing DB
    from .models import Drink, Topping, MilkType, Order, CustomDrink
    create_database(app)

    babel = Babel(app)

    # Add administrative views
    admin = Admin(app, name='cafeOrderingSys', template_mode='bootstrap4')
    admin.add_view(ModelView(Drink, db.session))
    admin.add_view(ModelView(Topping, db.session))
    admin.add_view(ModelView(MilkType, db.session))
    admin.add_view(ModelView(Order, db.session))
    admin.add_view(ModelView(CustomDrink, db.session))

    # NOTE: CONFIGURE SECRET AUTH USERNAME AND PASSWORD 
    app.config['BASIC_AUTH_USERNAME'] = 'SECRET_USERNAME_HERE'
    app.config['BASIC_AUTH_PASSWORD'] = 'SECRET_PASSWORD_HERE'

    basic_auth = BasicAuth(app)

    # define admin_base_template variable
    app.config['FLASK_ADMIN_BASE_TEMPLATE'] = 'admin/master.html'

    @app.route('/admin/test')
    @basic_auth.required
    def testing_view():
        orders = Order.query.all()
        custom_drinks = CustomDrink.query.all()
        print(orders)
        print(custom_drinks)
        return render_template('admin/test.html', orders=orders, custom_drinks=custom_drinks) 

    @app.route('/admin')
    @basic_auth.required
    def admin_view():
        return render_template('admin/index.html')
        #orders = Order.query.all()
        #custom_drinks = CustomDrink.query.all()
        #print(orders)
        #print(custom_drinks)
        #return render_template('admin/test.html', orders=orders, custom_drinks=custom_drinks) 
    
    return app



def create_database(app):
    if not path.exists('website/' + DB_NAME):
        with app.test_request_context():
            from .models import Drink, Topping, MilkType, Order, CustomDrink
            db.create_all(app=app)

            ###### Insert drinks into database ######
            drink_names = ["jasmine milk tea", 
                           "brown sugar milk tea",
                           "sunright fruit tea",
                           "jasmine cheese foam", 
                           "matcha", 
                           "red bean frosty",
                           "watermelon lemonade",
                           "mango jasmine tea",
                           "yakult strawberry",
                           "strawberry frosty",
                           "matcha red bean frosty",
                           "white peach oolong cheese",
                           "oolong cheese"]
            
            drink_prices = ["$5.40",
                            "$5.80",
                            "$6.00",
                            "$6.50",
                            "$6.00",
                            "$5.50",
                            "$6.95",
                            "$5.85",
                            "$6.65",
                            "$6.80",
                            "$7.05",
                            "$5.65",
                            "$5.65"]
            
            drink_thumbnail_urls = ["https://live.staticflickr.com/65535/53913164349_95672ab926_o.png",
                                    "https://live.staticflickr.com/65535/53913257610_eba4cb8607_o.png",
                                    "https://live.staticflickr.com/65535/53913257605_f5afb6fcaf_o.png",
                                    "https://live.staticflickr.com/65535/53911926957_9c83e77b23_o.png",
                                    "https://live.staticflickr.com/65535/53913164409_252825eafc_o.png",
                                    "https://live.staticflickr.com/65535/53913257685_c0d70ebcc7_o.png",
                                    "https://live.staticflickr.com/65535/53919021731_664a0692d0_o.png",
                                    "https://live.staticflickr.com/65535/53919275158_26f70ae7cc_o.png",
                                    "https://live.staticflickr.com/65535/53918138147_7a86bb75f1_o.png",
                                    "https://live.staticflickr.com/65535/53919037936_dd8d5e60ee_o.png",
                                    "https://live.staticflickr.com/65535/53919287313_6e57004789_o.png",
                                    "https://live.staticflickr.com/65535/53918148427_8a887b7381_o.png",
                                    "https://live.staticflickr.com/65535/53919486175_2a8d2fe616_o.png"]

            drink_img_urls = ["https://live.staticflickr.com/65535/53895278327_bef733e6a8_o.png",
                              "https://live.staticflickr.com/65535/53896197936_71b9ec7ddc_o.png",
                              "https://live.staticflickr.com/65535/53896620645_3487cee785_o.png",
                              "https://live.staticflickr.com/65535/53896440573_d7fc19cc04_o.png",
                              "https://live.staticflickr.com/65535/53895278337_1957dc54b1_o.png",
                              "https://live.staticflickr.com/65535/53896620635_5d8029006a_o.png",
                              "https://live.staticflickr.com/65535/53919374859_ac6c10cf84_o.png",
                              "https://live.staticflickr.com/65535/53919025671_f192593efd_o.png",
                              "https://live.staticflickr.com/65535/53919028051_80217b3fd0_o.png",
                              "https://live.staticflickr.com/65535/53918143412_a68b2495a7_o.png",
                              "https://live.staticflickr.com/65535/53919282788_187a5a5328_o.png",
                              "https://live.staticflickr.com/65535/53918143407_55e739f41d_o.png",
                              "https://live.staticflickr.com/65535/53919386619_3f3a2b8bb8_o.png"]
            
            drink_desc = ["Jasmine green tea combined with our signature house milk",
                          "#1 customer favorite. We expertly brew Ceylon black tea then perfectly blend in our signature house milk, drizzle in freshly made brown sugar syrup and top it off with a scoop of our deliciously chewy brown sugar boba.",
                          "Our signature fruit tea is made with four seasons tea, freshly squeezed orange juice, passionfruit and served with lemon orange slices",
                          "Jasmine green tea topped with a layer of freshly made sea-salt cheese foam",
                          "Premium matcha imported from Japan combined with our four seasons tea and signature house milk",
                          "Try a Sunright twist on a classic Hong Kong dessert! We took our fan favorite Hokkaido frostie, known for its creamy butterscotch flavor and layered it with our sweetened red beans to recreate this nostalgic sweet treat.",
                          "Freshly squeezed lemons meets blended watermelon for a new summer staple. Perfectly sweet and tangy while light and refreshing, served with lemon slices (caffeine-free).",
                          "Fresh mango blended with jasmine green tea to create an authentic mango iced tea",
                          "Freshly blended strawberries are combined with the classic Yakult drink for a rich and sweet flavor.",
                          "Ice blended fresh strawberries smoothie served with a layer of rich cheese foam",
                          "Ice blended matcha smoothie coated with matcha brûlée and topped with sweet red bean",
                          "Lightly flavored white peach oolong tea topped with a layer of freshly made sea-salt cheese foam",
                          "Roasted oolong tea topped with a layer of freshly made sea-salt cheese foam"]
        
            drink_tags = ["milk tea", 
                          "milk tea", 
                          "fruit",
                          "cheese foam",
                          "milk tea", 
                          "frosty",
                          "fruit",
                          "fruit",
                          "fruit",
                          "frosty",
                          "frosty",
                          "cheese foam",
                          "cheese foam"]

            for name, price, img_url, thumbnail_url, desc, tag in zip(drink_names, drink_prices, drink_img_urls, drink_thumbnail_urls, drink_desc, drink_tags):
                new_drink = Drink(name=name, price=price, img_url=img_url, thumbnail_url=thumbnail_url, desc=desc, tag=tag)
                try:
                    db.session.add(new_drink)
                    db.session.commit()
                except IntegrityError:
                    db.session.rollback() 

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
                try:
                    db.session.add(new_topping)
                    db.session.commit()
                except IntegrityError:
                    db.session.rollback()

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
                try:
                    db.session.add(milk_type)
                    db.session.commit()
                except IntegrityError:
                    db.session.rollback()