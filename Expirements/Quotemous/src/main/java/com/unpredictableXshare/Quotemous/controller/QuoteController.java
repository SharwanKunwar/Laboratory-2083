package com.unpredictableXshare.Quotemous.controller;

import com.unpredictableXshare.Quotemous.entity.Quote;
import com.unpredictableXshare.Quotemous.service.QuoteServiceHandler;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@AllArgsConstructor
@RequestMapping("/api/quotes")
public class QuoteController
{
    private final QuoteServiceHandler quoteService;

    @PostMapping("/create")
    public ResponseEntity<Quote> createQuote(@RequestBody Quote quote) {
        return ResponseEntity.status(HttpStatus.CREATED).body(quoteService.createQuote(quote));
    }

    @GetMapping("/all")
    public ResponseEntity<List<Quote>> getAllQuotes()
    {
        return ResponseEntity.ok(quoteService.getAllQuotes());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Quote> getQuoteById(@PathVariable UUID id)
    {
        Quote quote = quoteService.getQuoteById(id);

        if(quote == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(quote);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Quote> updateQuote(@PathVariable UUID id, @RequestBody Quote quote)
    {
        Quote updatedQuote = quoteService.updateQuote(id, quote);
        if(updatedQuote == null){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(updatedQuote);
    }
}
