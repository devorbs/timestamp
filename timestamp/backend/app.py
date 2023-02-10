from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///data.db'
db = SQLAlchemy(app)

class StudentData(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), nullable=False, unique=True)
    message = db.Column(db.String(200))

    def __repr__(self):
        return f"{self.name} - {self.message}"


@app.before_first_request
def create_database():
    db.create_all()

@app.route('/posts', methods = ["POST", "GET"])
# @cross_origin()
def post_data():

    if request.method == "GET":

        posts = StudentData.query.all()
        output = []

        for post in posts:
            post_data = {"username": post.username, "id": post.id, "message": post.message}
            output.append(post_data)
        
        return {"posts": output}


    if request.method == "POST":

        post = StudentData(username = request.json['username'], message = request.json['message'])
        db.session.add(post)
        db.session.commit()
        return {'something': 'very well'}

@app.route('/posts/<username>')
def search(username):
    post = StudentData.query.get_or_404(username)
    return jsonify({"username": post.username, "id": post.id, "message": post.message})

if __name__ == '__main__':
    app.run(port=5000, debug=True, host='127.0.0.1')