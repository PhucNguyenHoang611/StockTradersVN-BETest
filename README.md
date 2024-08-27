# Nguyễn Hoàng Phúc - Stock Traders Dashboard

## Giới Thiệu

Stock Traders Realtime Dashboard là một hệ thống dashboard hiển thị dữ liệu chứng khoán theo thời gian thực. Ứng dụng sử dụng Node.js (NestJS), Kafka và cơ sở dữ liệu MongoDB để thu thập, xử lý và hiển thị dữ liệu chứng khoán. Hệ thống được tích hợp Websocket để gửi dữ liệu mới được cập nhật đến client.

## Công nghệ sử dụng

- **Node.js và NestJS**: Được sử dụng để phát triển API phía Back-end.
- **Kafka**: Xử lý dữ liệu và truyền dữ liệu giữa các microservice.
- **MongoDB**: Lưu trữ dữ liệu chứng khoán.
- **Websocket**: Gửi dữ liệu realtime đến client.
- **Docker**: Đóng gói và triển khai ứng dụng.
- **Azure**: Hosting

## Kiến Trúc - Microservices

1. **API Gateway**: Điều hướng request đến các microservice
2. **Stock Data Service**: Dịch vụ thu thập dữ liệu chứng khoán từ URL, xử lý và gửi đến Websocket Service thông qua Kafka, đồng thời lưu trữ vào MongoDB.
3. **Websocket Service**: Nhận dữ liệu từ Stock Data Service thông qua Kafka và gửi đến client.

## Cài Đặt và Triển Khai

### 1. Cài đặt Docker và Docker Compose

```bash
sudo apt update
sudo apt install docker.io docker-compose
```

### 2. Cài đặt mã nguồn

#### Clone Repository

```bash
git clone https://github.com/PhucNguyenHoang611/StockTradersVN-BETest
cd StockTradersVN-BETest
```

#### Cách 1: Triển khai local

npm install trong từng thư mục con và thêm file .env cho từng thư mục đó. Biến môi trường được cung cấp trong file docker-compose.yaml để tiện sử dụng.

#### Cách 2: Triển khai lên Docker và chạy dự án (sử dụng file docker-compose.yaml ở thư mục gốc)

```bash
docker compose up -d
```

### 3. Truy cập dự án

**1.** Truy cập http://localhost:8080/api ==> Swagger UI chứa các phương thức lấy dữ liệu chứng khoán, lịch sử và các phương thức CRUD cơ bản.

**2.** Sử dụng server websocket http://localhost:8080/ws-stock và lắng nghe sự kiện "STOCK_UPDATED" ==> Nhận những dữ liệu chứng khoán mới (nếu có giao dịch mới, hệ thống sẽ gửi trực tiếp đến client).

### Hoặc

### Truy cập thông qua link Azure đã được hosting:

- Bạn cũng có thể truy cập thông qua địa chỉ Azure sau:

**https://phucnhstocktraders.azurewebsites.net/api**

**https://phucnhstocktraders.azurewebsites.net/ws-stock**

# **Server websocket trên Azure có thể gặp một số vấn đề**
