# Starter Web Framework

โปรเจกต์นี้ถูกออกแบบมาเพื่อช่วยให้การพัฒนาเว็บไซต์ด้วย **HTML, CSS, JavaScript และ Node.js** เป็นเรื่องง่ายขึ้น โดยมีฟีเจอร์เสริม เช่น Live Reload และ Clear Console เพื่อเพิ่มความสะดวกในการพัฒนา

---

## ✨ Features

### 1. Live Reload

ระบบ Live Reload ทำหน้าที่รีเฟรชหน้าเว็บให้อัตโนมัติเมื่อมีการแก้ไขไฟล์ ทำให้การพัฒนาเว็บเร็วขึ้นและคล้ายคลึงกับเทคโนโลยี reactive ของ framework ต่าง ๆ เช่น **React**, **Vue** เป็นต้น

> ⚠️ *ฟีเจอร์นี้รองรับเฉพาะการใช้งานบน localhost และไม่แนะนำให้ใช้บน production เนื่องจากจะเปิด network listener ค้างไว้ ทำให้หน้าเว็บรอการตอบรับทุก request*

### 2. Clear Console

เมื่อใช้งานร่วมกับ **nodemon**, ทุกครั้งที่มีการ restart เซิร์ฟเวอร์ ข้อความบน console จะเพิ่มขึ้นเรื่อย ๆ และอ่านยาก ฟีเจอร์ Clear Console จะช่วยล้างหน้าจอให้ใหม่ทุกครั้ง เพื่อให้ดู error หรือ log ได้ง่ายและชัดเจนขึ้น

### 3. VS Code Configuration

โปรเจกต์นี้มาพร้อมกับการตั้งค่า VS Code ที่ช่วยให้การจัดรูปแบบโค้ดอัตโนมัติสำหรับ **HTML**, **CSS** และ **JavaScript** ทำให้โค้ดอ่านง่ายและสม่ำเสมอมากขึ้น โดยจะทำการ format อัตโนมัติเมื่อบันทึกไฟล์

### 4. Dynamic CDN Loader

ฟังก์ชัน `loadCDN()` ช่วยให้สามารถโหลด CDN resources (CSS หรือ JavaScript) แบบ dynamic ได้อย่างง่ายดาย โดยจะตรวจสอบว่า resource นั้นถูกโหลดไปแล้วหรือยัง เพื่อป้องกันการโหลดซ้ำ และรองรับ Promise สำหรับการจัดการ asynchronous operations

**คุณสมบัติ:**
- โหลด CSS และ JavaScript จาก CDN แบบ dynamic
- ตรวจสอบและป้องกันการโหลดซ้ำ
- รองรับ Promise สำหรับ async/await
- Error handling ที่ชัดเจน

**ตัวอย่างการใช้งาน:**
```javascript
// โหลด CSS
loadCDN('css', 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css');

// โหลด JavaScript
loadCDN('js', 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js');

// ใช้งานกับ async/await
await loadCDN('css', 'https://cdn.example.com/style.css');
```

---

## 📌 Prerequisites

* **Node.js** (เวอร์ชัน 14 ขึ้นไป)
* **npm** หรือ **yarn**

---

## 📦 Installation

ติดตั้ง dependencies ทั้งหมดด้วยคำสั่ง:

```bash
npm install
```

---

## ⚙️ Configuration

โปรเจกต์นี้รองรับการตั้งค่าผ่านไฟล์ `.env` (สร้างไฟล์ใหม่ใน root directory):

```env
PORT=3000
NODE_ENV=localhost
```

- **PORT**: กำหนดพอร์ตที่เซิร์ฟเวอร์จะรัน (ค่าเริ่มต้น: 3000)
- **NODE_ENV**: กำหนดโหมดการทำงาน (`localhost` สำหรับ development, `production` สำหรับ production)

---

## 📁 Project Structure

```
node1/
├── public/              # ไฟล์ static (HTML, CSS, JS)
│   ├── assets/
│   │   └── js/
│   │       └── script.js    # loadCDN function
│   └── index.html
├── index.js             # Entry point ของแอปพลิเคชัน
├── package.json          # Dependencies และ scripts
└── README.md             # เอกสารประกอบ
```

---

## 🚀 Usage

### Development Mode

เปิดโหมดพัฒนา พร้อม Live Reload และ Clear Console:

```bash
npm run dev
```

### Production Mode

รันเซิร์ฟเวอร์แบบปกติ:

```bash
npm start
```

หรือใช้ **PM2** เพื่อจัดการ process สำหรับ production:

```bash
pm2 start index.js --name my-app
```

### ใช้ loadCDN Function

ฟังก์ชัน `loadCDN()` ถูกโหลดอัตโนมัติเมื่อหน้าเว็บโหลด (ผ่าน `script.js`) สามารถเรียกใช้งานได้ทันที:

```javascript
// โหลด CSS จาก CDN
loadCDN('css', 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css')
    .then(() => {
        console.log('Bootstrap CSS loaded!');
    })
    .catch((error) => {
        console.error('Failed to load CSS:', error);
    });

// โหลด JavaScript จาก CDN
loadCDN('js', 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js')
    .then(() => {
        console.log('Bootstrap JS loaded!');
    });

// ใช้ async/await
(async () => {
    try {
        await loadCDN('css', 'https://cdn.example.com/style.css');
        await loadCDN('js', 'https://cdn.example.com/script.js');
        console.log('All CDN resources loaded!');
    } catch (error) {
        console.error('Error loading CDN:', error);
    }
})();
```

> 💡 **เคล็ดลับ**: ฟังก์ชันจะตรวจสอบว่า resource ถูกโหลดไปแล้วหรือยัง หากโหลดแล้วจะไม่โหลดซ้ำ

---

## 📄 License

ISC License
