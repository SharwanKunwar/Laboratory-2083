package com.example.studentapi;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class StudentapiApplication {

	public static void main(String[] args) {
		// configuration of dotenv-java
		Dotenv dotenv = Dotenv.configure().ignoreIfMalformed().load();
		dotenv.entries().forEach(entry -> System.setProperty(
				entry.getKey(), entry.getValue()
		));

		SpringApplication.run(StudentapiApplication.class, args);
	}

}
