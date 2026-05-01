// ログイン時に保存した userId を取得（なければ 1 を仮使用）
const userId = localStorage.getItem("userId") || 1;

// 在庫一覧を取得
fetch(`http://localhost:8080/materials?userId=${userId}`)
    .then(res => {
        if (!res.ok) {
            throw new Error(`HTTPエラー: ${res.status}`);
        }
        return res.json();
    })
    .then(data => {
        const tbody = document.querySelector(".stock-table tbody");
        tbody.innerHTML = ""; // 初期化

        if (data.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="4" style="text-align:center; color:#777;">
                        登録された資材がありません
                    </td>
                </tr>
            `;
            return;
        }

        data.forEach(item => {
            const tr = document.createElement("tr");

            tr.innerHTML = `
                <td>${item.name}</td>
<<<<<<< HEAD
                <td>${item.quantity}</td>
=======

                <!-- ★ 数量を input に変更 -->
                <td>
                    <input 
                        type="number" 
                        class="stock-input" 
                        data-id="${item.id}" 
                        value="${item.quantity}"
                    >
                </td>

>>>>>>> 8f82ea57079c8fc3875900418900ac0bd6e6b070
                <td>${item.unit}</td>
                <td>${renderStatus(item.quantity)}</td>
            `;

            tbody.appendChild(tr);
        });

        attachUpdateEvents(); // ★ イベント登録
    })
    .catch(err => {
        console.error("在庫一覧取得エラー:", err);
        alert("在庫一覧の取得に失敗しました。バックエンドが起動しているか確認してください。");
    });

<<<<<<< HEAD
// 状態バッジの表示
=======

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
>>>>>>> 8f82ea57079c8fc3875900418900ac0bd6e6b070
function renderStatus(qty) {
    if (qty === 0) {
        return `<span class="status order">発注</span>`;
    }
    if (qty <= 3) {
        return `<span class="status low">少ない</span>`;
    }
    return `<span class="status ok">OK</span>`;
}
