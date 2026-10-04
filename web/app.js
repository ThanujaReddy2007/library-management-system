// ═══════════════════════════════════════════════════
//  app.js — Library Management System (Web Version)
//  OOP concepts mirrored from Java version:
//    - Book  → book objects
//    - Student → student objects
//    - Library → books[] / students[] arrays + methods
// ═══════════════════════════════════════════════════

// ── Data Store (mirrors Java ArrayList) ─────────────
let books    = [];   // Array<Book>
let students = [];   // Array<Student>

// ── Book "constructor" (mirrors Java Book class) ─────
function createBook(id, title, author) {
  return { id: parseInt(id), title, author, available: true };
}

// ── Student "constructor" ────────────────────────────
function createStudent(id, name) {
  return { id: parseInt(id), name, issuedBookId: 0 };
}

// ── Book emojis (visual variety) ─────────────────────
const BOOK_EMOJIS = ['📗','📘','📕','📙','📒','📓'];
function bookEmoji(id) { return BOOK_EMOJIS[id % BOOK_EMOJIS.length]; }

// ── Get initials for avatar ───────────────────────────
function initials(name) {
  return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
}

// ═══════════════════════════════════════════════════
//  NAVIGATION
// ═══════════════════════════════════════════════════
function showPage(page) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));

  document.getElementById(`page-${page}`).classList.add('active');
  document.getElementById(`nav-${page}`).classList.add('active');
  document.getElementById('topbar-title').textContent =
    { dashboard: 'Dashboard', books: 'Books', students: 'Students',
      issue: 'Issue Book', return: 'Return Book' }[page];

  if (page === 'dashboard') renderDashboard();
  if (page === 'books')     renderBooks();
  if (page === 'students')  renderStudents();
  if (page === 'issue')     { renderIssuedList(); populateIssueDropdowns(); }
  if (page === 'return')    { populateReturnDropdowns(); }

  document.getElementById('global-search').value = '';
}

// ═══════════════════════════════════════════════════
//  TOAST
// ═══════════════════════════════════════════════════
let toastTimer;
function showToast(msg, type = 'info') {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.className = `toast show ${type}`;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { t.classList.remove('show'); }, 3000);
}

// ═══════════════════════════════════════════════════
//  MODAL HELPERS
// ═══════════════════════════════════════════════════
function openModal(id) {
  document.getElementById(id).classList.add('open');
}
function closeModal(id) {
  document.getElementById(id).classList.remove('open');
  // clear inputs
  document.getElementById(id).querySelectorAll('input').forEach(i => i.value = '');
}
function closeModalOnOverlay(e, id) {
  if (e.target === document.getElementById(id)) closeModal(id);
}

// ═══════════════════════════════════════════════════
//  BADGE UPDATER
// ═══════════════════════════════════════════════════
function updateBadges() {
  document.getElementById('badge-books').textContent    = `📚 ${books.length} Books`;
  document.getElementById('badge-students').textContent = `🎓 ${students.length} Students`;
}

// ═══════════════════════════════════════════════════
//  1. ADD BOOK  (mirrors Library.addBook())
// ═══════════════════════════════════════════════════
function addBook() {
  const id     = document.getElementById('book-id').value.trim();
  const title  = document.getElementById('book-title').value.trim();
  const author = document.getElementById('book-author').value.trim();

  if (!id || !title || !author) { showToast('⚠️ All fields are required.', 'error'); return; }
  if (isNaN(id) || parseInt(id) <= 0) { showToast('⚠️ Book ID must be a positive number.', 'error'); return; }

  // Duplicate check
  if (books.find(b => b.id === parseInt(id))) {
    showToast(`❌ Book ID ${id} already exists.`, 'error'); return;
  }

  books.push(createBook(id, title, author));
  closeModal('modal-add-book');
  updateBadges();
  renderBooks();
  showToast(`✅ "${title}" added successfully!`, 'success');
}

// ═══════════════════════════════════════════════════
//  2. ADD STUDENT  (mirrors Library.addStudent())
// ═══════════════════════════════════════════════════
function addStudent() {
  const id   = document.getElementById('student-id').value.trim();
  const name = document.getElementById('student-name').value.trim();

  if (!id || !name) { showToast('⚠️ All fields are required.', 'error'); return; }
  if (isNaN(id) || parseInt(id) <= 0) { showToast('⚠️ Student ID must be a positive number.', 'error'); return; }

  if (students.find(s => s.id === parseInt(id))) {
    showToast(`❌ Student ID ${id} already exists.`, 'error'); return;
  }

  students.push(createStudent(id, name));
  closeModal('modal-add-student');
  updateBadges();
  renderStudents();
  showToast(`✅ "${name}" registered successfully!`, 'success');
}

