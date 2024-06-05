from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField
from wtforms.validators import DataRequired, Length


class ReviewForm(FlaskForm):
    vehicle_id = IntegerField("Vehicle ID", validators=[DataRequired()])
    vehicle_type = StringField("Vehicle", validators=[DataRequired()])
    user_name = StringField(
        "User Name", validators=[DataRequired(), Length(min=2, max=40)]
    )
    comment_text = StringField(
        "Comment", validators=[DataRequired(), Length(min=0, max=100)]
    )
    # verified_owner=BooleanField('Verified Owner',validators=[DataRequired()])
    user_state = StringField(
        "State Initials", validators=[DataRequired(), Length(min=2, max=2)]
    )
