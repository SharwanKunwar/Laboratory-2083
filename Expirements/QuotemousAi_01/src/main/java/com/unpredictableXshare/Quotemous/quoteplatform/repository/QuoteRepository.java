package com.unpredictableXshare.Quotemous.quoteplatform.repository;

import com.unpredictableXshare.Quotemous.quoteplatform.model.QuotePost;
import com.unpredictableXshare.Quotemous.quoteplatform.model.Feeling;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface QuoteRepository {
    QuotePost save(QuotePost post);

    List<QuotePost> findPage(int page, int size, Optional<Feeling> feeling);

    Optional<QuotePost> findById(UUID id);
}
