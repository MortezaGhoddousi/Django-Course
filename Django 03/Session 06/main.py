# number = 5

# i = 0
# s = 0

# allNumbers = []
# while i<number:
#     x = float(input("enter your number: "))

#     allNumbers.append(x)
#     s = s + x
#     i = i+1

# # print((allNumbers[0] + allNumbers[1] + allNumbers[2] + allNumbers[3] + allNumbers[4])/len(allNumbers))
# print(s/number)


number = 5
s = 0
for i in [0, "Morteza", 27, True, 4]:
    x = float(input("enter your number: "))
    s = s + x

print(s/number)