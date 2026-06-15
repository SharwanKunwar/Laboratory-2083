package com.unpredictableXCode.Quote01.service;

import com.unpredictableXCode.Quote01.entity.QuoteEntity;

import java.util.List;

public interface QuoteServiceHelper {

    // add method
    QuoteEntity addQuote(QuoteEntity quoteEntity);

    // get all method
    List<QuoteEntity> getAllQuotes();

    // get quote by author method
    QuoteEntity getQuoteByAuthor(String author);
}
