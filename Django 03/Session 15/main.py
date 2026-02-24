import numpy as np
import random
import rl_functions
import functions

state_numbers = 5478
action_numbers = 9
alpha = 0.1
gamma = 0.9

Q_table = np.zeros([state_numbers, action_numbers], dtype=float)

env = [["_", "_", "_"],
       ["_", "_", "_"],
       ["_", "_", "_"]]

envPlayer = [["1", "2", "3"],
             ["4", "5", "6"],
             ["7", "8", "9"]]

actions = range(action_numbers)
rl_functions.generate_states(env, "X")

states_list = list(rl_functions.all_states)

state_to_index = {}

for idx, state in enumerate(states_list):
    state_to_index[state] = idx

def get_state_index(board):
    state = tuple(cell for row in board for cell in row)
    return state_to_index.get(state, None)


def choose_action(board, epsilon, Q_table):

    # Get state index (row in Q_table)
    row = get_state_index(board)

    if row is None:
        raise ValueError("State not found in state_to_index")

    # Find legal actions (empty cells)
    legal_actions = []
    for i in range(3):
        for j in range(3):
            if board[i][j] == "_":
                action_index = i * 3 + j
                legal_actions.append(action_index)

    # Exploration
    if random.uniform(0, 1) < epsilon:
        return random.choice(legal_actions)

    # Exploitation
    else:
        q_values = Q_table[row]

        # Only consider legal actions
        legal_q_values = [q_values[a] for a in legal_actions]

        max_q = max(legal_q_values)

        # Handle multiple max values (tie-breaking randomly)
        best_actions = [a for a in legal_actions if q_values[a] == max_q]

        return random.choice(best_actions)

def get_max_q(board, Q_table):
    row = get_state_index(board)

    if row is None:
        return 0

    legal_actions = []
    for i in range(3):
        for j in range(3):
            if board[i][j] == "_":
                legal_actions.append(i * 3 + j)

    if not legal_actions:
        return 0  # terminal state

    return max(Q_table[row][a] for a in legal_actions)

def update_q_table(old_board, action, reward, new_board,
                   alpha, gamma, Q_table):

    old_row = get_state_index(old_board)
    new_row = get_state_index(new_board)

    if old_row is None:
        raise ValueError("Old state not found")

    current_q = Q_table[old_row][action]

    # If next state is terminal, max_future_q = 0
    if new_row is None:
        max_future_q = 0
    else:
        max_future_q = get_max_q(new_board, Q_table)

    # Q-learning formula
    new_q = current_q + alpha * (
        reward + gamma * max_future_q - current_q
    )

    Q_table[old_row][action] = new_q


env = [["_", "_", "_"],
       ["_", "_", "_"],
       ["_", "_", "_"]]

old_board = [row[:] for row in env]  # copy state

action = choose_action(env, 0.99, Q_table)

# Apply action
row = action // 3
col = action % 3
env[row][col] = "X"

reward = -1  # example reward

update_q_table(old_board, action, reward, env,
               alpha, gamma, Q_table)



functions.showEnv(envPlayer)
player1 = input("choose your target: (player1) => ")

result = functions.player("O", player1, env)
while not result:
    print("wronge input, try again!")
    player1 = input("choose your target: (player1) => ")
    result = functions.player("O", player1, env)




