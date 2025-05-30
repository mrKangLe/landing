document.getElementById('chatbot-button').onclick = async () => {
  const userMessage = prompt("Bạn cần gì? (ví dụ: tìm cửa hàng giặt là)");
  if (!userMessage) return;

  const responseBox = document.createElement("div");
  responseBox.style.position = "fixed";
  responseBox.style.bottom = "80px";
  responseBox.style.right = "20px";
  responseBox.style.background = "#fff";
  responseBox.style.border = "1px solid #ccc";
  responseBox.style.padding = "10px";
  responseBox.style.borderRadius = "10px";
  responseBox.style.boxShadow = "2px 2px 10px rgba(0,0,0,0.15)";
  responseBox.innerText = "🤖 Đang tìm kết quả...";
  document.body.appendChild(responseBox);

  try {
    const res = await fetch("https://script.google.com/macros/s/AKfycbzXfM7BoU4GEOI2Nt5ij2A474yxGlMmMDjk26H8Up9aiW7dV7fr15CzZ5xQmztyaG6M/exec", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message: userMessage })
    });

    const text = await res.text();
    const parsed = JSON.parse(text);
    responseBox.innerText = "🤖 " + (parsed.choices?.[0]?.message?.content || text);

  } catch (err) {
    responseBox.innerText = "❌ Lỗi khi gọi chatbot.";
  }
};
