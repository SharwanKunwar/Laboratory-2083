package com.marshal.QuoteApplication;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class QuoteApplication {
	public static void main(String[] args)
	{
		Dotenv dotenv = Dotenv.configure().load();
		dotenv.entries().forEach((entry)->System.setProperty(entry.getKey(), entry.getValue()));

		SpringApplication.run(QuoteApplication.class, args);
	}

}
