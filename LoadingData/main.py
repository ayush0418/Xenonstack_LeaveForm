import pandas as pd
import requests 
import xlrd


getUrl  = "http://localhost:9090/employee"
postUrl = 'http://localhost:9090/emp'

response = requests.get(getUrl)
print(response.status_code)

employee_data = pd.read_csv("Data/Employee.csv")
employee_data_new = employee_data.copy()

employee_data_new['leave_to'] = pd.to_datetime(employee_data_new['leave_dates']) + pd.to_timedelta(employee_data_new['leave_duration'], unit='D')

manager_data = pd.read_csv("Data/Manager.csv")
merge_data = pd.merge(employee_data_new, manager_data, on = 'employee_name' , how='left')


myobj = {
    'employee_name'   : 'emp_name',
    'leave_dates'     : 'leave_from',
    'manager_name'    : 'reporter'
}

merge_data = merge_data.rename(columns=myobj)

data_list = merge_data.to_dict(orient='records')

# Sending each row as a separate request
for row in data_list:
    x = requests.post(postUrl, data = row)
    print(x.json())