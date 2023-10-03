package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	_ "github.com/lib/pq"
)

// returns a list of TOP 5 EMPLOYEE from the database
func getDashboard_Top5Employees(c *gin.Context) {
	fmt.Println("GETTING Top 5 Employees Leaves")
	c.Header("Content-Type", "application/json")

	rows, err := db.Query("SELECT * FROM Top5Employees")
	if err != nil {
		log.Fatal(err)
	}

	defer rows.Close()
	var kpi []Top5Employees

	for rows.Next() {
		var n Top5Employees
		err := rows.Scan(&n.Name, &n.Count)
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