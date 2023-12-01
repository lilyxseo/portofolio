async function sendMessageToTelegram() {
  const name = '123';
  const email = '123';
  const message = '123';

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
      // Menampilkan toast
      showToast();

      // Mengosongkan formulir setelah berhasil dikirim
      document.getElementById("telegramForm").reset();
    } else {
      alert("Gagal mengirim pesan ke Telegram.");
    }
  } catch (error) {
    console.error("Error sending message:", error);
    alert("Terjadi kesalahan saat mengirim pesan ke Telegram.");
  }
}

// Fungsi untuk menampilkan toast
function showToast() {
  const toastElement = document.getElementById("toast");
  const toast = new bootstrap.Toast(toastElement);
  toast.show();
}

// Menanggapi formulir saat dikirim
document
  .getElementById("telegramForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Mencegah formulir untuk dikirim secara normal
    sendMessageToTelegram(); // Panggil fungsi untuk mengirim pesan ke Telegram
  });
