
const usernameForm = document.getElementById("username");
const passwordForm = document.getElementById("password");
const errorMessage = document.getElementById("errorMessage");
const loginBtn = document.getElementById("login");

loginBtn.addEventListener("click", async () => {
    await loginApi(usernameForm.value, passwordForm.value);
});
document.addEventListener("keypress", async (event) => {
    if (event.key === "Enter") {
        await loginApi(usernameForm.value, passwordForm.value);
    }
});


async function loginApi(username, password) {
    if (!username) return errorMessage.textContent = "Vui lòng nhập tên đăng nhập.";
    if (!password) return errorMessage.textContent = "Vui lòng nhập mật khẩu đăng nhập.";
    const option = {
        method: "POST",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({ username: username, password: password})
    }
    const result = await fetch("/api/auth/admin/login", option);
    const data = await result.json();
    if(data.success) {
        window.location.reload(data.success);
    } else {
        errorMessage.textContent = data.message
    }
}