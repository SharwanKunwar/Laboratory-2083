package com.unpredictableXCode.Quote01.controller;


import com.unpredictableXCode.Quote01.entity.QuoteEntity;
import com.unpredictableXCode.Quote01.service.QuoteService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/give")
@CrossOrigin(origins = "*")
public class QuoteController {

    private final QuoteService quoteService;

    //get
    @GetMapping
    public List<QuoteEntity> getQuotes() {
        return quoteService.getAllQuotes();
    }

    // post
    @PostMapping
    public QuoteEntity addQuote(@RequestBody QuoteEntity quoteEntity) {
        return quoteService.addQuote(quoteEntity);
    }


}
