print("start the script")

def cal_average(numbers):
    s = 0
    for n in numbers:
        s = s+n
    return s/len(numbers)


def cal_variance(numbers):
    avg = cal_average(numbers)

    s = 0
    for n in numbers:
        s = s+(n-avg)**2
    return s/len(numbers)

def cal_std(numbers):
    var = cal_variance(numbers)
    return var**0.5

n = [18, 19, 20, 17.75, 15]
avg = cal_average([18, 19, 20, 17.75, 15])
var = cal_variance([18, 19, 20, 17.75, 15])
std = cal_std([18, 19, 20, 17.75, 15])

print("average of", n, "=", avg)
print("variance of", n, "=", var)
print("standard deviation of", n, "=", std)

print("end of the script")
