package com.unpredictableXshare.Quotemous.service;


import com.unpredictableXshare.Quotemous.entity.Quote;
import java.util.List;

public interface QuoteServiceHandler{
    //W
    Quote createQuote(Quote quote);
    // Read Quote
    List<Quote> getAllQuotes();



}
