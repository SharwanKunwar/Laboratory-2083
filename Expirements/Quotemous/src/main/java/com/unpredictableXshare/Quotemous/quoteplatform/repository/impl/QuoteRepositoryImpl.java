package com.unpredictableXshare.Quotemous.quoteplatform.repository.impl;

import com.unpredictableXshare.Quotemous.quoteplatform.model.Feeling;
import com.unpredictableXshare.Quotemous.quoteplatform.model.QuotePost;
import com.unpredictableXshare.Quotemous.quoteplatform.repository.QuoteRepository;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.OffsetDateTime;
import java.util.*;

@Repository
public class QuoteRepositoryImpl implements QuoteRepository {

    private final JdbcTemplate jdbc;

    public QuoteRepositoryImpl(JdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }

    @Override
    public QuotePost save(QuotePost post) {
        UUID id = UUID.randomUUID();
        OffsetDateTime now = OffsetDateTime.now();
        jdbc.update("INSERT INTO quote_posts(id, content, nickname, feeling, created_at) VALUES (?,?,?,?,?)",
                id, post.getContent(), post.getNickname(), post.getFeeling().name(), now);
        post.setId(id);
        post.setCreatedAt(now);
        return post;
    }

    @Override
    public List<QuotePost> findPage(int page, int size, Optional<Feeling> feeling) {
        int offset = page * size;
        String sql = "SELECT q.id, q.content, q.nickname, q.feeling, q.created_at FROM quote_posts q";
        List<Object> params = new ArrayList<>();
        if (feeling.isPresent()) {
            sql += " WHERE q.feeling = ?";
            params.add(feeling.get().name());
        }
        sql += " ORDER BY q.created_at DESC LIMIT ? OFFSET ?";
        params.add(size);
        params.add(offset);

        return jdbc.query(sql, params.toArray(), new RowMapper<QuotePost>() {
            @Override
            public QuotePost mapRow(ResultSet rs, int rowNum) throws SQLException {
                QuotePost p = new QuotePost();
                p.setId(UUID.fromString(rs.getString("id")));
                p.setContent(rs.getString("content"));
                p.setNickname(rs.getString("nickname"));
                p.setFeeling(Feeling.valueOf(rs.getString("feeling")));
                p.setCreatedAt(rs.getObject("created_at", OffsetDateTime.class));
                return p;
            }
        });
    }

    @Override
    public Optional<QuotePost> findById(UUID id) {
        try {
            QuotePost p = jdbc.queryForObject(
                    "SELECT id,content,nickname,feeling,created_at FROM quote_posts WHERE id = ?",
                    new Object[] { id }, (rs, rowNum) -> {
                        QuotePost q = new QuotePost();
                        q.setId(UUID.fromString(rs.getString("id")));
                        q.setContent(rs.getString("content"));
                        q.setNickname(rs.getString("nickname"));
                        q.setFeeling(Feeling.valueOf(rs.getString("feeling")));
                        q.setCreatedAt(rs.getObject("created_at", OffsetDateTime.class));
                        return q;
                    });
            return Optional.ofNullable(p);
        } catch (Exception e) {
            return Optional.empty();
        }
    }
}
