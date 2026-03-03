#!/bin/bash
#
# VPS 多站部署脚本
# 在 VPS 上执行（ssh root@65.49.205.191）
# 用途：为 y2bmp3.com 和 y2script.com 配置 SSL、Caddy、CORS
#

set -e

echo "============================================"
echo " Y2 站群 VPS 配置脚本"
echo " 新增：y2bmp3.com + y2script.com"
echo "============================================"

# ============ 1. 创建 SSL 证书目录 ============
echo ""
echo "[1/5] 创建 SSL 证书目录..."

mkdir -p /etc/ssl/y2bmp3.com
mkdir -p /etc/ssl/y2script.com

echo "  ✓ /etc/ssl/y2bmp3.com/"
echo "  ✓ /etc/ssl/y2script.com/"

# ============ 2. 写入 SSL 证书 ============
echo ""
echo "[2/5] 写入 SSL 证书..."

# y2bmp3.com 证书
cat > /etc/ssl/y2bmp3.com/cert.pem << 'CERT_EOF'
-----BEGIN CERTIFICATE-----
MIIEoDCCA4igAwIBAgIUC5hF5XvMMMENuUd3/xY5yuX8KckwDQYJKoZIhvcNAQEL
BQAwgYsxCzAJBgNVBAYTAlVTMRkwFwYDVQQKExBDbG91ZEZsYXJlLCBJbmMuMTQw
MgYDVQQLEytDbG91ZEZsYXJlIE9yaWdpbiBTU0wgQ2VydGlmaWNhdGUgQXV0aG9y
aXR5MRYwFAYDVQQHEw1TYW4gRnJhbmNpc2NvMRMwEQYDVQQIEwpDYWxpZm9ybmlh
MB4XDTI2MDIyNjEzMDAwMFoXDTQxMDIyMjEzMDAwMFowYjEZMBcGA1UEChMQQ2xv
dWRGbGFyZSwgSW5jLjEdMBsGA1UECxMUQ2xvdWRGbGFyZSBPcmlnaW4gQ0ExJjAk
BgNVBAMTHUNsb3VkRmxhcmUgT3JpZ2luIENlcnRpZmljYXRlMIIBIjANBgkqhkiG
9w0BAQEFAAOCAQ8AMIIBCgKCAQEAnLndVxOOjTVHzLW6W6LdKfPp4/2Zr8odrm/E
3YopzNGXrHpi6JCRmApNOj/60T9fPbY+gMnnsdxrqGls7ps9dZnyt8VlAQA4xyrn
6UXg1eFRvhqtUA4n9Lams3FyFXXT6f157uHmUZnQak2tb62mOQVx4dJNkrMWxDss
cBNxCBfIe+1zeXXzc9j915GaCRsllK7bnRojCuSUiUFi112jcJNZDXxfsN6L8c9F
qnPw3Ti/Wqo4lonYN7+/262TfZpPidd2RmzoE3xP+BrQ3Hmj9JJlnsT3P7Y9V2X0
fO7wzRsQIIi7YpXoLBW+WcUdL6v8ja5vyqFLGEK9CWOFDz62EQIDAQABo4IBIjCC
AR4wDgYDVR0PAQH/BAQDAgWgMB0GA1UdJQQWMBQGCCsGAQUFBwMCBggrBgEFBQcD
ATAMBgNVHRMBAf8EAjAAMB0GA1UdDgQWBBRJH5JnHKxhW7SjyzRnuIkw4VkpejAf
BgNVHSMEGDAWgBQk6FNXXXw0QIep65TbuuEWePwppDBABggrBgEFBQcBAQQ0MDIw
MAYIKwYBBQUHMAGGJGh0dHA6Ly9vY3NwLmNsb3VkZmxhcmUuY29tL29yaWdpbl9j
YTAjBgNVHREEHDAaggwqLnkyYm1wMy5jb22CCnkyYm1wMy5jb20wOAYDVR0fBDEw
LzAtoCugKYYnaHR0cDovL2NybC5jbG91ZGZsYXJlLmNvbS9vcmlnaW5fY2EuY3Js
MA0GCSqGSIb3DQEBCwUAA4IBAQB1PSaKfjJpKVeHT6jEM5Z/M4HU3FAyaxzd9SPT
iixkDU9VucjD/Se0Sut5rMuluVfzcFE0NQVoCyO+LoehJQvHAang10tv6XZkAABU
skqRz8QFPEMkMnwV0DS6ifwKnZHynXZ4PuTOzRfQzIvQ3QuKriQP+MxhVzr1Wuhm
AFKsiySrYrd1xCd9ZGsGNMJ8svxSmTF8nBM+5+Jt5QaoZQHKwDQyb5OM0bz+Nxs4
iSxld1sZxV7CUiCbcF0D75CoLm/DIauv8jej9PF6MK+y3FEnm2aK8Ak5dxsRMyf+
/6P0Sq5UkmAhvvUwgnBgp/QB0L9WQOKbMnj2mEFWPyqa/ZtM
-----END CERTIFICATE-----
CERT_EOF

