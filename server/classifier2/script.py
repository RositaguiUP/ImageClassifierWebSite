import json
import sys
import numpy as np
from feature_extractor import *
from lab_utils_logistic import sigmoid
# plt.style.use('./deeplearning.mplstyle')

normval = 4397.062097478376

def y_change(y, cl):
    """
    Creates an independent y vector that only holds 1's for
    the selected class and zero for the rest
    
    Args:
      y (ndarray (m,)) : target values
      cl (scalar)      : The class we are studying.s
    Returns:
      y_pr (ndarray (n,))   : Array holding only 1's for the 
                              analyzed class.
    """
    y_pr=[]
    for i in range(0, len(y)):
        if y[i] == cl:
            y_pr.append(1)
        else:
            y_pr.append(0)
    return y_pr

def predict(theta_list, X, y):
    y_uniq = list(set(y.flatten()))
    y_hat = [0]*len(y)
    for i in range(0, len(y_uniq)):
        y_tr = y_change(y, y_uniq[i])
        # y1 = sigmoid(x, theta_list[i])
        y1 = sigmoid(np.dot(X, theta_list[i]))
        for k in range(0, len(y)):
            # if type(y1) == list:
            if y_tr[k] == 1 and y1[k] >= .7:
                y_hat[k] = y_uniq[i]
            # else:
                # if y_tr[k] == 1 and y1 >= 0.2:
                    # y_hat[k] = y_uniq[i]
    return y_hat

# Read the image file path from the command-line argument
image_path = sys.argv[1]

# Process the uploaded image and generate the output

x_t = []
# for i in range(241, 301):
f = image_path #"Images/tests/cat_{}.jpg".format(245)
image = Image.open(f)
r, g, b = mostRepeatedRGB(image)
features = r + g + b + mostRepeatedHSV(image) + mostRepeatedGrayscale(image)
# y_train = [0, 1, 2]
x_t = np.array([features, features, features])/normval
# y_train = np.array(y_train)

# LECTURA DE CSV
theta_lis = np.loadtxt("theta.csv", delimiter=",", dtype=float)
theta_lis = np.array(theta_lis)

y_hat = predict(theta_lis, x_t, np.array([2, 1, 3]))   #### theta_list funciona dentro de este notebook, theta_lis es leer del archivo
#f = f.split("/")
#print(f[0][:f[0].index("_")])
# if f[0][:f[0].index("_")] == "cat":
#     y_hat[0] = 0
#     y_hat[1] = 1
#     y_hat[2] = 0
# if f[0][:f[0].index("_")] == "duck":
#     y_hat[0] = 2
#     y_hat[1] = 0
#     y_hat[2] = 0


animal = "It's a "
if y_hat[0] == 2 and y_hat[1] == 1 and y_hat[2] == 0:
    animal += "Panda"
elif y_hat[0] == 0 and y_hat[1] == 1:
    animal += "Cat"
elif y_hat[0] == 2:
    animal += "Duck"

#print(animal)

# Prepare the output data
# Convert y_hat to a regular Python list
y_hat = [int(item) for item in y_hat]

output = {
    'graphData': y_hat,  
    'message': animal
}

# Print the output as a JSON string
print(json.dumps(output))


