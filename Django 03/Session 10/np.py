import numpy

n = [18, 19, 20, 17.75, 15]

avg = numpy.average(n)
var = numpy.var(n)
std = numpy.std(n)
median = numpy.median(n)
mode = numpy.argmax(numpy.bincount(n))

print("average of", n, "=", avg)
print("variance of", n, "=", var)
print("standard deviation of", n, "=", std)
print("median of", n, "=", median)
print("mode of", n, "=", mode)