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
                <td>${item.quantity}</td>
                <td>${item.unit}</td>
                <td>${renderStatus(item.quantity)}</td>
            `;

            tbody.appendChild(tr);
        });
    })
    .catch(err => {
        console.error("在庫一覧取得エラー:", err);
        alert("在庫一覧の取得に失敗しました。バックエンドが起動しているか確認してください。");
    });

// 状態バッジの表示
function renderStatus(qty) {
    if (qty === 0) {
        return `<span class="status order">発注</span>`;
    }
    if (qty <= 3) {
        return `<span class="status low">少ない</span>`;
    }
    return `<span class="status ok">OK</span>`;
}
