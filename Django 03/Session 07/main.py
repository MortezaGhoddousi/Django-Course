# i = 0
# names = []

# while i<10:
#     names.append(input("enter your name: "))
#     i = i+1

# print(names)

# names = []
# for i in range(10):
#     names.append(input("enter your name: "))

# print(names)


# if True:
#     print("body ran")

# print("end of the if statement")  


# age = int(input("enter your age: "))

# if age >= 18:
#     print("access granted!")

# usernameAdmin = "Morteza"
# passwordAdmin = "m123gh456"


# username = input("enter your username: ")
# password = input("enter your password: ")

# if username==usernameAdmin and password==passwordAdmin:
#     print("navigate to the homepage")
# else:
#     print("username or password is wrong")


age = int(input("enter your age: "))

if age >= 60:
    print("elder")
elif 18 < age or age < 60:
    print("adult")
elif 10 < age < 18:
    print("teenager")
else:
    print("child")