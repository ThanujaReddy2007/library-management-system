// ============================================================
//  Library.java
//  Demonstrates: ArrayList, Object interactions, Methods
// ============================================================

import java.util.ArrayList;

public class Library {

    // ── Data stores ──────────────────────────────────────────
    private ArrayList<Book>    books    = new ArrayList<>();
    private ArrayList<Student> students = new ArrayList<>();

    // ════════════════════════════════════════════════════════
    //  ADD BOOK
    // ════════════════════════════════════════════════════════
    public void addBook(Book book) {
        // Prevent duplicate book IDs
        for (Book b : books) {
            if (b.getBookId() == book.getBookId()) {
                System.out.println("  [!] Book ID " + book.getBookId()
                        + " already exists. Use a different ID.");
                return;
            }
        }
        books.add(book);
        System.out.println("  [✓] Book \"" + book.getTitle()
                + "\" added successfully!");
    }

    // ════════════════════════════════════════════════════════
    //  ADD STUDENT
    // ════════════════════════════════════════════════════════
    public void addStudent(Student student) {
        for (Student s : students) {
            if (s.getStudentId() == student.getStudentId()) {
                System.out.println("  [!] Student ID " + student.getStudentId()
                        + " already exists.");
                return;
            }
        }
        students.add(student);
        System.out.println("  [✓] Student \"" + student.getName()
                + "\" registered successfully!");
    }

    // ════════════════════════════════════════════════════════
    //  DISPLAY ALL BOOKS
    // ════════════════════════════════════════════════════════
    public void displayBooks() {
        if (books.isEmpty()) {
            System.out.println("  [!] No books in library yet.");
            return;
        }
        System.out.println("\n  ── Book List (" + books.size() + " total) ──");
        for (Book b : books) {
            System.out.println(b);
        }
    }

    // ════════════════════════════════════════════════════════
    //  DISPLAY ALL STUDENTS
    // ════════════════════════════════════════════════════════
    public void displayStudents() {
        if (students.isEmpty()) {
            System.out.println("  [!] No students registered yet.");
            return;
        }
        System.out.println("\n  ── Student List (" + students.size() + " total) ──");
        for (Student s : students) {
            System.out.println(s);
        }
    }

    // ════════════════════════════════════════════════════════
    //  SEARCH BOOK  (by title — case-insensitive)
    // ════════════════════════════════════════════════════════
    public void searchBook(String keyword) {
        boolean found = false;
        System.out.println("\n  ── Search Results for \"" + keyword + "\" ──");
        for (Book b : books) {
            if (b.getTitle().toLowerCase().contains(keyword.toLowerCase())
                    || b.getAuthor().toLowerCase().contains(keyword.toLowerCase())) {
                System.out.println(b);
                found = true;
            }
        }
        if (!found) {
            System.out.println("  [!] No matching book found.");
        }
    }

    // ════════════════════════════════════════════════════════
    //  ISSUE BOOK
    // ════════════════════════════════════════════════════════
    public void issueBook(int studentId, int bookId) {

        // 1. Find the student
        Student targetStudent = null;
        for (Student s : students) {
            if (s.getStudentId() == studentId) {
                targetStudent = s;
                break;
            }
        }
        if (targetStudent == null) {
            System.out.println("  [!] Student ID " + studentId + " not found.");
            return;
        }

        // 2. Check if student already has a book issued
        if (targetStudent.getIssuedBookId() != 0) {
            System.out.println("  [!] Student \"" + targetStudent.getName()
                    + "\" already has Book ID "
                    + targetStudent.getIssuedBookId() + " issued.");
            System.out.println("      Please return it before issuing a new one.");
            return;
        }

        // 3. Find the book
        Book targetBook = null;
        for (Book b : books) {
            if (b.getBookId() == bookId) {
                targetBook = b;
                break;
            }
        }
        if (targetBook == null) {
            System.out.println("  [!] Book ID " + bookId + " not found.");
            return;
        }

        // 4. Check availability
        if (!targetBook.isAvailable()) {
            System.out.println("  [!] Book \"" + targetBook.getTitle()
                    + "\" is currently not available.");
            return;
        }

        // 5. Issue
        targetBook.setAvailable(false);
        targetStudent.setIssuedBookId(bookId);
        System.out.println("  [✓] Book \"" + targetBook.getTitle()
                + "\" issued to \"" + targetStudent.getName() + "\" successfully!");
    }

    // ════════════════════════════════════════════════════════
    //  RETURN BOOK
    // ════════════════════════════════════════════════════════
    public void returnBook(int studentId, int bookId) {

        // 1. Find student
        Student targetStudent = null;
        for (Student s : students) {
            if (s.getStudentId() == studentId) {
                targetStudent = s;
                break;
            }
        }
        if (targetStudent == null) {
            System.out.println("  [!] Student ID " + studentId + " not found.");
            return;
        }

        // 2. Verify the student actually has this book
        if (targetStudent.getIssuedBookId() != bookId) {
            System.out.println("  [!] Student \"" + targetStudent.getName()
                    + "\" did not borrow Book ID " + bookId + ".");
            return;
        }

        // 3. Find the book
        Book targetBook = null;
        for (Book b : books) {
            if (b.getBookId() == bookId) {
                targetBook = b;
                break;
            }
        }
        if (targetBook == null) {
            System.out.println("  [!] Book ID " + bookId + " not found in records.");
            return;
        }

        // 4. Return
        targetBook.setAvailable(true);
        targetStudent.setIssuedBookId(0);
        System.out.println("  [✓] Book \"" + targetBook.getTitle()
                + "\" returned by \"" + targetStudent.getName() + "\" successfully!");
    }
}
