from flask import Flask, request, send_from_directory, jsonify
import json
import os
from datetime import datetime

app = Flask(__name__, static_folder='.')

# Отключаем CSP
@app.after_request
def remove_csp(response):
    response.headers['Content-Security-Policy'] = ""
    return response

# Обслуживание статических файлов
@app.route('/<path:path>')
def serve_static(path):
    return send_from_directory('.', path)

# Обработка формы
@app.route('/submit', methods=['POST'])
def submit():
    data = request.get_json()

    if not data:
        return jsonify({"error": "Пустые данные"}), 400

    entry = {
        "name": data.get("name"),
        "email": data.get("email"),
        "message": data.get("message"),
        "date": datetime.now().isoformat()
    }

    file_path = 'messages.json'

    # Загружаем старые сообщения
    if os.path.exists(file_path):
        with open(file_path, 'r', encoding='utf-8') as f:
            try:
                messages = json.load(f)
            except json.JSONDecodeError:
                messages = []
    else:
        messages = []

    # Добавляем новое
    messages.append(entry)

    # Сохраняем
    with open(file_path, 'w', encoding='utf-8') as f:
        json.dump(messages, f, ensure_ascii=False, indent=2)

    return jsonify({"status": "ok"}), 200

# Запуск
if __name__ == '__main__':
    app.run(port=8000)
