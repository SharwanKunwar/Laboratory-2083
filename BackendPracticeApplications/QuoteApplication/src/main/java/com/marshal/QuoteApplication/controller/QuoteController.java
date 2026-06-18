package com.marshal.QuoteApplication.controller;

import com.marshal.QuoteApplication.dto.QuoteRequest;
import com.marshal.QuoteApplication.dto.QuoteResponse;
import com.marshal.QuoteApplication.service.QuoteService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/quotes")
public class QuoteController {

    private final QuoteService quoteService;

    //get all
    @GetMapping
    public List<QuoteResponse> getAllQuotes() {
        return quoteService.getAllQuotes();
    }
    //post mapping for adding quote
    @PostMapping
    public QuoteResponse createQuote(@RequestBody QuoteRequest quoteRequest) {
        return quoteService.saveQuote(quoteRequest);
    }

    // get by author
    @GetMapping("/{author}")
    public List<QuoteResponse> getQuotesByAuthor(@PathVariable String author) {
        return quoteService.getQuotesByAuthor(author);
    }
}