// ═══════════════════════════════════════════════════
//  3. ISSUE BOOK  (mirrors Library.issueBook())
// ═══════════════════════════════════════════════════
function issueBook() {
  const sid = parseInt(document.getElementById('issue-student').value);
  const bid = parseInt(document.getElementById('issue-book').value);

  if (!sid) { showToast('⚠️ Please select a student.', 'error'); return; }
  if (!bid) { showToast('⚠️ Please select a book.', 'error'); return; }

  const student = students.find(s => s.id === sid);
  const book    = books.find(b => b.id === bid);

  if (!student) { showToast('❌ Student not found.', 'error'); return; }
  if (!book)    { showToast('❌ Book not found.', 'error'); return; }

  if (student.issuedBookId !== 0) {
    const issuedBook = books.find(b => b.id === student.issuedBookId);
    showToast(`❌ ${student.name} already has "${issuedBook?.title}" issued.`, 'error');
    return;
  }
  if (!book.available) {
    showToast(`❌ "${book.title}" is already issued to someone else.`, 'error');
    return;
  }

  book.available = false;
  student.issuedBookId = bid;

  populateIssueDropdowns();
  renderIssuedList();
  showToast(`📤 "${book.title}" issued to ${student.name}!`, 'success');
  // reset selects
  document.getElementById('issue-student').value = '';
  document.getElementById('issue-book').value = '';
}

// ═══════════════════════════════════════════════════
//  4. RETURN BOOK  (mirrors Library.returnBook())
// ═══════════════════════════════════════════════════
function returnBook() {
  const sid = parseInt(document.getElementById('return-student').value);
  const bid = parseInt(document.getElementById('return-book').value);

  if (!sid) { showToast('⚠️ Please select a student.', 'error'); return; }
  if (!bid) { showToast('⚠️ This student has no issued book.', 'error'); return; }

  const student = students.find(s => s.id === sid);
  const book    = books.find(b => b.id === bid);

  if (!student || !book) { showToast('❌ Record not found.', 'error'); return; }

  book.available = true;
  student.issuedBookId = 0;

  populateReturnDropdowns();
  showToast(`📥 "${book.title}" returned by ${student.name}!`, 'success');
  document.getElementById('return-student').value = '';
  document.getElementById('return-book').value = '';
}

// ═══════════════════════════════════════════════════
//  RENDER FUNCTIONS
// ═══════════════════════════════════════════════════

let currentFilter = 'all';

function filterBooks(filter) {
  currentFilter = filter;
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  document.getElementById(`filter-${filter}`).classList.add('active');
  renderBooks();
}

function renderBooks(list = null) {
  const grid = document.getElementById('book-grid');
  let displayBooks = list ?? books;

  if (currentFilter === 'available') displayBooks = displayBooks.filter(b => b.available);
  if (currentFilter === 'issued')    displayBooks = displayBooks.filter(b => !b.available);

  if (displayBooks.length === 0) {
    grid.innerHTML = `<div class="empty-state">No books found.</div>`;
    return;
  }
  grid.innerHTML = displayBooks.map(b => `
    <div class="book-card">
      <div class="book-card-emoji">${bookEmoji(b.id)}</div>
      <div class="book-card-id">ID: ${b.id}</div>
      <div class="book-card-title">${b.title}</div>
      <div class="book-card-author">by ${b.author}</div>
      <div class="book-card-footer">
        <span class="status-badge ${b.available ? 'available' : 'issued'}">
          ${b.available ? '✓ Available' : '✗ Issued'}
        </span>
      </div>
    </div>
  `).join('');
}

function renderStudents() {
  const list = document.getElementById('student-list');
  if (students.length === 0) {
    list.innerHTML = `<div class="empty-state">No students registered yet.</div>`;
    return;
  }
  list.innerHTML = students.map(s => {
    const issuedBook = s.issuedBookId ? books.find(b => b.id === s.issuedBookId) : null;
    return `
      <div class="student-card">
        <div class="student-avatar">${initials(s.name)}</div>
        <div class="student-info">
          <div class="student-name">${s.name}</div>
          <div class="student-id">ID: ${s.id}</div>
          <div class="student-book">${issuedBook
            ? `📤 Issued: <strong>${issuedBook.title}</strong>`
            : '✅ No book issued'}</div>
        </div>
        ${issuedBook
          ? `<span class="status-badge issued">Has Book</span>`
          : `<span class="status-badge available">Free</span>`}
      </div>
    `;
  }).join('');
}

