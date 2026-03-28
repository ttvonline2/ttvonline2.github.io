# Software Design and Patterns Q&A

## Covered Areas
- OOP
- SOLID
- Singleton
- MVVM
- Clean Architecture
- Architecture decision making

## Questions

### Q13. What does good OOP mean in a production codebase?
Clear responsibilities, strong encapsulation, and low coupling.

### Q14. Which SOLID principles matter most in Android services?
Single Responsibility and Dependency Inversion usually matter the most.

### Q15. How do you avoid overengineering with patterns?
Start from the problem and only use a pattern when it reduces complexity or improves changeability.

### Q16. When is Singleton acceptable, and when is it risky?
It is acceptable for simple shared infrastructure, but risky when it creates hidden global mutable state.

### Q17. Why is MVVM commonly used on Android?
It separates UI logic from business logic and improves testability.

### Q18. How does Clean Architecture help in large systems?
It separates domain logic from frameworks, making systems easier to test and evolve.

### Q19. What is the difference between MVVM and Clean Architecture?
MVVM is a presentation pattern, while Clean Architecture is a broader system structure.

### Q20. How do you choose the right architecture for a new module?
Base the choice on complexity, lifetime, integration count, testability, and team constraints.

### Q21. What makes an architecture proposal credible in a real project?
It must address real requirements, boundaries, failure handling, and long-term maintainability.
