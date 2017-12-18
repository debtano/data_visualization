
# coding: utf-8

# In[32]:

import numpy as np
import pandas as pd
import csv


# In[33]:

titanic_df = pd.read_csv('/home/tano/dataAnalysis/data_visualization/data/titanic-data.csv')


# In[34]:

## SibSp is number of siblings, spouse - Parch is number of parent/children aboard
## Name of passenger , ticket number and cabin out
non_required_cols = ['Name','Ticket','Cabin','SibSp']
titanic_df = titanic_df.drop(non_required_cols, axis=1)


# In[35]:

non_survived_df = titanic_df[titanic_df.Survived == 0] # Survived = 0 means 'NO' in the Titanic DS
survived_df = titanic_df[titanic_df.Survived == 1]     # Survived = 1 means 'YES' in the Titanic DS


# In[36]:

# Dataset x Pclass
first_class_df = titanic_df[titanic_df.Pclass == 1] 
second_class_df = titanic_df[titanic_df.Pclass == 2] 
third_class_df = titanic_df[titanic_df.Pclass == 3] 


# In[37]:

# df is survived_df or non_survived_df
# passenger class is 1, 2 , 3
def class_extractor(df, p_class=1):
    # result list with tuples for the class
    results = []
    # record de pclass
    if (p_class == 1):
        passenger_class = 'First'
    elif (p_class == 2):
        passenger_class = 'Second'
    elif (p_class == 3):
        passenger_class = 'Third'
        
    # passenger_class = passenger_class
    # build a survived/non_survived based on dataset class
    non_survived_df = df[df.Survived == 0]
    survived_df = df[df.Survived == 1] 
    # men survived and non survived
    men_survived = survived_df[survived_df.Sex == 'male'].count()['Sex']
    men_non_survived = non_survived_df[non_survived_df.Sex == 'male'].count()['Sex']
    # women
    women_survived = survived_df[survived_df.Sex == 'female'].count()['Sex']
    women_non_survived = non_survived_df[non_survived_df.Sex == 'female'].count()['Sex']
    
    # chilren - male or female under 10 years old
    children_survived = survived_df[survived_df.Age < 11].count()['Age']
    children_non_survived = non_survived_df[non_survived_df.Age < 11].count()['Age']
    
    # build results
    results.append( (passenger_class, 'male', 'survived', men_survived) )
    results.append( (passenger_class, 'male', 'non_survived', men_non_survived) )
    results.append( (passenger_class, 'female', 'survived', women_survived) )
    results.append( (passenger_class, 'female', 'non_survived', women_non_survived) )
    results.append( (passenger_class, 'children', 'survived', children_survived) )
    results.append( (passenger_class, 'children', 'non_survived', children_non_survived) )
    return results    


# In[ ]:




# In[38]:

# build the complete list
complete_list = []
first_class_list = class_extractor(first_class_df, 1)
second_class_list = class_extractor(second_class_df, 2)
third_class_list = class_extractor(third_class_df, 3)
complete_list = first_class_list + second_class_list + third_class_list


# In[ ]:




# In[39]:

# create the csv file
rows = complete_list
headers = ['Passenger_Class', 'Demographic', 'Status', 'Number_passengers']
with open ( '/home/tano/dataAnalysis/data_visualization/data/titanic-demographic.csv' , 'w' ) as f: 
    f_csv = csv.writer(f)
    f_csv.writerow(headers)
    f_csv.writerows(rows)

