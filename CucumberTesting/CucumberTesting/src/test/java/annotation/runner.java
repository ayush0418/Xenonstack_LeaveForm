package annotation;

import org.junit.runner.RunWith;
import io.cucumber.junit.Cucumber;
import io.cucumber.junit.CucumberOptions;


@RunWith(Cucumber.class) 
@CucumberOptions( 
	features = "src/test/java", // where feature file is located
	glue= {"annotation"},       // where step file is located
	plugin = {"pretty", "html:target/Destination/report.html"},  // to create report in target/Destination folder
	monochrome = true
) 
public class runner { 
}