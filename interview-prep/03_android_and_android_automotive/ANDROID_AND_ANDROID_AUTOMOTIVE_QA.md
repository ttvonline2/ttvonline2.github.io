# Android and Android Automotive Q&A

## Covered Areas
- Android fundamentals
- Services
- Android Automotive OS
- Automotive service design
- Features on Demand

## Questions

### Q22. What are the main Android building blocks?
Activities, services, broadcast receivers, and content providers.

### Q23. What is the difference between a started service and a bound service?
A started service runs work independently, while a bound service exposes an interface to clients.

### Q24. What is different about Android Automotive OS compared with standard Android?
AAOS runs directly in the vehicle and must integrate tightly with hardware, vehicle signals, and OEM requirements.

### Q25. What kinds of modules have you worked on in Android Automotive?
Examples include HVAC, Seat, Unit Services, FoD Service, Settings, Keyboard, SystemUI-related modules, and projection work.

### Q26. What is important when designing an Android Automotive service?
Stable IPC contracts, startup sequencing, permissions, recovery, and clean ownership boundaries.

### Q27. How would you explain Features on Demand in an interview?
It is a model where features are enabled or provisioned based on business rules, entitlement, or configuration.

### Q28. What are the main engineering risks in automotive Android projects?
Integration complexity, multi-team coordination, unstable interfaces, and strict reliability expectations.
