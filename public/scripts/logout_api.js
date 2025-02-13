const logoutBtn = document.getElementById("logout");

logoutBtn.addEventListener("click", async (event) => {
    console.log(event)
    await logoutApi();
});

async function logoutApi() {
    const option = {
        method: "POST",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json"}
    }
    const result = await fetch("/api/auth/admin/logout", option);
    const data = await result.json();
    window.location.reload(data.success);
}