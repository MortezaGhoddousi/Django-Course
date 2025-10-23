def average(a):
    Sum = 0
    for i in a:
        Sum = Sum+i
    return Sum/len(a)

def Variance(a):
    avg = average(a)
    Sum = 0
    for i in a:
        Sum = Sum+((i-avg)**2)
    return Sum/len(a)

def Minimum(a):
    Min = a[0]
    for i in a:
        if i<Min:
            Min = i
    return Min

def Maximum(a):
    Max = a[0]
    for i in a:
        if i>Max:
            Max = i
    return Max

def Std(a):
    var = Variance(a)
    return var**0.5