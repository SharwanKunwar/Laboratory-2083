package com.unpredictableXshare.Quotemous.controller;

import com.unpredictableXshare.Quotemous.entity.Quote;
import com.unpredictableXshare.Quotemous.service.QuoteServiceHandler;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/api/quotes")
public class QuoteController
{
    private final QuoteServiceHandler quoteService;

    @PostMapping("/create")
    //save quote into database via spring data jpa
    public ResponseEntity<Quote> createQuote(@RequestBody Quote quote) {
        return ResponseEntity.status(HttpStatus.CREATED).body(quoteService.createQuote(quote));
    }

    @GetMapping("/all")
    //Get all quotes from the database via spring data jpa
    public ResponseEntity<List<Quote>> getAllQuotes()
    {
        return ResponseEntity.ok(quoteService.getAllQuotes());
    }
}
