from flask_wtf import FlaskForm
from wtforms import BooleanField, IntegerField, StringField
from wtforms.validators import DataRequired, Length
from app.routes.AWS_helpers import ALLOWED_EXTENSIONS


class PurchaseForm(FlaskForm):
    vehicle_id = IntegerField("Vehicle", validators=[DataRequired()])
    first_name = StringField("First Name", validators=[DataRequired(), Length(max=20)])
    last_name = StringField("Last Name", validators=[DataRequired(), Length(max=20)])
    delivery_address = StringField(
        "Delivery Address", validators=[DataRequired(), Length(max=100)]
    )
