# <img src="screenshot_login.png" align="right" width="120" /> KLU Mobil
> **Kırklareli Üniversitesi'nin yenilikçi, modern ve kullanıcı dostu resmi öğrenci mobil uygulaması.**

[![React Native](https://img.shields.io/badge/React_Native-v0.73+-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactnative.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-v5.0+-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Zustand](https://img.shields.io/badge/State--Management-Zustand-orange?style=for-the-badge)](https://github.com/pmndrs/zustand)
[![Platform](https://img.shields.io/badge/Platform-Android%20%7C%20iOS-E21B23?style=for-the-badge)](https://www.klu.edu.tr/)
[![Design](https://img.shields.io/badge/Design-Hyper--Premium-FFD700?style=for-the-badge)](https://apple.com/design)

KLU Mobil, Kırklareli Üniversitesi öğrencilerinin kampüs hayatını dijitalleştirmek ve kolaylaştırmak için tasarlanmış bir mobil uygulamadır. "Hyper-Premium" tasarım anlayışıyla geliştirilen uygulama, Apple tasarım standartlarından ilham alan arayüzü, akıcı animasyonları ve kullanıcı odaklı özellikleriyle modern bir üniversite deneyimi sunar.

---

## ✨ Öne Çıkan Özellikler

### 🛡️ Modern Güvenlik ve Kimlik
- **Dijital Kimlik Kartı:** Fiziksel karta ihtiyaç duymadan, Glassmorphism temalı şık ve güvenli dijital öğrenci kimliği. QR kod desteği ile kampüs geçişleri artık daha hızlı.
- **Güvenli Giriş:** Modern kimlik doğrulama sistemleri ile verileriniz her zaman güvende.

### 📊 Akademik Asistan
- **Kişiselleştirilmiş Dashboard:** "Persona" sistemi ile akademik durumunuzu, not ortalamanızı (GPA) ve dönemlik istatistiklerinizi tek bir bakışta takip edin.
- **Akademik İlerleme:** Eksik krediler, tamamlanan dersler ve başarı durumu takibi.

### 🍽️ Kampüs Yaşamı
- **Akıllı Yemekhane:**
    - Günlük ve haftalık yemek listelerini görüntüleme.
    - Anlık bakiye takibi ve kolay yükleme.
    - QR/Barkod entegrasyonu ile temassız ödeme kolaylığı.
- **Kütüphane Yönetimi:** Kitap arama, ödünç alınan kitapların süresini uzatma ve yaklaşan iadeler için bildirimler.

### 📅 Planlama ve İletişim
- **Dinamik Ders Programı:** Haftalık ders takviminizi modern ve okunaklı bir tasarımda görüntüleyin. Boş derslikleri ve ders konumlarını keşfedin.
- **Gelişmiş Duyuru Sistemi:** Üniversite ve bölüm duyurularından anında haberdar olun. Görsel destekli zengin içerikler ile hiçbir önemli bilgiyi kaçırmayın.

---

## 🎨 Tasarım Felsefesi: "Hyper-Premium"

Uygulama, standart mobil arayüzlerin ötesine geçerek kullanıcıya lüks bir deneyim sunmayı amaçlar:

- **Mesh Gradients:** Arka planlarda kullanılan dinamik ve yumuşak renk geçişleri ile derinlik hissi.
- **Glassmorphism:** Saydamlık ve "frosted glass" (buzlu cam) efektleri ile katmanlı bir yapı.
- **Apple Design Standards:** Tipografi, beyaz boşluk kullanımı ve minimalist ikonografi ile iOS standartlarında bir estetik.
- **Haptic & Fluid Animations:** React Native Reanimated ile güçlendirilmiş, kullanıcı etkileşimini anlamlı kılan mikrosaniye hassasiyetinde animasyonlar.

---

## 🛠️ Teknik Altyapı

| Teknoloji | Kullanım Amacı |
| :--- | :--- |
| **React Native** | Cross-platform (iOS/Android) uygulama iskeleti |
| **TypeScript** | Tip güvenliği ve ölçeklenebilir kod yapısı |
| **Zustand** | Hafif ve hızlı global state yönetimi |
| **React Navigation** | Akıcı ekran geçişleri ve navigation mimarisi |
| **Reanimated & Moti** | Yüksek performanslı arayüz animasyonları |
| **Linear Gradient** | Premium görsel bileşenler için renk geçişleri |

---

## 📂 Proje Yapısı

```text
src/
├── assets/          # Görüntüler, fontlar ve statik dosyalar
├── components/      # "Hyper-Premium" UI bileşenleri (Buttons, Cards, Modals)
├── navigation/      # Stack ve Tab navigasyon yapılandırması
├── screens/         # Uygulama ekranları (Dashboard, Profile, Cafeteria vb.)
├── store/           # Zustand state tanımları
├── services/        # API entegrasyonları ve dış servisler
├── types/           # TypeScript arayüz ve tip tanımlamaları
└── utils/           # Yardımcı fonksiyonlar ve sabitler
```

---

## 🚀 Kurulum ve Çalıştırma

### Ön Koşullar
- Node.js (v20+)
- React Native Environment (Android SDK / Xcode)

### Adımlar

1. **Bağımlılıkları Yükleyin:**
   ```bash
   npm install
   ```

2. **iOS için (Sadece macOS):**
   ```bash
   cd ios && pod install && cd ..
   ```

3. **Uygulamayı Başlatın:**
   ```bash
   # Terminal 1 (Metro Bundler)
   npm start

   # Terminal 2 (iOS veya Android)
   npm run android  # veya npm run ios
   ```

---

## 🗺️ Gelecek Planları (Roadmap)

- [ ] **Toplu Taşıma Entegrasyonu:** Kampüs içi ve şehir içi otobüs saatlerinin canlı takibi.
- [ ] **Kulüp Etkinlikleri:** Öğrenci toplulukları için etkinlik yönetim ve katılım sistemi.
- [ ] **Akıllı Bildirimler:** Yaklaşan sınavlar ve düşük bakiye uyarıları için kişiselleştirilmiş bildirimler.
- [ ] **Dark Mode:** Tüm uygulama için optimize edilmiş gece modu desteği.

---

## 📄 Lisans ve İletişim

Bu uygulama, **Kırklareli Üniversitesi** ekosistemi için modern bir vizyon projesidir. Geliştirme süreci devam etmektedir.

<p align="center">
  <img src="https://www.klu.edu.tr/images/logo.png" width="80" /><br>
  <b>KLU Mobil - Geleceğin Kampüsü, Bugün Cebinizde.</b><br>
  <i>Eğitimde Yenilik, Tasarımda Mükemmellik.</i>
</p>
