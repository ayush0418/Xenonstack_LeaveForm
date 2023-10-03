package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	_ "github.com/lib/pq"
)

// returns a list of TEAM Rank Distribution based on Maximum Leave Taken from the database
func getDashboard_TeamRanking2022Distribution(c *gin.Context) {
	fmt.Println("GETTING TEAM RANKING DISTRIBUTION DATA")
	c.Header("Content-Type", "application/json")

	rows, err := db.Query("SELECT * FROM TeamRanking2022Distribution")
	if err != nil {
		log.Fatal(err)
	}

	defer rows.Close()
	var kpi []TeamRanking2022Distribution

	for rows.Next() {
		var n TeamRanking2022Distribution
		fmt.Println("HELLO HA")
		fmt.Println(&n.TeamName)
		fmt.Println(&n.Count)
		fmt.Println(&n.LeaveType)
		fmt.Println("DONE: \n")
		err := rows.Scan(&n.TeamName, &n.LeaveType, &n.Count)
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