# Exercise 1

# score = float(input("enter your score: "))

# if score < 0 or score > 20:
#     print("invalid score")
# elif score >= 10:
#     print("passed")
# else:
#     print("failed")

# Exercise 2

choices = ["rock", "paper", "scissors"]

player1 = input("enter your choice1: (rock, paper, scissors)").lower()

while True:
    if not player1 in choices:
        print("invalid input, try again")
        player1 = input("enter your choice1: (rock, paper, scissors)").lower()
    else:
        break
    
player2 = input("enter your choice2: (rock, paper, scissors)").lower()
while True:
    if not player2 in choices:
        print("invalid input, try again")
        player2 = input("enter your choice2: (rock, paper, scissors)").lower()
    else:
        break

if player1 == player2:
    print("draw")
elif player1 == "rock" and player2 == "paper":
    print("player2 won")
elif player1 == "paper" and player2 == "scissors":
    print("player2 won")
elif player1 == "scissors" and player2 == "rock":
    print("player2 won")
else:
    print("player1 won")

