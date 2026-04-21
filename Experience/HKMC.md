# Project: HKMC (Hyundai Kia Motor Company)

## Overall Architecture
Dự án được xây dựng dựa trên nền tảng **QNX Hypervisor**, cung cấp khả năng ảo hóa phần cứng mạnh mẽ để chạy song song nhiều máy ảo (Virtual Machines) trên cùng một cấu hình vi xử lý của xe. Kiến trúc bao gồm:
*   **1 Linux VM**: Dành riêng cho Instrument Cluster (Cụm đồng hồ kỹ thuật số sau vô lăng) để đảm bảo chuẩn an toàn cao nhất (Safety Critical).
*   **1 Android VM**: Đóng vai trò là hệ điều hành chính cho màn hình trung tâm IVI (In-Vehicle Infotainment), xử lý các tác vụ giải trí, bản đồ, cài đặt.
*   **1 Linux VM - WebOS Container**: Một máy ảo Linux độc lập chạy container môi trường WebOS, chuyên biệt cho việc render và quản lý các ứng dụng/trình duyệt Web tốc độ cao hoặc các platform của bên thứ ba.

---

## Vai Trò & Các Module Phụ Trách
Tại dự án HKMC, tôi đóng vai trò kỹ sư phát triển và giám sát kiến trúc phần mềm, trực tiếp tham gia vào quá trình xây dựng các module lõi từ tầng System Service (C++/Java) lên đến giao diện Frontend HMI (Kotlin) cho hệ thống Android IVI.

---

## Technical Highlights (Điểm nhấn Kỹ thuật)

### 1. WebOS Projection (HMI & Service)
Đây là module phức tạp với nhiệm vụ trình chiếu và điều khiển chéo ứng dụng giữa WebOS Container và Android IVI màn hình trung tâm.
*   **Giao tiếp chéo hệ điều hành (Cross-OS IPC Transport)**: 
    *   Sử dụng **LCPBus (LGE Communication Platform Bus)** tại tầng C++ (Native JNI) để truyền nhận các luồng buffers video và message điều khiển touch/event giữa Android VM và WebOS Container với độ trễ thấp nhất (Low-latency), thay vì sử dụng mạng ảo TCP/IP nội bộ.
*   **Kiến trúc Backend Service & AIDL Core**:
    *   Xây dựng tầng `webosprojection` service tại Android chạy ngầm liên tục. Thiết kế các API Contract bằng **AIDL** (`IWebosProjection.aidl`) hoạt động dựa trên cơ chế **Binder** IPC của Android. Điều này cho phép app HMI dễ dàng bind vào hệ thống để bắt đầu hoặc kết thúc phiên trình chiếu một cách an toàn.
*   **HMI Architecture (`webosprojectionhmi`)**:
    *   Ứng dụng kiến trúc **MVVM (Model-View-ViewModel)**. Sử dụng **Kotlin Coroutines/Flow** để xử lý bất đồng bộ các tín hiệu gián đoạn từ WebOS trả về, đảm bảo luồng UI thread của Android không bị block khi render màn hình phản chiếu.

### 2. eCall System (Emergency Call - HMI & Service)
Hệ thống gọi khẩn cấp Telematics yêu cầu độ ổn định theo tiêu chuẩn an toàn kép.
*   **Phân tách Client - Server rõ ràng**: Xây dựng kiến trúc tách biệt hoàn toàn ranh giới. `ecallservice` (chạy ngầm system level) chịu trách nhiệm quản lý vòng đời cuộc gọi viễn thông (tự động kích hoạt khi túi khí nổ, hoặc qua nút cứng SOS), trong khi `ecallhmi` chỉ đóng vai trò giao diện cảnh báo và thao tác trên màn hình.
*   **Cross-domain signaling (SOME/IP & CAN)**: Ở tầng dưới (Native/C++), `ecallservice` giao tiếp chéo với màn hình **Linux Cluster VM** và bộ ECU viễn thông (TCU) bằng giao thức **SOME/IP**, giúp đẩy trực tiếp metadata cảnh báo khẩn cấp và trạng thái cuộc gọi ra màn hình vô lăng/HUD theo thời gian thực.

### 3. Qibla HMI & Manual HMI
Các ứng dụng tiện ích đặc thù yêu cầu xử lý dữ liệu động và tối ưu bộ nhớ.
*   **`QiblaHMI` (La bàn số Trung Đông)**: 
    *   Tích hợp sâu với System Location & Sensor Services qua **Binder**. 
    *   Ứng dụng **Dagger/Hilt** (Dependency Injection) để inject các repositories tính toán góc hướng chuẩn xác. Sử dụng luồng Data Flow liên tục đê xoay la bàn trên UI mượt mà dựa theo GPS và Gyroscope của xe đang di chuyển.
*   **`ManualHMI` (Sách HDSD Kỹ thuật số)**: 
    *   Xử lý engine render hàng ngàn tài nguyên (HTML/CSS tĩnh, hình ảnh) được nhúng trong màn hình. 
    *   Tối ưu hóa cơ chế tìm kiếm nội bộ linh hoạt (thay đổi ngôn ngữ/context realtime) và có khả năng liên kết với các mã lỗi (DTC - Diagnostic Trouble Code) thông qua IPC để popup đúng trang hướng dẫn sửa chữa khi xe gặp sự cố.
