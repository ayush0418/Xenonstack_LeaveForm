package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	_ "github.com/lib/pq"
)

// returns a list of Notifications from the database
func getNotifications(c *gin.Context) {
	fmt.Println("GETTING NOTIFICATIONS DATA")
	c.Header("Content-Type", "application/json")

	rows, err := db.Query("SELECT * FROM notifications")
	if err != nil {
		log.Fatal(err)
	}

	defer rows.Close()
	var notifications []notification

	for rows.Next() {
		var n notification
		err := rows.Scan(&n.Id, &n.Reporter, &n.Approved)
		if err != nil {
			log.Fatal(err)
		}
		notifications = append(notifications, n)
	}
	err = rows.Err()
	if err != nil {
		log.Fatal(err)
	}

	c.IndentedJSON(http.StatusOK, notifications)
}
