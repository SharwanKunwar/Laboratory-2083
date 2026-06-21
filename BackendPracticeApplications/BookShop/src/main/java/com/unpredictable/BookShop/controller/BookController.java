package com.unpredictable.BookShop.controller;

import com.unpredictable.BookShop.dto.BookRequestDTO;
import com.unpredictable.BookShop.dto.BookResponseDTO;
import com.unpredictable.BookShop.service.BookServiceHelper;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookShop")
@RequiredArgsConstructor
public class BookController {

    private final BookServiceHelper bookService;

    //Add book to the bookShop
    @PostMapping
    public BookResponseDTO createBook(@Valid @RequestBody BookRequestDTO request) {
        return bookService.addBook(request);
    }

    //Get all books from the bookShop
    @GetMapping
    public List<BookResponseDTO> getAllBooks() {
        return bookService.getAllBooks();
    }

    //Get book by author
    @GetMapping("/author/{author}")
    public List<BookResponseDTO> getBooksByAuthor(@PathVariable String author) {
        return bookService.getBooksByAuthor(author);
    }

    //Delete book by id
    @DeleteMapping("/{id}")
    public void deleteBookById(@PathVariable Long id) {
        bookService.deleteBookById(id);
    }



}
