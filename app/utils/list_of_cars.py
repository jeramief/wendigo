from random import choice


cars = {
    "Toyota": ["Camry", "Corolla", "RAV4", "Highlander", "Tacoma", "Sienna"],
    "Honda": ["Accord", "Civic", "CR-V", "Pilot", "Odyssey", "HR-V"],
    "Ford": ["F-150", "Escape", "Focus", "Explorer", "Mustang", "Edge"],
    "Chevrolet": ["Silverado", "Equinox", "Malibu", "Tahoe", "Cruze", "Traverse"],
    "Nissan": ["Altima", "Rogue", "Sentra", "Pathfinder", "Versa", "Murano"],
    "Jeep": ["Wrangler", "Grand Cherokee", "Cherokee", "Renegade", "Compass"],
    "Subaru": ["Outback", "Forester", "Impreza", "Crosstrek", "Legacy", "Ascent"],
    "Hyundai": ["Elantra", "Sonata", "Tucson", "Santa Fe", "Kona", "Accent"],
    "BMW": ["3 Series", "5 Series", "X3", "X5", "7 Series", "X1"],
    "Mercedes-Benz": ["C-Class", "E-Class", "GLC", "GLE", "S-Class", "GLA"],
    "Audi": ["A4", "Q5", "A3", "Q7", "A6", "Q3"],
    "Lexus": ["RX", "ES", "NX", "GX", "IS", "UX"],
    "Kia": ["Optima", "Sorento", "Sportage", "Soul", "Forte", "Telluride"],
    "GMC": ["Sierra", "Terrain", "Acadia", "Yukon", "Canyon"],
    "Tesla": ["Model S", "Model 3", "Model X", "Model Y"],
    "Volvo": ["XC90", "XC60", "S60", "V60", "XC40", "S90"],
    "Mazda": ["Mazda3", "Mazda6", "CX-5", "CX-9", "MX-5 Miata"],
    "Volkswagen": ["Jetta", "Passat", "Tiguan", "Atlas", "Golf", "Arteon"],
    "Acura": ["MDX", "TLX", "RDX", "ILX", "RLX"],
    "Infiniti": ["Q50", "QX60", "QX50", "QX80", "Q60"],
    "Buick": ["Encore", "Enclave", "Regal", "Envision"],
    "Cadillac": ["Escalade", "XT5", "CT4", "CT5", "XT6"],
    "Lincoln": ["Navigator", "Aviator", "MKZ", "Nautilus", "Corsair"],
    "Chrysler": ["300", "Pacifica"],
    "Dodge": ["Charger", "Challenger", "Durango", "Journey"],
    "Ram": ["1500", "2500", "3500"],
    "Mitsubishi": ["Outlander", "Eclipse Cross", "Mirage", "Outlander Sport"],
    # "Land Rover": [
    #     "Range Rover",
    #     "Discovery",
    #     "Range Rover Sport",
    #     "Range Rover Evoque",
    # ],
    # "Jaguar": ["F-Pace", "XE", "XF", "I-Pace"],
    # "Porsche": ["911", "Cayenne", "Panamera", "Macan", "Taycan"],
    "Genesis": ["G70", "G80", "G90"],
    "Mini": ["Cooper", "Countryman", "Clubman"],
    "Fiat": ["500", "500X", "500L"],
    "Smart": ["Fortwo"],
    # "Alfa Romeo": ["Giulia", "Stelvio"],
    # "Maserati": ["Ghibli", "Levante", "Quattroporte"],
    # "Bentley": ["Continental", "Bentayga", "Flying Spur"],
    # "Rolls-Royce": ["Phantom", "Ghost", "Cullinan", "Wraith"],
    # "McLaren": ["720S", "570S", "650S", "GT"],
    # "Ferrari": ["488", "812", "F8", "SF90"],
    # "Lamborghini": ["Aventador", "Huracan", "Urus"],
    # "Bugatti": ["Chiron", "Veyron"],
    # "Koenigsegg": ["Regera", "Agera", "Jesko"],
}


def randomCar():
    car = choice(list(cars.items()))
    make = car[0]
    model = choice(car[1])

    return [make, model]
