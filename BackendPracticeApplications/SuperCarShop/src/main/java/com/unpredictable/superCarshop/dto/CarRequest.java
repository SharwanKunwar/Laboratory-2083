package com.unpredictable.superCarshop.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CarRequest {


    @NotBlank
    private String name;

    @NotBlank
    private String modal;

    @NotBlank
    private String color;

    @NotNull(message = "Price is required")
    @Positive(message = "Price must be greater than 0")
    private Long price;

    @NotBlank
    private String engine;

}
