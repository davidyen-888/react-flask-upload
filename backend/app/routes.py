from app import app
import os
from flask import Flask, jsonify, request
from werkzeug.utils import secure_filename

UPLOAD_FOLDER = os.path.abspath(os.path.dirname(__file__)) + '/Downloads/'
ALLOWED_EXTENSIONS = set(['txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif', 
                            'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 
                            'csv', 'zip', 'rar', '7z', 'xml', 'json', 'html', 
                            'htm', 'css', 'js', 'py'])


@app.route('/upload', methods=['POST'])
def fileUpload():
    file = request.files['file']
    filename = secure_filename(file.filename)
    destination = UPLOAD_FOLDER + 'test-' + filename
    file.save(destination)

    return jsonify({
        'filename': filename,
        'destination': destination
    })
