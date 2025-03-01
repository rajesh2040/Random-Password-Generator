from flask import Flask, render_template, request, jsonify
import random
import string

app = Flask(__name__)

def generate_password(length, use_upper, use_lower, use_numbers, use_symbols):
    characters = ""
    if use_upper:
        characters += string.ascii_uppercase
    if use_lower:
        characters += string.ascii_lowercase
    if use_numbers:
        characters += string.digits
    if use_symbols:
        characters += string.punctuation

    if not characters:
        return "Select at least one option"

    return ''.join(random.choice(characters) for _ in range(length))

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/generate', methods=['POST'])
def generate():
    data = request.json
    length = int(data['length'])
    use_upper = data['uppercase']
    use_lower = data['lowercase']
    use_numbers = data['numbers']
    use_symbols = data['symbols']

    password = generate_password(length, use_upper, use_lower, use_numbers, use_symbols)
    return jsonify({'password': password})

if __name__ == '__main__':
    app.run(debug=True)
