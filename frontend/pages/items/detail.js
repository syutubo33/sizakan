const userId = localStorage.getItem("userId") || 1;
const urlParams = new URLSearchParams(window.location.search);
const materialId = urlParams.get("id");

// URLパラメータから資材IDを取得して詳細を表示
if (!materialId) {
    alert("資材IDが指定されていません");
    window.location.href = "list.html";
} else {
    fetch(`http://localhost:8080/materials?userId=${userId}`)
        .then(res => res.json())
        .then(data => {
            const material = data.find(m => m.id == materialId);
            if (!material) {
                alert("資材が見つかりません");
                window.location.href = "list.html";
                return;
            }

            // 詳細情報を表示
            document.getElementById("detail-name").textContent = material.name;
            document.getElementById("detail-quantity").textContent = material.quantity;
            document.getElementById("detail-unit").textContent = material.unit;
            document.getElementById("detail-status").textContent = renderStatus(material.quantity);
            document.getElementById("detail-remarks").textContent = material.remarks || "記載なし";

            // 編集ボタン
            document.getElementById("editBtn").addEventListener("click", () => {
                window.location.href = `../add-material/add-material.html?id=${materialId}`;
            });
        })
        .catch(err => {
            console.error("詳細取得エラー:", err);
            alert("詳細の取得に失敗しました");
            window.location.href = "list.html";
        });
}

function renderStatus(qty) {
    if (qty === 0) {
        return `発注（在庫なし）`;
    }
    if (qty <= 3) {
        return `少ない（${qty}個）`;
    }
    return `OK（${qty}個）`;
}