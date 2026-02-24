def check_winner(board):
    lines = []

    # rows
    lines.extend(board)

    # columns
    for col in range(3):
        lines.append([board[row][col] for row in range(3)])

    # diagonals
    lines.append([board[i][i] for i in range(3)])
    lines.append([board[i][2-i] for i in range(3)])

    for line in lines:
        if line[0] != "_" and line.count(line[0]) == 3:
            return line[0]

    return None

def board_to_tuple(board):
    return tuple(cell for row in board for cell in row)

all_states = set()
def generate_states(board, player):
    state = board_to_tuple(board)
    all_states.add(state)

    # stop if game over
    if check_winner(board) is not None:
        return

    if all(cell != "_" for row in board for cell in row):
        return

    # explore next moves
    for i in range(3):
        for j in range(3):
            if board[i][j] == "_":
                board[i][j] = player
                next_player = "O" if player == "X" else "X"
                generate_states(board, next_player)
                board[i][j] = "_"  # backtrack

