import pytest

def test_post_signup(client, signup):#danny ahmad
        response=client.post("/auth/signup", json=signup)
        assert response.status_code == 201
        assert response.json["message"] == "user with email test@utoronto.ca created"

def test_login(client, signup, login):
        response_signup=client.post("/auth/signup", json=signup)
        response = client.post("/auth/login", json=login)
        assert response.status_code == 200
        assert response.json["message"] == "logged in as Test"

def test_signup_duplicate_email(client, signup): #Kartikey Sachdeva

    response_initial_signup = client.post("/auth/signup", json=signup)
    assert response_initial_signup.status_code == 201
    assert response_initial_signup.json["message"] == "user with email test@utoronto.ca created"

    response_duplicate_signup = client.post("/auth/signup", json=signup)
    assert response_duplicate_signup.status_code == 409  
    assert response_duplicate_signup.json["message"] == "email already registered"
