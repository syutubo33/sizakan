document.querySelector("form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.querySelector('input[name="username"]').value;
    const email = document.querySelector('input[name="email"]').value;
    const password = document.querySelector('input[name="password"]').value;

    try {
        const res = await fetch("http://localhost:8080/auth/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, email, password })
        });

        if (!res.ok) {
            const error = await res.text();
            alert("登録失敗: " + error);
            return;
        }

        alert("登録が完了しました。ログイン画面へ遷移します。");
        window.location.href = "../signin/signin.html";
    } catch (err) {
        console.error("登録エラー:", err);
        alert("登録に失敗しました。");
    }
});