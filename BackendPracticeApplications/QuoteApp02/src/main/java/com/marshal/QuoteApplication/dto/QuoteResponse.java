package com.marshal.QuoteApplication.dto;

import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class QuoteResponse {
    private Long  id;
    private String quote;
    private String author;
}
