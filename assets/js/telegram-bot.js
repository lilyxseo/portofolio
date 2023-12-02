// Fungsi untuk mengirim pesan ke Telegram
async function sendMessageToTelegram() {
  // Mengambil nilai dari input formulir
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  // Validasi sederhana, pastikan nilai name, email, dan message tidak kosong
  if (!name || !email || !message) {
    alert("Silakan lengkapi semua kolom formulir.");
    return;
  }

  const BOT_TOKEN = "5504406578:AAFkfXqs2IFMWCbef4dWeVpekl-9jlzXu1Y";
  const CHAT_ID = "1423280039"; // Ganti dengan ID obrolan atau pengguna Telegram yang dituju

  const apiUrl = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

  // Escape karakter '.' di dalam pesan
  const encodedMessage = encodeURIComponent(message);

  // Modifikasi teks untuk menggunakan format Markdown (membuat teks bold)
  const text = `
  Message from bydrz.com

Nama: ${name}
Email: ${email}
Pesan: ${message}

LX Zone
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

    if (response.ok) {
      // Menampilkan toast pesan berhasil
      showToast("Pesan berhasil terkirim, terima kasih sudah menghubungi saya");

      // Membersihkan formulir setelah pesan berhasil terkirim
      document.getElementById("telegramForm").reset();
    } else {
      // Menampilkan toast pesan gagal bersama dengan pesan kesalahan dari respons
      showToast(
        `Gagal mengirim pesan ke Telegram. ${responseData.description}`
      );

      // Membersihkan formulir setelah pesan berhasil terkirim
      document.getElementById("telegramForm").reset();
    }
  } catch (error) {
    console.error("Error sending message:", error);
    // Menampilkan toast pesan gagal
    showToast("Terjadi kesalahan saat mengirim pesan ke Telegram.");

    // Membersihkan formulir setelah pesan berhasil terkirim
    document.getElementById("telegramForm").reset();
  }
}

// Fungsi untuk menampilkan toast
function showToast(message) {
  const toastElement = document.getElementById("toast");
  const toastBody = toastElement.querySelector(".toast-body p");
  const toastIcon = toastElement.querySelector(".icon-toast i");

  // Menetapkan pesan dan ikon pada toast
  toastBody.textContent = message;
  toastIcon.className = message.includes("berhasil")
    ? "fa-solid fa-circle-check text-success"
    : "fa-solid fa-circle-exclamation text-danger";

  // Membuka toast
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
