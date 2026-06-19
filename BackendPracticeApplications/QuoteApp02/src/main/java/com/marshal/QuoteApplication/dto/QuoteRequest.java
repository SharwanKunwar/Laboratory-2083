package com.marshal.QuoteApplication.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class QuoteRequest {

    @NotBlank
    private String quote;
    @NotBlank
    private String author;
}
