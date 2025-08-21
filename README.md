## ⚠️ UYARI

**Bu bot sadece test amaçlı kullanılmalıdır!** Gerçek sunucularda kullanmak Discord kurallarına aykırı olabilir ve hesabınızın kapatılmasına neden olabilir.

## Kurulum
1. **Gerekli paketleri yükleyin:**
client.login("TOKEN"); Kısmına Tokeninizi Yazınız!


2. **Gerekli paketleri yükleyin:**
   ```bash
   npm install
   ```

3. **Discord Bot Token'ınızı ayarlayın:**
   - `.env` dosyası oluşturun
   - İçine şunu yazın: `DISCORD_TOKEN=your_bot_token_here`

4. **Bot'u çalıştırın:**
   ```bash
   npm start
   ```

## Kullanım

- `!bum` - Sunucudaki tüm üyeleri banlar (sadece yöneticiler kullanabilir)
- `!sil` - Sunucudaki tüm rolleri siler (sadece yöneticiler kullanabilir)
- `!kanal` - Sunucudaki tüm kanalları siler (sadece yöneticiler kullanabilir)

## Özellikler

- Sadece yönetici yetkisi olan kişiler komutu kullanabilir
- Bot'lar ve komutu kullanan kişi banlanmaz
- Rate limit'e takılmamak için 1 saniye bekleme
- Detaylı ban raporu

## Güvenlik

Bu bot sadece test ortamlarında kullanılmalıdır. Gerçek sunucularda kullanmak Discord ToS'a aykırıdır.
