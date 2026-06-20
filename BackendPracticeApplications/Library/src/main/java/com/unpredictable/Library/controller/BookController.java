package com.unpredictable.Library.controller;

import com.unpredictable.Library.dto.BookRequestDTO;
import com.unpredictable.Library.dto.BookResponseDTO;
import com.unpredictable.Library.service.BookServiceIMP;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/books")
public class BookController {

    private final BookServiceIMP bookService;

    // Get
    @GetMapping
    public List<BookResponseDTO> getAllBooks() {
        return bookService.getAllBooks();
    }

    //Post
    @PostMapping
    public BookResponseDTO createBook(@RequestBody BookRequestDTO request) {
        return bookService.addBook(request);
    }

    //Find By Author
    @GetMapping("/{author}")
    public List<BookResponseDTO> getBooksByAuthor(@RequestParam String author) {
        return bookService.getBooksByAuthor(author);
    }

    //Delete
    @DeleteMapping("/{id}")
    void deleteBookById(Long id) {
        bookService.deleteBookById(id);
    }
}
