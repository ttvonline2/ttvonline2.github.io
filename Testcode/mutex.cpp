#include <bits/stdc++.h>
using namespace std;

int counter = 0;
mutex mtx; // Khởi tạo Mutex

void increaseCounter(int id) {
    for (int i = 0; i < 10000; ++i) {
        // Chỉ luồng nào giữ khóa mới được vào phần này
        lock_guard<mutex> lock(mtx);
        counter++;
        // lock_guard tự động trả khóa khi ra khỏi scope
    }
}

int main() {
    thread t1(increaseCounter, 1);
    thread t2(increaseCounter, 2);

    t1.join();
    t2.join();

    cout << "Gia tri cuoi cung cua counter: " << counter << endl;
    return 0;
}