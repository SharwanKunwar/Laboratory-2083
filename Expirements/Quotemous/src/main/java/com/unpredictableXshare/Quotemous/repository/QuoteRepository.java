package com.unpredictableXshare.Quotemous.repository;

import com.unpredictableXshare.Quotemous.entity.Quote;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface QuoteRepository extends JpaRepository<Quote, UUID>
{

}
