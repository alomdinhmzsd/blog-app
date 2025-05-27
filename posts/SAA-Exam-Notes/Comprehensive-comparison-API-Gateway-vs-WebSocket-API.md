#### Here’s a concise yet comprehensive comparison of API Gateway’s REST vs. WebSocket APIs in Notion-style Markdown, optimized for exam preparation:

<h5>API Gateway: REST vs. WebSocket APIs</h5>

**Front:**

### Compare REST and WebSocket APIs in API Gateway across these dimensions:

- State management
- Communication pattern
- Use cases
- Scaling

**Back:**  
| Dimension | REST API | WebSocket API |
|----------------|----------------------------------|----------------------------------|
| **State** | Stateless (each request independent) | Stateful (maintains connection context) |
| **Direction** | Client → Server (unidirectional) | Full-duplex (bidirectional real-time) |
| **Connections** | Temporary (HTTP) | Persistent (up to 2h idle timeout) |
| **Use Cases** | CRUD operations, mobile backends | Chat apps, live feeds, gaming |
| **Scaling** | Horizontal (stateless) | Vertical (stateful connections) |
| **Pricing** | Per request + data transfer | Connection minutes + messages |
| **Timeout** | 29s (default integration timeout) | 2h (idle connection timeout) |

<h5>When to Use Which API Type</h5>

**Front:**  
Match the scenario to the correct API type:

1. Stock trading platform
2. User profile management
3. Collaborative document editing
4. E-commerce product catalog

**Back:**

1. **Stock trading** → WebSocket (real-time updates)
2. **User profiles** → REST (CRUD operations)
3. **Document editing** → WebSocket (live collaboration)
4. **Product catalog** → REST (static data retrieval)

<h5>Stateful vs. Stateless Design</h5>

**Front:**  
What are the trade-offs between stateful and stateless architectures?

**Back:**  
**Stateful (WebSocket):**

- Pros: Real-time, efficient for frequent messages
- Cons: Harder to scale, connection management overhead

**Stateless (REST):**

- Pros: Simple scaling, fault-tolerant
- Cons: Overhead per request (headers/auth)

<h5>API Gateway Limits</h5>

**Front:**  
What are key limits for API Gateway WebSocket APIs?

**Back:**

- **Max connection duration:** 2 hours (idle timeout)
- **Message size:** 128KB (soft limit)
- **Routes:** 300 per API (connect/disconnect/default)
- **Regional only** (no edge-optimized deployment)

<h5>Integration Patterns</h5>

**Front:**  
How do REST and WebSocket APIs integrate with AWS services?

**Back:**  
**REST API:**

- Lambda (most common)
- HTTP backends (EC2/ALB)
- AWS services (Step Functions, DynamoDB)

**WebSocket API:**

- Lambda ($connect, $disconnect routes)
- DynamoDB (store connection IDs)
- SNS/SQS (broadcast messages)

<h5>Exam Traps</h5>

**Front:**  
What API Gateway misconceptions might appear on the exam?

**Back:**

- "REST APIs can maintain client state" → **False** (must be stateless)
- "WebSocket is cheaper for occasional traffic" → **False** (REST is better)
- "API Gateway supports TCP protocols" → **False** (HTTP/WebSocket only)
- "WebSocket APIs are edge-optimized" → **False** (regional only)

<h5>Real-World Analogy</h5>

**Front:**  
Explain REST vs. WebSocket using a restaurant analogy.

**Back:**  
**REST API:**

- Like ordering à la carte (each order is independent)
- Waiter doesn’t remember you

**WebSocket API:**

- Like a chef’s tasting menu (ongoing interaction)
- Waiter knows your preferences during the meal
