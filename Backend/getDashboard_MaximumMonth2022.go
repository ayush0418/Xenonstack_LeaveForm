package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	_ "github.com/lib/pq"
)

// returns a Month in which maximum leave were taken from the database
func getDashboard_MaximumMonth2022(c *gin.Context) {
	fmt.Println("GETTING Month in 2022 in which maximum leaves were taken")
	c.Header("Content-Type", "application/json")

	rows, err := db.Query("SELECT * FROM MaximumMonth2022")
	if err != nil {
		log.Fatal(err)
	}

	defer rows.Close()
	var kpi []MaximumMonth2022

	for rows.Next() {
		var n MaximumMonth2022
		err := rows.Scan(&n.Month, &n.Count)
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