const userId = localStorage.getItem("userId") || 1;

fetch(`http://localhost:8080/materials?userId=${userId}`)
    .then(res => res.json())
    .then(data => {
        const tbody = document.querySelector(".stock-table tbody");

        tbody.innerHTML = ""; // 初期化

        data.forEach(item => {
            const tr = document.createElement("tr");

            tr.innerHTML = `
                <td>${item.name}</td>
                <td>${item.quantity}</td>
                <td>${item.unit}</td>
                <td>
                    ${renderStatus(item.quantity)}
                </td>
            `;

            tbody.appendChild(tr);
        });
    })
    .catch(err => {
        console.error("在庫一覧取得エラー:", err);
    });

function renderStatus(qty) {
    if (qty === 0) {
        return `<span class="status order">発注</span>`;
    }
    if (qty <= 3) {
        return `<span class="status low">少ない</span>`;
    }
    return `<span class="status ok">OK</span>`;
}