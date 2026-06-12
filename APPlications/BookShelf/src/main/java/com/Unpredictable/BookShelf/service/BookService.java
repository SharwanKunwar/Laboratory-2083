package com.Unpredictable.BookShelf.service;

import com.Unpredictable.BookShelf.entity.Book;

import java.util.List;

public interface BookService {
    Book addBook(Book book);
    Book getBookById(Long id);
    List<Book> getAllBooks();
    Book getBookByIsAvailable(boolean isAvailable);
    void deleteBookById(Long id);
}
