package com.unpredictableXshare.Quotemous.quoteplatform.repository.impl;

import com.unpredictableXshare.Quotemous.quoteplatform.repository.ReactionRepository;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Repository
public class ReactionRepositoryImpl implements ReactionRepository {

    private final JdbcTemplate jdbc;

    public ReactionRepositoryImpl(JdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }

    @Override
    public Map<String, Integer> getReactionsForQuote(UUID quoteId) {
        Map<String, Integer> map = new HashMap<>();
        jdbc.query("SELECT reaction_type, count FROM reactions WHERE quote_id = ?", new Object[] { quoteId.toString() },
                (ResultSet rs) -> {
                    while (rs.next()) {
                        map.put(rs.getString("reaction_type"), rs.getInt("count"));
                    }
                });
        return map;
    }

    @Override
    public void incrementReaction(UUID quoteId, String reactionType) {
        int updated = jdbc.update("UPDATE reactions SET count = count + 1 WHERE quote_id = ? AND reaction_type = ?",
                quoteId.toString(), reactionType);
        if (updated == 0) {
            jdbc.update("INSERT INTO reactions(quote_id, reaction_type, count) VALUES (?, ?, 1)", quoteId.toString(),
                    reactionType);
        }
    }
}
