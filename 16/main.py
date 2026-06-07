# BLUEPRINT | DONT EDIT

import requests

movie_ids = [
    238, 680, 550, 185, 641, 515042, 152532, 120467, 872585, 906126, 840430
]

# /BLUEPRINT

# 👇🏻 YOUR CODE 👇🏻:

top_title = {"title": "", "vote_average" : 0}
highly_rated_count = 0
average_rating = 0

for movie in movie_ids:
    url = f"https://nomad-movies-2.nomadcoders.workers.dev/movies/{movie}"
    response = requests.get(url)
    data = response.json()
    average_rating = average_rating + float(data["vote_average"])
    
    print(f"Title : {data["title"]}")
    print(f"Overview : {data["overview"]}")    
    print(f"Vote average : {data["vote_average"]}")
    
    if data["vote_average"] > top_title["vote_average"]:
        top_title["title"] = data["title"]
        top_title["vote_average"] = data["vote_average"]
    
    if data["vote_average"] > 7:
        highly_rated_count = highly_rated_count + 1      

print(f"Top title is {top_title["title"]}")

average_rating = average_rating / len(movie_ids)
print(f"average_rating is {round(average_rating, 3)}")

print(f"highly_rated_count is {highly_rated_count}")

# /YOUR CODE