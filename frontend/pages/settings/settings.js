// localStorageからユーザー情報を取得して表示
document.getElementById("current-username").textContent = localStorage.getItem("username") || "未設定";
document.getElementById("current-email").textContent = localStorage.getItem("email") || "未設定";

// ログアウト機能
document.getElementById("logoutBtn")?.addEventListener("click", () => {
    if (confirm("ログアウトしますか？")) {
        localStorage.clear();
        window.location.href = "../signin/signin.html";
    }
});