cat > /etc/ssl/y2bmp3.com/key.pem << 'KEY_EOF'
-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCcud1XE46NNUfM
tbpbot0p8+nj/Zmvyh2ub8TdiinM0ZesemLokJGYCk06P/rRP189tj6Ayeex3Guo
aWzumz11mfK3xWUBADjHKufpReDV4VG+Gq1QDif0tqazcXIVddPp/Xnu4eZRmdBq
Ta1vraY5BXHh0k2SsxbEOyxwE3EIF8h77XN5dfNz2P3XkZoJGyWUrtudGiMK5JSJ
QWLXXaNwk1kNfF+w3ovxz0Wqc/DdOL9aqjiWidg3v7/brZN9mk+J13ZGbOgTfE/4
GtDceaP0kmWexPc/tj1XZfR87vDNGxAgiLtilegsFb5ZxR0vq/yNrm/KoUsYQr0J
Y4UPPrYRAgMBAAECggEABbH1Wpwx0mzMuqIh7wGIkuUzqx7EjnBEStnx5/EE2tYE
8nYSEQxr1gAN1V+M0DzCy73LIKf1nO97FAgctsD6Z0McYFQyeupUpdwnyEDLTkpd
S5CxmpahGhHnFd85+5CoDjkxTJ513aI+whYnhsbjIvBRNpkLS5jpa2ERGNOECHyy
NBEguRr6M1rUxMqhLJHjYM70osNwsJ5guR0GojitSX1NzfyIM6RCAecNUh5NwzQV
NWnI344q9yghOqYdw8+J2LwooksxmUz2gxrz4WwYbHwkUMqAjWp7beFrLhxZ++QB
A1dZwKFQkN7Yx5LbNgAMIjul5oPsvoFCrbsBrWchKQKBgQDJGiG28h64zQuUYU+i
z/yKuPksVaXnPbY8zz9AuOskzVM37kYUps3w8dJmCVbUsh1dK6sl7mM0SuN/67Ou
7X4PpybhASjcj+BMLEQw9I9lUFypmZXwHbGozTVbv2+xWDoy/KmCP5ik2k5fUxEH
yGLOoryTN1M4P8a6CJEvM41ENQKBgQDHgovaYyWkEZh1DulyceySSo4h5jdlcxe7
YCtUxsBfxMd88gci3wRxRkiGtmJnTosUoEwP/JWE/EaTKZw4T0ISK62x3pKU8om0
/q/7SlRb7N6hh6YYgI5n4+k2mAgURWumjJZHDzP0/T4+rbyLjmLo+68J+X9+WTWi
50WGxzxt7QKBgGw+0J70vGykkfMQXhk48qqI3jZq854ArbMVqupfntJ0YrLcYoSD
NJ7Yy3N423ApX3zjIICOTH+9P69/Y3xpAU3Tny3FvgTavNTDjwD64qSaGQaBUR+q
HBLMQkhcRvaiktEXBvbA3Jz/lOfigmw6BFVNa0uin/zK92Dzc5KAoS1xAoGANHhs
956jw6atBfxKAUNdCIx7HQdDAndmgm0keENdTNKf9IhiwBUPQgtN/7/v2WOayG3w
EzRGzpbaqNGEuHp/0e+S2vjCbFHtTaC9/8TostR1KN5YHJGS4lfaefU6CrrHOSI4
U6/35jLEMA/ZSorEEKpAusrXcQ9dP967Nlsn1XECgYEAqLuaB0Q8/0iIexn4sEPK
FYU2OmE+nhng2GpKzlLqJcbNIPnTNMEfWHOT+9vJeM1dy1FBH14/PguM6k9vNxpm
RU2pql0K2uUhSKHoAAg8nMQ4nASd5WioEkmuVYxXwJCkMU2C8MK2TZZZaZkqoriD
xWwHMyj3VGjdcLfJbkdengQ=
-----END PRIVATE KEY-----
KEY_EOF

