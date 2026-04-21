# Project: AIVI – Nissan & Renault (Automotive)

## Overall Architect
AIVI (Android In-Vehicle Infotainment) là hệ thống thông tin giải trí thế hệ mới xây dựng trên nền tảng **Android Automotive OS (AAOS)** dành cho dải sản phẩm xe của hãng Nissan và Renault.
Kiến trúc tổng thể của hệ thống tuân theo các chuẩn thiết kế Android Automotive System:
*   **Car Framework Layer**: Mở rộng các Service mặc định của `android.car` bằng việc phát triển các Car Service OEM chuyên biệt (ví dụ: `alliancecarservice_app`), cho phép App giao tiếp với các tính năng sâu của xe qua các API tùy chỉnh.
*   **Tầng VHAL (Vehicle HAL)**: Giao tiếp trực tiếp với hệ thống phần cứng và CAN bus của xe (thông qua interface `vendor.alliance.hardware.automotive.vehicle-V2.0-java`).
*   **Cơ chế IPC**: Luồng giao tiếp lõi giữa các Applications, System Services và Hardware dựa hoàn toàn vào cơ chế **Binder** và **AIDL** (Android Interface Definition Language), đảm bảo truyền tải dữ liệu nhanh chóng, bảo mật giữa các process (Inter-Process Communication).

---

## Modules: FOD (Feature on Demand)

### Định nghĩa: 
FOD (Feature on Demand) là một Service module tân tiến trên xe hơi kết nối Internet. Chức năng chính là cho phép hãng xe kích hoạt, mở khóa hoặc cấp quyền thuê bao (Subscription) các tính năng cao cấp của xe (như Advanced Navigation, Matrix LED, Premium Audio, ADAS...) thông qua mạng không dây (OTA - Over The Air) mà người dùng không cần mang xe đến đại lý. 

Đây là một module rất quan trọng đem lại nguồn doanh thu phần mềm (recurring revenue) cho Nissan và Renault, và tôi là người đảm nhận việc build module này từ con số 0 (*build from scratch*).

### Góc nhìn kỹ thuật & Các điểm nổi bật (Technical Highlights):

#### 1. Xây dựng System Service / CarService Plugin
*   Thiết kế hệ thống gốc dưới dạng một CarService Plugin (`com.nissan.car.fod` / `nissan.car.fod`) chạy ngầm dưới nền ở level System, độc lập hoàn toàn với App UI để tăng độ ổn định. 
*   Service được nạp vào ngay trong chuỗi khởi động của hệ điều hành thông qua việc tích hợp các thư viện boot marker (`libbootmarker`), tiếp nhận event bật màn hình và lắng nghe trạng thái network để đồng bộ state của tính năng với server.

#### 2. Thiết kế AIDL Interface & Cơ chế IPC cốt lõi
*   Tự tay định nghĩa và thiết kế toàn bộ các file API Contract `.aidl` nằm trong package `lib/`. Tầng này đóng vai trò xác định rõ ràng quyền truy xuất (Read/Subscribe) nào App được dùng, quyền Write/Update nào bị chặn.
*   Library này sau khi build thành `nissan.car.fod` Java lib được nhúng gọn vào ứng dụng để client có thể bind vào Service qua proxy pattern, che giấu hoàn toàn độ phức tạp của Binder.

#### 3. Data Serialization & Dynamic Configuration
*   Việc parse dữ liệu tính năng từ server phức tạp và lớn, nên thay vì dùng JSON thông thường làm chậm vòng lặp, tôi đã sử dụng **Protocol Buffers** (`libprotobuf_aivi2-java`) để Serialize/Deserialize các state được lưu trữ cục bộ, tăng tốc độ đọc ghi.
*   Liên kết với Module Config Hub (`confighub_client`) và OCM Services (`com.renault.alliance.ocm.services`) để làm mới định kỳ các tệp config của xe, đảm bảo xe luôn có trạng thái Subscription mới nhất mỗi khi cắm chìa khóa (Ignition).
*   Giao tiếp với `vendor.alliance.hardware.automotive.vehicle-V2.0-java` (Vehicle HAL) để đẩy tín hiệu phần cứng kích hoạt vật lý tính năng xuống cho các ECU/Cluster bên dưới.

#### 4. Phân quyền Bảo mật Hệ thống (System Security & SEPolicy)
*   Để bảo vệ việc Hacker hay Root phá khóa tính năng trả tiền, module FOD yêu cầu cấu hình bảo mật SELinux (`.te` files) cực kỳ khắt khe. 
*   Tôi đã thiết lập các quyền đọc/ghi nghiêm ngặt trong `alliancecarservice_app.te`, giới hạn chỉ duy nhất process `alliancecarservice_app` mới được quyền tạo (`create`), đọc (`r_dir_perms`), và ghi thay đổi vào thư mục mã hóa cấu hình (`nissan_fod_file`, `persist_alliance_file`). Ngăn chặn mọi app thứ ba hoặc User can thiệp giả lập tín hiệu kích hoạt.

#### 5. Kiến trúc Testing Toàn diện (SWUT, SWIT & KitchenSink)
Tôi đã chủ động setup một kiến trúc kiểm thử phần mềm tự động phân cấp hoàn chỉnh cho team:
*   **SWUT (Software Unit Testing)**: Viết test case cô lập cho tầng `lib` và `service` sử dụng mô hình Mocking (Mockito) để kiểm tra các luồng Logic kích hoạt của FOD.
*   **SWIT (Software Integration Testing)**: Chạy test Instrument để mô phỏng tích hợp sự liên lạc AIDL giữa file test và Service chạy thực.
*   **KitchenSink GUI**: Tích hợp một application giả lập (KitchenSink) như một màn hình UI ẩn. Các debug engineer (tại Hardware HIL Bench) có thể sử dụng KitckenSink để test và trigger mock event (ví dụ giả lập lúc gửi tín hiệu Mua/Gia hạn), hỗ trợ nghiệm thu Hardware thay vì phải chờ Cloud gửi lệnh thực tế.
