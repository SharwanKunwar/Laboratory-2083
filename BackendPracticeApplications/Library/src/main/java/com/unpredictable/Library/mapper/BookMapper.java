package com.unpredictable.Library.mapper;

import com.unpredictable.Library.dto.BookRequestDTO;
import com.unpredictable.Library.dto.BookResponseDTO;
import com.unpredictable.Library.entity.Book;
import org.springframework.stereotype.Component;

@Component
public class BookMapper {

    //Request to Entity
    public Book mapToEntity(BookRequestDTO request) {
        Book book = new Book();
        book.setTitle(request.getTitle());
        book.setDescription(request.getDescription());
        book.setAuthor(request.getAuthor());
        book.setPrice(request.getPrice());
        return book;
    }


    //Entity to Response
    public BookResponseDTO mapToResponse(Book book) {
        return BookResponseDTO.builder()
                .id(book.getId())
                .title(book.getTitle())
                .description(book.getDescription())
                .author(book.getAuthor())
                .price(book.getPrice())
                .build();
    }

}
