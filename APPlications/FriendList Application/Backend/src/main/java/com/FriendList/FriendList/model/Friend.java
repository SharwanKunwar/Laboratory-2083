package com.FriendList.FriendList.model;

/*
 * Friend Entity
 *
 * Purpose:
 * This class represents a friend in the Friend List application.
 * Spring Boot uses this class to create the "friends" table in the database.
 *
 * Validations:
 * - Name cannot be empty and must be between 2 and 50 characters.
 * - Email cannot be empty and must follow a valid email format.
 * - Phone cannot be empty and must contain exactly 10 digits.
 *
 * Why validations?
 * - Prevent invalid data from entering the database.
 * - Improve data quality and consistency.
 * - Provide meaningful error messages to users.
 */

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "friends")
public class Friend {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Name is required")
    @Size(min = 2, max = 50, message = "Name must be between 2 and 50 characters")
    private String name;

    @NotBlank(message = "Email is required")
    @Email(message = "Please enter a valid email address")
    @Column(unique = true)
    private String email;

    @NotBlank(message = "Phone number is required")
    @Pattern(
            regexp = "^[0-9]{10}$",
            message = "Phone number must contain exactly 10 digits"
    )
    private String phone;
}