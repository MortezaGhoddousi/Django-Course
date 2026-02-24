def showEnv(env):
    print("====================================")
    for row in env:
        print(row)

def player(p, c, env):
    envPlayer = [["1", "2", "3"],
                 ["4", "5", "6"],
                 ["7", "8", "9"]]
    for row in range(3):
        for column in range(3):
            if envPlayer[row][column] == c:
                env[row][column] = p
                return env
            
def check_winner(env):

    for i in range(3):
        if env[i][0] == env[i][1] == env[i][2] and env[i][0] != "_" :
            return True
        
    for i in range(3):
        if env[0][i] == env[1][i] == env[2][i] and env[0][i] != "_" :
            return True
        
    if env[0][0] == env[1][1] == env[2][2] and env[0][0] != "_" :
        return True
    
    if env[0][2] == env[1][1] == env[2][0] and env[0][2] != "_" :
        return True
    
    return False