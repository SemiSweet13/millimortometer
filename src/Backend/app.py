from flask import Flask, request
from flask_cors import CORS
from api import api_blueprint  # Adjust import as necessary

app = Flask(__name__)
CORS(app)

# Register the Blueprint with the app
app.register_blueprint(api_blueprint)

if __name__ == '__main__':
    app.run(debug=True)
