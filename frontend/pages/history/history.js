const API_BASE_URL = window.API_BASE_URL || "https://sizakan-backend.onrender.com";

function apiUrl(path) {
    return `${API_BASE_URL}${path}`;
}

const userId = localStorage.getItem("userId") || 1;
let currentPage = 0;
const pageSize = 50;
let allHistory = [];
let filteredHistory = [];

function loadHistory() {
    fetch(apiUrl(`/history?userId=${userId}&page=0&size=1000`))
        .then(res => res.json())
        .then(data => {
            allHistory = data;
            filteredHistory = data;
            renderHistory(currentPage);
        })
        .catch(err => {
            console.error("履歴取得エラー:", err);
        });
}

function renderHistory(page = 0) {
    const tbody = document.querySelector(".history-table tbody");
    tbody.innerHTML = "";

    const start = page * pageSize;
    const end = start + pageSize;
    const pageData = filteredHistory.slice(start, end);

    if (pageData.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="4" style="text-align:center; color:#777;">
                    履歴がありません
                </td>
            </tr>
        `;
        document.getElementById("prevBtn").disabled = page === 0;
        document.getElementById("nextBtn").disabled = true;
        document.getElementById("pageNum").textContent = page + 1;
        return;
    }

    pageData.forEach(h => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${formatDate(h.createdAt)}</td>
            <td>${h.materialName}</td>
            <td>${formatAction(h)}</td>
            <td>${h.userName || h.userId}</td>
        `;
        tbody.appendChild(tr);
    });

    document.getElementById("prevBtn").disabled = page === 0;
    document.getElementById("nextBtn").disabled = end >= filteredHistory.length;
    document.getElementById("pageNum").textContent = page + 1;
}

function formatDate(dateString) {
    const d = new Date(dateString);
    return `${d.getFullYear()}/${d.getMonth()+1}/${d.getDate()} ${d.getHours()}:${String(d.getMinutes()).padStart(2, '0')}`;
}

function formatAction(h) {
    if (h.action === "add") return `追加 → ${h.newValue}`;
    if (h.action === "update") return `${h.oldValue} → ${h.newValue}`;
    if (h.action === "delete") return `${h.oldValue} → 削除`;
    return h.action;
}

// 検索機能
document.querySelector(".search-bar")?.addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase();
    filteredHistory = allHistory.filter(h => 
        h.materialName.toLowerCase().includes(query) ||
        h.action.toLowerCase().includes(query) ||
        (h.oldValue || "").toLowerCase().includes(query) ||
        (h.newValue || "").toLowerCase().includes(query) ||
        (h.userName || "").toLowerCase().includes(query)
    );
    currentPage = 0;
    renderHistory(currentPage);
});

// 初期読み込み
loadHistory();

// 前へボタン
document.getElementById("prevBtn").addEventListener("click", () => {
    if (currentPage > 0) {
        currentPage--;
        renderHistory(currentPage);
    }
});

// 次へボタン
document.getElementById("nextBtn").addEventListener("click", () => {
    currentPage++;
    renderHistory(currentPage);
});