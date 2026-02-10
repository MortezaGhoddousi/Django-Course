names = ["Morteza", "Mahdis", "Nasrin", "Akram", "Tiam"]

# print("Akram" in names)


# if "Sarah" in names:
#     print(names.index("Sarah"))
# else:
#     print("Sarah is not in list")

try:
    print(names.index("Akram"))
except:
    print("Sarah is not in list")


print("end of the script")


def say_hello1(name):
    print(name)
    print("start running body of the function")
    print("hello", name)
    print("end of the funciton")


name = "Nasrin"
x = 3
print(x**2 + 4)

print(name)
say_hello1("Morteza")
print(name)

say_hello1("Mahdis")



