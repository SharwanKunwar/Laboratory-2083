package com.unpredictable.BookShop.service;

import com.unpredictable.BookShop.dto.BookRequestDTO;
import com.unpredictable.BookShop.dto.BookResponseDTO;
import com.unpredictable.BookShop.entity.BookEntity;
import com.unpredictable.BookShop.mapper.BookMapper;
import com.unpredictable.BookShop.repository.BookRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BookServiceIMP implements BookServiceHelper{

    private final BookRepository bookRepository;
    private final BookMapper bookMapper;


    @Override
    public BookResponseDTO addBook(BookRequestDTO request) {

        // is book already added
        if(bookRepository.existsByTitleAndAuthor(request.getTitle(), request.getAuthor()))
        {
            throw new RuntimeException("Book already exists");
        }

        BookEntity book = bookMapper.mapToEntity(request);
        BookEntity savedBook = bookRepository.save(book);
        return bookMapper.mapToResponse(savedBook);

    }

    @Override
    public List<BookResponseDTO> getAllBooks() {
        return bookRepository.findAll()
                .stream()
                .map(bookMapper::mapToResponse)
                .toList();
    }

    @Override
    public List<BookResponseDTO> getBooksByAuthor(String author) {
        List<BookEntity> books = bookRepository.findByAuthor(author);
        return books.stream()
                .map(bookMapper::mapToResponse)
                .toList();

    }

    @Override
    public void deleteBookById(Long id) {
        BookEntity book = bookRepository.findById(id).orElseThrow(()-> new RuntimeException("Book not found"));
        bookRepository.delete(book);
    }
}
