package com.unpredictable.Library.controller;

import com.unpredictable.Library.dto.BookRequestDTO;
import com.unpredictable.Library.dto.BookResponseDTO;
import com.unpredictable.Library.service.BookServiceIMP;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/books")
public class BookController {

    private final BookServiceIMP bookService;

    @GetMapping
    public List<BookResponseDTO> getAllBooks() {
        return bookService.getAllBooks();
    }

    @PostMapping
    public BookResponseDTO createBook(@Valid @RequestBody BookRequestDTO request) {
        return bookService.addBook(request);
    }

    @GetMapping("/author/{author}")
    public List<BookResponseDTO> getBooksByAuthor(@PathVariable String author) {
        return bookService.getBooksByAuthor(author);
    }

    @DeleteMapping("/{id}")
    public void deleteBookById(@PathVariable Long id) {
        bookService.deleteBookById(id);
    }

}
