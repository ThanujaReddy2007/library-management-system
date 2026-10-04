# 📚 Library Management System

A **Java OOP mini project** + **Web version** for managing books and students in a library.

## 🗂️ Project Structure

```
LibraryManagementSystem/
│
├── Book.java           # Book class (Encapsulation, Constructor)
├── Student.java        # Student class (Encapsulation, Constructor)
├── Library.java        # Core logic (ArrayList, Methods)
├── Main.java           # Menu-driven entry point (Scanner, Exception Handling)
│
└── web/
    ├── index.html      # Web version UI
    ├── style.css       # Premium dark theme
    └── app.js          # JavaScript logic (mirrors Java OOP)
```

## ✨ Features

- ➕ Add Books & Students
- 📖 View all books with **Available / Issued** status
- 🔍 Search books by title or author
- 📤 Issue a book to a student
- 📥 Return a book
- 🌐 Full web version with premium dark UI

## 🧠 OOP Concepts Demonstrated

| Concept | Usage |
|---|---|
| **Class & Object** | `Book`, `Student`, `Library` |
| **Constructor** | Initialize book/student with data |
| **Encapsulation** | Private fields + Getters/Setters |
| **Abstraction** | `Library` hides ArrayList logic |
| **ArrayList** | Stores all books and students |
| **Exception Handling** | `NumberFormatException` in `Main.java` |

## 🚀 How to Run (Java Console Version)

```bash
# Compile
javac *.java

# Run
java Main
```

## 🌐 How to Open (Web Version)

Just open `web/index.html` in any browser — no server needed!

## 🖥️ Tech Stack

- **Java** — OOP Console Application
- **HTML + CSS + JavaScript** — Web Application
- No database, no frameworks, no dependencies
