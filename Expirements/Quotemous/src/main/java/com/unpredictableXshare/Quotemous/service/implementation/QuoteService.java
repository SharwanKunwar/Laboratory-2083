package com.unpredictableXshare.Quotemous.service.implementation;

import com.unpredictableXshare.Quotemous.entity.Quote;
import com.unpredictableXshare.Quotemous.repository.QuoteRepository;
import com.unpredictableXshare.Quotemous.service.QuoteServiceHandler;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

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

    @Override
    public Quote getQuoteById(UUID id) {
        return  quoteRepository.findById(id).orElse(null);
    }

    @Override
    public Quote updateQuote(UUID id, Quote quote)
    {
        Quote oldQuote = quoteRepository.findById(id).orElse(null);

        if(oldQuote == null) return null;

        oldQuote.setQuote(quote.getQuote());
        oldQuote.setNickName(quote.getNickName());
        oldQuote.setCategory(quote.getCategory());

        return quoteRepository.save(oldQuote);
    }

    @Override
    public boolean deleteQuote(UUID id)
    {
        Quote quote = quoteRepository.findById(id).orElse(null);
        if (quote == null) return false;
        quoteRepository.delete(quote);
        return true;
    }
}
