# Tuple
my_list = [0, 1, 2, 3]
my_tuple = (0, 1, 2, 3, 2, 2)

print(my_list)
print(my_tuple)

print(my_list[2])
print(my_tuple[2])

my_list[1] = "Morteza"
print(my_list)

# my_tuple[1] = "Morteza"
# print(my_tuple)

print(my_tuple.count(2))

print(len(my_tuple))

# Dictionary

morteza_info = ["Morteza", "Ghoddousi", 31, 83, 1.86, True]
print(morteza_info)
morteza_info.pop(2)
morteza_info.pop()

morteza_info_dictionary = {
    "fisrt_name": "Morteza", 
    "last_name": "Ghoddousi",
    "age": 31,
    "weight": 83,
    "height": 1.86,
    "is_male": True 
}

print(morteza_info)
print(morteza_info_dictionary)

print(morteza_info[1])
print(morteza_info_dictionary["last_name"])

print(morteza_info_dictionary.get("last_name", "This key cannot be found"))

print(morteza_info_dictionary.get("lastName", "This key cannot be found"))

# print(morteza_info_dictionary["lastName"])

print(morteza_info_dictionary.keys())
print(morteza_info_dictionary.values())
morteza_info_dictionary.popitem()
print(morteza_info_dictionary)

morteza_info_dictionary.pop("age")

print(morteza_info_dictionary)



