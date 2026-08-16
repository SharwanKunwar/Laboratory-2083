package com.unpredictableXshare.Quotemous.quoteplatform.service;

import com.unpredictableXshare.Quotemous.quoteplatform.model.Feeling;
import com.unpredictableXshare.Quotemous.quoteplatform.model.QuotePost;
import com.unpredictableXshare.Quotemous.quoteplatform.repository.QuoteRepository;
import com.unpredictableXshare.Quotemous.quoteplatform.repository.ReactionRepository;
import org.springframework.stereotype.Service;

import java.time.OffsetDateTime;
import java.time.ZoneOffset;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

@Service
public class QuoteService {

    private final QuoteRepository quoteRepo;
    private final ReactionRepository reactionRepo;

    // rate limiting: max 5 posts per 10 minutes per IP
    private final Map<String, List<Long>> postsByIp = new ConcurrentHashMap<>();
    private final Set<String> profanity = Set.of("badword1", "badword2", "spamword");

    public QuoteService(QuoteRepository quoteRepo, ReactionRepository reactionRepo) {
        this.quoteRepo = quoteRepo;
        this.reactionRepo = reactionRepo;
    }

    public QuotePost createQuote(QuotePost post, String ip) throws IllegalArgumentException {
        // Basic validation
        if (post.getContent() == null)
            throw new IllegalArgumentException("content required");
        String c = post.getContent().trim();
        if (c.length() < 3 || c.length() > 500)
            throw new IllegalArgumentException("content length invalid");

        // profanity check
        String lowered = c.toLowerCase();
        for (String p : profanity) {
            if (lowered.contains(p))
                throw new IllegalArgumentException("content contains forbidden words");
        }

        // rate limit
        long now = System.currentTimeMillis();
        List<Long> lst = postsByIp.computeIfAbsent(ip == null ? "" : ip,
                k -> Collections.synchronizedList(new ArrayList<>()));
        synchronized (lst) {
            long windowStart = now - (10 * 60 * 1000);
            lst.removeIf(ts -> ts < windowStart);
            if (lst.size() >= 5)
                throw new IllegalArgumentException("rate limit exceeded");
            lst.add(now);
        }

        if (post.getNickname() == null || post.getNickname().trim().isEmpty()) {
            post.setNickname("Anonymous");
        }

        // feeling validation
        if (post.getFeeling() == null) {
            throw new IllegalArgumentException("invalid feeling");
        }

        post.setCreatedAt(OffsetDateTime.now(ZoneOffset.UTC));
        return quoteRepo.save(post);
    }

    public List<QuotePost> getFeed(int page, int size, Optional<Feeling> feeling) {
        List<QuotePost> list = quoteRepo.findPage(page, size, feeling);
        // attach reaction counts
        return list.stream().map(q -> {
            Map<String, Integer> reactions = reactionRepo.getReactionsForQuote(q.getId());
            q.setReactions(reactions);
            return q;
        }).collect(Collectors.toList());
    }

    public Optional<QuotePost> findById(UUID id) {
        Optional<QuotePost> opt = quoteRepo.findById(id);
        opt.ifPresent(q -> q.setReactions(reactionRepo.getReactionsForQuote(q.getId())));
        return opt;
    }

    public void addReaction(UUID id, String type) {
        // basic validation of allowed reaction types
        Set<String> allowed = Set.of("LOVE", "RELATE", "INSPIRED", "SAD");
        if (!allowed.contains(type))
            throw new IllegalArgumentException("invalid reaction type");
        reactionRepo.incrementReaction(id, type);
    }
}
