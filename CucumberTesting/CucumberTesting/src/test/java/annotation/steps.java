package annotation;

import io.cucumber.java.en.*;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;


public class steps { 

	private WebDriver driver;
    @Given("I open the Chrome browser")

    public void openChromeBrowser() {
    	driver = new ChromeDriver();
    	driver.manage().window().maximize();
    }

    @When("I navigate to the localhost")
    public void navigateToGoogleHomepage() {
        driver.get("http://localhost:4200");
    }

    @Then("I verify the title is \"MyApp\"")
    public void verifyTitle() {
        String title = driver.getTitle();
        System.out.println(title);
        assert title.equals("MyApp");
    }
    @Then("I Enter the details")
    public void verify() {
    	driver.findElement(By.className("text_box")).sendKeys("Aayush");
    	driver.findElement(By.xpath("/html/body/app-root/app-home/div[3]/div/form/div[2]/div/label[1]/input")).click();
    	driver.findElement(By.xpath("/html/body/app-root/app-home/div[3]/div/form/div[2]/input[2]")).sendKeys("18-09-2023");
    	driver.findElement(By.xpath("/html/body/app-root/app-home/div[3]/div/form/div[2]/input[3]")).sendKeys("17-09-2023");
    	driver.findElement(By.id("leave")).click();
		driver.findElement(By.xpath("//*[@id=\"leave\"]/option[2]")).click();
		driver.findElement(By.id("reporter")).click();
		driver.findElement(By.xpath("//*[@id=\"reporter\"]/option[3]")).click();
		
		driver.findElement(By.className("get_button")).click();
		driver.findElement(By.className("get_button")).click();
    }
}




 

