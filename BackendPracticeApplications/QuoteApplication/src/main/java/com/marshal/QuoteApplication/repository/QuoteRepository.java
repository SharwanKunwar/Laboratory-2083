package com.marshal.QuoteApplication.repository;

import com.marshal.QuoteApplication.entity.Quote;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface QuoteRepository extends JpaRepository<Quote, Long> {
    List<Quote> findByAuthor(String author);
}
