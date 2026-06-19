package com.marshal.QuoteApplication.repository;

import com.marshal.QuoteApplication.entity.EQuote;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface QuoteRepository extends JpaRepository<EQuote, Long> {
    List<EQuote> findQuoteByAuthor(String author);
}
