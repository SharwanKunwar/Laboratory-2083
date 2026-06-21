package com.unpredictable.DemoTask;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class DemoTaskApplication {
	public static void main(String[] args)
	{
		Dotenv dotenv = Dotenv.configure().load();
		dotenv.entries().forEach((entry) -> System.setProperty(entry.getKey(), entry.getValue()));

		SpringApplication.run(DemoTaskApplication.class, args);
	}

}
