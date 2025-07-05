let defaultPassword = localStorage.getItem("diaryPassword") || "secret123";
let entries = JSON.parse(localStorage.getItem("diaryEntries")) || [];

function checkPassword() {
  const input = document.getElementById("password-input").value;
  if (input === defaultPassword) {
    document.getElementById("login-screen").classList.add("hidden");
    document.getElementById("diary-app").classList.remove("hidden");
    displayEntries();
  } else {
    document.getElementById("login-error").innerText = "Wrong password!";
  }
}

function changePassword() {
  const newPass = prompt("Enter new password:");
  if (newPass) {
    defaultPassword = newPass;
    localStorage.setItem("diaryPassword", newPass);
    alert("Password updated!");
  }
}

function saveEntry() {
  const text = document.getElementById("diary-text").value;
  if (!text.trim()) return;
  const date = new Date().toLocaleString();
  entries.push({ date, text });
  localStorage.setItem("diaryEntries", JSON.stringify(entries));
  document.getElementById("diary-text").value = "";
  displayEntries();
}

function displayEntries() {
  const container = document.getElementById("entry-cards");
  container.innerHTML = "";
  entries.forEach((entry, index) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `<strong>${entry.date}</strong><p>${entry.text.slice(0, 50)}...</p>`;
    card.onclick = () => editEntry(index);
    container.appendChild(card);
  });
}

function editEntry(index) {
  const newText = prompt("Edit your entry:", entries[index].text);
  if (newText !== null) {
    entries[index].text = newText;
    localStorage.setItem("diaryEntries", JSON.stringify(entries));
    displayEntries();
  }
}
