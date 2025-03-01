import json
import pandas as pd

with open('D:/my-express-server/IndiaProject/js/population.json', 'r') as json_file:
    data = json.load(json_file)

df = pd.DataFrame(data.items(), columns=['State', 'Population'])

df.to_csv('D:/my-express-server/IndiaProject/population.csv', index=False)

file_path = r"D:\my-express-server\IndiaProject\population.csv" 

data = pd.read_csv(file_path)  

data['State'] = data['State'].map(lambda x: str(x).strip()) 
data.set_index('State', inplace=True) 