# y2script.com 证书
cat > /etc/ssl/y2script.com/cert.pem << 'CERT_EOF'
-----BEGIN CERTIFICATE-----
MIIEpDCCA4ygAwIBAgIUWa4PDtZkuPTlLXGD8EZ01Hnfi/gwDQYJKoZIhvcNAQEL
BQAwgYsxCzAJBgNVBAYTAlVTMRkwFwYDVQQKExBDbG91ZEZsYXJlLCBJbmMuMTQw
MgYDVQQLEytDbG91ZEZsYXJlIE9yaWdpbiBTU0wgQ2VydGlmaWNhdGUgQXV0aG9y
aXR5MRYwFAYDVQQHEw1TYW4gRnJhbmNpc2NvMRMwEQYDVQQIEwpDYWxpZm9ybmlh
MB4XDTI2MDIyNjEzMDcwMFoXDTQxMDIyMjEzMDcwMFowYjEZMBcGA1UEChMQQ2xv
dWRGbGFyZSwgSW5jLjEdMBsGA1UECxMUQ2xvdWRGbGFyZSBPcmlnaW4gQ0ExJjAk
BgNVBAMTHUNsb3VkRmxhcmUgT3JpZ2luIENlcnRpZmljYXRlMIIBIjANBgkqhkiG
9w0BAQEFAAOCAQ8AMIIBCgKCAQEAu0e4f1/dtgVv3GF6vf9v5/L1afI6bvuUyvsa
UAg6WoA1w677l9sjhlGdLxb/LLUWCnBCcke8NUuNh2SUBg6rBQsPjDfh43reL+dB
quWDWz6P9BPb+z6dkZTZTxOuP8dvvVRci07fc/+ngbBNedSteTO1VzxgWKmqT03d
IYplkEdIDlA6gGZV/2MCYo+YUP6NsTS3BUQeG8ed52oE6fiZFygrDVr6y0+iMTmB
li5UkHBrlhyYFOPu7hLQe0S+yRZAo2n93tzBdZPJMi+uyLoCqjK+NN15BOZU7Ibe
20cZbvnBXCpbhR/VBAEnU2I6mFdASebhFx5NfU1wjjIXtpcYQwIDAQABo4IBJjCC
ASIwDgYDVR0PAQH/BAQDAgWgMB0GA1UdJQQWMBQGCCsGAQUFBwMCBggrBgEFBQcD
ATAMBgNVHRMBAf8EAjAAMB0GA1UdDgQWBBSsZ1Nmsh4GEztfME6x6+FQj8WRZDAf
BgNVHSMEGDAWgBQk6FNXXXw0QIep65TbuuEWePwppDBABggrBgEFBQcBAQQ0MDIw
MAYIKwYBBQUHMAGGJGh0dHA6Ly9vY3NwLmNsb3VkZmxhcmUuY29tL29yaWdpbl9j
YTAnBgNVHREEIDAegg4qLnkyc2NyaXB0LmNvbYIMeTJzY3JpcHQuY29tMDgGA1Ud
HwQxMC8wLaAroCmGJ2h0dHA6Ly9jcmwuY2xvdWRmbGFyZS5jb20vb3JpZ2luX2Nh
LmNybDANBgkqhkiG9w0BAQsFAAOCAQEAfEWtik1kHCNDMVDA4HlMm1aSxjh5qJhy
BNY8nhwiwRdX4kIfF7z/8VxuHNNyydtA2zH/R6XGFnTyJaNmjKIUzKp1izUJgKpp
9W96CHbDSM94oQk/OuhhkwLIZGx4/YqQHVO2AhFlu3/BtAA2K3ksIBg1dZCnjmlg
4R51XP6k8jqVZnpkDVmgAwvPfUqZ0sYMqpaDcOtR0S69I75eJYN2SHRp3hil1PYC
niCvG6ESapRSnIE1dqTyB0RBhV8kVJz4iI4fmgPIOfk41huZhxPa0tUDAf5ZM8X4
THYTdqXP3xa2osHEEhA5wW8PeiBJWrruwi03OKizav/+4wkDXgmzxg==
-----END CERTIFICATE-----
CERT_EOF

