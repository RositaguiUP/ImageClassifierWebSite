import cv2 
from PIL import Image, ImageOps
from collections import Counter
import csv
import os
import colorsys
import numpy as np

def showImage(image) :  
    cv2.imshow("Image", image)
    cv2.waitKey(0)
    cv2.destroyAllWindows()


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
    mc = val.most_common(20)
    cc = [colorsys.rgb_to_hsv(p[0][0], p[0][1], p[0][2]) for p in mc]
    ccout = []
    for a in cc:
        list(map(ccout.append, a))
    return ccout

def mostRepeatedRGB(img):
    val = list(img.getdata())
    val = Counter(val)
    mc = val.most_common(20)
    cc1 = [p[0][0] for p in mc]
    cc2 = [p[0][1] for p in mc]
    cc3 = [p[0][2] for p in mc]
    return cc1, cc2, cc3

def mostRepeatedGrayscale(img):
    img = ImageOps.grayscale(img)
    val = list(img.getdata())
    val = Counter(val)
    mc = val.most_common(20)
    cc = [p[0] for p in mc]
    return cc

def featureRedHistogram(image):
    red = np.zeros(255,dtype=int)
    for i in range(0,image.shape[0]):
        for j in range(0,image.shape[1]):
            red[int(image[i,j,2])-1] +=1
    return list(red)

def featureBlueHistogram(image):
    blue = np.zeros(255,dtype=int)
    for i in range(0,image.shape[0]):
        for j in range(0,image.shape[1]):
            blue[int(image[i,j,0])-1] +=1
    return list(blue)

def featureGreenHistogram(image):
    green = np.zeros(255,dtype=int)
    for i in range(0,image.shape[0]):
        for j in range(0,image.shape[1]):
            green[int(image[i,j,1])-1] +=1
    return list(green)

def featureRGBGMedia(image):
    #BGR order channel
    blue = 0
    green = 0
    red = 0
    grayScale = 0
    size = image.shape[0]*image.shape[1]
    for i in range(0,image.shape[0]):
        for j in range(0,image.shape[1]):
            blue += image[i,j,0]
            green += image[i,j,1]
            red += image[i,j,2]
            grayScale += (blue + red + green)/3
    blue /= size
    green /= size
    red /= size
    grayScale /= size
    
    return [red,green,blue,grayScale]

def featureHSIMedia(image):       
    #HSV
    hsv_img = cv2.cvtColor(image, cv2.COLOR_BGR2HSV)
    size = image.shape[0]*image.shape[1]
    hue = 0
    saturation = 0
    value = 0
    for i in range(0,image.shape[0]):
        for j in range(0,image.shape[1]):
            hue += hsv_img[i,j,0]
            saturation += hsv_img[i,j,1]
            value += hsv_img[i,j,2]
    hue /= size
    saturation /= size
    value /= size
    return [hue,saturation,value]

def getFeatures(image):
    return featureRedHistogram(image)+featureGreenHistogram(image)+featureBlueHistogram(image)+featureRGBGMedia(image)+featureHSIMedia(image)

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
                image = cv2.imread(f)
                # writer.writerow(['{}'.format(f.split(".")[0]), r, g, b, mostRepeatedHSV(image), mostRepeatedGrayscale(image)])
                writer.writerow(['{}'.format(filename[0:filename.index("_")]), getFeatures(image)])

if __name__ == "__main__":
    main()