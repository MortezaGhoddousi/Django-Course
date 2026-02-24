from functions import *
import random
         
env = [["_", "_", "_"],
       ["_", "_", "_"],
       ["_", "_", "_"]]


print("====================================")
envPlayer = [["1", "2", "3"],
             ["4", "5", "6"],
             ["7", "8", "9"]]


while True:
    # player1
    showEnv(envPlayer)
    player1 = input("choose your target: (player1) => ")

    result = player("X", player1, env)
    while not result:
        print("wronge input, try again!")
        player1 = input("choose your target: (player1) => ")
        result = player("X", player1, env)

    if result == "draw":
        print("The end. draw")
        break

    showEnv(env)
    if check_winner(env):
        print("Player 1 won")
        break
    
    # player2
    showEnv(envPlayer)
    # player2 = input("choose your target: (player2) => ")
    computer = str(random.randint(1, 9))

    result = player("O", computer, env)
    while not result:
        computer = str(random.randint(1, 9))
        result = player("O", computer, env)

    if result == "draw":
        print("The end. draw")
        break

    showEnv(env)
    if check_winner(env):
        print("Player 2 won")
        break




