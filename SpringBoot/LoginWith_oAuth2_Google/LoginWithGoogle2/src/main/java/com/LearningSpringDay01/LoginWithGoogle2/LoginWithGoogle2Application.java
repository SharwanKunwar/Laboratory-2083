package com.LearningSpringDay01.LoginWithGoogle2;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.core.env.Environment;

@SpringBootApplication
public class LoginWithGoogle2Application {

	public static void main(String[] args)
	{
		Dotenv dotenv = Dotenv.configure().load();
		dotenv.entries().forEach((entry -> System.setProperty(entry.getKey(), entry.getValue())));

		SpringApplication.run(LoginWithGoogle2Application.class, args);
	}
	@Bean
	CommandLineRunner test(Environment env) {
		return args -> {
			System.out.println("--------------------------------");
			System.out.println("CLIENT_ID = " +
					env.getProperty("spring.security.oauth2.client.registration.google.client-id"));
			System.out.println("--------------------------------");
		};
	}

}
