package com.unpredictable.BookShop.mapper;

import com.unpredictable.BookShop.dto.BookRequestDTO;
import com.unpredictable.BookShop.dto.BookResponseDTO;
import com.unpredictable.BookShop.entity.BookEntity;
import org.springframework.stereotype.Component;

@Component
public class BookMapper {

    // toEntity
    public BookEntity mapToEntity(BookRequestDTO request) {
        BookEntity book = new BookEntity();
        book.setTitle(request.getTitle());
        book.setDescription(request.getDescription());
        book.setAuthor(request.getAuthor());
        book.setPrice(request.getPrice());
        return book;
    }

    // toResponse
    public BookResponseDTO mapToResponse(BookEntity book) {
        return BookResponseDTO.builder()
                .id(book.getId())
                .title(book.getTitle())
                .description(book.getDescription())
                .author(book.getAuthor())
                .price(book.getPrice())
                .build();
    }
}
