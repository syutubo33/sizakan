const userId = localStorage.getItem("userId") || 1;

document.querySelector("form").addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.querySelector("input[name='name']").value;
    const unit = document.querySelector("input[name='unit']").value;
    const stock = Number(document.querySelector("input[name='stock']").value);
    const alertStock = Number(document.querySelector("input[name='alert']").value);
    const note = document.querySelector("textarea[name='note']").value;

    // バックエンドに送るのは Material の項目だけ
    const payload = {
        name: name,
        quantity: stock,   // stock → quantity に変換
        unit: unit,    // unit を unit として送る（必要なら変更）
        userId: userId
    };

    console.log("送信データ:", payload);

    fetch("http://localhost:8080/materials", {
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
        window.location.href = "../items/list.html";
    })
    .catch(err => {
        console.error("登録エラー:", err);
        alert("登録に失敗しました");
    });
});