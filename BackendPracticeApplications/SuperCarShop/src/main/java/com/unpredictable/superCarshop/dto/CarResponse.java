package com.unpredictable.superCarshop.dto;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CarResponse {
    private long id;
    private String name;
    private String modal;
    private String color;
    private long price;
    private String engine;
}
