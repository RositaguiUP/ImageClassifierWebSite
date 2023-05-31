
from PIL import Image, ImageOps
from collections import Counter
import csv
import os
import colorsys
import numpy as np


# ****************** Features ******************
# def mostRepeatedHSV(img):
#     val = list(img.getdata())
#     val = Counter(val)
#     mc = val.most_common(255)
#     cc = [colorsys.rgb_to_hsv(p[0][0], p[0][1], p[0][2]) for p in mc]
#     return cc

def mostRepeatedHSV(img):
    val = list(img.getdata())
    val = Counter(val)
    mc = val.most_common(100)
    cc = [colorsys.rgb_to_hsv(p[0][0], p[0][1], p[0][2]) for p in mc]
    ccout = []
    for a in cc:
        list(map(ccout.append, a))
    return ccout

def mostRepeatedRGB(img):
    val = list(img.getdata())
    val = Counter(val)
    mc = val.most_common(100)
    cc1 = [p[0][0] for p in mc]
    cc2 = [p[0][1] for p in mc]
    cc3 = [p[0][2] for p in mc]
    return cc1, cc2, cc3

def mostRepeatedGrayscale(img):
    img = ImageOps.grayscale(img)
    val = list(img.getdata())
    val = Counter(val)
    mc = val.most_common(100)
    cc = [p[0] for p in mc]
    return cc

# ****************** Main ******************
def main():
    directories = ['Images/cats', 'Images/ducks', 'Images/pandas']
    e = open('features.csv', 'w')
    writer = csv.writer(e)
    # writer.writerow(['      ', 'features'])
    for directory in directories:
        for filename in sorted(os.listdir(directory), key=len):
            print(filename)
            f = os.path.join(directory, filename)
            if os.path.isfile(f):
                image = Image.open(f)
                r, g, b = mostRepeatedRGB(image)
                # writer.writerow(['{}'.format(f.split(".")[0]), r, g, b, mostRepeatedHSV(image), mostRepeatedGrayscale(image)])
                writer.writerow(['{}'.format(filename[0:filename.index("_")]), r + g + b + mostRepeatedHSV(image) + mostRepeatedGrayscale(image)])

if __name__ == "__main__":
    main()