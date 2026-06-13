package com.unpredictable.Quotes.repository;

import com.unpredictable.Quotes.model.Quote;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuoteRepository extends JpaRepository<Quote, Long> {
    Quote findByAuthor(String author);
}
