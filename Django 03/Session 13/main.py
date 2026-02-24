from functions import *
         
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

    env = player("X", player1, env)
    showEnv(env)
    if check_winner(env):
        print("Player 1 won")
        break
    
    # player2
    showEnv(envPlayer)
    player2 = input("choose your target: (player2) => ")

    env = player("O", player2, env)
    showEnv(env)
    if check_winner(env):
        print("Player 2 won")
        break




