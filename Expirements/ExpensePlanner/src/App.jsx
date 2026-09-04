import { useState, useEffect, useMemo } from "react";

const FONT_IMPORT = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=JetBrains+Mono:wght@400;500;600;700&family=Newsreader:ital,wght@0,400;0,500;1,400&display=swap');
`;

const DEFAULT_CATEGORIES = [
  "Food",
  "Transport",
  "Housing",
  "Utilities",
  "Entertainment",
  "Health",
  "Shopping",
];

const LS_EXPENSES = "ledger-expenses-v1";
const LS_BUDGETS = "ledger-budgets-v1";

function loadLS(key, fallback) {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function saveLS(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // ignore
  }
}

function uid() {
  return Math.random().toString(36).slice(2, 10);
}

function monthKey(dateStr) {
  return dateStr.slice(0, 7);
}

function formatMonth(key) {
  const [y, m] = key.split("-").map(Number);
  const d = new Date(y, m - 1, 1);
  return d.toLocaleDateString("en-US", { month: "long", year: "numeric" }).toUpperCase();
}

function shiftMonth(key, delta) {
  const [y, m] = key.split("-").map(Number);
  const d = new Date(y, m - 1 + delta, 1);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
}

function todayStr() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function fmtAmount(n) {
  return n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

const COLORS = {
  ink: "#1c2321",
  paper: "#f2ede3",
  paperAlt: "#e9e1d0",
  paperCard: "#faf7ef",
  rule: "#cdbfa3",
  ruleLight: "#e2d7c0",
  rust: "#a94a2c",
  sage: "#4f6c4f",
  gold: "#a1742f",
  muted: "#7a7062",
};

export default function ExpensePlanner() {
  const [expenses, setExpenses] = useState(() => loadLS(LS_EXPENSES, []));
  const [budgets, setBudgets] = useState(() =>
    loadLS(
      LS_BUDGETS,
      DEFAULT_CATEGORIES.reduce((acc, c) => ({ ...acc, [c]: 0 }), {})
    )
  );
  const [tab, setTab] = useState("overview");
  const [selectedMonth, setSelectedMonth] = useState(monthKey(todayStr()));

  const [form, setForm] = useState({
    amount: "",
    category: DEFAULT_CATEGORIES[0],
    date: todayStr(),
    note: "",
  });

  const [newCategory, setNewCategory] = useState("");

  useEffect(() => saveLS(LS_EXPENSES, expenses), [expenses]);
  useEffect(() => saveLS(LS_BUDGETS, budgets), [budgets]);

  const categories = Object.keys(budgets);

  const monthExpenses = useMemo(
    () => expenses.filter((e) => monthKey(e.date) === selectedMonth).sort((a, b) => b.date.localeCompare(a.date)),
    [expenses, selectedMonth]
  );

  const spentByCategory = useMemo(() => {
    const map = {};
    monthExpenses.forEach((e) => {
      map[e.category] = (map[e.category] || 0) + Number(e.amount);
    });
    return map;
  }, [monthExpenses]);

  const totalSpent = monthExpenses.reduce((sum, e) => sum + Number(e.amount), 0);
  const totalBudget = categories.reduce((sum, c) => sum + Number(budgets[c] || 0), 0);
  const remaining = totalBudget - totalSpent;

  const unbudgetedCategories = Object.keys(spentByCategory).filter((c) => !categories.includes(c));

  function addExpense() {
    const amt = parseFloat(form.amount);
    if (!amt || amt <= 0 || !form.date) return;
    setExpenses((prev) => [
      ...prev,
      { id: uid(), amount: amt, category: form.category, date: form.date, note: form.note.trim() },
    ]);
    setForm({ ...form, amount: "", note: "" });
  }

  function deleteExpense(id) {
    setExpenses((prev) => prev.filter((e) => e.id !== id));
  }

  function updateBudget(cat, value) {
    const num = value === "" ? 0 : parseFloat(value);
    setBudgets((prev) => ({ ...prev, [cat]: isNaN(num) ? 0 : num }));
  }

  function addCategory() {
    const name = newCategory.trim();
    if (!name || budgets[name] !== undefined) return;
    setBudgets((prev) => ({ ...prev, [name]: 0 }));
    setNewCategory("");
  }

  function removeCategory(cat) {
    setBudgets((prev) => {
      const next = { ...prev };
      delete next[cat];
      return next;
    });
    if (form.category === cat) {
      setForm((f) => ({ ...f, category: Object.keys(budgets).find((c) => c !== cat) || "" }));
    }
  }

  const cardStyle = {
    background: COLORS.paperCard,
    border: `1px solid ${COLORS.rule}`,
  };

  const monoLabel = {
    fontFamily: "'JetBrains Mono', monospace",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: COLORS.paper,
        color: COLORS.ink,
        fontFamily: "'Newsreader', Georgia, serif",
        backgroundImage:
          "repeating-linear-gradient(0deg, transparent, transparent 27px, rgba(28,35,33,0.03) 28px)",
      }}
    >
      <style>{FONT_IMPORT}</style>
      <style>{`
        .ledger-input {
          background: ${COLORS.paperCard};
          border: 1px solid ${COLORS.rule};
          color: ${COLORS.ink};
          font-family: 'JetBrains Mono', monospace;
          transition: border-color 0.15s ease, box-shadow 0.15s ease;
        }
        .ledger-input:focus {
          outline: none;
          border-color: ${COLORS.gold};
          box-shadow: 0 0 0 3px rgba(161,116,47,0.15);
        }
        .ledger-btn {
          font-family: 'JetBrains Mono', monospace;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          transition: transform 0.12s ease, background 0.15s ease;
          cursor: pointer;
        }
        .ledger-btn:hover { transform: translateY(-1px); }
        .ledger-btn:active { transform: translateY(0px); }
        .tab-btn {
          font-family: 'JetBrains Mono', monospace;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          cursor: pointer;
          background: none;
          border: none;
          position: relative;
        }
        .row-fade { animation: rowIn 0.35s ease both; }
        @keyframes rowIn {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .del-x { cursor: pointer; color: ${COLORS.muted}; transition: color 0.15s ease; }
        .del-x:hover { color: ${COLORS.rust}; }
        ::selection { background: ${COLORS.gold}; color: ${COLORS.paper}; }
      `}</style>

      <div style={{ maxWidth: "880px", margin: "0 auto", padding: "48px 24px 96px" }}>
        {/* Masthead */}
        <div
          style={{
            borderBottom: `2px solid ${COLORS.ink}`,
            paddingBottom: "18px",
            marginBottom: "8px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <div>
            <h1
              style={{
                fontFamily: "'Fraunces', serif",
                fontWeight: 600,
                fontSize: "40px",
                margin: 0,
                letterSpacing: "-0.01em",
              }}
            >
              The Ledger
            </h1>
            <div style={{ ...monoLabel, fontSize: "11px", color: COLORS.muted, marginTop: "4px" }}>
              Personal Expense Report
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <button
              className="ledger-btn"
              onClick={() => setSelectedMonth((m) => shiftMonth(m, -1))}
              style={{ background: "none", border: `1px solid ${COLORS.rule}`, padding: "6px 10px", fontSize: "13px" }}
            >
              ‹
            </button>
            <div style={{ ...monoLabel, fontSize: "13px", minWidth: "150px", textAlign: "center" }}>
              {formatMonth(selectedMonth)}
            </div>
            <button
              className="ledger-btn"
              onClick={() => setSelectedMonth((m) => shiftMonth(m, 1))}
              style={{ background: "none", border: `1px solid ${COLORS.rule}`, padding: "6px 10px", fontSize: "13px" }}
            >
              ›
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: "28px", marginBottom: "36px", marginTop: "18px" }}>
          {[
            ["overview", "Overview"],
            ["expenses", "Expenses"],
            ["budgets", "Budgets"],
          ].map(([key, label]) => (
            <button key={key} className="tab-btn" onClick={() => setTab(key)} style={{ fontSize: "13px", padding: "6px 0", color: tab === key ? COLORS.ink : COLORS.muted }}>
              {label}
              {tab === key && (
                <div style={{ position: "absolute", left: 0, right: 0, bottom: "-2px", height: "2px", background: COLORS.gold }} />
              )}
            </button>
          ))}
        </div>

        {tab === "overview" && (
          <div>
            {/* Summary row */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", marginBottom: "40px" }}>
              {[
                ["Budgeted", totalBudget, COLORS.ink],
                ["Spent", totalSpent, COLORS.ink],
                ["Remaining", remaining, remaining < 0 ? COLORS.rust : COLORS.sage],
              ].map(([label, value, color], i) => (
                <div key={label} className="row-fade" style={{ ...cardStyle, padding: "18px 20px", animationDelay: `${i * 60}ms` }}>
                  <div style={{ ...monoLabel, fontSize: "10px", color: COLORS.muted, marginBottom: "8px" }}>{label}</div>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "24px", fontWeight: 600, color }}>
                    {value < 0 ? "−" : ""}${fmtAmount(Math.abs(value))}
                  </div>
                </div>
              ))}
            </div>

            {/* Category breakdown */}
            <div style={{ ...monoLabel, fontSize: "11px", color: COLORS.muted, marginBottom: "14px" }}>
              By Category
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {categories.length === 0 && (
                <div style={{ color: COLORS.muted, fontStyle: "italic" }}>No categories yet — add one in Budgets.</div>
              )}
              {categories.map((cat, i) => {
                const spent = spentByCategory[cat] || 0;
                const limit = Number(budgets[cat] || 0);
                const pct = limit > 0 ? Math.min(100, (spent / limit) * 100) : spent > 0 ? 100 : 0;
                const over = limit > 0 && spent > limit;
                return (
                  <div key={cat} className="row-fade" style={{ animationDelay: `${i * 40}ms` }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px", alignItems: "baseline" }}>
                      <span style={{ fontFamily: "'Fraunces', serif", fontSize: "16px" }}>{cat}</span>
                      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "13px", color: over ? COLORS.rust : COLORS.muted }}>
                        ${fmtAmount(spent)} {limit > 0 ? `/ $${fmtAmount(limit)}` : "(no budget set)"}
                      </span>
                    </div>
                    <div style={{ height: "6px", background: COLORS.ruleLight, position: "relative", overflow: "hidden" }}>
                      <div
                        style={{
                          height: "100%",
                          width: `${pct}%`,
                          background: over ? COLORS.rust : COLORS.sage,
                          transition: "width 0.4s ease",
                        }}
                      />
                    </div>
                  </div>
                );
              })}
              {unbudgetedCategories.map((cat) => (
                <div key={cat} className="row-fade">
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px", alignItems: "baseline" }}>
                    <span style={{ fontFamily: "'Fraunces', serif", fontSize: "16px", color: COLORS.muted }}>{cat}</span>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "13px", color: COLORS.gold }}>
                      ${fmtAmount(spentByCategory[cat])} (unbudgeted)
                    </span>
                  </div>
                  <div style={{ height: "6px", background: COLORS.ruleLight }}>
                    <div style={{ height: "100%", width: "100%", background: COLORS.gold }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "expenses" && (
          <div>
            {/* Add expense form */}
            <div style={{ ...cardStyle, padding: "20px", marginBottom: "32px" }}>
              <div style={{ ...monoLabel, fontSize: "11px", color: COLORS.muted, marginBottom: "14px" }}>
                Log an Expense
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px", marginBottom: "10px" }}>
                <input
                  className="ledger-input"
                  type="number"
                  placeholder="0.00"
                  value={form.amount}
                  onChange={(e) => setForm({ ...form, amount: e.target.value })}
                  style={{ padding: "10px 12px", fontSize: "14px" }}
                />
                <select
                  className="ledger-input"
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  style={{ padding: "10px 12px", fontSize: "13px" }}
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
                <input
                  className="ledger-input"
                  type="date"
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  style={{ padding: "10px 12px", fontSize: "13px" }}
                />
              </div>
              <div style={{ display: "flex", gap: "10px" }}>
                <input
                  className="ledger-input"
                  type="text"
                  placeholder="Note (optional)"
                  value={form.note}
                  onChange={(e) => setForm({ ...form, note: e.target.value })}
                  style={{ flex: 1, padding: "10px 12px", fontSize: "14px", fontFamily: "'Newsreader', serif" }}
                  onKeyDown={(e) => e.key === "Enter" && addExpense()}
                />
                <button
                  className="ledger-btn"
                  onClick={addExpense}
                  style={{ background: COLORS.ink, color: COLORS.paper, border: "none", padding: "0 22px", fontSize: "13px" }}
                >
                  Add
                </button>
              </div>
            </div>

            {/* Expense list */}
            <div style={{ ...monoLabel, fontSize: "11px", color: COLORS.muted, marginBottom: "10px" }}>
              {monthExpenses.length} {monthExpenses.length === 1 ? "Entry" : "Entries"} — {formatMonth(selectedMonth)}
            </div>
            <div style={{ borderTop: `1px solid ${COLORS.rule}` }}>
              {monthExpenses.length === 0 && (
                <div style={{ padding: "24px 4px", color: COLORS.muted, fontStyle: "italic" }}>
                  No expenses logged this month.
                </div>
              )}
              {monthExpenses.map((e, i) => (
                <div
                  key={e.id}
                  className="row-fade"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "14px",
                    padding: "12px 4px",
                    borderBottom: `1px solid ${COLORS.ruleLight}`,
                    animationDelay: `${Math.min(i, 8) * 30}ms`,
                  }}
                >
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "12px", color: COLORS.muted, width: "72px" }}>
                    {e.date.slice(5)}
                  </div>
                  <div
                    style={{
                      ...monoLabel,
                      fontSize: "10px",
                      background: COLORS.paperAlt,
                      padding: "3px 8px",
                      border: `1px solid ${COLORS.rule}`,
                      width: "110px",
                      textAlign: "center",
                    }}
                  >
                    {e.category}
                  </div>
                  <div style={{ flex: 1, fontSize: "14px", color: e.note ? COLORS.ink : COLORS.muted, fontStyle: e.note ? "normal" : "italic" }}>
                    {e.note || "—"}
                  </div>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "14px", fontWeight: 600, width: "80px", textAlign: "right" }}>
                    ${fmtAmount(e.amount)}
                  </div>
                  <div className="del-x" onClick={() => deleteExpense(e.id)} style={{ fontSize: "16px", width: "18px", textAlign: "center" }}>
                    ×
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "budgets" && (
          <div>
            <div style={{ ...monoLabel, fontSize: "11px", color: COLORS.muted, marginBottom: "14px" }}>
              Monthly Budgets
            </div>
            <div style={{ borderTop: `1px solid ${COLORS.rule}`, marginBottom: "24px" }}>
              {categories.map((cat) => (
                <div
                  key={cat}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "14px",
                    padding: "12px 4px",
                    borderBottom: `1px solid ${COLORS.ruleLight}`,
                  }}
                >
                  <div style={{ flex: 1, fontFamily: "'Fraunces', serif", fontSize: "16px" }}>{cat}</div>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", color: COLORS.muted }}>$</span>
                    <input
                      className="ledger-input"
                      type="number"
                      value={budgets[cat]}
                      onChange={(e) => updateBudget(cat, e.target.value)}
                      style={{ width: "100px", padding: "8px 10px", fontSize: "14px", textAlign: "right" }}
                    />
                  </div>
                  <div className="del-x" onClick={() => removeCategory(cat)} style={{ fontSize: "16px", width: "18px", textAlign: "center" }}>
                    ×
                  </div>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", gap: "10px" }}>
              <input
                className="ledger-input"
                type="text"
                placeholder="New category name"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                style={{ flex: 1, padding: "10px 12px", fontSize: "14px" }}
                onKeyDown={(e) => e.key === "Enter" && addCategory()}
              />
              <button
                className="ledger-btn"
                onClick={addCategory}
                style={{ background: "none", border: `1px solid ${COLORS.ink}`, padding: "0 22px", fontSize: "13px" }}
              >
                Add Category
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}