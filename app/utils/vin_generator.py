import random
import string


def vin_generator():
    letters = list(string.ascii_uppercase) + list("123456789")
    vin = "".join(random.sample(letters, 17))

    return vin
