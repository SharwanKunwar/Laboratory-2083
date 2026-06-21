package com.unpredictable.BookShop.dto;

import jakarta.validation.constraints.*;
import lombok.*;
import org.hibernate.sql.Update;

import java.math.BigDecimal;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class BookRequestDTO {

    @NotBlank(message = "Title is required.")
    @Size(max = 100, message = "Title cannot exceed 100 characters.")
    private String title;

    @NotBlank(message = "Description is required.")
    @Size(max = 300, message = "Description cannot exceed 300 characters.")
    private String description;

    @NotBlank(message = "Author is required.")
    @Size(max = 100, message = "Author cannot exceed 100 characters.")
    private String author;

    @NotNull(message = "Price is required.")
    @DecimalMin(value = "0.01", message = "Price must be greater than 0")
    @Digits(integer = 8, fraction = 2)
    private BigDecimal price;
}
