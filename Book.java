// ============================================================
//  Book.java
//  Demonstrates: Class, Object, Constructor, Encapsulation
// ============================================================

public class Book {

    // ── Private fields (Encapsulation) ──────────────────────
    private int    bookId;
    private String title;
    private String author;
    private boolean available;   // true = on shelf, false = issued

    // ── Constructor ─────────────────────────────────────────
    public Book(int bookId, String title, String author) {
        this.bookId    = bookId;
        this.title     = title;
        this.author    = author;
        this.available = true;   // every new book starts as available
    }

    // ── Getters ─────────────────────────────────────────────
    public int     getBookId()    { return bookId;    }
    public String  getTitle()     { return title;     }
    public String  getAuthor()    { return author;    }
    public boolean isAvailable()  { return available; }

    // ── Setters ─────────────────────────────────────────────
    public void setAvailable(boolean available) {
        this.available = available;
    }

    // ── toString — used when printing a book ─────────────────
    @Override
    public String toString() {
        return String.format(
            "  ID: %-6d | Title: %-30s | Author: %-20s | Status: %s",
            bookId, title, author,
            available ? "Available" : "Issued"
        );
    }
}
