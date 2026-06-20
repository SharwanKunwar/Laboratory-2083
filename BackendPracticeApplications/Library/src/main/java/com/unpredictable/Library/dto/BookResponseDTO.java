package com.unpredictable.Library.dto;

import lombok.*;
import java.math.BigDecimal;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BookResponseDTO {
    private long id;
    private String title;
    private String description;
    private String author;
    private BigDecimal price;
}
