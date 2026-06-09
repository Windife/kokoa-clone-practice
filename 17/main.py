# BLUEPRINT | DONT EDIT

from flask import Flask, render_template, request, redirect, send_file
import json

app = Flask("JobScraper")


def load_jobs():
    with open("jobs.json", "r", encoding="utf-8") as f:
        return json.load(f)

# /BLUEPRINT

jobs = load_jobs()

def search_jobs(keyword):
    results = []
    for job in jobs:
        if keyword.lower() in job["title"].lower():          
            results.append(job)     
    return results

@app.route("/")
def home():
    return render_template("home.html")

@app.route("/search")
def search():
    keyword = request.args.get("keyword")
    if keyword == None:
        return redirect("/")
    if keyword == "":
        return render_template("search.html", keyword="Nothing Found", jobs="")
    jobs = search_jobs(keyword)
    return render_template("search.html", keyword=keyword, jobs=jobs)



# 👇🏻 YOUR CODE 👇🏻:

# /YOUR CODE


# BLUEPRINT | DONT EDIT

if __name__ == "__main__":
    app.run()

# /BLUEPRINT