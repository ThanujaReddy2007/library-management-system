// ============================================================
//  Main.java
//  Demonstrates: Menu-driven program, Scanner, Exception handling
// ============================================================

import java.util.Scanner;

public class Main {

    // ── Shared Scanner (one instance throughout the program) ─
    static Scanner sc = new Scanner(System.in);

    // ════════════════════════════════════════════════════════
    //  MAIN METHOD
    // ════════════════════════════════════════════════════════
    public static void main(String[] args) {

        Library library = new Library();
        int choice;

        System.out.println("\n  Welcome to the Library Management System!");

        // ── Menu Loop ────────────────────────────────────────
        do {
            printMenu();
            choice = readInt("  Enter your choice: ");

            switch (choice) {
                case 1 -> addBook(library);
                case 2 -> library.displayBooks();
                case 3 -> searchBook(library);
                case 4 -> addStudent(library);
                case 5 -> issueBook(library);
                case 6 -> returnBook(library);
                case 7 -> library.displayStudents();
                case 8 -> System.out.println("\n  Goodbye! 👋\n");
                default -> System.out.println("  [!] Invalid choice. Please enter 1-8.");
            }

        } while (choice != 8);

        sc.close();
    }

    // ════════════════════════════════════════════════════════
    //  MENU PRINTER
    // ════════════════════════════════════════════════════════
    static void printMenu() {
        System.out.println();
        System.out.println("  ================================");
        System.out.println("     LIBRARY MANAGEMENT SYSTEM   ");
        System.out.println("  ================================");
        System.out.println("  1. Add Book");
        System.out.println("  2. View All Books");
        System.out.println("  3. Search Book");
        System.out.println("  4. Add Student");
        System.out.println("  5. Issue Book");
        System.out.println("  6. Return Book");
        System.out.println("  7. View All Students");
        System.out.println("  8. Exit");
        System.out.println("  ================================");
    }

    // ════════════════════════════════════════════════════════
    //  MENU ACTIONS — delegates to Library methods
    // ════════════════════════════════════════════════════════

    // ── 1. Add Book ──────────────────────────────────────────
    static void addBook(Library library) {
        System.out.println("\n  ── Add New Book ──");
        int    id     = readInt("  Enter Book ID   : ");
        String title  = readString("  Enter Title     : ");
        String author = readString("  Enter Author    : ");
        library.addBook(new Book(id, title, author));
    }

    // ── 3. Search Book ───────────────────────────────────────
    static void searchBook(Library library) {
        System.out.println("\n  ── Search Book ──");
        String keyword = readString("  Enter title/author keyword: ");
        library.searchBook(keyword);
    }

    // ── 4. Add Student ───────────────────────────────────────
    static void addStudent(Library library) {
        System.out.println("\n  ── Register New Student ──");
        int    id   = readInt("  Enter Student ID  : ");
        String name = readString("  Enter Student Name: ");
        library.addStudent(new Student(id, name));
    }

    // ── 5. Issue Book ────────────────────────────────────────
    static void issueBook(Library library) {
        System.out.println("\n  ── Issue Book ──");
        int sid = readInt("  Enter Student ID: ");
        int bid = readInt("  Enter Book ID   : ");
        library.issueBook(sid, bid);
    }

    // ── 6. Return Book ───────────────────────────────────────
    static void returnBook(Library library) {
        System.out.println("\n  ── Return Book ──");
        int sid = readInt("  Enter Student ID: ");
        int bid = readInt("  Enter Book ID   : ");
        library.returnBook(sid, bid);
    }

    // ════════════════════════════════════════════════════════
    //  UTILITY HELPERS
    // ════════════════════════════════════════════════════════

    /** Read an integer safely — re-prompts on bad input (Exception Handling). */
    static int readInt(String prompt) {
        while (true) {
            System.out.print(prompt);
            try {
                return Integer.parseInt(sc.nextLine().trim());
            } catch (NumberFormatException e) {
                System.out.println("  [!] Please enter a valid number.");
            }
        }
    }

    /** Read a non-empty string. */
    static String readString(String prompt) {
        String input;
        do {
            System.out.print(prompt);
            input = sc.nextLine().trim();
            if (input.isEmpty()) {
                System.out.println("  [!] Input cannot be empty.");
            }
        } while (input.isEmpty());
        return input;
    }
}