cat > /etc/ssl/y2script.com/key.pem << 'KEY_EOF'
-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC7R7h/X922BW/c
YXq9/2/n8vVp8jpu+5TK+xpQCDpagDXDrvuX2yOGUZ0vFv8stRYKcEJyR7w1S42H
ZJQGDqsFCw+MN+Hjet4v50Gq5YNbPo/0E9v7Pp2RlNlPE64/x2+9VFyLTt9z/6eB
sE151K15M7VXPGBYqapPTd0himWQR0gOUDqAZlX/YwJij5hQ/o2xNLcFRB4bx53n
agTp+JkXKCsNWvrLT6IxOYGWLlSQcGuWHJgU4+7uEtB7RL7JFkCjaf3e3MF1k8ky
L67IugKqMr403XkE5lTsht7bRxlu+cFcKluFH9UEASdTYjqYV0BJ5uEXHk19TXCO
Mhe2lxhDAgMBAAECggEAEb0JHsw2VFxCReek8ZDblgBvYEaSMRrhJmZCp48jJjLi
MZOsWHjOh5Vi9vSnQyIvx6aHlKPYxSkcnm6KjeK4lIGBfbCshsuHdsmuCmeZjOK2
TdI0hTqSc0yO799979dbBqrFgGhkrJ8FZZ8MtFwBkx5KFplgYsvgye9Z4Shm1q02
Lq9AJgvuEFvn/czj2HWV5EtcO+XPdqjt7+gURoKM9tCtxyVOdzUpgHEZQ+/s5mxs
gVQzjkYG6so26bPkrb/zC4Lxl8fgDFg3JMC5McAlD/uHYRhfPIv+KPvBWYg6p7Dc
kKBII4+xz6faDiwym/rcpT+zf4KYWT05pdZICa03cQKBgQD+h9Gh8WajapjIUMZ6
EXXpmShPHO2W4mOaOieZWsgRCruDvXHMsqLS/T2XFuhu/UeXm7tZOQPzD75dcBLz
Q7jgXiiIa+c+04LHTMGjfWuJqejDfczEt7U0gj9kSjvptVGSgtYPItNkB4newqMm
FIb3FByhNvX5CAEZdj97TcVT2QKBgQC8XIJ822g251sZwb3VK8lGq9q61TEqVoxl
1EGhCo6fw3mz2TLxhEnVoNX2JoGN+xkzWqpJzRpjz9UTfdP45qBo2J5trJHtpyUM
BKFPGYfyGr/n3e7Qr99VNoZulAwDA9H1O0RIImX0SI2ddICXpWGFA225IdnL0zSM
e1Eh6rfnewKBgFrhU9BmyScAIJ0lejiLk3Zc4S+ePJbrLnUa3pi6+URceKeJNODJ
x6leEmeoHkXC2ZUgXbx1xxs6O9ZQ9fM18wTpmb9cB60/CCrxFRKy7Xqx2BI1ELAM
h/6/orLEbq/7tayCWrv8y02kA24uQOKP4cDGxZIqdZj9aqcUuYXlNtfBAoGAKQ3Q
sv3vPOg4BukfQvMEL48NYWNOD/hFKXyVwU/XviKQyA4y+Ejo/tLLT5cc7aEo4PSF
4Qf/FHob6t+l7730gGWWQjk2pSGlBXWM4vyhkLcb1KGeh4WNm7kCm99QrueKP3Tn
cQFuT0vw8byOun6lPqR8qbkjCzXBYk0OZeIOqzkCgYEAlfLnY4cwW+q0FjCBDAJM
dUxpg8qXKECSdZCdy9rrWg2UdY2VEzpgjxtE9x9ZNYt8qV+NhpVDXh6Sc0uCaHfJ
tQQM91QLlvcS6R4r+p02mB45SKedEzmChFW3B7BQ+rjHfK2bXhrtGDn7Io3n3qMh
lNiy2rIRUQz89LGVey2jhSQ=
-----END PRIVATE KEY-----
KEY_EOF

# 设置权限
chmod 600 /etc/ssl/y2bmp3.com/key.pem
chmod 600 /etc/ssl/y2script.com/key.pem
chmod 644 /etc/ssl/y2bmp3.com/cert.pem
chmod 644 /etc/ssl/y2script.com/cert.pem

echo "  ✓ y2bmp3.com 证书写入完成"
echo "  ✓ y2script.com 证书写入完成"

# ============ 3. 创建静态文件目录 ============
echo ""
echo "[3/5] 创建静态文件目录..."

# 先把现有的 /yt/dist 改名为 dist-y2mp4（如果还没改的话）
if [ -d "/yt/dist" ] && [ ! -d "/yt/dist-y2mp4" ]; then
    echo "  → 将 /yt/dist 重命名为 /yt/dist-y2mp4"
    cp -r /yt/dist /yt/dist-y2mp4
fi

mkdir -p /yt/dist-y2bmp3
mkdir -p /yt/dist-y2script

