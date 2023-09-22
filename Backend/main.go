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