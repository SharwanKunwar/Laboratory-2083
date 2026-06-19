package com.marshal.QuoteApplication.controller;

import com.marshal.QuoteApplication.dto.QuoteRequest;
import com.marshal.QuoteApplication.dto.QuoteResponse;
import com.marshal.QuoteApplication.service.QuoteService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/line")
@RequiredArgsConstructor
public class QuoteController {

    private final QuoteService quoteService;

    // get
    @GetMapping
    public List<QuoteResponse> getAllQuotes() {
        return quoteService.getAllQuotes();
    }

    @PostMapping
    public QuoteResponse addQuote(@RequestBody QuoteRequest quoteRequest) {
        return quoteService.addQuote(quoteRequest);
    }

    @GetMapping("/{author}")
    public List<QuoteResponse> getAllQuotesByAuthor(@PathVariable String author) {
        return quoteService.getQuotesByAuthor(author);
    }

    @DeleteMapping
    public void deleteQuote(@PathVariable Long id){
        quoteService.deleteQuote(id);
    }
}
