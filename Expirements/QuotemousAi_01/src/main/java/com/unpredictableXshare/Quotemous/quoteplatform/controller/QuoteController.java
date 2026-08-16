package com.unpredictableXshare.Quotemous.quoteplatform.controller;

import com.unpredictableXshare.Quotemous.quoteplatform.model.Feeling;
import com.unpredictableXshare.Quotemous.quoteplatform.model.QuotePost;
import com.unpredictableXshare.Quotemous.quoteplatform.service.QuoteService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/quotes")
public class QuoteController {

    private final QuoteService service;

    public QuoteController(QuoteService service) {
        this.service = service;
    }

    static class CreateQuoteRequest {
        public String content;
        public String nickname;
        public String feeling;
    }

    @PostMapping
    public ResponseEntity<?> createQuote(@RequestBody CreateQuoteRequest req, HttpServletRequest request) {
        try {
            QuotePost p = new QuotePost();
            p.setContent(req.content);
            p.setNickname(req.nickname);
            p.setFeeling(Feeling.valueOf(req.feeling));
            String ip = request.getRemoteAddr();
            QuotePost saved = service.createQuote(p, ip);
            return ResponseEntity.ok(saved);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(500).body("server error");
        }
    }

    @GetMapping
    public ResponseEntity<List<QuotePost>> feed(@RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            @RequestParam(required = false) String feeling) {
        Optional<Feeling> f = Optional.empty();
        if (feeling != null) {
            try {
                f = Optional.of(Feeling.valueOf(feeling));
            } catch (Exception ignored) {
            }
        }
        return ResponseEntity.ok(service.getFeed(page, size, f));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getOne(@PathVariable String id) {
        try {
            UUID uuid = UUID.fromString(id);
            Optional<QuotePost> opt = service.findById(uuid);
            return opt.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("invalid id");
        }
    }

    static class ReactRequest {
        public String type;
    }

    @PostMapping("/{id}/react")
    public ResponseEntity<?> react(@PathVariable String id, @RequestBody ReactRequest req) {
        try {
            UUID uuid = UUID.fromString(id);
            service.addReaction(uuid, req.type);
            return ResponseEntity.ok().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(500).body("server error");
        }
    }
}
