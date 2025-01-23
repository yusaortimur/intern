function sayfalar(sayfaId) {
    const sayfa = document.querySelectorAll('.sayfa');
    sayfa.forEach(sayfa => sayfa.classList.add('gizleGoster'));
    document.getElementById(sayfaId).classList.remove('gizleGoster');
}

function kKayit() {
    const ad = document.getElementById('ad').value;
    const soyad = document.getElementById('soyad').value;
    const email = document.getElementById('email').value;
    const kullaniciAdi = document.getElementById('kullaniciAdi').value;
    const sifre = document.getElementById('sifre').value;

    if (!ad || !soyad || !email || !kullaniciAdi || !sifre) {
        alert('Lütfen tüm alanları doldurun.');
        return;
    }

    const kullanici = { ad, soyad, email, kullaniciAdi, sifre };
    localStorage.setItem('kullanici', JSON.stringify(kullanici));
    alert('Kayıt başarılı! Giriş yapabilirsiniz.');
    sayfalar('login-sayfa');
}

function kGiris() {
    const kullaniciAdi = document.getElementById('gKAdi').value;
    const sifre = document.getElementById('gKSifre').value;

    const Kkullanici = JSON.parse(localStorage.getItem('kullanici'));

    if (Kkullanici && Kkullanici.kullaniciAdi === kullaniciAdi && Kkullanici.sifre === sifre) {
        alert('Giriş başarılı!');
        profil(Kkullanici);
        sayfalar('profilDiv');
    } else {
        alert('Kullanıcı adı veya şifre yanlış.');
    }
}

function profil(kullanici) {
    document.getElementById('kAdi').textContent = kullanici.ad;
    document.getElementById('kSoyadi').textContent = kullanici.soyad;
    document.getElementById('kEmail').textContent = kullanici.email;
}

function kCikis() {
    alert('Çıkış yaptınız.');
    sayfalar('main-sayfa');
}
