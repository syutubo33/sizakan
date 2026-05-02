// ログイン時に保存した userId を取得（なければ 1 を仮使用）
const userId = localStorage.getItem("userId") || 1;
let allMaterials = [];

// 在庫一覧を取得
function loadMaterials() {
    fetch(`http://localhost:8080/materials?userId=${userId}`)
        .then(res => {
            if (!res.ok) {
                throw new Error(`HTTPエラー: ${res.status}`);
            }
            return res.json();
        })
        .then(data => {
            allMaterials = data;
            renderMaterials(allMaterials);
        })
        .catch(err => {
            console.error("在庫一覧取得エラー:", err);
            alert("在庫一覧の取得に失敗しました。バックエンドが起動しているか確認してください。");
        });
}

// 資材の表示
function renderMaterials(materials) {
    const tbody = document.querySelector(".stock-table tbody");
    tbody.innerHTML = ""; // 初期化

    if (materials.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="5" style="text-align:center; color:#777;">
                    登録された資材がありません
                </td>
            </tr>
        `;
        return;
    }

    materials.forEach(item => {
        const tr = document.createElement("tr");
        tr.style.cursor = "pointer";
        tr.dataset.id = item.id;

        tr.innerHTML = `
            <td>${item.name}</td>
            <td>${item.quantity}</td>
            <td>${item.unit}</td>
            <td>${renderStatus(item.quantity)}</td>
            <td>
                <button class="delete-btn" data-id="${item.id}">削除</button>
            </td>
        `;

        // 行をクリックで詳細画面に遷移
        tr.addEventListener("click", (e) => {
            if (!e.target.classList.contains("delete-btn")) {
                window.location.href = `detail.html?id=${item.id}`;
            }
        });

        tbody.appendChild(tr);
    });

    attachDeleteEvents();
}

// 検索機能
document.querySelector(".search-bar")?.addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase();
    const filtered = allMaterials.filter(item => 
        item.name.toLowerCase().includes(query) ||
        item.unit.toLowerCase().includes(query)
    );
    renderMaterials(filtered);
});

// 削除ボタンイベント
function attachDeleteEvents() {
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', async (e) => {
            e.stopPropagation();
            const id = e.target.dataset.id;
            if (!confirm("この資質を削除しますか？")) return;

            const res = await fetch(`http://localhost:8080/materials/${id}`, {
                method: "DELETE"
            });

            if (res.ok) {
                location.reload();
            } else {
                alert("削除に失敗しました");
            }
        });
    });
}

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

// 初期読み込み
loadMaterials();