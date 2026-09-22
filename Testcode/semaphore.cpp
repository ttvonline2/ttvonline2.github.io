#include <bits/stdc++.h>
using namespace std;

// Semaphore: tối đa 3 xe được đỗ cùng lúc
counting_semaphore<3> parking_lot(3);

// Mutex chỉ dùng để bảo vệ cout — tránh các dòng in bị lẫn lộn
mutex cout_mutex;

// Helper: in ra console một cách an toàn (thread-safe)
void log(const string& msg) {
    lock_guard<mutex> lock(cout_mutex);
    cout << msg << "\n";
}

void car(int id) {
    log("Xe " + to_string(id) + " dang cho cho trong...");

    // P (wait) — Giảm counter đi 1. Nếu counter = 0, xe phải đợi.
    parking_lot.acquire();

    log(">>> Xe " + to_string(id) + " da vao bai do xe.");
    this_thread::sleep_for(chrono::seconds(5)); // đỗ xe 2s

    log("<<< Xe " + to_string(id) + " roi khoi bai do.");

    // V (signal) — Tăng counter lên 1, báo cho xe khác có chỗ trống.
    parking_lot.release();
}

int main() {
    vector<thread> cars;

    for (int i = 1; i <= 66; ++i) {
        cars.emplace_back(car, i);
    }

    for (auto& t : cars) {
        t.join();
    }

    return 0;
}