const { Client, GatewayIntentBits, PermissionsBitField } = require('discord.js');
require('dotenv').config();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

client.once('ready', () => {
    console.log(`${client.user.tag} olarak giriş yapıldı!`);
    console.log('Bot hazır!');
});

client.on('messageCreate', async (message) => {
    // Bot mesajlarını ve DM'leri yoksay
    if (message.author.bot || !message.guild) return;

    // !bum komutunu kontrol et
    if (message.content === '!bum') {
        // Sadece sunucu sahibi veya yönetici yetkisi olan kişiler kullanabilir
        if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
            return message.reply('❌ Bu komutu kullanmak için yönetici yetkisine sahip olmalısınız!');
        }

        try {
            const guild = message.guild;
            const members = await guild.members.fetch();
            
            message.reply('🚨 **DİKKAT!** Tüm üyeler banlanmaya başlanıyor...');
            
            let bannedCount = 0;
            let failedCount = 0;
            
            for (const [id, member] of members) {
                // Bot'u ve komutu kullanan kişiyi banlama
                if (member.user.bot || member.id === message.author.id) continue;
                
                try {
                    await member.ban({ reason: '!bum komutu ile toplu ban' });
                    bannedCount++;
                    console.log(`${member.user.tag} banlandı`);
                    
                    // Rate limit'e takılmamak için kısa bir bekleme
                    await new Promise(resolve => setTimeout(resolve, 1000));
                } catch (error) {
                    console.error(`${member.user.tag} banlanamadı:`, error.message);
                    failedCount++;
                }
            }
            
            message.reply(`✅ **Ban işlemi tamamlandı!**\n📊 Banlanan: ${bannedCount}\n❌ Başarısız: ${failedCount}`);
            
        } catch (error) {
            console.error('Ban işlemi sırasında hata:', error);
            message.reply('❌ Ban işlemi sırasında bir hata oluştu!');
        }
    }

    // !sil komutunu kontrol et
    if (message.content === '!sil') {
        // Sadece sunucu sahibi veya yönetici yetkisi olan kişiler kullanabilir
        if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
            return message.reply('❌ Bu komutu kullanmak için yönetici yetkisine sahip olmalısınız!');
        }

        try {
            const guild = message.guild;
            const roles = await guild.roles.fetch();
            
            message.reply('🗑️ **DİKKAT!** Tüm roller silinmeye başlanıyor...');
            
            let deletedCount = 0;
            let failedCount = 0;
            
            for (const [id, role] of roles) {
                // @everyone rolünü ve bot'un kendi rolünü silme
                if (role.name === '@everyone' || role.managed || role.id === guild.ownerId) continue;
                
                try {
                    await role.delete('!sil komutu ile toplu rol silme');
                    deletedCount++;
                    console.log(`${role.name} rolü silindi`);
                    
                    // Rate limit'e takılmamak için kısa bir bekleme
                    await new Promise(resolve => setTimeout(resolve, 1000));
                } catch (error) {
                    console.error(`${role.name} rolü silinemedi:`, error.message);
                    failedCount++;
                }
            }
            
            message.reply(`✅ **Rol silme işlemi tamamlandı!**\n🗑️ Silinen: ${deletedCount}\n❌ Başarısız: ${failedCount}`);
            
        } catch (error) {
            console.error('Rol silme işlemi sırasında hata:', error);
            message.reply('❌ Rol silme işlemi sırasında bir hata oluştu!');
        }
    }

    // !kanal komutunu kontrol et
    if (message.content === '!kanal') {
        // Sadece sunucu sahibi veya yönetici yetkisi olan kişiler kullanabilir
        if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
            return message.reply('❌ Bu komutu kullanmak için yönetici yetkisine sahip olmalısınız!');
        }

        try {
            const guild = message.guild;
            const channels = await guild.channels.fetch();
            
            message.reply('📺 **DİKKAT!** Tüm kanallar silinmeye başlanıyor...');
            
            let deletedCount = 0;
            let failedCount = 0;
            
            for (const [id, channel] of channels) {
                // Sistem kanallarını ve komutu kullanılan kanalı silme
                if (channel.type === 4 || channel.type === 5 || channel.id === message.channel.id) continue;
                
                try {
                    await channel.delete('!kanal komutu ile toplu kanal silme');
                    deletedCount++;
                    console.log(`${channel.name} kanalı silindi`);
                    
                    // Rate limit'e takılmamak için kısa bir bekleme
                    await new Promise(resolve => setTimeout(resolve, 1000));
                } catch (error) {
                    console.error(`${channel.name} kanalı silinemedi:`, error.message);
                    failedCount++;
                }
            }
            
            message.reply(`✅ **Kanal silme işlemi tamamlandı!**\n📺 Silinen: ${deletedCount}\n❌ Başarısız: ${failedCount}`);
            
        } catch (error) {
            console.error('Kanal silme işlemi sırasında hata:', error);
            message.reply('❌ Kanal silme işlemi sırasında bir hata oluştu!');
        }
    }
});

// Hata yakalama
client.on('error', error => {
    console.error('Bot hatası:', error);
});

// Bot'u Discord'a bağla
client.login("Token");
