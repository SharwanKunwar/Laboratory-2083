package com.unpredictable.Quotes.repository;

import com.unpredictable.Quotes.model.Quote;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface QuoteRepository extends JpaRepository<Quote, Long> {
    List<Quote> findByAuthor(String author);
}
