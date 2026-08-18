package com.unpredictableXshare.Quotemous.service;


import com.unpredictableXshare.Quotemous.entity.Quote;
import java.util.List;
import java.util.UUID;

public interface QuoteServiceHandler{
    //Write quote
    Quote createQuote(Quote quote);
    // Get all Quote
    List<Quote> getAllQuotes();
    // Get quote by id
    Quote getQuoteById(UUID id);
    // Update quote
    Quote updateQuote(UUID id, Quote quote);



}
