// script.js

// --- Animasi Header ---
const logoAnimationElement = document.querySelector('#logoAnimation svg');

anime({
  targets: logoAnimationElement,
  translateY: [0, -10, 0], // Efek naik turun kecil
  rotate: '360deg',
  loop: true,
  duration: 1500,
  easing: 'easeInOutSine',
  fill: '#fff' // Animasi warna fill menjadi putih
});

// --- Elemen DOM ---
const lengthInput = document.getElementById('length');
const complexitySelect = document.getElementById('complexity');
const generateBtn = document.getElementById('generate');
const passwordInput = document.getElementById('password');
const copyBtn = document.getElementById('copy');
const strengthLevel = document.getElementById('strength-level');
const strengthText = document.getElementById('strength-text');

// --- Fungsi untuk Menghasilkan Kata Sandi ---
function generatePassword() {
  const length = parseInt(lengthInput.value);
  const complexity = parseInt(complexitySelect.value);

  let characters = '';
  if (complexity >= 1) characters += 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'; // Letters
  if (complexity >= 2) characters += '0123456789'; // Numbers
  if (complexity >= 3) characters += '!@#$%^&*()_+-=[]{}|;:,.<>?'; // Symbols

  let password = '';
  if (characters.length === 0) {
    alert('Pilih setidaknya satu tingkat kompleksitas.');
    return '';
  }

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    password += characters.charAt(randomIndex);
  }

  return password;
}

// --- Fungsi untuk Mengupdate Kekuatan Kata Sandi ---
function updateStrengthMeter(complexity) {
  let width = 0;
  let text = 'Weak';
  let backgroundColor = '#d9534f'; // Merah

  if (complexity === 1) {
    width = 33;
    text = 'Weak';
    backgroundColor = '#e74c3c'; // Lebih segar
  } else if (complexity === 2) {
    width = 66;
    text = 'Medium';
    backgroundColor = '#f39c12'; // Lebih menarik
  } else if (complexity === 3) {
    width = 100;
    text = 'Strong';
    backgroundColor = '#2ecc71'; // Lebih modern
  }

  strengthLevel.style.width = width + '%';
  strengthText.textContent = 'Strength: ' + text;
  strengthLevel.style.backgroundColor = backgroundColor;
}

// --- Event Listener untuk Tombol Generate ---
generateBtn.addEventListener('click', () => {
  const newPassword = generatePassword();
  passwordInput.value = newPassword;
  updateStrengthMeter(parseInt(complexitySelect.value));
});

// --- Event Listener untuk Tombol Copy ---
copyBtn.addEventListener('click', () => {
  passwordInput.select();
  document.execCommand('copy');
  alert('Password copied to clipboard!');
});

// --- Inisialisasi Kekuatan Kata Sandi saat Halaman Dimuat ---
updateStrengthMeter(parseInt(complexitySelect.value));