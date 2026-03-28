# IPC, Binder, and AIDL Q&A

## Covered Areas
- IPC basics
- Binder
- AIDL
- Interface design
- Failure handling
- Debugging

## Questions

### Q29. Why is IPC important in Android system work?
System components often run in separate processes, so IPC provides structured communication between them.

### Q30. What is Binder in Android?
Binder is Android's core IPC mechanism for communication between processes and services.

### Q31. What is AIDL used for?
AIDL defines typed interfaces for remote communication between Android processes.

### Q32. What do you consider when designing an AIDL interface?
Keep it minimal, stable, version-aware, and aligned to business operations.

### Q33. What are typical IPC failure cases?
Service not available, process death, stale state, permission denial, and invalid input.

### Q34. How do you debug Binder or IPC issues?
Check service registration, logs, permissions, process state, startup order, and thread behavior.
