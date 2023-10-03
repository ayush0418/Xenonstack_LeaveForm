package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	_ "github.com/lib/pq"
)

// returns a list of TEAM Rank based on Maximum Leave Taken from the database
func getDashboard_TeamRanking2022(c *gin.Context) {
	fmt.Println("GETTING TEAM RANKING DATA")
	c.Header("Content-Type", "application/json")

	rows, err := db.Query("SELECT * FROM TeamRanking2022")
	if err != nil {
		log.Fatal(err)
	}

	defer rows.Close()
	var kpi []TeamRanking2022

	for rows.Next() {
		var n TeamRanking2022
		err := rows.Scan(&n.TeamName, &n.Count)
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