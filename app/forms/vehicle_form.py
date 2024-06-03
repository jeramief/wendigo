from flask_wtf import FlaskForm
from wtforms import BooleanField, IntegerField, StringField
from wtforms.validators import DataRequired, Length
from flask_wtf.file import FileField, FileAllowed, FileRequired
from app.routes.AWS_helpers import ALLOWED_EXTENSIONS


class VehicleForm(FlaskForm):
    is_sold = BooleanField("Sold", validators=[DataRequired()], default=False)
    is_for_sell = BooleanField("For Sell", validators=[DataRequired()], default=False)
    price = IntegerField("Price", validators=[DataRequired()], default=0)
    year = IntegerField("Year", validators=[DataRequired()])
    make = StringField("Make", validators=[DataRequired()])
    model = StringField("Model", validators=[DataRequired()])
    mpg = IntegerField("MPG", validators=[DataRequired()])
    transmission = StringField("Transmission", validators=[DataRequired()])
    drivetrain = StringField("Drivetrain", validators=[DataRequired()])
    color = StringField("Color", validators=[DataRequired()])
    vin = StringField("VIN", validators=[DataRequired(), Length(max=17)])
    image = FileField(
        "Image File", validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))]
    )