# 放一个临时页面，方便测试
echo '<html><body><h1>y2bmp3.com - Coming Soon</h1></body></html>' > /yt/dist-y2bmp3/index.html
echo '<html><body><h1>y2script.com - Coming Soon</h1></body></html>' > /yt/dist-y2script/index.html

echo "  ✓ /yt/dist-y2mp4/ (现有站)"
echo "  ✓ /yt/dist-y2bmp3/ (新建)"
echo "  ✓ /yt/dist-y2script/ (新建)"

# ============ 4. 更新 Caddyfile ============
echo ""
echo "[4/5] 更新 Caddyfile..."

# 备份当前配置
cp /etc/caddy/Caddyfile /etc/caddy/Caddyfile.bak.$(date +%Y%m%d%H%M%S)

cat > /etc/caddy/Caddyfile << 'CADDY_EOF'
# ============================================
# Y2 站群 Caddy 配置
# 三站共享同一个 Express 后端 (localhost:3000)
# ============================================

# ============ MP4 站（原站）============
y2mp4.com {
    tls /etc/ssl/y2mp4.com/cert.pem /etc/ssl/y2mp4.com/key.pem

    handle_path /api/* {
        reverse_proxy localhost:3000
    }

    handle {
        root * /yt/dist
        file_server
        try_files {path} {path}/index.html
    }

    log {
        output file /var/log/caddy/y2mp4-access.log
        level info
    }
}

www.y2mp4.com {
    tls /etc/ssl/y2mp4.com/cert.pem /etc/ssl/y2mp4.com/key.pem
    redir https://y2mp4.com{uri} permanent
}

# ============ MP3 站（新增）============
y2bmp3.com {
    tls /etc/ssl/y2bmp3.com/cert.pem /etc/ssl/y2bmp3.com/key.pem

    handle_path /api/* {
        reverse_proxy localhost:3000
    }

    handle {
        root * /yt/dist-y2bmp3
        file_server
        try_files {path} {path}/index.html
    }

    log {
        output file /var/log/caddy/y2bmp3-access.log
        level info
    }
}

www.y2bmp3.com {
    tls /etc/ssl/y2bmp3.com/cert.pem /etc/ssl/y2bmp3.com/key.pem
    redir https://y2bmp3.com{uri} permanent
}

# ============ 字幕站（新增）============
y2script.com {
    tls /etc/ssl/y2script.com/cert.pem /etc/ssl/y2script.com/key.pem

    handle_path /api/* {
        reverse_proxy localhost:3000
    }

    handle {
        root * /yt/dist-y2script
        file_server
        try_files {path} {path}/index.html
    }

    log {
        output file /var/log/caddy/y2script-access.log
        level info
    }
}

www.y2script.com {
    tls /etc/ssl/y2script.com/cert.pem /etc/ssl/y2script.com/key.pem
    redir https://y2script.com{uri} permanent
}
CADDY_EOF

echo "  ✓ Caddyfile 已更新（原文件已备份）"

# ============ 5. 更新 server.js CORS ============
echo ""
echo "[5/5] 更新 server.js CORS 白名单..."

# 备份
cp /yt/server/server.js /yt/server/server.js.bak.$(date +%Y%m%d%H%M%S)

# 替换 CORS 白名单
# 找到 allowedOrigins 行并替换
sed -i "s|const allowedOrigins = \[.*\];|const allowedOrigins = ['https://y2mp4.com', 'https://y2bmp3.com', 'https://y2script.com', 'https://yt.4ris.xyz', 'http://localhost:3000', 'http://localhost:3001'];|" /yt/server/server.js

echo "  ✓ CORS 白名单已更新"

# ============ 验证 + 重启 ============
echo ""
echo "============================================"
echo " 配置完成！执行以下命令重启服务："
echo "============================================"
echo ""
echo "  # 1. 验证 Caddy 配置"
echo "  caddy validate --config /etc/caddy/Caddyfile"
echo ""
echo "  # 2. 重启 Caddy"
echo "  systemctl restart caddy"
echo ""
echo "  # 3. 重启 Node（查看当前进程然后重启）"
echo "  ps aux | grep 'node.*server.js'"
echo "  # kill 掉旧进程后："
echo "  cd /yt/server && nohup node server.js > /var/log/node-server.log 2>&1 &"
echo ""
echo "  # 4. 验证站点"
echo "  curl -I https://y2bmp3.com"
echo "  curl -I https://y2script.com"
echo ""
echo "============================================"
echo " 别忘了在 Cloudflare 检查："
echo "  - SSL/TLS → Full (Strict) 模式"
echo "  - y2bmp3.com 删除多余的 A 记录 192.64.119.207"
echo "============================================"
