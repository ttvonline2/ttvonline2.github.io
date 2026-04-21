# Project: PIVI – Land Rover (Automotive)

## Overall Architect 
Toàn bộ IVI được chạy trên Headunit và chạy **QNX OS**. Giao tiếp với cụm đồng hồ (Cluster), HUD, Telematic thông qua giao thức **SOME/IP** (một số models cũ sẽ giao tiếp qua mạng **CAN**).

**Cơ chế IPC**: Sử dụng **QNX Persistent Publish/Subscribe (PPS)** và **POSIX Message Queues**. 
App giao tiếp với Service qua các lớp abstract `Proxy/Provider` được wrap lại (ví dụ: `OnlineMediaProxy`). Đồng thời kiến trúc này giúp phân tách hoàn toàn tầng Service xử lý logic và UI.

**Cơ chế Render UI sang màn hình phụ (Cluster/HUD)**: Đối với các màn hình chức năng như Bản đồ (Map) trên Cluster và HUD, giao diện đồ họa thực chất được chạy ngầm trên một màn hình phụ trên Headunit do **Window Manager** quản lý. 
**Cluster Service** đóng vai trò tính toán cấu hình hiển thị và cung cấp chính xác toạ độ (X, Y, Width, Height) dựa trên phiên bản màn hình (Highline, Midline+, tay lái nghịch/thuận). Sau đó, hình ảnh map đã được render hoàn chỉnh ở IVI sẽ được truyền tín hiệu video vật lý thẳng sang Cluster/HUD thông qua cáp **APIX (Automotive Pixel Link)** - một chuẩn truyền tải video tốc độ cao chuyên dụng trên hệ thống nhúng ô tô.

---

## Modules: Cluster Service (Data Proxy Manager)

### Định nghĩa:
Đây là một service middleware then chốt (viết bằng C++) đóng vai trò làm gateway chuyên giao tiếp, đồng bộ trạng thái và đẩy dữ liệu giữa Central Infotainment System (IVI) và các cụm màn hình của lái xe (Instrument Cluster và HUD).

### Một số điểm technical nổi bật:

#### 1. Xử lý Trạm trung chuyển dữ liệu chéo (Cross-domain Gateway)
*   Làm middleware đa luồng, stream các metadata nặng từ Infotainment (như thông tin cuộc gọi Bluetooth, Radio/SXM logos, metadata bài hát, cho đến dữ liệu dẫn đường theo thời gian thực). Đóng gói và phiên dịch các trạng thái này thành payload tín hiệu **SOME/IP** và **CAN** frames đẩy tới Cluster ECU mà không gây trễ vòng lặp.

#### 2. Quản lý Đồ họa và Tọa độ hiển thị (Dynamic Layout & Image Overlay)
*   Giao tiếp với `WindowService` và phát triển các session `ImageDrawer` API để overlay hình ảnh theo thời gian thực.
*   Cung cấp linh hoạt thông số hiển thị (toạ độ ảo, độ phân giải) để render trực tiếp các lớp đồ họa 2D (Map Junction View, Logo, Album Art) lên giao diện của Cluster mà không cần re-render ở ECU của màn hình phụ.

#### 3. Phân rã cấu hình theo Hardware (Hardware-Agnostic CCF Parsing)
*   Thiết kế hệ thống tự động đọc và nhận diện **Car Configuration File (CCF)** để định tuyến video pipeline. Tùy biến thông số đồ họa xe, độ sâu màu (`E_CLUSTER_COLOUR_DEPTH`), kích thước cab và tốc độ truyền tải cáp **APIX** (`E_APIX_LINK_SPEED`) khớp hoàn toàn với các biến thể phần cứng mà xe đang trang bị (Lowline, Midline+, MLA variant).

---

## Modules: Online Media Applications (Spotify, TuneIn, Deezer, Kuwo, Himalaya)

### Định nghĩa: 
Đây là một hệ thống ứng dụng giải trí để user có thể nghe nhạc và stream âm thanh trực tuyến đa nền tảng trên dòng xe Range Rover.

### Góc nhìn kỹ thuật: 
*   **UI Framework**: Xây dựng giao diện bằng **Qt/QML** kết hợp **C++**.
*   **API Integration**: Tương tác trực tiếp và gọi các web API của online media service nội bộ để thực hiện các tác vụ phát nhạc như: *request next/play*, *get metadata*, *get playlists*...

---

### Một số điểm techinical nổi bật mà tôi đã áp dụng cho Modules

