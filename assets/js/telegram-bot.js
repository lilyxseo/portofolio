async function sendMessageToTelegram() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  const BOT_TOKEN = "5504406578:AAFkfXqs2IFMWCbef4dWeVpekl-9jlzXu1Y";
  const CHAT_ID = "1423280039"; // Ganti dengan ID obrolan atau pengguna Telegram yang dituju

  const apiUrl = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

  const text = `
      Nama: ${name}
      Email: ${email}
      Pesan: ${message}
    `;

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: text,
      }),
    });

    const responseData = await response.json();

    if (responseData.ok) {
      alert("Pesan berhasil dikirim ke Telegram!");
    } else {
      alert("Gagal mengirim pesan ke Telegram.");
    }
  } catch (error) {
    console.error("Error sending message:", error);
    alert("Terjadi kesalahan saat mengirim pesan ke Telegram.");
  }
}

// Menanggapi formulir saat dikirim
document
  .getElementById("telegramForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Mencegah formulir untuk dikirim secara normal
    sendMessageToTelegram(); // Panggil fungsi untuk mengirim pesan ke Telegram
  });
