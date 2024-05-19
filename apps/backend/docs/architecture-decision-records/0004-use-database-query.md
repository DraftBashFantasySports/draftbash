# Architectural Decision Record (ADR) Template

## Title
Use of Raw SQL for Database Queries Instead of an ORM

## Status
Accepted

## Context
Our project requires interacting with a relational database to perform various data operations. We have multiple options for implementing these interactions, including using an ORM framework like Hibernate or writing raw SQL queries.

## Decision
We have decided to use raw SQL queries instead of an ORM framework for the following reasons:

1. **Performance**: Raw SQL queries can often outperform ORMs in terms of execution time and resource usage, especially for complex queries or bulk operations. ORM frameworks introduce overhead such as object instantiation, caching, and query translation, which may not be necessary for all use cases.

2. **Fine-tuned Control**: Raw SQL provides developers with greater control over the generated queries. This allows us to optimize queries for specific database engines, leverage database-specific features, and fine-tune performance optimizations such as indexing and query hints.

3. **Complex Queries**: ORM frameworks may struggle to generate efficient SQL for complex queries involving multiple joins, subqueries, or advanced database features. Writing raw SQL allows us to express these complex operations more naturally and efficiently.

4. **Developer Familiarity**: Our development team has extensive experience with SQL and relational databases. Using raw SQL allows developers to leverage their existing skills and knowledge without the need to learn a new ORM framework.

## Consequences
While using raw SQL offers several advantages, there are also potential drawbacks and considerations:

1. **Maintenance Overhead**: Raw SQL queries require manual management of database interactions, including handling parameterization, SQL injection prevention, and database schema changes. This may increase maintenance overhead compared to using an ORM, which automates many of these tasks.

2. **Vendor Lock-in**: By directly writing SQL queries, we may become tightly coupled to specific database engines or dialects. This could pose challenges if we need to switch databases in the future, as the SQL syntax and features may vary between vendors.

3. **Complexity**: Writing and maintaining raw SQL queries can be more complex and error-prone than using an ORM, especially for developers less familiar with SQL or database internals. Care must be taken to ensure the correctness and security of the queries.

4. **Code Readability**: Raw SQL queries embedded within application code may reduce code readability and maintainability, especially if queries are scattered throughout the codebase. Proper documentation and organization of queries can help mitigate this issue.

## References
- Martin Fowler. "ORM Hate" https://www.martinfowler.com/bliki/OrmHate.html
- Stack Overflow. "When to use ORM and when not to use it?" https://stackoverflow.com/questions/1156994/when-to-use-orm-and-when-not-to-use-it