package com.marshal.QuoteApplication.service;

import com.marshal.QuoteApplication.dto.QuoteRequest;
import com.marshal.QuoteApplication.dto.QuoteResponse;
import com.marshal.QuoteApplication.entity.Quote;
import com.marshal.QuoteApplication.repository.QuoteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class QuoteServiceIMP implements QuoteService{

    private final QuoteRepository quoteRepository;


    // Entity -> Response
    private QuoteResponse mapToResponse(Quote quote){
        return QuoteResponse.builder()
                .id(quote.getId())
                .quote(quote.getQuote())
                .author(quote.getAuthor())
                .build();
    }

    // Request -> Entity
    private Quote mapToEntity(QuoteRequest request){
        Quote quote = new Quote();
        quote.setQuote(request.getQuote());
        quote.setAuthor(request.getAuthor());
        return quote;
    }


    @Override
    public QuoteResponse saveQuote(QuoteRequest request) {
        Quote saved = quoteRepository.save(mapToEntity(request));
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
        return quoteRepository.findByAuthor(author)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public void deleteQuote(Long id) {
        if(!quoteRepository.existsById(id)){
            throw new RuntimeException("Quote note found with id " + id);
        }
        quoteRepository.deleteById(id);
    }
}
