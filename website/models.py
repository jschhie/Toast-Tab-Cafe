from . import db



class Drink(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(30), unique=True)
    price = db.Column(db.String(20))
    img_url = db.Column(db.String(40))
    thumbnail_url = db.Column(db.String(40))
    desc = db.Column(db.String(80))
    tag = db.Column(db.String(20))



class Topping(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(30), unique=True)
    price = db.Column(db.String(20))



class MilkType(db.Model):
    __tablename__ = "milktype"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(30), unique=True)
    price = db.Column(db.String(20))



class Order(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    total_price = db.Column(db.String(20)) # example: '$10.50'
    purchase_date = db.Column(db.String(50)) # formatted example: 09/19/2024



class CustomDrink(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    custom_price = db.Column(db.String(20))
    qty = db.Column(db.Integer) # at least 1
    order_id = db.Column(db.Integer, db.ForeignKey('order.id')) # foreign key
    drink_name = db.Column(db.String(30))
    sugar_lvl = db.Column(db.String(10))
    ice_lvl = db.Column(db.String(10))
    milk_type = db.Column(db.String(20))
    toppings = db.Column(db.String(50)) # a list (stored as a string) of toppings: '['boba', 'grass jelly', 'creme brulee']'
    #drink_id = db.Column(db.Integer, db.ForeignKey('drink.id')) # foreign key
    # ACCOUNT FOR OPTIONAL TOPPINGS WITH MAX = 3
    #topping_id = db.Column(db.Integer, db.ForeignKey('topping.id')) # foreign key
    #milk_type_id = db.Column(db.Integer, db.ForeignKey('milktype.id')) # foreign key