// ============================================================
//  Student.java
//  Demonstrates: Class, Object, Constructor, Encapsulation
// ============================================================

public class Student {

    // ── Private fields (Encapsulation) ──────────────────────
    private int    studentId;
    private String name;
    private int    issuedBookId;   // 0 = no book currently issued

    // ── Constructor ─────────────────────────────────────────
    public Student(int studentId, String name) {
        this.studentId    = studentId;
        this.name         = name;
        this.issuedBookId = 0;
    }

    // ── Getters ─────────────────────────────────────────────
    public int    getStudentId()    { return studentId;    }
    public String getName()         { return name;         }
    public int    getIssuedBookId() { return issuedBookId; }

    // ── Setters ─────────────────────────────────────────────
    public void setIssuedBookId(int issuedBookId) {
        this.issuedBookId = issuedBookId;
    }

    // ── toString ─────────────────────────────────────────────
    @Override
    public String toString() {
        String bookInfo = (issuedBookId == 0)
                ? "None"
                : "Book ID " + issuedBookId;

        return String.format(
            "  ID: %-6d | Name: %-25s | Issued Book: %s",
            studentId, name, bookInfo
        );
    }
}
