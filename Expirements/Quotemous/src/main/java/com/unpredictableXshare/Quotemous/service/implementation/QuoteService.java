package com.unpredictableXshare.Quotemous.service.implementation;

import com.unpredictableXshare.Quotemous.entity.Quote;
import com.unpredictableXshare.Quotemous.repository.QuoteRepository;
import com.unpredictableXshare.Quotemous.service.QuoteServiceHandler;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class QuoteService implements QuoteServiceHandler
{
    private final QuoteRepository quoteRepository;

    @Override
    public Quote createQuote(Quote quote) {
        return quoteRepository.save(quote);
    }

    @Override
    public List<Quote> getAllQuotes() {
        return quoteRepository.findAll();
    }
}
