package com.unpredictableXCode.Quote01.service;

import com.unpredictableXCode.Quote01.entity.QuoteEntity;
import com.unpredictableXCode.Quote01.repository.QuoteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Service
@RequiredArgsConstructor
public class QuoteService implements QuoteServiceHelper {

    private final QuoteRepository quoteRepository;


    @Override
    public QuoteEntity addQuote(QuoteEntity quoteEntity) {
        return quoteRepository.save(quoteEntity);
    }

    @Override
    public List<QuoteEntity> getAllQuotes() {
        return quoteRepository.findAll();
    }

    @Override
    public QuoteEntity getQuoteByAuthor(String author) {
        return null;
    }
}
