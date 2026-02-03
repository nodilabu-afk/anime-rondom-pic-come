import random
import requests
from fastapi import FastAPI

app = FastAPI()

POPULAR = [
    "gojo satoru","ayanokoji kiyotaka","naruto uzumaki","sasuke uchiha","itachi uchiha",
    "kakashi hatake","madara uchiha","monkey d luffy","roronoa zoro","sanji",
    "eren yeager","levi ackerman","tanjiro kamado","rengoku kyojuro",
    "goku","vegeta","ichigo kurosaki","aizen sosuke","light yagami","l lawliet",
    "gon freecss","killua zoldyck","saitama","genos","kaneki ken","thorfinn",
    "isagi yoichi","sung jinwoo"
]

@app.get("/anime")
def anime():
    name = random.choice(POPULAR)
    url = f"https://api.jikan.moe/v4/characters?q={name}&limit=1"
    data = requests.get(url).json()

    if not data.get("data"):
        return {"ok": False, "message": "not found"}

    c = data["data"][0]
    return {
        "ok": True,
        "query": name,
        "name": c["name"],
        "image": c["images"]["jpg"]["image_url"]
    }
