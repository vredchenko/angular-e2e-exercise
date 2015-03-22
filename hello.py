from flask import Flask
from random import randint

print randint(0,9)

app = Flask(__name__)

@app.route("/")
def hello():
  return "hello"

if __name__ == "__main__":
  app.run()
