const form = document.getElementById("betForm");
form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    const response = await fetch("https://YOUR_VERCEL_FUNCTION_URL/api/evaluate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });
    const result = await response.json();
    document.getElementById("result").innerText = JSON.stringify(result, null, 2);
});
