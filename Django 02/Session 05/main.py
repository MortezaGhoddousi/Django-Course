# mathematical operators

x = 4
y = 5.5

z = x + y
print(z)

z = x - y
print(z)

z = x * y
print(z)

z = x / y
print(z)

z = x ** y
print(z)

f = "m"
l = "g"

z = f+l
print(z)

x = 4
y = "5.5"
# float()
# int()
# y = int(y)
y = float(y)
# x = str(x)
z = x + y
print(z, type(z))

# comparison operators

x = 5
y = 7.78

z = x<y
print(str(x)+" < "+str(y)+" => " + str(z))

z = x<=y
print(str(x)+" <= "+str(y)+" => " + str(z))

z = x>y
print(str(x)+" > "+str(y)+" => " + str(z))

z = x>=y
print(str(x)+" >= "+str(y)+" => " + str(z))

z = x==y
print(str(x)+" == "+str(y)+" => " + str(z))

z = x!=y
print(str(x)+" != "+str(y)+" => " + str(z))

# logical operators

x = True
y = True
z = x and y

print(str(x)+" and "+str(y)+" => " + str(z))

x = True
y = False
z = x and y

print(str(x)+" and "+str(y)+" => " + str(z))

x = False
y = True
z = x and y

print(str(x)+" and "+str(y)+" => " + str(z))

x = False
y = False
z = x and y

print(str(x)+" and "+str(y)+" => " + str(z))



x = True
y = True
z = x or y

print(str(x)+" or "+str(y)+" => " + str(z))

x = True
y = False
z = x or y

print(str(x)+" or "+str(y)+" => " + str(z))

x = False
y = True
z = x or y

print(str(x)+" or "+str(y)+" => " + str(z))

x = False
y = False
z = x or y

print(str(x)+" or "+str(y)+" => " + str(z))

x = True
z = not x
print("not "+str(x)+" => " + str(z))

x = False
z = not x
print("not "+str(x)+" => " + str(z))

print(((4<=5.5) and True) or (7==7))


# lists
name1 = "Morteza"
name2 = "Setayesh"
name3 = "Nima"
name4 = "Noush"
name5 = "Mohsen"
name6 = "Arman"

print(name1)
print(name2)
print(name3)
print(name4)
print(name5)
print(name6)

names = ["Morteza", "Setayesh", "Nima", "Noush", "Mohsen", "Arman"]
print(names, type(names))
print(names[0])
print(names[-6])
print(names[1])
print(names[-5])
print(names[2])
print(names[-4])
print(names[3])
print(names[-3])
print(names[4])
print(names[-2])
print(names[5])
print(names[-1])

print(names)
names.append("Iman")
print(names)
names.pop(3)
print(names)

myInfo = ["Morteza", "Ghoddousi", 31, 83, 1.86, True, ["Programming", "Volleyball"]]
print(myInfo[0])
print(myInfo[1])
print(myInfo[2])
print(myInfo[4])
print(myInfo[5])
print(myInfo[6][1])

print(len(myInfo))