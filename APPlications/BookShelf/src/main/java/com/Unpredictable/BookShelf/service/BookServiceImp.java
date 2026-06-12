package com.Unpredictable.BookShelf.service;


import com.Unpredictable.BookShelf.entity.Book;
import com.Unpredictable.BookShelf.repository.BookRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BookServiceImp implements BookService {

    private final BookRepository repository;

    @Override
    public Book addBook(Book book) {
        return repository.save(book);
    }


    @Override
    public Book getBookById(Long id) {
        return repository.findById(id).orElseThrow();
    }

    @Override
    public List<Book> getAllBooks() {
        return repository.findAll();
    }

    @Override
    public Book getBookByIsAvailable(boolean isAvailable) {
        return repository.findByIsAvailable(isAvailable);
    }

    @Override
    public void deleteBookById(Long id) {
        repository.deleteById(id);
    }
}
