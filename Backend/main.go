package main

import (
	"database/sql"
	"log"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	_ "github.com/lib/pq"
)

var db *sql.DB

func main() {
	var err error
	db, err = sql.Open("postgres", "postgres://postgres:mysecretpassword@db:5432/employee?sslmode=disable")
	if err != nil {
		log.Fatal(err)
	}

	router := gin.Default()
	router.Use(cors.Default())

	router.PUT("/employee/:id/approved", approveEmployee)
	router.PUT("/employee/:id/rejected", rejectEmployee)
	router.POST("/emp", createEmployee)
	router.DELETE("/employee", deleteAllEmployee)
	router.DELETE("/employee/:id", deleteEmployeeId)
	router.GET("/employee", getEmployee)
	router.GET("/employee/:id", getEmployeeId)
	router.GET("/notifications", getNotifications)

	router.GET("/dashboard/august2022", getDashboard_August2022)
	router.GET("/dashboard/maximumMonth2022", getDashboard_MaximumMonth2022)
	router.GET("/dashboard/top5employees", getDashboard_Top5Employees)
	router.GET("/dashboard/employeesUnderManager", getDashboard_EmployeesUnderManager)
	router.GET("/dashboard/teamRanking2022", getDashboard_TeamRanking2022)
	router.GET("/dashboard/teamRanking2022Distribution", getDashboard_TeamRanking2022Distribution)

	router.Run("0.0.0.0:9090")
}

type employee struct {
	Id         int    `json:"id"`
	Name       string `json:"name"`
	TeamName   string `json:"teamname"`
	LeaveFrom  string `json:"leavefrom"`
	LeaveTo    string `json:"leaveto"`
	LeaveType  string `json:"leavetype"`
	Reporter   string `json:"reporter"`
	Attachment string `json:"attachment"`
	Status string `json:"status"`
}

type notification struct {
	Id 		   int		`json : "id"`
	Reporter   string 	`json:"reporter"`
	Approved   string 	`json:"approved"`
}

type Top5Employees struct {
	Name 		string 	`json:"name"`
	Count		int 	`json:"count"`
}

type August2022 struct {
	Count 		int 	`json:"count"`
}

type MaximumMonth2022 struct {
	Month  		string 	`json:"month"`
	Count		int 	`json:"count"`
}

type EmployeesUnderManager struct {
	Reporter 	string 	`json:"reporter"`
	Count	 	int 	`json:"count"`
}

type TeamRanking2022 struct {
	TeamName	string 	`json:"teamname"`
	Count		int		`json:"count"`
}

type TeamRanking2022Distribution struct {
	TeamName	string 	`json:"teamname"`
	Count		int		`json:"count"`
	LeaveType	string	`json:"leavetype"`
}