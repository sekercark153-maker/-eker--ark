# Oyun Dünyası — GitHub Pages arayüz demosu

Bu paket, mobil uyumlu çok sayfalı bir oyun portalı **arayüz prototipidir**.

## İçerik
- Ana sayfa
- Bakiye ekranı (yalnızca demo tutarı)
- Para yükleme ekranı (ödeme yapmaz)
- Para çekme ekranı (işlem kapalı)
- Canlı destek görünümü (mesajlar sunucuya gitmez)
- Günlük hediye görünümü
- Kullanıcı profili
- Oyunlar listesi
- Çark ve kazı kazan görsel demoları (parasal ödül yok)
- Giriş/kayıt görünümü
- Admin görünümü ve oturum içinde oyun listesine ekleme

## GitHub Pages ile yayınlama
1. GitHub'da yeni bir repository oluştur.
2. `index.html`, `style.css`, `app.js` ve `README.md` dosyalarını repository'nin ana dizinine yükle.
3. Repository → **Settings** → **Pages** bölümüne gir.
4. **Deploy from a branch** seç.
5. Branch olarak `main`, klasör olarak `/ (root)` seçip Save'e bas.
6. Birkaç dakika sonra GitHub Pages adresin oluşur.

## Önemli teknik sınırlar
Bu, yalnızca tarayıcıda çalışan statik bir ön yüz demosudur. Gerçek kullanıcı kaydı, güvenli oturum, veritabanı, admin yetkilendirmesi, canlı destek sunucusu veya ödeme/çekim entegrasyonu içermez. Demo tutarlarının gerçek parasal değeri yoktur. Gerçek para işlemleri ve şans oyunları için bu prototip kullanılamaz.