function renderDashboard() {
  const available = books.filter(b => b.available).length;
  const issued    = books.filter(b => !b.available).length;

  document.getElementById('dash-total-books').textContent    = books.length;
  document.getElementById('dash-total-students').textContent = students.length;
  document.getElementById('dash-available').textContent      = available;
  document.getElementById('dash-issued').textContent         = issued;

  const recentEl = document.getElementById('dash-recent-books');
  const recent = [...books].reverse().slice(0, 4);
  if (recent.length === 0) {
    recentEl.innerHTML = `<div class="empty-state">No books yet. <button class="link-btn" onclick="showPage('books')">Add your first book →</button></div>`;
    return;
  }
  recentEl.innerHTML = recent.map(b => `
    <div class="book-card">
      <div class="book-card-emoji">${bookEmoji(b.id)}</div>
      <div class="book-card-id">ID: ${b.id}</div>
      <div class="book-card-title">${b.title}</div>
      <div class="book-card-author">by ${b.author}</div>
      <div class="book-card-footer">
        <span class="status-badge ${b.available ? 'available' : 'issued'}">
          ${b.available ? '✓ Available' : '✗ Issued'}
        </span>
      </div>
    </div>
  `).join('');
}

function renderIssuedList() {
  const el = document.getElementById('issued-list');
  const issuedStudents = students.filter(s => s.issuedBookId !== 0);
  if (issuedStudents.length === 0) {
    el.innerHTML = `<div class="empty-state">No books currently issued.</div>`;
    return;
  }
  el.innerHTML = issuedStudents.map(s => {
    const book = books.find(b => b.id === s.issuedBookId);
    return `
      <div class="issued-card">
        <div class="issued-info">
          <div><strong>${s.name}</strong> <span>(ID: ${s.id})</span></div>
          <div><span>📖 ${book?.title ?? 'Unknown'} — ${book?.author ?? ''}</span></div>
        </div>
        <span class="status-badge issued">Issued</span>
      </div>
    `;
  }).join('');
}

// ── Populate dropdowns ────────────────────────────────
function populateIssueDropdowns() {
  const sSelect = document.getElementById('issue-student');
  const bSelect = document.getElementById('issue-book');
  const sFree   = students.filter(s => s.issuedBookId === 0);
  const bAvail  = books.filter(b => b.available);

  sSelect.innerHTML = `<option value="">— Select Student —</option>` +
    sFree.map(s => `<option value="${s.id}">${s.name} (ID: ${s.id})</option>`).join('');

  bSelect.innerHTML = `<option value="">— Select Book —</option>` +
    bAvail.map(b => `<option value="${b.id}">${b.title} (ID: ${b.id})</option>`).join('');
}

function populateReturnDropdowns() {
  const sSelect = document.getElementById('return-student');
  const withBook = students.filter(s => s.issuedBookId !== 0);

  sSelect.innerHTML = `<option value="">— Select Student —</option>` +
    withBook.map(s => `<option value="${s.id}">${s.name} (ID: ${s.id})</option>`).join('');

  document.getElementById('return-book').innerHTML = `<option value="">— No book issued —</option>`;
}

function populateReturnBook() {
  const sid = parseInt(document.getElementById('return-student').value);
  const bSelect = document.getElementById('return-book');
  const student = students.find(s => s.id === sid);

  if (!student || student.issuedBookId === 0) {
    bSelect.innerHTML = `<option value="">— No book issued —</option>`;
    return;
  }
  const book = books.find(b => b.id === student.issuedBookId);
  bSelect.innerHTML = book
    ? `<option value="${book.id}">${book.title} (ID: ${book.id})</option>`
    : `<option value="">— Book not found —</option>`;
}

// ═══════════════════════════════════════════════════
//  GLOBAL SEARCH
// ═══════════════════════════════════════════════════
function handleGlobalSearch(query) {
  const q = query.toLowerCase().trim();
  if (!q) { renderBooks(); return; }

  // Only search if on Books page, otherwise switch to Books
  const booksPage = document.getElementById('page-books');
  if (!booksPage.classList.contains('active')) showPage('books');

  const results = books.filter(b =>
    b.title.toLowerCase().includes(q) ||
    b.author.toLowerCase().includes(q) ||
    String(b.id).includes(q)
  );
  renderBooks(results);
}

// ═══════════════════════════════════════════════════
//  KEYBOARD SHORTCUTS
// ═══════════════════════════════════════════════════
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-overlay.open').forEach(m => {
      m.classList.remove('open');
    });
  }
});

// ═══════════════════════════════════════════════════
//  SEED DATA  (pre-loaded sample books & students)
// ═══════════════════════════════════════════════════
(function seedData() {
  books = [
    createBook(101, 'Java Programming', 'Herbert Schildt'),
    createBook(102, 'Data Structures', 'Narasimha Karumanchi'),
    createBook(103, 'Operating Systems', 'Galvin & Silberschatz'),
    createBook(104, 'Computer Networks', 'Andrew Tanenbaum'),
  ];
  students = [
    createStudent(201, 'Ravi Kumar'),
    createStudent(202, 'Priya Sharma'),
  ];
  // Issue one book as a demo
  books[0].available = false;
  students[0].issuedBookId = 101;

  updateBadges();
  renderDashboard();
})();