#### 1. Xử lý Memory Leak và Tối ưu Tốc độ Tải Ảnh (Image Cache Mechanism)
*   **Vấn đề**: Cơ chế destroy view (tiêu hủy UI ẩn) được áp dụng để giảm thiết hụt memory cho hệ thống xe. Tuy nhiên nó gây ra issue phải tải lại các ảnh bìa album trực tuyến mỗi khi mở lại màn hình, gây chậm và tiêu tốn data.
*   **Giải pháp**: Tôi đã áp dụng *cached solution* tại tầng mạng. Tôi đã custom class `DiskCacheFactory` kế thừa từ `QQmlNetworkAccessManagerFactory` và đăng ký nó với QML Engine. `NetworkAccessManager` này tự động sử dụng `QNetworkDiskCache` để lưu bộ nhớ đệm hình ảnh xuống thư mục vật lý hệ thống (vd: `/var/onlinemedia/hmi`) với giới hạn 10MB.
*   **Kết quả**: Bất kỳ hình ảnh nào đã được tải vào view trước đó sẽ ngay lập tức được cung cấp từ local file system trong tích tắc mà không cần gọi network request, tiết kiệm RAM và băng thông.

#### 2. Định danh Playlist Yêu thích (Favorite Songs Mapping Logic)
*   **Vấn đề**: Việc map các danh sách bài hát yêu thích chung giữa các nền tảng đôi khi bị thiếu đồng bộ do cách mỗi service cung cấp ID.
*   **Giải pháp**: Tôi đã áp dụng các logic Mapping ID để phân luồng. Bằng cách thiết lập cứng (*hardcode*) các chuỗi Mapping ID cụ thể của Spotify (ví dụ: `#define LIKED_SONG_SPOTIFY_ID "spotify:collection:tracks"`). Khi user di chuyển vào mục *Nhạc yêu thích*, ID đặc thù này được tự động chèn ẩn xuống tầng data request để truy vấn chính xác danh sách cá nhân hóa dựa trên account được đăng nhập.

#### 3. Trích xuất màu Nền Động (Dynamic Vibrant Background Color từ Album Art)
*   **Vấn đề**: Đội design mong muốn trình phát có màu nền hòa hợp và biến đổi dựa trên ảnh *album art* của bài hát đang phát, chuyển đổi chậm và mượt.
*   **Giải pháp (C++ / QML Interop)**: 
    *   Bên **QML**, khi ảnh album load xong, tôi mượn hàm `grabToImage()` để lưu ảnh dưới dạng thumbnail thu nhỏ và truyền tín hiệu kích hoạt luồng xử lý bên C++.
    *   Bên **C++**, hàm `requestProcessVibrantColor()` load ảnh và quét các tọa độ pixel theo một khoảng bước nhảy (*JUMP_RANGE*). Lập trình thuật toán để tính tổng độ lệch giữa `lightness` và `saturation` của pixel hiện tại so với một mục tiêu chỉ định chuẩn. 
    *   Màu hex có độ lệch nhỏ nhất sẽ được coi là "Vibrant Color" lý tưởng và `emit` ngược lại bằng signal C++ `sigUpdateVibrantColor()`.
    *   Cuối cùng, QML bắt tín hiệu này, truyền chuỗi màu Hex vào thành phần đồ họa kết hợp `PropertyAnimation` để biến thiên màu nền mượt mà mà không giật cục.

#### 4. Kiến trúc Model-View-Adapter (MVA) Phân tán
*   **Giải pháp**: Xây dựng kiến trúc `Model-View-Adapter` với hệ thống các adapter (`BrowseAdapter`, `DiscoverAdapter`, `EnhanceDetailAdapter`...) để cầu nối giữa C++ Backend và QML Frontend. 
*   **Mục đích**: Tách biệt logic dữ liệu phức tạp khỏi UI code. Điều này đáp ứng được vòng lặp render trên xe ở tốc độ khung hình cao ổn định.

#### 5. Kỹ thuật Data Pagination và Lazy Loading 
*   **Giải pháp**: Xây dựng cơ chế *Lazy load* dựa trên *Offset* cho các danh sách rất lớn (như danh sách Track dài của Spotify). Tránh tải toàn bộ metadata bằng cách đặt ngưỡng giới hạn (ví dụ tải cọc 20 bài `m_offsetGetFavorite += 20`).
*   **Mục đích**: Tránh request timeout, chống chiếm dụng băng thông quá tay và tránh hiện tượng tràn RAM bộ nhớ (OOM) làm treo HMI khi parse một file JSON hoặc List Object khổng lồ.

#### 6. Tích hợp Đa Trợ Lý Ảo (Voice Assistants Multi-regional)
*   **Giải pháp**: Thiết kế hệ thống adapter API cho phép chuyển đổi (*Context-switching*) và ducking volume giữa các hệ sinh thái giọng nói của Amazon Alexa và Tmall Genie.
*   **Mục đích**: Chạy chuẩn hóa lệnh điều khiển giọng nói tùy thuộc vào thị trường xuất xưởng của xe.

#### 7. Hỗ trợ i18n và Localization (Đa ngôn ngữ)
*   Thực hiện đóng gói các pipeline ngôn ngữ động qua Qt Resource System (`languages.qrc`), giúp module Online Media tự động scale và đổi context text khi xe được chuyển sang các Region/Ngôn ngữ cấu hình tương ứng.

