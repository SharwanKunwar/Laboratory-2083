package com.marshal.QuoteApplication.service;

import com.marshal.QuoteApplication.dto.QuoteRequest;
import com.marshal.QuoteApplication.dto.QuoteResponse;
import com.marshal.QuoteApplication.entity.EQuote;
import com.marshal.QuoteApplication.repository.QuoteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
public class QuoteService implements QuoteServiceHandler{

    private final QuoteRepository quoteRepository;

    //Entity to Response
    private QuoteResponse mapToResponse(EQuote quote) {
        return QuoteResponse.builder()
                .id(quote.getId())
                .quote(quote.getQuote())
                .author(quote.getAuthor())
                .build();
    }

    //Request -> Entity
    private EQuote mapToEntity(QuoteRequest quoteRequest) {
        EQuote quote = new EQuote();
        quote.setQuote(quoteRequest.getQuote());
        quote.setAuthor(quoteRequest.getAuthor());
        return quote;
    }

    @Override
    public QuoteResponse addQuote(QuoteRequest quoteRequest) {
        EQuote saved = quoteRepository.save(mapToEntity(quoteRequest));
        return mapToResponse(saved);
    }

    @Override
    public List<QuoteResponse> getAllQuotes() {
        return quoteRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public List<QuoteResponse> getQuotesByAuthor(String author) {
        return quoteRepository.findQuoteByAuthor(author)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public void deleteQuote(Long id) {
        if(!quoteRepository.existsById(id)){
            throw new RuntimeException("Quote not found with id : "+id);
        }
        quoteRepository.deleteById(id);
    }
}
