from fileinput import filename
from app import app
import os
from flask import Flask, jsonify, request
from werkzeug.utils import secure_filename

UPLOAD_FOLDER = os.path.abspath(os.path.dirname(__file__)) + '/Downloads/'
ALLOWED_EXTENSIONS = set(['txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif',
                          'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'csv', 'zip', 'rar', 'mp4'])


def allowedFile(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# API to upload file


@app.route('/upload', methods=['POST', 'GET'])
def fileUpload():
    if request.method == 'POST':
        file = request.files.getlist('file')
        for f in file:
            filename = secure_filename(f.filename)
            if allowedFile(filename):
                f.save(os.path.join(UPLOAD_FOLDER, filename))
        return jsonify({"name": filename, "status": "success"})
    else:
        return jsonify({"status": "failed"})
