package com.unpredictable.Quotes.service;

import com.unpredictable.Quotes.model.Quote;
import com.unpredictable.Quotes.repository.QuoteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class QuoteServiceIMP implements QuoteService {

    private final QuoteRepository quoteRepository;

    @Override
    public Quote addQuote(Quote quote)
    {
        return quoteRepository.save(quote);
    }

    @Override
    public List<Quote> getAllQuotes()
    {
        return quoteRepository.findAll();
    }

    @Override
    public List<Quote> getQuoteByAuthor(String author) {
        return quoteRepository.findByAuthor(author);
    }
}
