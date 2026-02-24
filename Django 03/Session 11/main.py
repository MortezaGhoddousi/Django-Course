def cal_min(numbers):
    Min = numbers[0]

    for n in numbers:
        if n < Min:
            Min = n

    return Min

def cal_max(numbers):
    Max = numbers[0]

    for n in numbers:
        if n > Max:
            Max = n

    return Max

x = [7, 9, 4, 16, 6]

print(cal_min(x))
print(cal_max(x))

import numpy

print(numpy.amin(x))
print(numpy.amax(x))



def cal_roots(a, b, c):
    delta = b**2 - 4*a*c

    if delta > 0:
        x1 = (-b + delta**0.5)/(2*a)
        x2 = (-b - delta**0.5)/(2*a)
        return [x1, x2]
    elif delta == 0:
        x = -b/(2*a)
        return x
    else:
        return "no roots"


print(cal_roots(2, 3, 1))