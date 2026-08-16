package com.unpredictableXshare.Quotemous.quoteplatform.repository;

import java.util.Map;
import java.util.UUID;

public interface ReactionRepository {
    Map<String, Integer> getReactionsForQuote(UUID quoteId);

    void incrementReaction(UUID quoteId, String reactionType);
}
