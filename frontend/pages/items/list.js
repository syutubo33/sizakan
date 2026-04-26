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

                <!-- ★ 数量を input に変更 -->
                <td>
                    <input 
                        type="number" 
                        class="stock-input" 
                        data-id="${item.id}" 
                        value="${item.quantity}"
                    >
                </td>

                <td>${item.unit}</td>
                <td>${renderStatus(item.quantity)}</td>
            `;

            tbody.appendChild(tr);
        });

        attachUpdateEvents(); // ★ イベント登録
    })
    .catch(err => {
        console.error("在庫一覧取得エラー:", err);
    });


// ★ 数量変更イベント
function attachUpdateEvents() {
    document.querySelectorAll('.stock-input').forEach(input => {
        input.addEventListener('change', async (e) => {
            const id = e.target.dataset.id;
            const newQty = Number(e.target.value);

            const res = await fetch(`http://localhost:8080/materials/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    quantity: newQty,
                    userId: userId
                })
            });

            if (res.ok) {
                // 軽いフィードバック
                e.target.style.backgroundColor = "#d9ffd9";
                setTimeout(() => {
                    e.target.style.backgroundColor = "transparent";
                }, 500);
            } else {
                alert("更新に失敗しました");
            }
        });
    });
}


// 状態表示
function renderStatus(qty) {
    if (qty === 0) {
        return `<span class="status order">発注</span>`;
    }
    if (qty <= 3) {
        return `<span class="status low">少ない</span>`;
    }
    return `<span class="status ok">OK</span>`;
}
