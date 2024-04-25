from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import pickle

app = Flask(__name__)
CORS(app)

def_games = pickle.load(open('games.pkl', 'rb'))
similarity = pickle.load(open('similarity.pkl', 'rb'))

@app.route('/games', methods=['GET'])
def get_games():
    return jsonify({"games": def_games["name"].tolist()})

def recommend_game(game):
    try:
        game_index = def_games[def_games['name'] == game].index[0]  # Assuming 'join_steam' is your DataFrame
    except IndexError:
        return {"error": "Game not found"}, 404

    distance = similarity[game_index]
    game_list = sorted(list(enumerate(distance)), reverse=True, key=lambda x: x[1])[1:10]
    
    recommended_games = []
    for i in game_list:
        recommended_games.append(def_games.iloc[i[0]]['name'])  # Assuming 'join_steam' is your DataFrame
    
    return recommended_games

@app.route('/recommend', methods=['GET'])
def get_recommendations():
    game = request.args.get('game')
    if not game:
        return {"error": "Please provide a game name"}, 400

    recommended_games = recommend_game(game)
    return jsonify({"recommendations": recommended_games})


if __name__ == '__main__':
    app.run(debug=True)
