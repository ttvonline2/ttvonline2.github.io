# Projects: BMW-RSE (Rear Seat Entertainment) & GM-GVM (Global Virtual Machine)

## Overall Architecture
Hai dự án **BMW-RSE** (BMW) và **GM-GVM** (General Motors) đều chia sẻ chung một kiến trúc ảo hóa thế hệ mới. Dựa trên nền tảng **Linux Host OS (Hypervisor)** vững chắc, hệ thống cho phép chạy ảo hóa (container hóa) nhiều hệ điều hành song song trên cùng một vi xử lý (SoC) để phục vụ cho các màn hình giải trí trong xe.
*   **GM-GVM**: Chạy **1 Android Container** nhưng được cấu hình đặc biệt để chạy **2 Android Users (Profiles) cùng lúc** cho 2 hành khách phía sau, cho phép cá nhân hóa ứng dụng và âm thanh độc lập.
*   **BMW-RSE**: Phức tạp hơn với **1 Android Container** (chạy 2 Android users) kết hợp với **2 WebOS Containers** đóng vai trò xử lý Media/Screen Mirroring cho hành khách.

---

## 1. Project: GM-GVM (SystemUI & QuickControl)

### Vai trò & Nhiệm vụ
Tại dự án GM-GVM, tôi đảm nhận vai trò thiết kế và tinh chỉnh lại toàn bộ hệ thống giao diện lõi **SystemUI** của Android Automotive. Nổi bật nhất là việc xây dựng module **QuickControl** từ đầu để đáp ứng yêu cầu khắt khe của hệ thống đa người dùng chạy song song (Multi-user/Multi-display).

### Technical Highlights (Điểm nhấn Kỹ thuật)
*   **Kiến trúc Overlay UI (QuickControlBar)**:
    *   Xây dựng module `QuickControl` hoạt động như một SystemUI Overlay độc lập. Sử dụng `WindowManager` và cấu hình Window Flags/PixelFormat phức tạp để vẽ giao diện điều khiển (Độ sáng, Âm lượng, Nguồn) đè lên mọi ứng dụng khác mà không làm mất context (focus) của app hiện tại.
    *   Quản lý Animation mượt mà bằng **State Machine** và **QuickControlBarAnimator**.
*   **Xử lý Đa màn hình & Đa người dùng (Multi-display & Concurrent Users)**:
    *   Xây dựng logic định tuyến ngữ cảnh hiển thị (`DisplayId route`). Bằng cách tích hợp `IGvmDisplayHelper` và Context của từng User, giao diện QuickControl sẽ phân ra vẽ độc lập (Draw) trên đúng màn hình vật lý của User gọi đến, đảm bảo không bị chồng chéo sự kiện cảm ứng (Touch Events) giữa 2 hành khách. 
    *   Ứng dụng kiến trúc **Dagger/Hilt** (Dependency Injection) để inject chính xác `@DisplayId` và `@QuickControlView`, giúp Codebase SystemUI dễ dàng scale lên nhiều màn hình hơn nếu cần.
*   **Deep System Control (Điều khiển Hệ thống Sâu)**:
    *   Dưới nền, SystemUI gọi trực tiếp các API ẩn (`@hide`) của Android `PowerManager`, `AudioManager`, `DisplayManager` để kiểm soát độ cứng phần cứng (Articulation, Screen Share, Ngủ đông). Cơ chế Broadcast IPC được tận dụng để trigger trạng thái phần cứng của xe (VD: `com.lge.car.powerlight`).

---

## 2. Project: BMW-RSE (WebOS Projection)

### Vai trò & Nhiệm vụ
Với kiến trúc lai giữa Android và WebOS của BMW, tôi chịu trách nhiệm xây dựng hoàn toàn cục diện kiến trúc **WebOS Projection** từ con số 0 (Bao gồm cả HMI App và System Service). 
**Chức năng chính**: WebOS Projection đóng vai trò "cầu nối" giúp chuyển tiếp giao diện (Screen Mirroring/Projection), quản lý vòng đời ứng dụng (Lifecycle) và đồng bộ trạng thái chiếu phát phương tiện giữa môi trường Android và WebOS.

### Technical Highlights (Điểm nhấn Kỹ thuật)
*   **Cross-OS IPC Transport (Giao tiếp chéo hệ điều hành qua JNI/C++)**:
    *   Việc 2 Container (Android và WebOS) nói chuyện với nhau không đi qua TCP/IP thông thường để tránh độ trễ màn hình, mà đi qua một bus dữ liệu riêng là **LCPBus** (LGE Communication Platform Bus).
    *   Tôi đã phát triển tầng **Native JNI** (`LcpBusNativeService.cpp`, `libLCPBus.so`) trong Android Service để map các pointer và truyền nhận message tốc độ cao, tin cậy xuống tầng Linux Host.
*   **Android AIDL Core Service (Dịch vụ IPC nội bộ)**:
    *   Thiết kế kiến trúc Client-Server tại tầng Android. Định nghĩa toàn bộ các **AIDL interfaces** (`IWebosProjection.aidl`, `IWebosProjectionListener.aidl`, `IContainerCommunicationInterface.aidl`) để bọc lại độ phức tạp của JNI. 
    *   Service này chạy ẩn dưới background (được cấp đặc quyền `Priv-app permissions` trong `AndroidManifest.xml`) và được duy trì liên tục qua `BootReceiver.kt` ngay từ lúc hệ điều hành boot lên.
*   **HMI App Architecture (Ứng dụng giao diện Frontend)**:
    *   Mã nguồn HMI (`webosprojectionhmi`) được viết toàn bộ bằng Kotlin theo chuẩn **MVVM (Model-View-ViewModel)**. Thay vì dùng Thread thông thường, tôi sử dụng **Coroutines/Flow** để xử lý các luồng bất đồng bộ khi chờ tín hiệu từ WebOS trả về.
    *   Xây dựng `WebosProjectionManager` và `CrossPlatformAppManager` để quản lý các phiên trình chiếu (Sessions), bắt các lỗi mất kết nối khung hình và đảm bảo trải nghiệm phản chiếu phương tiện (Media Projection) liền mạch cho hành khách phía sau của BMW.
