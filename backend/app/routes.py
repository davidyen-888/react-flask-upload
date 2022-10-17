from app import app
import os
from flask import Flask, jsonify, request
from werkzeug.utils import secure_filename

UPLOAD_FOLDER = os.path.abspath(os.path.dirname(__file__)) + '/Downloads/'
ALLOWED_EXTENSIONS = set(['txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif',
                          'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'csv', 'zip', 'rar'])


def allowedFile(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


@app.route('/upload', methods=['POST'])
def fileUpload():
    file = request.files.getlist('file')
    for f in file:
        if f and allowedFile(f.filename):
            filename = secure_filename(f.filename)
            destination = UPLOAD_FOLDER + 'uploaded-' + filename
            f.save(destination)
        return jsonify({'message': 'File(s) successfully uploaded'})
