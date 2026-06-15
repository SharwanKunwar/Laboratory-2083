package com.unpredictable.Quotes.service;

import com.unpredictable.Quotes.model.Quote;

import java.util.List;

public interface QuoteService {

    Quote addQuote(Quote quote);
    List<Quote> getAllQuotes();
    List<Quote> getQuoteByAuthor(String author);

}
