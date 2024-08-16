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
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(30), unique=True)
    price = db.Column(db.String(20))