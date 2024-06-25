# ADR: Choosing Vertical Slice Architecture over Layered Architecture

## Context

In the context of developing a new software application, we need to decide on the architectural approach to structure our codebase. The two main options under consideration are vertical slice architecture and layered architecture.

## Decision

We choose to adopt the vertical slice architecture for structuring our codebase.

## Rationale

1. **Domain-Centric Structure**: Vertical slice architecture aligns closely with the domain-centric approach. Each vertical slice represents a feature or a use case, containing all the layers necessary to implement that feature, including domain logic, application services, and presentation components. This allows us to focus on a single feature at a time and maintain a clear separation of concerns within each slice.

2. **Reduced Coupling**: With vertical slice architecture, there is reduced coupling between different features or use cases. Each slice encapsulates its own set of functionality, reducing the risk of unintended dependencies between unrelated parts of the system. This makes it easier to maintain and extend the application over time.

3. **Improved Developer Productivity**: By organizing code around vertical slices, developers gain a better understanding of the application's behavior and structure. This improves productivity by reducing the cognitive load associated with navigating complex layered architectures. Developers can work more independently on different slices, leading to faster development cycles.

4. **Flexibility and Scalability**: Vertical slice architecture provides flexibility and scalability to accommodate changes in requirements or business logic. New features can be added as independent slices without affecting existing functionality. This allows us to iterate quickly and adapt to evolving business needs. If the application gets too large, each slice can become its own microservice.

5. **Testability**: Vertical slice architecture promotes better testability by encouraging the creation of focused, isolated tests for each feature. Unit tests, integration tests, and end-to-end tests can be developed for individual slices, leading to more comprehensive test coverage and easier debugging.

## Consequences

- **Initial Learning Curve**: Adopting vertical slice architecture may require a learning curve for developers accustomed to traditional layered architectures. However, the long-term benefits in terms of maintainability and scalability outweigh the initial investment in learning.

- **Consistency and Standardization**: Maintaining consistency across vertical slices is essential to avoid fragmentation and ensure coherence in the codebase. Standardization of patterns, naming conventions, and coding practices is necessary to reap the full benefits of vertical slice architecture.