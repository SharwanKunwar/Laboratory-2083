package com.unpredictable.Quotes.controller;

import com.unpredictable.Quotes.model.Quote;
import com.unpredictable.Quotes.service.QuoteService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/quotes")
@CrossOrigin(origins = "*")
public class QuoteController {

    private final QuoteService quoteService;


    // get quotes by author
    @GetMapping("/{author}")
    public List<Quote> getQuoteByAuthor(@PathVariable String author) {
        return quoteService.getQuoteByAuthor(author);
    }


    @PostMapping
    public Quote createQuote(@RequestBody Quote quote)
    {
        // add quotes
        return quoteService.addQuote(quote);
    }


    @GetMapping
    public List<Quote> getAllQuotes()
    {
        // get all quotes
        return quoteService.getAllQuotes();
    }
}
