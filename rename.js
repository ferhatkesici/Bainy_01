import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import { dirname, join, extname } from 'path';

const require = createRequire(import.meta.url);
const fs = require('fs');
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Yeniden adlandırma kuralları
const rules = {
    // React componentleri PascalCase kalmalı
    components: {
        pattern: /Component\.(jsx|tsx)$/,
        keep: true
    },
    // Page dosyaları PascalCase kalmalı
    pages: {
        pattern: /Page\.(jsx|tsx)$/,
        keep: true
    },
    // Hook dosyaları camelCase kalmalı
    hooks: {
        pattern: /^use[A-Z].*\.(js|ts)$/,
        keep: true
    }
};

// Kontrol edilecek dosya türleri
const validExtensions = ['.js', '.jsx', '.ts', '.tsx', '.css', '.scss', '.json'];

function shouldRename(filename) {
    const ext = extname(filename);
    
    // Geçerli uzantı kontrolü
    if (!validExtensions.includes(ext)) {
        return false;
    }

    // Kural kontrolü
    for (const rule of Object.values(rules)) {
        if (rule.pattern.test(filename) && rule.keep) {
            return false;
        }
    }

    return true;
}

function walkDir(dir) {
    try {
        fs.readdirSync(dir).forEach(file => {
            const fullPath = join(dir, file);
            
            if (fs.statSync(fullPath).isDirectory()) {
                // Klasör isimleri her zaman küçük harf
                const lowerDir = file.toLowerCase();
                if (file !== lowerDir) {
                    const newPath = join(dir, lowerDir);
                    console.log(`Klasör yeniden adlandırılıyor: ${file} -> ${lowerDir}`);
                    fs.renameSync(fullPath, newPath);
                    walkDir(newPath);
                } else {
                    walkDir(fullPath);
                }
            } else {
                if (shouldRename(file)) {
                    const lowerFile = file.toLowerCase();
                    if (file !== lowerFile) {
                        const newPath = join(dir, lowerFile);
                        console.log(`Dosya yeniden adlandırılıyor: ${file} -> ${lowerFile}`);
                        fs.renameSync(fullPath, newPath);
                    }
                } else {
                    console.log(`Değiştirilmedi (kural gereği): ${file}`);
                }
            }
        });
    } catch (error) {
        console.error(`Hata: ${dir} klasöründe işlem yapılırken hata oluştu:`, error);
    }
}

console.log('Dosya yeniden adlandırma işlemi başlıyor...');
console.log('-------------------------------------------');

// Önce bir yedek alalım
const backupDir = `backup-${Date.now()}`;
fs.mkdirSync(backupDir);
fs.cpSync('./src', join(backupDir, 'src'), { recursive: true });
console.log(`Yedek alındı: ${backupDir}`);

// Src klasöründe işlemi başlat
walkDir('./src');

console.log('-------------------------------------------');
console.log('İşlem tamamlandı!');
console.log(`Yedek klasörü: ${backupDir}`); 