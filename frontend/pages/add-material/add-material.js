const API_BASE_URL = window.API_BASE_URL || (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1" ? "http://localhost:8080" : window.location.origin);

function apiUrl(path) {
    return `${API_BASE_URL}${path}`;
}

const userId = localStorage.getItem("userId") || 1;
const urlParams = new URLSearchParams(window.location.search);
const materialId = urlParams.get("id");

// 編集モードの確認
const isEditMode = materialId !== null;

if (isEditMode) {
    // 編集モード
    document.getElementById("page-title").textContent = "資材編集";
    document.getElementById("submit-btn").textContent = "更新";

    // 既存データを取得して表示
    fetch(apiUrl(`/materials?userId=${userId}`))
        .then(res => res.json())
        .then(data => {
            const material = data.find(m => m.id == materialId);
            if (!material) {
                alert("資材が見つかりません");
                window.location.href = "../items/index.html";
                return;
            }

            // フォームにデータを入力
            document.querySelector("input[name='name']").value = material.name;
            document.querySelector("input[name='unit']").value = material.unit;
            document.querySelector("input[name='stock']").value = material.quantity;
            document.querySelector("textarea[name='note']").value = material.remarks || "";
        })
        .catch(err => {
            console.error("データ取得エラー:", err);
            alert("データの取得に失敗しました");
            window.location.href = "../items/index.html";
        });
}

document.querySelector("form").addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.querySelector("input[name='name']").value;
    const unit = document.querySelector("input[name='unit']").value;
    const stock = Number(document.querySelector("input[name='stock']").value);
    const note = document.querySelector("textarea[name='note']").value;

    const payload = {
        name: name,
        quantity: stock,
        unit: unit,
        userId: userId,
        remarks: note
    };

    if (isEditMode) {
        // 更新処理
        fetch(apiUrl(`/materials/${materialId}`), {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        })
        .then(res => {
            if (!res.ok) throw new Error("更新に失敗しました");
            return res.json();
        })
        .then(data => {
            alert("資材を更新しました");
            window.location.href = `../items/detail.html?id=${materialId}`;
        })
        .catch(err => {
            console.error("更新エラー:", err);
            alert("更新に失敗しました");
        });
    } else {
        // 登録処理
        fetch(apiUrl("/materials"), {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        })
        .then(res => {
            if (!res.ok) throw new Error("登録に失敗しました");
            return res.json();
        })
        .then(data => {
            alert("資材を登録しました");
            window.location.href = "../items/index.html";
        })
        .catch(err => {
            console.error("登録エラー:", err);
            alert("登録に失敗しました");
        });
    }
});