package com.example.LoginWithGoogle4;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class LoginWithGoogle4Application {

	public static void main(String[] args)
	{
		Dotenv dotenv = Dotenv.configure().load();
		dotenv.entries().forEach((entry) -> System.setProperty(entry.getKey(), entry.getValue()));

		SpringApplication.run(LoginWithGoogle4Application.class, args);
	}

}
