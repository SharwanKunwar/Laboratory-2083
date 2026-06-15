package com.unpredictableXCode.Quote01.repository;

import com.unpredictableXCode.Quote01.entity.QuoteEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuoteRepository extends JpaRepository<QuoteEntity, Long> {

}
