const userId = localStorage.getItem("userId") || 1; // 仮で1、ログイン後は自動取得

fetch(`http://localhost:8080/history?userId=${userId}`)
    .then(res => res.json())
    .then(data => {
        const tbody = document.querySelector(".history-table tbody");

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
    })
    .catch(err => {
        console.error("履歴取得エラー:", err);
    });

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