package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	_ "github.com/lib/pq"
)

// returns a list of EMPLOYEE on leave in month of aug 2022 from the database
func getDashboard_August2022(c *gin.Context) {
	fmt.Println("GETTING EMPLOYEE on leave in month of Aug 2022 Data")
	c.Header("Content-Type", "application/json")

	rows, err := db.Query("SELECT * FROM August2022")
	if err != nil {
		log.Fatal(err)
	}

	defer rows.Close()
	var kpi []August2022

	for rows.Next() {
		var n August2022
		err := rows.Scan(&n.Count)
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