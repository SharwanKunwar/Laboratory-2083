package com.unpredictable.Library.entity;


import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "Books")
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(nullable = false, length = 200)
    private String title;

    @Column(nullable = false, length = 1000)
    private String description;

    @Column(nullable = false, length = 100)
    private String author;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal price;



}
