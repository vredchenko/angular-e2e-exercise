from flask import Flask, request, make_response
from random import randint
import json

app = Flask(__name__)

@app.route("/")
def response():
  # Generate a set of ten random integers (between 1-5 ensures there will be duplicates)
  numberSet = []
  for i in range( 10 ):
    numberSet.append( randint(1,5) )

  # Allow CORS, based on: https://gist.github.com/pamelafox/1195953
  response = make_response( json.dumps(numberSet) )
  response.headers['Access-Control-Allow-Origin'] = request.headers['Origin']
  
  return response

if __name__ == "__main__":
  app.run(debug=True)
