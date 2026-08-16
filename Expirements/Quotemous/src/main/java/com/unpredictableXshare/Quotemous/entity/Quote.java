package com.unpredictableXshare.Quotemous.entity;

import com.unpredictableXshare.Quotemous.enums.QuoteCategory;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class Quote
{
    @Id
    @GeneratedValue
    private UUID id;
    private String quote;
    private String nickName;
    private LocalDateTime createdAt;

    @Enumerated(EnumType.STRING)
    private QuoteCategory  category;

    @PrePersist
    public void prePersist()
    {
        this.createdAt = LocalDateTime.now();
    }

}
