package main

import (
	"fmt"

	"github.com/gin-gonic/gin"
	_ "github.com/lib/pq"
)

// UPDATING EMPLOYEE ENTRY IN THE DATABASE EMPLOYEE, TABLE EMPLOYEE
func approveEmployee(c *gin.Context) {
	fmt.Println("UPDATING EMPLOYEE DATA")
	var err error
	c.Header("Content-Type", "application/json")

	id := c.Param("id")
	sqlStatement1 := `UPDATE notifications set status='Approved' WHERE id=$1;`
	_, err = db.Exec(sqlStatement1, id)

	if err != nil {
		panic(err)
	}
	sqlStatement2 := `UPDATE employee set status='Approved' WHERE id=$1;`
	_, err = db.Exec(sqlStatement2, id)

	if err != nil {
		panic(err)
	}
	// c.IndentedJSON(http.StatusOK, e)

}

// UPDATING EMPLOYEE ENTRY IN THE DATABASE EMPLOYEE, TABLE EMPLOYEE
func rejectEmployee(c *gin.Context) {
	fmt.Println("UPDATING EMPLOYEE DATA")
	var err error
	c.Header("Content-Type", "application/json")

	id := c.Param("id")
	sqlStatement1 := `UPDATE notifications set status='Rejected' WHERE id=$1;`
	_, err = db.Exec(sqlStatement1, id)
	
	if err != nil {
		panic(err)
	}
	sqlStatement2 := `UPDATE employee set status='Rejected' WHERE id=$1;`
	_, err = db.Exec(sqlStatement2, id)
	
	if err != nil {
		panic(err)
	}
	// c.IndentedJSON(http.StatusOK, e)

}
