
document.getElementById('chatbot-button').onclick = async () => {
  const userMessage = prompt("Bạn cần gì? (ví dụ: tìm cửa hàng giặt là)");

  if (!userMessage) return;

  const responseBox = document.createElement('div');
  responseBox.style.position = 'fixed';
  responseBox.style.bottom = '100px';
  responseBox.style.right = '20px';
  responseBox.style.background = '#fff';
  responseBox.style.border = '1px solid #ccc';
  responseBox.style.padding = '12px';
  responseBox.style.borderRadius = '10px';
  responseBox.style.maxWidth = '90%';
  responseBox.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
  responseBox.innerText = '⏳ Đang trả lời...';
  document.body.appendChild(responseBox);

  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer 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"
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "Bạn là trợ lý dành cho cư dân Ocean Park. Chỉ trả lời về dịch vụ, cửa hàng, tiện ích nội khu, không lan man." },
          { role: "user", content: userMessage }
        ],
        temperature: 0.6
      })
    });

    const data = await res.json();
    const reply = data.choices?.[0]?.message?.content || "Không nhận được phản hồi.";

    responseBox.innerText = "🤖 " + reply;
  } catch (err) {
    responseBox.innerText = "❌ Lỗi kết nối chatbot!";
  }
};
