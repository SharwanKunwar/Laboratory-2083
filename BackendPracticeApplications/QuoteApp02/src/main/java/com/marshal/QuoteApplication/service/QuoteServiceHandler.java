package com.marshal.QuoteApplication.service;

import com.marshal.QuoteApplication.dto.QuoteRequest;
import com.marshal.QuoteApplication.dto.QuoteResponse;

import java.util.List;

public interface QuoteServiceHandler {
    QuoteResponse addQuote(QuoteRequest quoteRequest);
    List<QuoteResponse> getAllQuotes();
    List<QuoteResponse> getQuotesByAuthor(String author);
    void deleteQuote(Long id);
}
