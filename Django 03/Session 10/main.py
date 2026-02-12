def sum_two(x1, x2):
    print(x1+x2)

sum_two(5, 9)
sum_two(2, 6)

def cal_average(x1, x2, x3, x4, x5):
    print((x1+x2+x3+x4+x5)/5)

cal_average(5, 9, 7, 6, 2)


x = [5, 8, 9, 4, 2, 3, 14, 7, 9.5, 10]

def cal_average2(numbers):
    s = 0
    for n in numbers:
        s = s+n
    return s/len(numbers)

print(cal_average2(x))
y = cal_average2(x)
avg = cal_average2([18, 19, 20, 17.75, 15])

def cal_variance(numbers):
    avg = cal_average2(numbers)

    s = 0
    for n in numbers:
        s = s+(n-avg)**2
    return s/len(numbers)

var = cal_variance([18, 19, 20, 17.75, 15])

std = var**0.5
print(std)

