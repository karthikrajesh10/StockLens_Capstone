from flask import Flask, request, jsonify
import requests
from textblob import TextBlob
from flask_cors import CORS   # ✅ NEW

app = Flask(__name__)
CORS(app)  # ✅ Enable CORS for all routes


# Your n8n webhook URL (production URL!)
N8N_WEBHOOK = "https://owl-winning-legally.ngrok-free.app/webhook/sentiment"

def analyze_sentiment(text):
    """Returns sentiment label and score based on polarity."""
    blob = TextBlob(text)
    polarity = blob.sentiment.polarity
    if polarity > 0.1:
        sentiment = "Positive"
    elif polarity < -0.1:
        sentiment = "Negative"
    else:
        sentiment = "Neutral"
    return sentiment, round(polarity, 2)

@app.route("/api/sentiment", methods=["GET"])
def get_sentiment():
    # 1️⃣ Read stock symbol from query
    symbol = request.args.get("stock", "")
    if not symbol:
        return jsonify({"error": "Please provide a stock symbol, e.g., ?stock=INFY"}), 400

    # 2️⃣ Call n8n webhook
    n8n_url = f"{N8N_WEBHOOK}?stock={symbol}"
    response = requests.get(n8n_url)

    if response.status_code != 200:
        return jsonify({"error": "Failed to fetch news from n8n"}), 500

    data = response.json()

    # 3️⃣ If response is wrapped in a list, unwrap it
    if isinstance(data, list) and len(data) > 0:
        data = data[0]

    # 4️⃣ Force set symbol from query parameter
    data["symbol"] = symbol.upper()

    # 5️⃣ Analyze sentiment for each article
    for article in data.get("articles", []):
        combined_text = f"{article['headline']} {article['summary']}"
        sentiment, score = analyze_sentiment(combined_text)
        article["sentiment"] = sentiment
        article["score"] = score

    # 6️⃣ Calculate overall sentiment summary
    sentiments = [article["sentiment"] for article in data.get("articles", [])]
    positive = sentiments.count("Positive")
    negative = sentiments.count("Negative")
    neutral = sentiments.count("Neutral")
    total = len(sentiments)

    overall = "Positive"
    if negative > positive:
        overall = "Negative"
    elif positive == negative:
        overall = "Neutral"

    data["overall_sentiment"] = {
        "positive_articles": positive,
        "negative_articles": negative,
        "neutral_articles": neutral,
        "total_articles": total,
        "overall": overall
    }

    return jsonify(data)

@app.route("/")
def home():
    return "✅ Backend is running! Use /api/sentiment?stock=INFY"

if __name__ == "__main__":
    app.run(debug=True)
