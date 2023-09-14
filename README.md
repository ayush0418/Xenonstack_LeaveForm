# Xenonstack_LeaveForm

## TECH STACK USED TO BUILD THE APPLICATION
  * **FRONTEND** - ANGULAR JS
  * **DATABASE** - POSTGRESQL
  * **BACKEND**  - GOLANG

**NOTE -** Password to Access the employee Data is set **admin** by default

<br>

## Steps To Run the Project without Docker
### Run Database
#### Create a docker container by using postgresql image.
  * sudo docker run -d -p 5400:5432 --name my-postgres -e POSTGRES_PASSWORD=mysecretpassword postgres
#### Change a line in main.go file in Backend to this
  * db, err = sql.Open("postgres", "postgres://postgres:mysecretpassword@localhost:5400/employee?sslmode=disable")

### Run Backend
 * cd Backend
 * go run .
   
### Run Frontend
  * cd Frontend
  * ng serve

<br>

## Steps To Run the Project Using Docker
### Create a docker network
  * sudo docker create network aayush_leaveform_netowrk
### Create a docker Volume
  * sudo docker create volume aayush_leaveform_volume
### Run the COMPOSE FILE
  * sudo docker compose up
### Open localhost:4200 on web browser
