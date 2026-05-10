const API_BASE_URL = window.API_BASE_URL || (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1" ? "http://localhost:8080" : window.location.origin);

function apiUrl(path) {
    return `${API_BASE_URL}${path}`;
}

document.querySelector("form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.querySelector('input[name="email"]').value;
    const password = document.querySelector('input[name="password"]').value;

    try {
        const res = await fetch(apiUrl("/auth/login"), {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        if (!res.ok) {
            let errorMessage = "ログインに失敗しました";
            try {
                const errorJson = await res.json();
                if (errorJson.message) {
                    errorMessage = errorJson.message;
                }
            } catch {
                errorMessage = await res.text();
            }
            alert("ログイン失敗: " + errorMessage);
            return;
        }

        const user = await res.json();
        
        // ログイン情報を保存
        localStorage.setItem("userId", user.id);
        localStorage.setItem("username", user.username);
        localStorage.setItem("email", user.email);

        // 在庫一覧画面へ遷移
        window.location.href = "../items/index.html";
    } catch (err) {
        console.error("ログインエラー:", err);
        alert("ログインに失敗しました。");
    }
});