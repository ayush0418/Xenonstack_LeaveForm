package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	_ "github.com/lib/pq"
)

// returns a list of Manager with no. of employee on leave in first quater from the database
func getDashboard_EmployeesUnderManager(c *gin.Context) {
	fmt.Println("GETTING Manager with no. of employee on leave in first quater")
	c.Header("Content-Type", "application/json")

	rows, err := db.Query("SELECT * FROM EmployeesUnderManager")
	if err != nil {
		log.Fatal(err)
	}

	defer rows.Close()
	var kpi []EmployeesUnderManager

	for rows.Next() {
		var n EmployeesUnderManager
		err := rows.Scan(&n.Reporter, &n.Count)
		if err != nil {
			log.Fatal(err)
		}
		kpi = append(kpi, n)
	}
	err = rows.Err()
	if err != nil {
		log.Fatal(err)
	}

	c.IndentedJSON(http.StatusOK, kpi)
}