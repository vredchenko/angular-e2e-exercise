from flask import Flask
from random import randint
import json

app = Flask(__name__)

@app.route("/")
def response():
  numberSet = []
  for i in range( 10 ):
    numberSet.append( randint(0,5) )
  return json.dumps( numberSet )

if __name__ == "__main__":
  app.run(debug=True)
