<h5>Core Purpose Comparison</h5>

| Service     | Best For                                                 | Anti-Pattern           |
| ----------- | -------------------------------------------------------- | ---------------------- |
| **Kinesis** | Real-time analytics, telemetry, ordered event processing | Simple notifications   |
| **SNS**     | Instant fanout to multiple subscribers                   | Data persistence needs |
| **SQS**     | Decoupling, async message processing                     | Real-time streaming    |

<h5>Message Delivery & Consumers</h5>

| Feature       | Kinesis                          | SNS                | SQS                   |
| ------------- | -------------------------------- | ------------------ | --------------------- |
| **Consumers** | Multiple (independent iterators) | Multiple (push)    | Single (pull)         |
| **Ordering**  | Per-shard (strict)               | None               | FIFO or Standard      |
| **Retention** | 1-365 days                       | Immediate delivery | 1 min-14 days         |
| **Latency**   | Sub-second                       | <10ms              | <10ms (Short Polling) |

<h5>Scalability & Limits</h5>

| Service     | Throughput Unit  | Max Throughput          | Partitioning            |
| ----------- | ---------------- | ----------------------- | ----------------------- |
| **Kinesis** | Shard (1MB/s in) | Unlimited (add shards)  | Partition Key           |
| **SNS**     | Topic            | 30M subs, 100K/sec      | None                    |
| **SQS**     | Queue            | Unlimited (soft limits) | Message Group ID (FIFO) |

<h5>Pricing Model</h5>

| Service     | Cost Factors                    | Cost Example (us-east-1) |
| ----------- | ------------------------------- | ------------------------ |
| **Kinesis** | Shard hours + PUT payload units | $0.015/shard-hour        |
| **SNS**     | Notifications + data transfer   | $0.50/M notifications    |
| **SQS**     | Requests + data transfer        | $0.40/M requests         |

<h5>Failure Handling</h5>

| Service     | Retries            | Dead Letter Queue      | Durability           |
| ----------- | ------------------ | ---------------------- | -------------------- |
| **Kinesis** | Producer retries   | No DLQ (use retention) | 3 AZ replication     |
| **SNS**     | HTTP retries       | No DLQ (use SQS sub)   | Cross-AZ             |
| **SQS**     | Visibility timeout | Yes (configure DLQ)    | Cross-AZ (FIFO only) |

<h5>Integration Patterns</h5>

1. **Broadcast outage alerts** → SNS (fanout)
2. **Process IoT telemetry** → Kinesis (ordered streams)
3. **Decouple order processing** → SQS (async queues)

<h5>Exam Traps</h5>

- "SNS retains messages" → False (no retention)
- "SQS supports multiple consumers" → False (without SNS)
- "Kinesis is cheaper than SQS" → False (minimum shard cost)
- "SNS guarantees ordering" → False (only SQS FIFO/Kinesis)

<h5>Telecom Use Case</h5>

1. **Independent consumers:** Alerts + analytics read same stream
2. **Ordered events:** Track device state transitions
3. **Scalability:** Add shards per 1,000 devices
4. **Retention:** 24hr+ trend analysis

<h5>SQS: FIFO vs Standard</h5>

| Feature        | FIFO SQS                  | Standard SQS             |
| -------------- | ------------------------- | ------------------------ |
| **Ordering**   | Exactly-once, in-order    | Best-effort ordering     |
| **Throughput** | 3,000/sec (with batching) | Nearly unlimited         |
| **Duplicates** | No duplicates             | Possible (at-least-once) |
| **Use Cases**  | Banking transactions      | Metrics collection       |

<h5>EventBridge vs SNS</h5>

| Feature       | EventBridge            | SNS                       |
| ------------- | ---------------------- | ------------------------- |
| **Schema**    | Supports event schemas | Raw message payload       |
| **Targets**   | 18+ AWS services       | HTTP/SMS/Email/SQS/Lambda |
| **Filtering** | JSON path matching     | Attribute filtering       |

**Pro Tips:**

1. **FIFO Queues:** Remember "300/3000" throughput rule
2. **EventBridge:** Think "traffic director for serverless"
3. **SNS+SQS Fanout:** The "pub/sub backbone" pattern

### 🔄 Kinesis Data Streams vs. Kinesis Data Firehose (The Confusion Buster)

| Feature              | **Kinesis Data Streams**                           | **Kinesis Data Firehose**                                         |
| -------------------- | -------------------------------------------------- | ----------------------------------------------------------------- |
| **Scaling method**   | **Manual** – you configure and manage **shards**   | **Automatic** – fully managed scaling                             |
| **Serverless**       | ❌ Not fully – you manage capacity                 | ✅ Yes – fully serverless                                         |
| **Data retention**   | Up to 365 days (default 24 hrs)                    | Limited – only during processing buffer                           |
| **Use case**         | Custom processing (with Lambda, KCL, or consumers) | Simple ingestion → transform → store                              |
| **Data consumers**   | You build them (apps, Lambda, KCL, etc.)           | Built-in destinations: **S3**, **Redshift**, **OpenSearch**, etc. |
| **Ordering**         | Supported (per shard)                              | Not guaranteed                                                    |
| **Latency**          | Real-time (low latency)                            | Near-real-time (buffered, e.g., 60 secs)                          |
| **Setup complexity** | Moderate to High                                   | Very Low – plug-and-play                                          |
