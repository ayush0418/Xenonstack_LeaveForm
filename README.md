# Xenonstack_LeaveForm

## TECH STACK USED TO BUILD THE APPLICATION
  * **FRONTEND** - ANGULAR JS
  * **DATABASE** - POSTGRESQL
  * **BACKEND**  - GOLANG

**NOTE -** Password to Access the employee Data is set **admin** by default

<br>



# *Steps To Run the Project without Docker*

### Create Postgresql Database
* **Create a docker container by using postgresql image.**
  * sudo docker run -d -p 5400:5432 --name my-postgres -e POSTGRES_PASSWORD=mysecretpassword postgres
* **Change a line in main.go file in Backend to this**
  * db, err = sql.Open("postgres", "postgres://postgres:mysecretpassword@localhost:5400/employee?sslmode=disable")
* **Create Table in the Database.**
  * **To start Database -** psql -h localhost -p 5400 -U postgres –W
  * **Enter Password given in docker container-** mysecretpassword
  * **Create Database and Connect-** Create Database employee; \c employee;
  * **Create Enum Datatype -**
    * create type **teamname_type** AS ENUM ('CloudOps', 'PlatformOps', 'DevOps', 'ItOps', 'SRE');
    * create type **reporter_type** AS ENUM ('Sahil Bansal', 'Chitransh Sharma', 'Approva Sharma', 'Surya Kant');
    * create type **leave_type** AS ENUM ('Sick Leave', 'Casual Leave', 'Earned Leave'); 
  * **Create Table Employee**
    * create table if not exists employee (
         	id SERIAL primary key, 
       	  emp_name text, 
	         team_name **teamname_type**, 
	         leave_from date, 
	         leave_to date, 
	         leave_type **leave_type**, 
	         reporter **reporter_type**, 
	         attachment bytea,
	         status text default 'Pending'	
    );
  * **Check The Table -** Select * form employee
  
### Run Backend
 * cd Backend
 * go mod init
 * go mod tidy
 * go run .
 * Open localhost:9090/employee 
   
### Run Frontend
  * cd Frontend
  * npm install
  * ng serve
  * Open localhost:4200

<br>

# *Steps To Run the Project Using Docker*
### Create a docker network
  * sudo docker create network aayush_leaveform_netowrk
### Create a docker Volume
  * sudo docker create volume aayush_leaveform_volume
### Run the COMPOSE FILE
  * sudo docker compose up
### Open web browser
  * localhost:4200
