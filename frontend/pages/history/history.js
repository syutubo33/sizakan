const userId = localStorage.getItem("userId") || 1;
let currentPage = 0;
const pageSize = 50;

function loadHistory(page = 0) {
    fetch(`http://localhost:8080/history?userId=${userId}&page=${page}&size=${pageSize}`)
        .then(res => res.json())
        .then(data => {
            const tbody = document.querySelector(".history-table tbody");
            tbody.innerHTML = "";

            if (data.length === 0) {
                tbody.innerHTML = `
                    <tr>
                        <td colspan="4" style="text-align:center; color:#777;">
                            履歴がありません
                        </td>
                    </tr>
                `;
                return;
            }

            data.forEach(h => {
                const tr = document.createElement("tr");

                tr.innerHTML = `
                    <td>${formatDate(h.createdAt)}</td>
                    <td>${h.materialName}</td>
                    <td>${formatAction(h)}</td>
                    <td>${h.userId}</td>
                `;

                tbody.appendChild(tr);
            });

            // 前へボタン
            document.getElementById("prevBtn").disabled = page === 0;
            // 次へボタン
            document.getElementById("nextBtn").disabled = data.length < pageSize;
            document.getElementById("pageNum").textContent = page + 1;
        })
        .catch(err => {
            console.error("履歴取得エラー:", err);
        });
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

// 初期読み込み
loadHistory(currentPage);

// 前へボタン
document.getElementById("prevBtn").addEventListener("click", () => {
    if (currentPage > 0) {
        currentPage--;
        loadHistory(currentPage);
    }
});

// 次へボタン
document.getElementById("nextBtn").addEventListener("click", () => {
    currentPage++;
    loadHistory(currentPage);
});