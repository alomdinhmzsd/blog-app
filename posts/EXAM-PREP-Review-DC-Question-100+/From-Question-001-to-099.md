---
title: 'SAA-Q001: Choose the Most Cost-Effective S3 Storage Class for Unpredictable Log Access'
questionId: 'saa-q001'
category: 'Design Cost-Optimized Architectures'
tags:
  [
    'saa-c03',
    's3',
    'intelligent-tiering',
    'storage-classes',
    'cost-optimization',
  ]
---

## Question 'SAA-Q001'

A solutions architect needs to backup some application log files from an online ecommerce store to Amazon S3. It is unknown how often the logs will be accessed or which logs will be accessed the most. The solutions architect must keep costs as low as possible by using the appropriate S3 storage class.

**Which S3 storage class should be implemented to meet these requirements?**

- S3 Intelligent-Tiering
- S3 Glacier
- S3 One Zone-Infrequent Access (S3 One Zone-IA)
- S3 Standard-Infrequent Access (S3 Standard-IA)

---

## 1. In Simple English

The architect needs to store log files in S3. Since it’s unclear which logs will be accessed or how often, the chosen S3 storage class must automatically adjust to access patterns to keep costs low without requiring manual oversight.

---

## 2. Verbiage & Realism

| Aspect         | Assessment                                                                               |
| -------------- | ---------------------------------------------------------------------------------------- |
| Clarity        | The question is clear and direct.                                                        |
| Realism        | Highly realistic scenario — logs with unpredictable access are common.                   |
| Trap Potential | Medium — IA and Glacier seem cost-effective but aren’t suited to unknown usage patterns. |

---

## 3. What the Question is Testing

| Concept Being Tested                     | Explanation                                          |
| ---------------------------------------- | ---------------------------------------------------- |
| S3 storage class selection               | Choosing the right class based on access frequency.  |
| Cost-optimization under uncertainty      | Minimizing storage costs without known usage trends. |
| Automated tiering and storage management | Understanding when auto-tiering provides advantages. |

---

## 4. Answer and Explanation

✅ **Correct Answer: S3 Intelligent-Tiering**

| Option                                             | Verdict      | Explanation                                                                                                                                                                                                 |
| -------------------------------------------------- | ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **S3 Intelligent-Tiering**                         | ✅ Correct   | Designed for data with unknown or changing access patterns. It automatically moves data between frequent and infrequent tiers based on access, minimizing cost without requiring manual lifecycle policies. |
| **S3 Glacier**                                     | ❌ Incorrect | Intended for long-term archival. Retrieval is slow and expensive, making it unsuitable for data that might need unpredictable or real-time access.                                                          |
| **S3 One Zone-Infrequent Access (S3 One Zone-IA)** | ❌ Incorrect | Cheaper than Standard-IA but stores data in a single Availability Zone, which reduces durability. It's also meant for known infrequently accessed data.                                                     |
| **S3 Standard-Infrequent Access (S3 Standard-IA)** | ❌ Incorrect | Good for known infrequent access patterns, but not for unpredictable usage. Retrieval costs may rise if logs are accessed more than expected.                                                               |

---

## 5. Final Answer

- S3 Intelligent-Tiering

---

## 6. Relevant AWS Documentation

| Topic                                                                                                              | Link                                                      |
| ------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------- |
| [Amazon S3 Storage Classes Overview](https://aws.amazon.com/s3/storage-classes/)                                   | Overview of all S3 storage class options.                 |
| [S3 Intelligent-Tiering FAQs](https://aws.amazon.com/s3/faqs/#Intelligent-Tiering)                                 | Details on cost structure and automation features.        |
| [Choosing the Right Storage Class](https://docs.aws.amazon.com/AmazonS3/latest/userguide/storage-class-intro.html) | Best practices for selecting the appropriate class.       |
| [Amazon S3 Pricing](https://aws.amazon.com/s3/pricing/)                                                            | Cost comparison across classes, including retrieval fees. |

---

## 7. Are the Options Tricky?

| Option                                         | Trickiness                                                                                     |
| ---------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| S3 Intelligent-Tiering                         | ✅ Straightforward once you understand auto-tiering.                                           |
| S3 Glacier                                     | ⚠️ May seem appealing due to low cost, but not suitable for active or unknown access patterns. |
| S3 One Zone-Infrequent Access (S3 One Zone-IA) | ⚠️ Lower cost, but poor durability and not fit for critical log files.                         |
| S3 Standard-Infrequent Access (S3 Standard-IA) | ⚠️ Common wrong choice — retrieval charges make it costly if access is underestimated.         |

---

## 8. How to Approach Similar Questions

**Strategy**: If a question says the data access frequency is _unknown_ or _may vary_, eliminate fixed-access options like Glacier and IA. Instead, look for classes with **automated tiering** like S3 Intelligent-Tiering.

**Tip**: Think in terms of operational effort — Intelligent-Tiering requires no manual lifecycle management and provides optimal cost control when access patterns are unpredictable.

---

## 9. Technology Deep Dive

| Feature        | S3 Intelligent-Tiering       | S3 Standard-IA          | S3 One Zone-IA                      | S3 Glacier               |
| -------------- | ---------------------------- | ----------------------- | ----------------------------------- | ------------------------ |
| Durability     | 99.999999999% (11 9s)        | 99.999999999% (11 9s)   | 99.999999999% (11 9s) but single AZ | 99.999999999% (11 9s)    |
| Availability   | 99.9%                        | 99.9%                   | 99.5%                               | Varies (low)             |
| Retrieval Fees | Archive tier only            | Yes                     | Yes                                 | Yes                      |
| Retrieval Time | Immediate (standard)         | Immediate               | Immediate                           | Minutes to hours         |
| Best Use Case  | Unknown or changing patterns | Known infrequent access | Low-cost single-AZ storage          | Deep archive (long-term) |
| Auto-Tiering   | ✅ Yes                       | ❌ No                   | ❌ No                               | ❌ No                    |

---

## 10. Summary Table

| Criteria                                   | Best Option               |
| ------------------------------------------ | ------------------------- |
| Unpredictable access frequency             | ✅ S3 Intelligent-Tiering |
| Long-term archive, no regular access       | S3 Glacier                |
| Known low-access, low durability tolerance | S3 One Zone-IA            |
| Known low-access, high durability needed   | S3 Standard-IA            |

---

## 11. Concept Expansion / Key Facts

S3 Intelligent-Tiering is purpose-built for data with unknown or changing access patterns. It automatically monitors object access and moves data between access tiers without any manual intervention or lifecycle rules.

It has no retrieval fees when objects remain in either the frequent or infrequent tier, making it highly cost-efficient even if access patterns fluctuate.

Intelligent-Tiering is the only S3 storage class that adapts automatically, which reduces the risk of human error or misjudging access frequency.

It also allows you to opt in to archival access tiers (Archive Access and Deep Archive Access), further reducing storage costs for objects that become cold over time.

This class is ideal for application logs, user-uploaded content, and other datasets where you can’t predict how often individual objects will be read — giving you the balance of performance and savings with minimal operational overhead.

In contrast, IA classes penalize you if your assumptions are wrong, and Glacier requires thoughtful planning around retention and retrieval timing.

For cost-conscious architectures with uncertain patterns, S3 Intelligent-Tiering is a “set it and forget it” solution that aligns perfectly with AWS Well-Architected Framework’s cost optimization pillar.

---

---

title: "SAA-Q002: Designing an Ordered, Real-Time Ingestion Pipeline for IoT Device Data"
questionId: "saa-q002"
category: "Design High-Performing Architectures"
tags: ["saa-c03", "kinesis-data-streams", "iot-ingestion", "ordered-events", "partition-keys"]

---

## Question 'SAA-Q002'

A retail company with many stores and warehouses is implementing IoT sensors to gather monitoring data from devices in each location. The data will be sent to AWS in real time. A solutions architect must provide a solution for ensuring events are received in order for each device and ensure that data is saved for future processing.

**Which solution would be MOST efficient?**

- Use an Amazon SQS standard queue for real-time events with one queue for each device. Trigger an AWS Lambda function from the SQS queue to save data to Amazon S3
- Use an Amazon SQS FIFO queue for real-time events with one queue for each device. Trigger an AWS Lambda function for the SQS queue to save data to Amazon EFS
- Use Amazon Kinesis Data Streams for real-time events with a partition key for each device. Use Amazon Kinesis Data Firehose to save data to Amazon S3
- Use Amazon Kinesis Data Streams for real-time events with a shard for each device. Use Amazon Kinesis Data Firehose to save data to Amazon EBS

---

## 1. In Simple English

The company wants to collect IoT data from devices in real time. The data for each device must arrive in the exact order it was sent. The solution should be efficient and store the data for later use.

---

## 2. Verbiage & Realism

| Aspect         | Assessment                                                                                                    |
| -------------- | ------------------------------------------------------------------------------------------------------------- |
| Clarity        | The question is clearly phrased and includes both constraints and goals.                                      |
| Realism        | Very realistic — ingesting IoT telemetry in-order and storing it is a common use case.                        |
| Trap Potential | High — multiple options seem correct but misuse core AWS service behaviors (e.g., shards vs. partition keys). |

---

## 3. What the Question is Testing

| Concept Being Tested                          | Explanation                                                             |
| --------------------------------------------- | ----------------------------------------------------------------------- |
| Real-time ingestion using AWS native services | Evaluates knowledge of AWS streaming services for telemetry ingestion.  |
| Event ordering guarantees                     | Tests understanding of how ordering is maintained with Kinesis and SQS. |
| Efficient data persistence                    | Focuses on best storage targets and pipelines for durable stream data.  |

---

## 4. Answer and Explanation

✅ **Correct Answer: Use Amazon Kinesis Data Streams for real-time events with a partition key for each device. Use Amazon Kinesis Data Firehose to save data to Amazon S3**

| Option                                                                                                                                                                | Verdict      | Explanation                                                                                                                                                                         |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Use an Amazon SQS standard queue for real-time events with one queue for each device. Trigger an AWS Lambda function from the SQS queue to save data to Amazon S3** | ❌ Incorrect | SQS standard queues do not guarantee ordering. Even with separate queues, this introduces complexity and is not the most efficient solution for real-time streaming.                |
| **Use an Amazon SQS FIFO queue for real-time events with one queue for each device. Trigger an AWS Lambda function for the SQS queue to save data to Amazon EFS**     | ❌ Incorrect | FIFO queues do guarantee order, but managing one per device doesn't scale well. Also, Amazon EFS is not ideal for event stream data compared to S3.                                 |
| **Use Amazon Kinesis Data Streams for real-time events with a partition key for each device. Use Amazon Kinesis Data Firehose to save data to Amazon S3**             | ✅ Correct   | Partition keys in Kinesis ensure ordering per device. Kinesis Firehose efficiently batches and writes data to S3. This is scalable, efficient, and purpose-built for this use case. |
| **Use Amazon Kinesis Data Streams for real-time events with a shard for each device. Use Amazon Kinesis Data Firehose to save data to Amazon EBS**                    | ❌ Incorrect | You don’t create one shard per device — you use partition keys. Also, EBS is block storage, not designed for ingesting and storing streaming data.                                  |

---

## 5. Final Answer

- Use Amazon Kinesis Data Streams for real-time events with a partition key for each device. Use Amazon Kinesis Data Firehose to save data to Amazon S3

---

## 6. Relevant AWS Documentation

| Topic                                                                                                                                           | Link                                                        |
| ----------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------- |
| [Amazon Kinesis Data Streams Overview](https://docs.aws.amazon.com/streams/latest/dev/introduction.html)                                        | Explains real-time stream processing and partition key use. |
| [Kinesis Data Firehose Delivery](https://docs.aws.amazon.com/firehose/latest/dev/what-is-this-service.html)                                     | Details how Firehose can persist streaming data into S3.    |
| [Kinesis Partition Key vs Shard](https://docs.aws.amazon.com/streams/latest/dev/key-concepts.html)                                              | Describes how Kinesis ensures per-partition ordering.       |
| [Choosing Between SQS and Kinesis](https://aws.amazon.com/blogs/compute/building-event-driven-applications-with-amazon-sqs-and-amazon-kinesis/) | When to use each streaming or queuing service.              |

---

## 7. Are the Options Tricky?

| Option                                     | Trickiness                                                                  |
| ------------------------------------------ | --------------------------------------------------------------------------- |
| SQS Standard Queue with S3                 | ⚠️ Misleads due to Lambda+S3 appearing valid; lacks ordering.               |
| SQS FIFO Queue with EFS                    | ⚠️ Partially correct but inefficient, not scalable, and bad storage choice. |
| Kinesis with Partition Key + Firehose + S3 | ✅ Clearly correct if you know Kinesis fundamentals.                        |
| Kinesis with Shard per Device + EBS        | ❌ Misuse of both shards and destination (EBS is not stream storage).       |

---

## 8. How to Approach Similar Questions

**Strategy**: Focus on three dimensions — _ordering guarantees_, _scalability_, and _appropriate data sinks_. Kinesis + partition key ensures ordered events per device without exploding your architecture.

**Tip**: When ordering matters per device or user, use partition keys. Avoid per-device FIFO queues unless the number of devices is extremely limited — it's not scalable.

---

## 9. Technology Deep Dive

| Feature                    | Amazon SQS (Standard) | Amazon SQS (FIFO) | Kinesis Data Streams + Partition Key | Kinesis Data Streams + Shard | Firehose + S3             |
| -------------------------- | --------------------- | ----------------- | ------------------------------------ | ---------------------------- | ------------------------- |
| Guarantees Ordering        | ❌ No                 | ✅ Yes            | ✅ Yes (per partition key)           | ✅ Yes (per shard)           | ✅ Preserves stream order |
| Scalability                | ✅ High               | ⚠️ Limited        | ✅ High                              | ⚠️ Needs shard management    | ✅ High                   |
| Ease of Integration        | ✅ Easy               | ✅ Easy           | ⚠️ Requires stream setup             | ⚠️ Complex                   | ✅ Fully managed          |
| Storage Target Suitability | ✅ S3-friendly        | ❌ EFS suboptimal | ✅ S3 via Firehose                   | ❌ EBS unsuitable            | ✅ Ideal                  |

---

## 10. Summary Table

| Requirement                     | Best Option                |
| ------------------------------- | -------------------------- |
| Per-device event ordering       | Kinesis with partition key |
| Real-time ingestion             | Kinesis or SQS             |
| Efficient and scalable          | Kinesis Firehose to S3     |
| Poor choices for stream storage | EBS, EFS                   |

---

## 11. Concept Expansion / Key Facts

- **Amazon Kinesis Data Streams** provides **per-partition key ordering**, which makes it ideal for scenarios like IoT, where each device sends a stream of data that must be preserved in order.
- **Partition keys** allow devices to share shards while still maintaining order per device — much more scalable than dedicating a shard per device.
- **Amazon Kinesis Data Firehose** simplifies stream-to-storage by buffering, batching, and writing data automatically to S3, Redshift, or other services — it removes the need to manage consumers manually.
- Avoid **EBS and EFS** as final destinations for streaming data unless you have a very specific requirement for a file or block interface — they are not optimized for ingestion pipelines.
- **SQS FIFO queues** do maintain order but managing thousands of them (one per device) can become complex and expensive, and lacks the throughput and parallelism of Kinesis-based designs.

---

---

title: "SAA-Q003: Choosing the Right EC2 Pricing Models for Development and Production"
questionId: "saa-q003"
category: "Design Cost-Optimized Architectures"
tags: ["saa-c03", "ec2", "pricing-models", "reserved-instances", "capacity-reservations", "cost-optimization"]

---

## Question 'SAA-Q003'

Amazon EC2 instances in a development environment run between 9am and 5pm Monday–Friday. Production instances run 24/7.  
**Which pricing models should be used to optimize cost and ensure capacity is available?**  
_(Select TWO.)_

- Use Reserved instances for the production environment
- Use On-Demand instances for the production environment
- Use Spot instances for the development environment
- Use Reserved instances for the development environment
- On-demand capacity reservations for the development environment

---

## 1. In Simple English

The production servers are always on, so their pricing model should reduce cost while securing availability. The development servers run only during weekday business hours, so the goal is to optimize cost while ensuring capacity when needed — without overpaying during off-hours.

---

## 2. Verbiage & Realism

| Aspect         | Assessment                                                                               |
| -------------- | ---------------------------------------------------------------------------------------- |
| Clarity        | Very clear distinction between dev and prod environments.                                |
| Realism        | Highly realistic — many companies have this exact pattern.                               |
| Trap Potential | High — Spot is attractive, but not always safe for dev environments that need stability. |

---

## 3. What the Question is Testing

| Concept Being Tested                         | Explanation                             |
| -------------------------------------------- | --------------------------------------- |
| Pricing model selection for EC2              | Match workload patterns to cost models. |
| Cost optimization for variable workloads     | Avoid waste on part-time usage.         |
| Operational reliability vs pricing tradeoffs | Spot vs capacity reservation nuance.    |

---

## 4. Answer and Explanation

✅ **Correct Answers:**

- Use Reserved instances for the production environment
- On-demand capacity reservations for the development environment

| Option                                                              | Verdict      | Explanation                                                                                                                                                    |
| ------------------------------------------------------------------- | ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Use Reserved instances for the production environment**           | ✅ Correct   | Production is always running and needs guaranteed capacity. Standard or Convertible RIs offer long-term cost savings (up to 72%) and capacity assurance.       |
| **Use On-Demand instances for the production environment**          | ❌ Incorrect | Works but costs significantly more than RIs for long-term workloads — no added benefit.                                                                        |
| **Use Spot instances for the development environment**              | ❌ Incorrect | Cheaper, but risk of interruption may disrupt dev workflows and reduce productivity. Not ideal for environments needing session persistence.                   |
| **Use Reserved instances for the development environment**          | ❌ Incorrect | Reserved capacity would be underutilized (only 24% weekly usage), resulting in wasted cost.                                                                    |
| **On-demand capacity reservations for the development environment** | ✅ Correct   | Provides guaranteed capacity during specific hours with no long-term commitment. Allows termination when not needed, matching part-time schedules efficiently. |

---

## 5. Final Answer

- Use Reserved instances for the production environment
- On-demand capacity reservations for the development environment

---

## 6. Relevant AWS Documentation

| Topic                                                                                                                 | Link                                              |
| --------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------- |
| [Amazon EC2 Pricing Models](https://aws.amazon.com/ec2/pricing/)                                                      | Overview of EC2 cost structures.                  |
| [Reserved Instances](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/reserved-instances-types.html)               | Deep dive into RIs and their types.               |
| [On-Demand Capacity Reservations](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-capacity-reservations.html) | Details on reserving capacity without commitment. |
| [EC2 Spot Instances](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-spot-instances.html)                   | Spot overview and caveats.                        |

---

## 7. Are the Options Tricky?

| Option                               | Trickiness                                                                     |
| ------------------------------------ | ------------------------------------------------------------------------------ |
| Reserved for Production              | ✅ Solid, textbook scenario.                                                   |
| On-Demand for Production             | ⚠️ Tempting fallback — but not cost-optimized.                                 |
| Spot for Development                 | ⚠️ Cost-effective but risky for dev environments requiring session continuity. |
| Reserved for Development             | ❌ Inefficient for part-time use.                                              |
| Capacity Reservation for Development | ✅ Slightly advanced — balances availability and flexibility.                  |

---

## 8. How to Approach Similar Questions

**Strategy**: First categorize workloads: _always-on_ (production) vs _variable/short-lived_ (development). Then:

- Use **Reserved Instances** for 24/7 workloads to lock in savings and guarantee capacity.
- Use **On-Demand Capacity Reservations** when you need flexible capacity during predictable windows (like dev hours), without upfront cost or risk of interruption.

**Tip**: Spot saves money but is only appropriate when interruptions are acceptable. For dev sessions where stability matters, capacity reservations hit the sweet spot.

---

## 9. Technology Deep Dive

| Feature             | Reserved Instances          | On-Demand Instances        | Spot Instances              | Capacity Reservations                      |
| ------------------- | --------------------------- | -------------------------- | --------------------------- | ------------------------------------------ |
| Best for            | Long-term, stable workloads | Short-term, flexible jobs  | Interruption-tolerant tasks | Predictable short windows needing capacity |
| Commitment Required | 1 or 3 years                | None                       | None                        | None                                       |
| Guarantees Capacity | ✅ Yes                      | ✅ Yes                     | ❌ No                       | ✅ Yes                                     |
| Cost Savings        | ✅ Up to 72%                | ❌ Expensive for long-term | ✅ Up to 90%                | ❌ No discount, but flexible               |
| Interruptible       | ❌ Never                    | ❌ Never                   | ✅ Yes                      | ❌ Never                                   |
| Billing Granularity | Hourly (fixed)              | Per second                 | Per second                  | Per second                                 |

---

## 10. Summary Table

| Scenario                     | Best Pricing Model             |
| ---------------------------- | ------------------------------ |
| 24/7 predictable workload    | Reserved Instances             |
| Flexible, stable 9–5 dev use | On-Demand Capacity Reservation |
| Dev/test, interruption OK    | Spot Instances                 |
| Occasional/volatile use      | On-Demand (fallback)           |

---

## 11. Concept Expansion / Key Facts

- **Reserved Instances** offer deep cost savings for long-term, stable usage like production systems. Standard RIs lock you into instance type and region but offer the greatest savings. Convertible RIs allow flexibility at slightly lower discounts.
- **On-Demand Capacity Reservations** are often misunderstood — they let you guarantee EC2 capacity **without any upfront payment or long-term contract**. This is perfect for **short-term, predictable needs**, like development environments that run 9-to-5. You’re only billed for the capacity while it’s running, and you don’t risk resource unavailability.
- **Spot Instances** sound ideal for dev/test use cases, but **session-sensitive environments** may not tolerate 2-minute termination notices — especially where devs lose unsaved progress or pipelines must be restarted manually.
- Using **Reserved Instances for part-time workloads** is cost-inefficient: you'd be paying for 168 hours/week but using only 40 — a >75% waste.
- **Combining pricing models** is often the real-world solution. For example: Reserved Instances for always-on systems + Spot for non-critical CI pipelines + Capacity Reservations for human-in-the-loop dev systems.
- AWS also offers **Savings Plans**, which provide similar discounts to RIs but with more flexibility — an alternative worth exploring for mixed environments.

---

---

title: "SAA-Q004: Optimizing MySQL Database Latency for Global Application Users"
questionId: "saa-q004"
category: "Design High-Performing Architectures"
tags: ["saa-c03", "aurora-global-database", "rds-read-replica", "mysql", "latency-optimization", "global-apps"]

---

## Question 'SAA-Q004'

A financial services company has a web application with an application tier running in the U.S and Europe. The database tier consists of a MySQL database running on Amazon EC2 in `us-west-1`. Users are directed to the closest application tier using Route 53 latency-based routing. The users in Europe have reported poor performance when running queries.

**Which changes should a Solutions Architect make to the database tier to improve performance?**

- Migrate the database to an Amazon Aurora global database in MySQL compatibility mode. Configure the application tier in Europe to use the local reader endpoint
- Migrate the database to Amazon RedShift. Use AWS DMS to synchronize data. Configure applications to use the RedShift data warehouse for queries
- Migrate the database to Amazon RDS for MySQL. Configure Multi-AZ in one of the European Regions
- Create an Amazon RDS Read Replica in one of the European regions. Configure the application tier in Europe to use the read replica for queries

---

## 1. In Simple English

The application runs in both the U.S. and Europe, but the database is only in the U.S., causing slow query responses for European users. The architect needs to reduce database query latency for those users.

---

## 2. Verbiage & Realism

| Aspect         | Assessment                                                                                           |
| -------------- | ---------------------------------------------------------------------------------------------------- |
| Clarity        | The question is clearly worded and realistic in describing a latency problem.                        |
| Realism        | Very realistic scenario — applications deployed globally but relying on a regional database.         |
| Trap Potential | Moderate — several options look valid but only one handles **global** low-latency reads efficiently. |

---

## 3. What the Question is Testing

| Concept Being Tested                        | Explanation                                                              |
| ------------------------------------------- | ------------------------------------------------------------------------ |
| Cross-region latency mitigation             | How to optimize read performance across continents.                      |
| Database architecture modernization         | Testing knowledge of global Aurora and RDS patterns.                     |
| Use of replication and read scaling methods | Assesses familiarity with Aurora global readers, read replicas, and DMS. |

---

## 4. Answer and Explanation

✅ **Correct Answer: Migrate the database to an Amazon Aurora global database in MySQL compatibility mode. Configure the application tier in Europe to use the local reader endpoint**

| Option                                                                                                                                                              | Verdict      | Explanation                                                                                                                                                   |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Migrate the database to an Amazon Aurora global database in MySQL compatibility mode. Configure the application tier in Europe to use the local reader endpoint** | ✅ Correct   | Aurora Global Database replicates data across AWS regions with sub-second latency. This lets the EU app tier read from a local, low-latency replica.          |
| **Migrate the database to Amazon RedShift. Use AWS DMS to synchronize data. Configure applications to use the RedShift data warehouse for queries**                 | ❌ Incorrect | RedShift is a data warehouse, not suited for transactional query workloads. This is a mismatch for typical application queries.                               |
| **Migrate the database to Amazon RDS for MySQL. Configure Multi-AZ in one of the European Regions**                                                                 | ❌ Incorrect | Multi-AZ provides high availability within a single region, not low-latency access across continents. It also doesn’t provide cross-region reads.             |
| **Create an Amazon RDS Read Replica in one of the European regions. Configure the application tier in Europe to use the read replica for queries**                  | ❌ Incorrect | While promising, cross-region RDS read replicas can have higher replication lag than Aurora Global DB and don't support as fast failover or read scalability. |

---

## 5. Final Answer

- Migrate the database to an Amazon Aurora global database in MySQL compatibility mode. Configure the application tier in Europe to use the local reader endpoint

---

## 6. Relevant AWS Documentation

| Topic                                                                                                                                             | Link                                                       |
| ------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| [Amazon Aurora Global Databases](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-global-database.html)                        | How Aurora replicates across regions with low latency.     |
| [Best Practices for Global Applications](https://aws.amazon.com/blogs/database/best-practices-for-building-global-applications-on-amazon-aurora/) | Designing performant multi-region apps.                    |
| [RDS Read Replicas](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_ReadRepl.html)                                                    | Differences between Aurora replicas and RDS read replicas. |
| [Aurora MySQL vs RDS MySQL](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/AuroraMySQL.Updates.20180206.html)                       | Performance benefits and global capabilities.              |

---

## 7. Are the Options Tricky?

| Option                                | Trickiness                                                                      |
| ------------------------------------- | ------------------------------------------------------------------------------- |
| Aurora Global Database + Local Reader | ✅ Straightforward and purpose-built for this use case.                         |
| RedShift + DMS                        | ❌ Not appropriate — wrong service type for transactional reads.                |
| RDS MySQL Multi-AZ in EU              | ⚠️ May seem helpful, but only solves regional HA — not global performance.      |
| Cross-Region RDS Read Replica         | ⚠️ Feels close, but higher lag and limited failover options compared to Aurora. |

---

## 8. How to Approach Similar Questions

**Strategy**: Focus on three elements — where users are located, where data is stored, and whether reads or writes are latency-sensitive. If users span multiple continents and reads dominate, **Aurora Global Database** is the top-tier option.

**Tip**: Always match service tier to latency and scale. Aurora Global = subsecond multi-region reads. RDS Read Replica = eventual consistency, higher lag, and less efficient global access.

---

## 9. Technology Deep Dive

| Feature                  | Aurora Global Database         | RDS Read Replica              | RDS Multi-AZ           | Amazon RedShift                  |
| ------------------------ | ------------------------------ | ----------------------------- | ---------------------- | -------------------------------- |
| Cross-region Replication | ✅ Yes (subsecond latency)     | ✅ Yes (minutes-lag possible) | ❌ No                  | ❌ No                            |
| Regional Read Access     | ✅ Local reader endpoints      | ⚠️ Supported but slower       | ❌ Not available       | ❌ Not for OLTP workloads        |
| Write Availability       | ✅ US primary                  | ❌ One-way from primary       | ✅ HA in single region | ⚠️ Write-optimized for analytics |
| Use Case Fit             | Global apps needing fast reads | Slower global read option     | Regional HA only       | Analytics, not transactional     |
| Auto-failover + Recovery | ✅ Fast failover               | ⚠️ Manual                     | ✅ Yes                 | ❌ Not designed for failover     |

---

## 10. Summary Table

| Goal                              | Best Solution    |
| --------------------------------- | ---------------- |
| Global application, regional read | Aurora Global DB |
| High availability, single region  | RDS Multi-AZ     |
| Analytics queries                 | RedShift         |
| Cross-region reads with some lag  | RDS Read Replica |

---

## 11. Concept Expansion / Key Facts

- **Amazon Aurora Global Database** is designed for **globally distributed applications** with a single writable region and **read replicas in up to five additional regions**, supporting **millisecond-level replication lag**. This makes it ideal for reducing cross-region read latency, like in this scenario where European users experience slow reads from a U.S. database.
- **Reader endpoints** in remote regions allow the application to connect to a local read-only replica, drastically reducing latency without requiring full database re-architecture.
- While **RDS MySQL Read Replicas** do support cross-region deployment, they suffer from **higher replication lag**, and lack the performance and automatic failover capabilities that Aurora offers. They're more suited to bursty or analytical read loads that tolerate staleness.
- **RDS Multi-AZ** is for availability within one region. It provides failover protection but doesn't help with global read latency — all reads still go to the region where the primary resides.
- **Amazon RedShift** is a **data warehouse**, not a transactional database. While you can use AWS DMS to migrate relational data into it, it's **not suitable** for real-time queries from a web application that expects transactional consistency and low latency.
- In high-performance global apps, **choosing Aurora Global Database not only improves read performance but simplifies operational management**, reducing the need for complex multi-region replication setups and manual failover design.

---

---

title: "SAA-Q005: Selecting a Shared NFS-Compatible Storage Solution Across AZs for EC2"
questionId: "saa-q005"
category: "Design High-Performing Architectures"
tags: ["saa-c03", "efs", "nfs", "multi-az", "shared-storage", "ec2"]

---

## Question 'SAA-Q005'

A company is deploying a fleet of Amazon EC2 instances running Linux across multiple Availability Zones within an AWS Region. The application requires a data storage solution that can be accessed by all of the EC2 instances simultaneously. The solution must be highly scalable and easy to implement. The storage must be mounted using the NFS protocol.

**Which solution meets these requirements?**

- Create an Amazon EBS volume and use EBS Multi-Attach to mount the volume to all EC2 instances across each Availability Zone
- Create an Amazon RDS database and store the data in a BLOB format. Point the application instances to the RDS endpoint
- Create an Amazon EFS file system with mount targets in each Availability Zone. Configure the application instances to mount the file system
- Create an Amazon S3 bucket and create an S3 gateway endpoint to allow access to the file system using the NFS protocol

---

## 1. In Simple English

The company needs a shared storage system that all EC2 instances in multiple Availability Zones can mount like a shared network drive. It must support the NFS protocol, be easy to scale, and simple to implement.

---

## 2. Verbiage & Realism

| Aspect         | Assessment                                                                                         |
| -------------- | -------------------------------------------------------------------------------------------------- |
| Clarity        | The requirements are clearly outlined: scalability, NFS, and cross-AZ access.                      |
| Realism        | Highly realistic — shared file systems for horizontally scaled EC2 applications are a common need. |
| Trap Potential | Moderate — several options seem plausible, but only one meets **all** technical criteria.          |

---

## 3. What the Question is Testing

| Concept Being Tested                    | Explanation                                                                    |
| --------------------------------------- | ------------------------------------------------------------------------------ |
| Cross-AZ shared storage design          | Assessing knowledge of storage that works across AZs.                          |
| NFS-based file system compatibility     | Tests familiarity with AWS services that support NFS.                          |
| Storage service fit for EC2 deployments | Evaluates which AWS storage services integrate directly and scalably with EC2. |

---

## 4. Answer and Explanation

✅ **Correct Answer: Create an Amazon EFS file system with mount targets in each Availability Zone. Configure the application instances to mount the file system**

| Option                                                                                                                                          | Verdict      | Explanation                                                                                                                                                                |
| ----------------------------------------------------------------------------------------------------------------------------------------------- | ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Create an Amazon EBS volume and use EBS Multi-Attach to mount the volume to all EC2 instances across each Availability Zone**                 | ❌ Incorrect | EBS Multi-Attach only supports instances in the **same AZ**, and only for specific instance types and file systems. It’s not suitable for scalable multi-AZ NFS workloads. |
| **Create an Amazon RDS database and store the data in a BLOB format. Point the application instances to the RDS endpoint**                      | ❌ Incorrect | RDS is not a file system and doesn't support NFS. Storing files as BLOBs introduces complexity and performance tradeoffs.                                                  |
| **Create an Amazon EFS file system with mount targets in each Availability Zone. Configure the application instances to mount the file system** | ✅ Correct   | Amazon EFS is designed for this use case — scalable, NFS-compatible, and supports simultaneous multi-AZ access via mount targets.                                          |
| **Create an Amazon S3 bucket and create an S3 gateway endpoint to allow access to the file system using the NFS protocol**                      | ❌ Incorrect | S3 is an object store, not a POSIX-compliant file system. It doesn’t support native NFS access or mounting in the traditional sense.                                       |

---

## 5. Final Answer

- Create an Amazon EFS file system with mount targets in each Availability Zone. Configure the application instances to mount the file system

---

## 6. Relevant AWS Documentation

| Topic                                                                                                             | Link                                       |
| ----------------------------------------------------------------------------------------------------------------- | ------------------------------------------ |
| [Amazon EFS Overview](https://aws.amazon.com/efs/)                                                                | Service overview with supported use cases. |
| [Mounting Amazon EFS File Systems](https://docs.aws.amazon.com/efs/latest/ug/mounting-fs.html)                    | Guide to mounting EFS on EC2 using NFS.    |
| [Amazon EBS Multi-Attach Limitations](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ebs-volumes-multi.html) | AZ-scoped and limited use cases.           |
| [Amazon S3 vs EFS vs EBS Comparison](https://aws.amazon.com/efs/faqs/)                                            | FAQ and service comparison matrix.         |

---

## 7. Are the Options Tricky?

| Option                   | Trickiness                                                                       |
| ------------------------ | -------------------------------------------------------------------------------- |
| EBS Multi-Attach         | ⚠️ Can mislead due to "multi-attach" wording — limited to same AZ and use cases. |
| RDS with BLOBs           | ❌ Poor storage design pattern — adds overhead and loses file system features.   |
| Amazon EFS               | ✅ Clear choice if familiar with AWS storage tiers.                              |
| S3 with gateway endpoint | ⚠️ Sounds plausible — but S3 is not NFS mountable or a traditional file system.  |

---

## 8. How to Approach Similar Questions

**Strategy**: Focus on technical constraints like “must use NFS,” “mountable,” and “multi-AZ access.” Immediately eliminate object stores (S3) and database backends (RDS) for file system needs.

**Tip**: When a question mentions **shared file access** with NFS semantics, Amazon EFS is almost always the right fit. Watch out for EBS Multi-Attach being misapplied across AZs — it's restricted.

---

## 9. Technology Deep Dive

| Feature                         | Amazon EFS | Amazon EBS (Multi-Attach) | Amazon S3         | Amazon RDS                 |
| ------------------------------- | ---------- | ------------------------- | ----------------- | -------------------------- |
| Supports NFS                    | ✅ Yes     | ❌ Not directly           | ❌ No             | ❌ No                      |
| Multi-AZ Access                 | ✅ Yes     | ❌ No (AZ-local only)     | ✅ Yes (via HTTP) | ✅ Yes (but not mountable) |
| Mountable on EC2 as file system | ✅ Yes     | ⚠️ Limited                | ❌ No             | ❌ No                      |
| Suitable for shared file access | ✅ Yes     | ❌ Limited                | ❌ Object-based   | ❌ Structured data only    |
| Auto-scaling                    | ✅ Yes     | ❌ No                     | ✅ Yes            | ✅ Yes                     |

---

## 10. Summary Table

| Requirement                            | Best Fit   |
| -------------------------------------- | ---------- |
| Shared NFS storage across AZs          | Amazon EFS |
| Block storage for a single AZ          | Amazon EBS |
| Object storage for unstructured files  | Amazon S3  |
| Relational storage for structured data | Amazon RDS |

---

## 11. Concept Expansion / Key Facts

- **Amazon EFS** (Elastic File System) is a **fully managed, scalable, POSIX-compliant file system** that can be mounted by **multiple EC2 instances across AZs**, making it ideal for shared workloads.
- It supports the **NFSv4 protocol**, which allows Linux-based instances to mount and access the file system just like a traditional network share.
- **Mount targets** are automatically created in each AZ when you configure EFS, allowing EC2 instances in different AZs to access EFS over the lowest-latency path.
- **EBS Multi-Attach** supports simultaneous attachment to multiple EC2 instances, but **only within the same Availability Zone**, and only with certain file systems (like clustered FSes). It also lacks horizontal scalability.
- **Amazon S3** is a powerful object store, but it is not mountable using NFS and doesn’t provide file system semantics (e.g., permissions, locking, directory hierarchy).
- **Amazon RDS** is a managed relational database — it’s built for SQL queries and structured data, not for shared file storage or mounting via file system protocols.
- For workloads like content management, web hosting, analytics staging, and shared application data directories, **EFS provides the easiest and most scalable NFS-based shared storage solution** in AWS.

---

---

title: "SAA-Q006: Improving Scalability for Partner Data Ingestion and Processing"
questionId: "saa-q006"
category: "Design High-Performing Architectures"
tags: ["saa-c03", "kinesis-data-streams", "sqs", "lambda", "rest-api", "scalability"]

---

## Question 'SAA-Q006'

A company provides a REST-based interface to an application that allows a partner company to send data in near-real time. The application then processes the data that is received and stores it for later analysis. The application runs on Amazon EC2 instances. The partner company has received many 503 Service Unavailable Errors when sending data to the application and the compute capacity reaches its limits and is unable to process requests when spikes in data volume occur.

**Which design should a Solutions Architect implement to improve scalability?**

- Use Amazon Kinesis Data Streams to ingest the data. Process the data using AWS Lambda functions
- Use Amazon API Gateway in front of the existing application. Create a usage plan with a quota limit for the partner company
- Use Amazon SNS to ingest the data and trigger AWS Lambda functions to process the data in near-real time
- Use Amazon SQS to ingest the data. Configure the EC2 instances to process messages from the SQS queue

---

## 1. In Simple English

The app is overwhelmed during traffic spikes, causing failures (503 errors). We need to fix this by **decoupling the ingestion from processing**, and letting the backend scale more efficiently and absorb bursts without dropping requests.

---

## 2. Verbiage & Realism

| Aspect         | Assessment                                                                                   |
| -------------- | -------------------------------------------------------------------------------------------- |
| Clarity        | Very clear — describes the current architecture, problem (503 errors), and requirements.     |
| Realism        | Highly realistic — this is a common issue in microservice and ingestion-heavy architectures. |
| Trap Potential | High — multiple AWS services (SNS, SQS, Kinesis) seem valid; knowing nuances is critical.    |

---

## 3. What the Question is Testing

| Concept Being Tested                     | Explanation                                                            |
| ---------------------------------------- | ---------------------------------------------------------------------- |
| Event-driven ingestion and buffering     | Understanding how to decouple and queue traffic for later processing.  |
| Choosing the right AWS messaging service | Tests familiarity with Kinesis, SQS, SNS, API Gateway throttling.      |
| Scalability during burst traffic         | Evaluates knowledge of backpressure handling and autoscaling patterns. |

---

## 4. Answer and Explanation

✅ **Correct Answer: Use Amazon Kinesis Data Streams to ingest the data. Process the data using AWS Lambda functions**

| Option                                                                                                                          | Verdict      | Explanation                                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------- | ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Use Amazon Kinesis Data Streams to ingest the data. Process the data using AWS Lambda functions**                             | ✅ Correct   | Kinesis buffers and scales automatically, decoupling ingestion from processing. Lambda scales with data flow and can handle bursts, preventing 503 errors. Ideal for near-real-time streaming. |
| **Use Amazon API Gateway in front of the existing application. Create a usage plan with a quota limit for the partner company** | ❌ Incorrect | Throttling may reduce 503s, but it limits valid data instead of solving the scalability issue. This is a control, not a processing solution.                                                   |
| **Use Amazon SNS to ingest the data and trigger AWS Lambda functions to process the data in near-real time**                    | ❌ Incorrect | SNS is a pub/sub service, not ideal for ordered, high-volume ingestion. No durable buffering or replay like Kinesis provides.                                                                  |
| **Use Amazon SQS to ingest the data. Configure the EC2 instances to process messages from the SQS queue**                       | ❌ Incorrect | SQS is better for decoupling, but processing by EC2 doesn’t solve the scaling problem — the original bottleneck remains unless EC2 autoscaling is robust.                                      |

---

## 5. Final Answer

- Use Amazon Kinesis Data Streams to ingest the data. Process the data using AWS Lambda functions

---

## 6. Relevant AWS Documentation

| Topic                                                                                                                                        | Link                                                 |
| -------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| [Amazon Kinesis Data Streams Overview](https://docs.aws.amazon.com/streams/latest/dev/introduction.html)                                     | Ingestion pipeline overview for real-time use cases. |
| [Kinesis + Lambda Integration](https://docs.aws.amazon.com/lambda/latest/dg/with-kinesis.html)                                               | How to use Kinesis as an event source for Lambda.    |
| [Handling API Throttling with API Gateway](https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-request-throttling.html) | Why API Gateway quotas don’t solve backend scaling.  |
| [Comparing SNS vs Kinesis vs SQS](https://aws.amazon.com/architecture/icons/messaging/)                                                      | AWS messaging model comparisons.                     |

---

## 7. Are the Options Tricky?

| Option                  | Trickiness                                                                     |
| ----------------------- | ------------------------------------------------------------------------------ |
| Kinesis + Lambda        | ✅ Direct match — if you know the pattern.                                     |
| API Gateway with quotas | ⚠️ Sounds like rate limiting solves the issue, but it avoids the real problem. |
| SNS + Lambda            | ⚠️ May seem right, but lacks ordering and buffering.                           |
| SQS + EC2               | ⚠️ Looks scalable, but still EC2-bound and lacks elasticity like Lambda.       |

---

## 8. How to Approach Similar Questions

**Strategy**: Look for symptoms of overwhelmed applications — 503 errors, latency, crashing instances. Then ask:

- Can we buffer the input?
- Can we autoscale the backend?

If the workload involves streams, high velocity, or real-time data: Kinesis is often best.

**Tip**: Kinesis is built for **ordered, high-volume, burstable ingestion**. Pair it with Lambda to offload compute, process in parallel, and remove direct pressure from EC2.

---

## 9. Technology Deep Dive

| Feature                  | Kinesis Data Streams  | Amazon SNS            | Amazon SQS          | API Gateway Quotas            |
| ------------------------ | --------------------- | --------------------- | ------------------- | ----------------------------- |
| Ingestion volume support | ✅ High (shard-based) | ⚠️ Medium             | ✅ High             | ❌ Not designed for ingestion |
| Ordering                 | ✅ Per shard          | ❌ No                 | ✅ FIFO queues only | ❌ Not applicable             |
| Message buffering        | ✅ Up to 7 days       | ❌ No durable storage | ✅ Up to 14 days    | ❌ No storage                 |
| Event replayability      | ✅ Yes                | ❌ No                 | ✅ Yes              | ❌ No                         |
| Native compute scaling   | ✅ Works with Lambda  | ✅ Works with Lambda  | ⚠️ EC2/Lambda       | ❌ Does not process           |

---

## 10. Summary Table

| Requirement                        | Best Fit               |
| ---------------------------------- | ---------------------- |
| Near-real-time streaming ingestion | Kinesis Data Streams   |
| Durable message buffering          | Kinesis or SQS         |
| Fan-out pub/sub                    | SNS                    |
| Input rate-limiting                | API Gateway throttling |
| Lambda-native processing           | Kinesis + Lambda       |

---

## 11. Concept Expansion / Key Facts

- **Amazon Kinesis Data Streams** is designed for high-throughput, low-latency data ingestion and near-real-time processing. It supports **partition keys** to maintain per-source order and provides **durable storage for up to 7 days**, allowing consumers (like Lambda) to retry or replay events if needed.
- **AWS Lambda** can scale horizontally with the number of shards, making it well-suited for processing spiky incoming streams without pre-provisioned compute.
- **Using Kinesis + Lambda** removes the direct pressure from EC2, eliminates 503 errors caused by resource exhaustion, and ensures resilience against traffic bursts.
- **Amazon SNS** is designed for fan-out pub/sub messaging but lacks persistence, ordering, or replay, making it suboptimal for ingestion pipelines that require durability.
- **Amazon SQS** is an excellent decoupling tool but pairing it with EC2 doesn’t solve the scaling bottleneck unless EC2 itself is autoscaled and stateless.
- **API Gateway quotas and throttling** may reduce errors but are reactive — they don’t increase scalability. They simply delay or reject excess requests, which may not be acceptable for partner integrations.
- For architectures that must **absorb, scale, and reliably process large event flows**, **Kinesis + Lambda is a modern serverless and event-driven best practice**.

---

---

title: "SAA-Q007: Choosing the Right Network Adapter for High Performance Computing (HPC) Applications"
questionId: "saa-q007"
category: "Design High-Performing Architectures"
tags: ["saa-c03", "hpc", "efa", "high-performance-computing", "networking", "ena"]

---

## Question 'SAA-Q007'

A legacy tightly-coupled High Performance Computing (HPC) application will be migrated to AWS.

**Which network adapter type should be used?**

- Elastic IP Address
- Elastic Network Adapter (ENA)
- Elastic Fabric Adapter (EFA)
- Elastic Network Interface (ENI)

---

## 1. In Simple English

The company is moving a tightly-coupled, high-performance computing application to AWS. This kind of workload involves many instances working together with **very fast and low-latency network communication**. The architect must choose a network adapter that supports **high bandwidth, low latency, and inter-instance communication** optimized for HPC.

---

## 2. Verbiage & Realism

| Aspect         | Assessment                                                                                               |
| -------------- | -------------------------------------------------------------------------------------------------------- |
| Clarity        | The question is concise and clearly identifies the HPC workload type.                                    |
| Realism        | Very realistic — HPC migration is common, and AWS offers specific networking hardware for this use case. |
| Trap Potential | High — ENA and EFA sound similar, but only one is correct for HPC.                                       |

---

## 3. What the Question is Testing

| Concept Being Tested               | Explanation                                                                                       |
| ---------------------------------- | ------------------------------------------------------------------------------------------------- |
| Network optimization for HPC apps  | Distinguishing which AWS network adapter is built for low-latency, high-throughput interconnects. |
| Understanding of ENI, ENA, and EFA | Tests deep knowledge of EC2 networking components and their roles.                                |

---

## 4. Answer and Explanation

✅ **Correct Answer: Elastic Fabric Adapter (EFA)**

| Option                              | Verdict      | Explanation                                                                                                                                                                                            |
| ----------------------------------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Elastic IP Address**              | ❌ Incorrect | EIP is a static public IPv4 address used for external access — it has nothing to do with HPC or optimized networking.                                                                                  |
| **Elastic Network Adapter (ENA)**   | ❌ Incorrect | ENA supports up to 100 Gbps bandwidth and is used for standard EC2 instance networking, but it lacks the ultra-low latency and OS-bypass features required for HPC.                                    |
| **Elastic Fabric Adapter (EFA)**    | ✅ Correct   | EFA is designed specifically for tightly-coupled HPC workloads. It allows low-latency, high-throughput communication between instances and supports the Message Passing Interface (MPI) and OS bypass. |
| **Elastic Network Interface (ENI)** | ❌ Incorrect | ENI is a virtual network interface, not a specialized adapter. It supports general-purpose networking but not HPC-optimized communication.                                                             |

---

## 5. Final Answer

- Elastic Fabric Adapter (EFA)

---

## 6. Relevant AWS Documentation

| Topic                                                                                                                  | Link                                          |
| ---------------------------------------------------------------------------------------------------------------------- | --------------------------------------------- |
| [Elastic Fabric Adapter Overview](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/efa.html)                        | Full capabilities and HPC suitability of EFA. |
| [Choosing the Right EC2 Network Adapter](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/enhanced-networking.html) | Comparison of ENA, EFA, and ENI.              |
| [High Performance Computing on AWS](https://aws.amazon.com/hpc/)                                                       | Overview of HPC architecture design on AWS.   |
| [Message Passing Interface with EFA](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/efa-start.html)               | How EFA supports MPI workloads.               |

---

## 7. Are the Options Tricky?

| Option                          | Trickiness                                                 |
| ------------------------------- | ---------------------------------------------------------- |
| Elastic IP Address              | ❌ Not relevant to the question scope.                     |
| Elastic Network Adapter (ENA)   | ⚠️ Easily confused with EFA due to high bandwidth support. |
| Elastic Fabric Adapter (EFA)    | ✅ The only option specifically built for HPC.             |
| Elastic Network Interface (ENI) | ⚠️ Generic networking term — not HPC-specific.             |

---

## 8. How to Approach Similar Questions

**Strategy**: When you see the keywords “HPC,” “tightly-coupled,” or “low latency inter-node communication,” immediately think of **EFA**. It is the only AWS network adapter that supports MPI workloads with **OS bypass** for faster performance.

**Tip**: ENA is for enhanced network bandwidth; **EFA is for enhanced performance between instances** in HPC clusters.

---

## 9. Technology Deep Dive

| Feature                         | Elastic IP (EIP) | Elastic Network Interface (ENI) | Elastic Network Adapter (ENA)   | Elastic Fabric Adapter (EFA)  |
| ------------------------------- | ---------------- | ------------------------------- | ------------------------------- | ----------------------------- |
| Use Case                        | Public IP access | General-purpose VPC networking  | High bandwidth standard traffic | HPC / tightly-coupled systems |
| Latency Optimization            | ❌ No            | ❌ No                           | ⚠️ Low, but not bypass          | ✅ Ultra-low, OS bypass       |
| MPI Support                     | ❌ No            | ❌ No                           | ❌ No                           | ✅ Yes                        |
| Inter-node HPC Comm             | ❌ No            | ❌ No                           | ❌ No                           | ✅ Yes                        |
| Available on All Instance Types | ✅ Yes           | ✅ Yes                          | ⚠️ Limited to ENA-compatible    | ⚠️ Limited to EFA-supported   |

---

## 10. Summary Table

| Requirement                        | Best Option            |
| ---------------------------------- | ---------------------- |
| High-speed public access           | Elastic IP             |
| General EC2 networking             | ENI                    |
| High-throughput VPC traffic        | ENA                    |
| Low-latency HPC cluster networking | Elastic Fabric Adapter |

---

## 11. Concept Expansion / Key Facts

- **Elastic Fabric Adapter (EFA)** is designed specifically for **HPC applications** that require **low-latency, high-throughput, tightly-coupled node communication** — such as fluid dynamics simulations, seismic analysis, or financial modeling.
- EFA supports **OS bypass**, allowing network traffic to avoid the operating system kernel, significantly reducing latency and jitter — a key requirement in many HPC and MPI (Message Passing Interface) workloads.
- **EFA integrates with MPI libraries**, commonly used in legacy HPC applications that depend on shared memory and fast inter-process communication.
- While **ENA** supports very high bandwidth (up to 100 Gbps), it does **not support MPI or OS bypass**, making it insufficient for HPC workloads.
- **ENI** is simply a logical network interface — not a hardware adapter — and is useful for attaching multiple IPs or managing security groups but not for performance-critical networking.
- Finally, **Elastic IP Addresses (EIP)** have no role in inter-node communication — they provide persistent public IPv4 addresses and are irrelevant to HPC networking requirements.
- AWS HPC architectures often combine **EFA with placement groups** and **EC2 compute-optimized instances** (e.g., `c5n.18xlarge`, `p4d.24xlarge`) to form tightly-coupled clusters with low network latency and high throughput.

---

---

title: "SAA-Q008: Configuring a Backup Website with Automatic Failover in Route 53"
questionId: "saa-q008"
category: "Design High-Performing Architectures"
tags: ["saa-c03", "route-53", "failover-routing", "s3-static-site", "dns-health-checks", "alb"]

---

## Question 'SAA-Q008'

A company has deployed a new website on Amazon EC2 instances behind an Application Load Balancer (ALB). Amazon Route 53 is used for the DNS service. The company has asked a Solutions Architect to create a backup website with support contact details that users will be directed to automatically if the primary website is down.

**How should the Solutions Architect deploy this solution cost-effectively?**

- Configure a static website using Amazon S3 and create a Route 53 weighted routing policy
- Deploy the backup website on EC2 and ALB in another Region and use Route 53 health checks for failover routing
- Configure a static website using Amazon S3 and create a Route 53 failover routing policy
- Create the backup website on EC2 and ALB in another Region and create an AWS Global Accelerator endpoint

---

## 1. In Simple English

The company wants to build a **low-cost backup site** that users will be sent to **only when the main site is down**. The solution must be automatic and affordable — no need to run a second full website unless the primary one fails.

---

## 2. Verbiage & Realism

| Aspect         | Assessment                                                                                                      |
| -------------- | --------------------------------------------------------------------------------------------------------------- |
| Clarity        | Clear and well-structured question. The failover requirement and cost-efficiency constraint are obvious.        |
| Realism        | Highly realistic — building failover static sites is a common real-world requirement.                           |
| Trap Potential | Moderate — weighted routing may seem viable but doesn’t address failover. Global Accelerator may seem overkill. |

---

## 3. What the Question is Testing

| Concept Being Tested                    | Explanation                                                               |
| --------------------------------------- | ------------------------------------------------------------------------- |
| Route 53 routing policy selection       | Tests understanding of failover vs weighted routing.                      |
| Cost-effective backup site architecture | Evaluates AWS service cost-awareness, especially S3 vs EC2.               |
| DNS-based high availability strategy    | Assesses the ability to implement basic failover using DNS health checks. |

---

## 4. Answer and Explanation

✅ **Correct Answer: Configure a static website using Amazon S3 and create a Route 53 failover routing policy**

| Option                                                                                                             | Verdict      | Explanation                                                                                                                                                                               |
| ------------------------------------------------------------------------------------------------------------------ | ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Configure a static website using Amazon S3 and create a Route 53 weighted routing policy**                       | ❌ Incorrect | Weighted routing splits traffic between resources based on weights — it’s not intended for automatic failover.                                                                            |
| **Deploy the backup website on EC2 and ALB in another Region and use Route 53 health checks for failover routing** | ❌ Incorrect | Technically correct, but costly and overengineered for a static backup site.                                                                                                              |
| **Configure a static website using Amazon S3 and create a Route 53 failover routing policy**                       | ✅ Correct   | Most cost-effective and reliable approach. Static S3 websites are low-cost and Route 53 failover routing with health checks supports automatic redirection when the primary is unhealthy. |
| **Create the backup website on EC2 and ALB in another Region and create an AWS Global Accelerator endpoint**       | ❌ Incorrect | Global Accelerator adds cost and complexity; unnecessary for a basic failover with static content.                                                                                        |

---

## 5. Final Answer

- Configure a static website using Amazon S3 and create a Route 53 failover routing policy

---

## 6. Relevant AWS Documentation

| Topic                                                                                                              | Link                                                   |
| ------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------ |
| [Amazon Route 53 Routing Policies](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/routing-policy.html)  | Overview of failover vs weighted policies.             |
| [Amazon Route 53 Failover Routing](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/dns-failover.html)    | How to configure failover routing using health checks. |
| [Hosting a Static Website on Amazon S3](https://docs.aws.amazon.com/AmazonS3/latest/userguide/WebsiteHosting.html) | Guide to S3 static website hosting.                    |
| [Comparing AWS Global Accelerator vs Route 53](https://aws.amazon.com/global-accelerator/faqs/)                    | Understanding when to use Global Accelerator.          |

---

## 7. Are the Options Tricky?

| Option                            | Trickiness                                                |
| --------------------------------- | --------------------------------------------------------- |
| S3 with weighted routing          | ⚠️ Misleading — doesn’t handle health checks or failover. |
| EC2 + ALB with failover           | ⚠️ Valid, but not cost-effective.                         |
| S3 with failover routing          | ✅ Clear winner — low cost, easy failover.                |
| EC2 + ALB with Global Accelerator | ❌ Unnecessarily expensive and complex.                   |

---

## 8. How to Approach Similar Questions

**Strategy**: Look for **"low-cost + failover"**. If the backup is only for emergencies and doesn’t need compute power, **S3 static site hosting** is ideal. Then choose **failover routing** in Route 53, not weighted or latency-based.

**Tip**: Weighted routing splits traffic. Failover routing **redirects only when a health check fails** — ideal for primary-backup setups.

---

## 9. Technology Deep Dive

| Feature                         | Route 53 Weighted Routing | Route 53 Failover Routing | AWS Global Accelerator | Amazon S3 Static Website       |
| ------------------------------- | ------------------------- | ------------------------- | ---------------------- | ------------------------------ |
| Supports traffic splitting      | ✅ Yes                    | ❌ No                     | ✅ Yes                 | ❌ No                          |
| Supports health check failover  | ❌ No                     | ✅ Yes                    | ✅ Yes                 | ❌ Requires Route 53 to enable |
| Cost efficiency                 | ✅ Medium                 | ✅ High                   | ❌ Expensive           | ✅ Very high                   |
| Ideal for backup static content | ❌ No                     | ✅ Yes                    | ❌ Overkill            | ✅ Yes                         |

---

## 10. Summary Table

| Requirement                      | Best Option                              |
| -------------------------------- | ---------------------------------------- |
| Cost-effective backup website    | S3 static site                           |
| Automatic redirection on failure | Route 53 failover routing                |
| Complex multi-region failover    | Route 53 + EC2/ALB or Global Accelerator |
| Traffic balancing                | Weighted routing                         |

---

## 11. Concept Expansion / Key Facts

- **Amazon S3** can serve static websites from a bucket with public access and an index document. This makes it ideal for backup pages like contact details or service status.
- **Route 53 failover routing** uses **health checks** to monitor the primary resource (e.g., ALB or EC2 endpoint). If the health check fails, traffic is automatically routed to the backup target — in this case, an S3 static website.
- This pattern is highly **cost-effective** because the S3 bucket incurs almost no ongoing compute cost. It only serves traffic when the main site is down.
- **Weighted routing** is used to split traffic deliberately — it does not offer failover.
- **Global Accelerator** routes users to the closest healthy application endpoint via the AWS edge network. It is excellent for **active-active high availability**, not passive failover to a static page.
- For scenarios where the backup website simply displays static info (e.g., "We're down. Here's how to contact us."), **S3 + failover routing is the perfect architectural fit**.

---

---

title: "SAA-Q009: Enabling Encryption on an Existing Amazon RDS PostgreSQL Database Without Data Loss"
questionId: "saa-q009"
category: "Design Secure Architectures"
tags: ["saa-c03", "rds", "encryption", "compliance", "kms", "snapshot", "dms"]

---

## Question 'SAA-Q009'

A company runs an application that uses an Amazon RDS PostgreSQL database. The database is currently not encrypted. A Solutions Architect has been instructed that due to new compliance requirements all existing and new data in the database must be encrypted. The database experiences high volumes of changes and no data can be lost.

**How can the Solutions Architect enable encryption for the database without incurring any data loss?**

- Update the RDS DB to Multi-AZ mode and enable encryption for the standby replica. Perform a failover to the standby instance and then delete the unencrypted RDS DB instance
- Create an RDS read replica and specify an encryption key. Promote the encrypted read replica to primary. Update the application to point to the new RDS DB endpoint
- Create a snapshot of the existing RDS DB instance. Create an encrypted copy of the snapshot. Create a new RDS DB instance from the encrypted snapshot and update the application. Use AWS DMS to synchronize data between the source and destination RDS DBs
- Create a snapshot of the existing RDS DB instance. Create an encrypted copy of the snapshot. Create a new RDS DB instance from the encrypted snapshot. Configure the application to use the new DB endpoint

---

## 1. In Simple English

The database is not encrypted but must be now due to compliance requirements. You can’t lose any data and the application continues to update the database frequently. The goal is to apply encryption without downtime or risk of data loss.

---

## 2. Verbiage & Realism

| Aspect         | Assessment                                                                                 |
| -------------- | ------------------------------------------------------------------------------------------ |
| Clarity        | The question is clearly worded with a real-world compliance use case.                      |
| Realism        | Very realistic — many teams retroactively encrypt RDS databases due to policy changes.     |
| Trap Potential | High — several options appear valid but only one ensures **data consistency + zero loss**. |

---

## 3. What the Question is Testing

| Concept Being Tested                      | Explanation                                                          |
| ----------------------------------------- | -------------------------------------------------------------------- |
| Retrofitting encryption into existing RDS | Tests awareness that RDS encryption cannot be enabled in-place.      |
| Zero-downtime migration strategies        | Requires familiarity with AWS DMS and snapshot workflows.            |
| Safe switchover planning under compliance | How to avoid loss or downtime while replacing unencrypted resources. |

---

## 4. Answer and Explanation

✅ **Correct Answer: Create a snapshot of the existing RDS DB instance. Create an encrypted copy of the snapshot. Create a new RDS DB instance from the encrypted snapshot and update the application. Use AWS DMS to synchronize data between the source and destination RDS DBs**

| Option                                                                                                                                                                                                                                                           | Verdict      | Explanation                                                                                                                             |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ | --------------------------------------------------------------------------------------------------------------------------------------- |
| **Update the RDS DB to Multi-AZ mode and enable encryption for the standby replica. Perform a failover to the standby instance and then delete the unencrypted RDS DB instance**                                                                                 | ❌ Incorrect | Encryption cannot be enabled on an existing RDS instance or standby. This is not a supported method for retroactive encryption.         |
| **Create an RDS read replica and specify an encryption key. Promote the encrypted read replica to primary. Update the application to point to the new RDS DB endpoint**                                                                                          | ❌ Incorrect | You cannot create an encrypted read replica from an unencrypted source — this workflow is invalid.                                      |
| **Create a snapshot of the existing RDS DB instance. Create an encrypted copy of the snapshot. Create a new RDS DB instance from the encrypted snapshot and update the application. Use AWS DMS to synchronize data between the source and destination RDS DBs** | ✅ Correct   | This is the only solution that ensures encryption and supports near-zero downtime and zero data loss by syncing live changes using DMS. |
| **Create a snapshot of the existing RDS DB instance. Create an encrypted copy of the snapshot. Create a new RDS DB instance from the encrypted snapshot. Configure the application to use the new DB endpoint**                                                  | ❌ Incorrect | This does not handle ongoing changes during the switch — leads to potential data loss unless DMS is used to sync updates.               |

---

## 5. Final Answer

- Create a snapshot of the existing RDS DB instance. Create an encrypted copy of the snapshot. Create a new RDS DB instance from the encrypted snapshot and update the application. Use AWS DMS to synchronize data between the source and destination RDS DBs

---

## 6. Relevant AWS Documentation

| Topic                                                                                                                                            | Link                                                         |
| ------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------ |
| [Encrypting Amazon RDS Resources](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Overview.Encryption.html)                               | Overview of encryption at rest for RDS and snapshots.        |
| [Using AWS DMS to Migrate RDS with Minimal Downtime](https://docs.aws.amazon.com/dms/latest/userguide/CHAP_UseCases.html)                        | Real-time sync between RDS instances.                        |
| [Create Encrypted RDS Snapshots](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Overview.Encryption.html#Overview.Encryption.Snapshots)  | Steps for encrypting unencrypted RDS snapshots.              |
| [Limitations of RDS Encryption](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Overview.Encryption.html#Overview.Encryption.Limitations) | Encryption cannot be enabled directly on existing instances. |

---

## 7. Are the Options Tricky?

| Option                           | Trickiness                                                                   |
| -------------------------------- | ---------------------------------------------------------------------------- |
| Multi-AZ + failover + encryption | ❌ Technically unsupported — encryption must be set at instance creation.    |
| Encrypted read replica + promote | ❌ Impossible — encrypted replicas can't be made from unencrypted sources.   |
| Snapshot + encrypt + DMS sync    | ✅ Best-fit — only method that preserves data integrity and avoids downtime. |
| Snapshot + encrypt + switch      | ⚠️ Looks plausible — but ignores live data changes during the transition.    |

---

## 8. How to Approach Similar Questions

**Strategy**: Whenever you see **“enable encryption on existing RDS”**, remember:

- You cannot encrypt in-place.
- You must create an **encrypted snapshot**.
- Live replication tools (like DMS) are essential when **data loss is unacceptable**.

**Tip**: If the database is active and changes often, only DMS can safely replicate changes between unencrypted and encrypted DBs before the final cutover.

---

## 9. Technology Deep Dive

| Feature                             | Native RDS Encryption | Encrypted Snapshot Workflow | DMS Replication      | Read Replica Promotion              |
| ----------------------------------- | --------------------- | --------------------------- | -------------------- | ----------------------------------- |
| Enables encryption of existing DB   | ❌ No                 | ✅ Yes                      | ✅ Syncs new changes | ❌ Not supported from unencrypted   |
| Allows near-zero downtime migration | ❌ No                 | ✅ With DMS                 | ✅ Live replication  | ⚠️ Possible, but not for encryption |
| Preserves all existing data         | ⚠️ Risky              | ✅ Yes                      | ✅ Yes               | ⚠️ Risk if no syncing tool used     |

---

## 10. Summary Table

| Requirement                         | Best Option                        |
| ----------------------------------- | ---------------------------------- |
| Encrypt existing RDS with zero loss | Snapshot + encrypt + DMS sync      |
| Encrypt inactive or archived DB     | Snapshot + encrypt + launch new DB |
| In-place encryption of running DB   | ❌ Not supported                   |
| Continuous data replication         | ✅ AWS DMS                         |

---

## 11. Concept Expansion / Key Facts

- **Amazon RDS does not support enabling encryption on an existing database instance** — encryption must be specified **at creation time**.
- To encrypt a previously unencrypted RDS database:
  1. Take a manual **snapshot** of the existing DB.
  2. Create an **encrypted copy** of that snapshot using a KMS key.
  3. Launch a **new encrypted RDS instance** from the encrypted snapshot.
- However, this creates a **static copy** of the DB. If the original is actively receiving changes, those changes will be missing unless you use **AWS DMS** to replicate live updates from the source DB to the new encrypted DB.
- **AWS Database Migration Service (DMS)** can replicate data continuously and capture ongoing changes until you're ready to cut over the application to the new encrypted database, ensuring **zero data loss**.
- Simply switching to an instance launched from the encrypted snapshot without DMS could result in **lost transactions**, especially under high write conditions — which violates the compliance requirement.
- Other methods like Multi-AZ, read replicas, or EIPs are not relevant in this context because **encryption cannot be added retroactively to a running RDS instance** or its read replicas.

---

---

title: "SAA-Q010: Designing a Cloud-Agnostic Container Solution with Open-Source Alignment"
questionId: "saa-q010"
category: "Design Secure Architectures"
tags: ["saa-c03", "eks", "kubernetes", "cloud-agnostic", "containers", "open-source"]

---

## Question 'SAA-Q010'

A company runs containerized applications for many application workloads in an on-premise data center. The company is planning to deploy containers to AWS and the chief architect has mandated that the same configuration and administrative tools must be used across all containerized environments. The company also wishes to remain cloud agnostic to safeguard against the impact of future changes in cloud strategy.

**How can a Solutions Architect design a managed solution that will align with open-source software?**

- Launch the containers on a fleet of Amazon EC2 instances in a cluster placement group
- Launch the containers on Amazon Elastic Container Service (ECS) with Amazon EC2 instance worker nodes
- Launch the containers on Amazon Elastic Container Service (ECS) with AWS Fargate instances
- Launch the containers on Amazon Elastic Kubernetes Service (EKS) and EKS worker nodes

---

## 1. In Simple English

The company wants to move their containers to AWS but still use the **same open-source tools** (like Kubernetes or Helm) that they use in their data center. They also want to keep their options open in case they switch to another cloud in the future.

---

## 2. Verbiage & Realism

| Aspect         | Assessment                                                                                                    |
| -------------- | ------------------------------------------------------------------------------------------------------------- |
| Clarity        | The question is clear and lists realistic business and architectural constraints.                             |
| Realism        | Very realistic — many companies demand open-source alignment and multi-cloud flexibility.                     |
| Trap Potential | High — ECS is tempting, but it's AWS-specific. Only one option is truly cloud-agnostic and open-source based. |

---

## 3. What the Question is Testing

| Concept Being Tested                        | Explanation                                                      |
| ------------------------------------------- | ---------------------------------------------------------------- |
| Open-source container orchestration support | Ensures understanding of Kubernetes vs AWS-native orchestration. |
| Cloud-agnostic design                       | Tests ability to design architectures that work across clouds.   |
| Managed service knowledge                   | Evaluates knowledge of AWS-managed container services.           |

---

## 4. Answer and Explanation

✅ **Correct Answer: Launch the containers on Amazon Elastic Kubernetes Service (EKS) and EKS worker nodes**

| Option                                                                                                    | Verdict      | Explanation                                                                                                                                                                                            |
| --------------------------------------------------------------------------------------------------------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Launch the containers on a fleet of Amazon EC2 instances in a cluster placement group**                 | ❌ Incorrect | This provides raw compute but no orchestration. You’d have to install and manage your own Kubernetes, making it non-managed and complex.                                                               |
| **Launch the containers on Amazon Elastic Container Service (ECS) with Amazon EC2 instance worker nodes** | ❌ Incorrect | ECS is AWS-proprietary and not open source. This violates the cloud-agnostic and tooling reuse requirements.                                                                                           |
| **Launch the containers on Amazon Elastic Container Service (ECS) with AWS Fargate instances**            | ❌ Incorrect | Same limitation as above — ECS is AWS-specific. Fargate is serverless but still tied to ECS’s API.                                                                                                     |
| **Launch the containers on Amazon Elastic Kubernetes Service (EKS) and EKS worker nodes**                 | ✅ Correct   | EKS is a **fully managed Kubernetes service**, allowing reuse of Kubernetes-native tools, YAML configs, Helm, and CI/CD integrations. Kubernetes is open-source and supported by many cloud providers. |

---

## 5. Final Answer

- Launch the containers on Amazon Elastic Kubernetes Service (EKS) and EKS worker nodes

---

## 6. Relevant AWS Documentation

| Topic                                                                                                        | Link                                                        |
| ------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------- |
| [Amazon EKS Overview](https://aws.amazon.com/eks/)                                                           | Official page for EKS managed Kubernetes.                   |
| [Kubernetes on AWS](https://docs.aws.amazon.com/eks/latest/userguide/what-is-eks.html)                       | AWS documentation on using Kubernetes with EKS.             |
| [Comparing ECS and EKS](https://aws.amazon.com/blogs/containers/choosing-between-amazon-ecs-and-amazon-eks/) | Choosing between EKS (open-source) and ECS (proprietary).   |
| [Running Kubernetes Anywhere](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/)              | Kubernetes official documentation on cloud-agnostic design. |

---

## 7. Are the Options Tricky?

| Option                | Trickiness                                                          |
| --------------------- | ------------------------------------------------------------------- |
| EC2 placement group   | ❌ Misleading — doesn’t address orchestration or open-source tools. |
| ECS with EC2          | ⚠️ Tempting if you don't realize ECS is AWS-specific.               |
| ECS with Fargate      | ⚠️ Serverless convenience, but still locked to ECS.                 |
| EKS with worker nodes | ✅ The only truly open-source, managed, cloud-agnostic choice.      |

---

## 8. How to Approach Similar Questions

**Strategy**: When a question mentions:

- **Open-source tooling**
- **Cloud agnostic requirements**
- **Kubernetes-style control**
  — think **EKS**, not ECS.

**Tip**: ECS is AWS-native. Kubernetes (via EKS on AWS, or GKE on GCP, or AKS on Azure) supports the same tools and configs — making it the safest choice for hybrid and multi-cloud environments.

---

## 9. Technology Deep Dive

| Feature                        | Amazon ECS | Amazon EKS | EC2 with manual install    | Fargate |
| ------------------------------ | ---------- | ---------- | -------------------------- | ------- |
| Open-source Kubernetes support | ❌ No      | ✅ Yes     | ✅ With full manual setup  | ❌ No   |
| Managed by AWS                 | ✅ Yes     | ✅ Yes     | ❌ No                      | ✅ Yes  |
| Cloud agnostic                 | ❌ No      | ✅ Yes     | ✅ If Kubernetes installed | ❌ No   |
| Supports Helm/YAML/Kubectl     | ❌ No      | ✅ Yes     | ✅ Yes                     | ❌ No   |
| Operational overhead           | ✅ Low     | ✅ Medium  | ❌ High                    | ✅ Low  |

---

## 10. Summary Table

| Requirement                              | Best Option            |
| ---------------------------------------- | ---------------------- |
| Managed Kubernetes                       | EKS                    |
| Multi-cloud and open-source              | EKS                    |
| AWS-native orchestration only            | ECS                    |
| Raw infrastructure without orchestration | EC2 in placement group |

---

## 11. Concept Expansion / Key Facts

- **Amazon EKS (Elastic Kubernetes Service)** provides a **fully managed Kubernetes control plane**, allowing teams to use open-source tooling like `kubectl`, `Helm`, and custom controllers — exactly the same tools used in on-prem environments.
- Kubernetes is inherently **cloud-agnostic**, supported by AWS, Azure, GCP, and on-prem solutions like Red Hat OpenShift or VMware Tanzu, making EKS the most flexible option for future cloud portability.
- Unlike ECS, which is **AWS-specific**, EKS enables consistent **deployment models, CI/CD pipelines, configuration files (YAML), and monitoring tools** across environments.
- **Worker nodes in EKS** can run on EC2 or Fargate, depending on how much control vs simplicity is required — but the orchestration layer remains Kubernetes.
- Deploying containers directly on EC2 (even in a placement group) gives full control but lacks orchestration, autoscaling, and API integration — not a managed or scalable solution for enterprise containerized workloads.

---

---

title: "SAA-Q011: Choosing the Most Cost-Effective EBS Volume Type for Moderate, Bursty Workload"
questionId: "saa-q011"
category: "Design Cost-Optimized Architectures"
tags: ["saa-c03", "ebs", "gp2", "iops", "ssd", "cost-optimization"]

---

## Question 'SAA-Q011'

A company runs an application on an Amazon EC2 instance that requires 250 GB of storage space. The application is not used often and has small spikes in usage on weekday mornings and afternoons. The disk I/O can vary with peaks hitting a maximum of 3,000 IOPS. A Solutions Architect must recommend the most cost-effective storage solution that delivers the performance required.

**Which configuration should the Solutions Architect recommend?**

- Amazon EBS Cold HDD (sc1)
- Amazon EBS Provisioned IOPS SSD (io1)
- Amazon EBS Throughput Optimized HDD (st1)
- Amazon EBS General Purpose SSD (gp2)

---

## 1. In Simple English

The application doesn’t run all the time but occasionally spikes in disk usage, needing up to 3,000 IOPS. The architect must pick a storage type that’s **cheap** but can **handle those bursts** without over-provisioning.

---

## 2. Verbiage & Realism

| Aspect         | Assessment                                                                                                     |
| -------------- | -------------------------------------------------------------------------------------------------------------- |
| Clarity        | Clear requirements: storage size (250 GB), workload pattern (occasional), and performance target (3,000 IOPS). |
| Realism        | Common scenario for cost-optimization with variable workloads.                                                 |
| Trap Potential | Moderate — some options look performant or cheap but fail to meet IOPS needs or price balance.                 |

---

## 3. What the Question is Testing

| Concept Being Tested       | Explanation                                               |
| -------------------------- | --------------------------------------------------------- |
| EBS volume type selection  | Knowing which volume type balances IOPS and cost.         |
| IOPS burst behavior in gp2 | Understanding how baseline and burst performance works.   |
| Avoiding over-provisioning | Preventing unnecessary use of io1 or st1 when not needed. |

---

## 4. Answer and Explanation

✅ **Correct Answer: Amazon EBS General Purpose SSD (gp2)**

| Option                                        | Verdict      | Explanation                                                                                                                                 |
| --------------------------------------------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------- |
| **Amazon EBS Cold HDD (sc1)**                 | ❌ Incorrect | sc1 is designed for infrequently accessed data and delivers low baseline performance — not suitable for any workload with IOPS peaks.       |
| **Amazon EBS Provisioned IOPS SSD (io1)**     | ❌ Incorrect | Delivers high IOPS, but is **very expensive**. Overkill for occasional peak loads and cost-inefficient for this use case.                   |
| **Amazon EBS Throughput Optimized HDD (st1)** | ❌ Incorrect | st1 is optimized for throughput, not IOPS. It’s ideal for large, sequential workloads like log processing — not transactional bursty loads. |
| **Amazon EBS General Purpose SSD (gp2)**      | ✅ Correct   | gp2 offers up to 3,000 IOPS for volumes ≥ 250 GB due to burstable credits. Perfect for bursty, cost-conscious workloads like this.          |

---

## 5. Final Answer

- Amazon EBS General Purpose SSD (gp2)

---

## 6. Relevant AWS Documentation

| Topic                                                                                                                          | Link                                                |
| ------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------- |
| [Amazon EBS Volume Types](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ebs-volume-types.html)                           | Comprehensive overview of all EBS types.            |
| [General Purpose SSD (gp2) Performance](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ebs-volume-types.html#gp2-details) | Details on baseline and burst IOPS.                 |
| [Provisioned IOPS SSD (io1) vs gp2](https://aws.amazon.com/ebs/features/)                                                      | When to choose io1 over gp2.                        |
| [Cost Optimization with EBS](https://docs.aws.amazon.com/whitepapers/latest/cost-optimization-ec2/cost-optimized-storage.html) | Best practices for balancing price and performance. |

---

## 7. Are the Options Tricky?

| Option  | Trickiness                                                      |
| ------- | --------------------------------------------------------------- |
| EBS sc1 | ❌ Clearly underperforms for IOPS.                              |
| EBS io1 | ⚠️ Tempting for high IOPS, but unjustified cost for bursty use. |
| EBS st1 | ⚠️ Misleading — great throughput, but poor IOPS.                |
| EBS gp2 | ✅ Ideal — balances burst capacity with lower cost.             |

---

## 8. How to Approach Similar Questions

**Strategy**: Focus on the performance metric that matters:

- **IOPS = gp2/io1**
- **Throughput = st1**
- **Archive/rare access = sc1**

Also consider whether the usage is bursty vs constant — gp2 shines when you want to **handle occasional peaks without paying full-time premium rates**.

**Tip**: gp2 volumes ≥ 250 GB get baseline 750 IOPS and can burst to 3,000 IOPS — perfect for this question’s workload.

---

## 9. Technology Deep Dive

| Volume Type               | IOPS Performance              | Cost Level | Best For                                 | Burst Capability    |
| ------------------------- | ----------------------------- | ---------- | ---------------------------------------- | ------------------- |
| gp2 (General Purpose SSD) | Up to 3,000 IOPS for 250+ GB  | ✅ Low     | General workloads with occasional bursts | ✅ Yes              |
| io1 (Provisioned SSD)     | 1–64,000 IOPS (manual config) | ❌ High    | High-performance apps with steady IOPS   | ❌ Provisioned only |
| st1 (Throughput HDD)      | Throughput up to 500 MB/s     | ✅ Medium  | Big data, streaming, logs                | ❌ No               |
| sc1 (Cold HDD)            | Very low (≤250 IOPS)          | ✅ Lowest  | Archival, infrequently accessed data     | ❌ No               |

---

## 10. Summary Table

| Requirement                        | Best Option |
| ---------------------------------- | ----------- |
| Cost-effective + burstable IOPS    | ✅ EBS gp2  |
| High sustained IOPS (at high cost) | EBS io1     |
| High throughput (not IOPS)         | EBS st1     |
| Rarely accessed archive storage    | EBS sc1     |

---

## 11. Concept Expansion / Key Facts

- **EBS gp2 volumes scale IOPS linearly with size**, providing 3 IOPS per GB, with **bursting up to 3,000 IOPS** for volumes ≥ 250 GB. This makes gp2 ideal for applications that are mostly idle but need performance for short periods.
- The **burstable IOPS credit system** in gp2 allows volumes to temporarily exceed their baseline performance, especially when they’ve been idle and have accumulated I/O credits — which fits workloads with **predictable usage patterns** like this one (weekday spikes).
- **EBS io1** allows manually provisioning high IOPS, but it’s significantly more expensive and only necessary for **mission-critical, consistently high-I/O applications** like large databases.
- **EBS st1 and sc1** are **HDD-backed** — meaning they are good for throughput and cold storage, respectively, but **not suitable for transactional workloads** that demand IOPS responsiveness.
- This scenario represents a classic case for **gp2: moderate capacity, occasional spikes, no constant pressure**, and a strong need to **control costs** — making gp2 the optimal match.

---

---

title: "SAA-Q012: Designing a Reliable Messaging Workflow Between Decoupled Applications"
questionId: "saa-q012"
category: "Design High-Performing Architectures"
tags: ["saa-c03", "sqs", "dead-letter-queue", "message-processing", "decoupling", "operational-efficiency"]

---

## Question 'SAA-Q012'

There are two applications in a company: a sender application that sends messages containing payloads, and a processing application that receives messages containing payloads. The company wants to implement an AWS service to handle messages between these two different applications. The sender application sends on average 1,000 messages each hour and the messages depending on the type sometimes take up to 2 days to be processed. If the messages fail to process, they must be retained so that they do not impact the processing of any remaining messages.

**Which solution meets these requirements and is the MOST operationally efficient?**

- Subscribe the processing application to an Amazon Simple Notification Service (Amazon SNS) topic to receive notifications. Write to the SNS topic using the sender application
- Set up a Redis database on Amazon EC2. Configure the instance to be used by both applications. The messages should be stored, processed, and deleted, respectively
- Provide an Amazon Simple Queue Service (Amazon SQS) queue for the sender and processor applications. Set up a dead-letter queue to collect failed messages
- Receive the messages from the sender application using an Amazon Kinesis data stream. Utilize the Kinesis Client Library (KCL) to integrate the processing application

---

## 1. In Simple English

There are two applications — one sends messages and the other processes them. Sometimes processing takes a long time (up to 2 days). Failed messages must be kept so they don’t affect other messages. The solution must be simple to manage and reliable.

---

## 2. Verbiage & Realism

| Aspect         | Assessment                                                                                 |
| -------------- | ------------------------------------------------------------------------------------------ |
| Clarity        | Clear and complete — outlines processing time, reliability requirements, and throughput.   |
| Realism        | Very realistic — common pattern in microservices and decoupled app architectures.          |
| Trap Potential | Moderate — multiple options sound feasible unless you're familiar with messaging patterns. |

---

## 3. What the Question is Testing

| Concept Being Tested                | Explanation                                                        |
| ----------------------------------- | ------------------------------------------------------------------ |
| Decoupled architecture using queues | Tests understanding of message buffering and retention.            |
| Failure isolation                   | Evaluates ability to prevent failed messages from blocking others. |
| Operational efficiency              | Identifies services that are fully managed and scalable.           |

---

## 4. Answer and Explanation

✅ **Correct Answer: Provide an Amazon Simple Queue Service (Amazon SQS) queue for the sender and processor applications. Set up a dead-letter queue to collect failed messages**

| Option                                                                                                                                                                     | Verdict      | Explanation                                                                                                                                                   |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Subscribe the processing application to an Amazon SNS topic to receive notifications. Write to the SNS topic using the sender application**                              | ❌ Incorrect | SNS is a pub/sub system — it doesn't retain messages or support retries or dead-letter queues. Not suitable for long or failed processing scenarios.          |
| **Set up a Redis database on Amazon EC2. Configure the instance to be used by both applications**                                                                          | ❌ Incorrect | Requires heavy management and introduces operational burden. Redis isn't a message queue and doesn’t handle retry logic or failure isolation automatically.   |
| **Provide an Amazon Simple Queue Service (Amazon SQS) queue for the sender and processor applications. Set up a dead-letter queue to collect failed messages**             | ✅ Correct   | SQS provides fully managed, decoupled messaging with retry logic and built-in support for DLQs (dead-letter queues), making it highly reliable and efficient. |
| **Receive the messages from the sender application using an Amazon Kinesis data stream. Utilize the Kinesis Client Library (KCL) to integrate the processing application** | ❌ Incorrect | Kinesis is great for real-time streaming and analytics, but it's more complex and not ideal for long-duration processing or built-in failure isolation.       |

---

## 5. Final Answer

- Provide an Amazon Simple Queue Service (Amazon SQS) queue for the sender and processor applications. Set up a dead-letter queue to collect failed messages

---

## 6. Relevant AWS Documentation

| Topic                                                                                                                                       | Link                                                       |
| ------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| [Amazon SQS Overview](https://aws.amazon.com/sqs/)                                                                                          | Fully managed queuing service for decoupled systems.       |
| [Using Dead-Letter Queues with SQS](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-dead-letter-queues.html) | How to isolate and troubleshoot failed messages.           |
| [When to Use SNS vs SQS](https://aws.amazon.com/blogs/compute/designing-message-driven-workflows-with-amazon-sqs-and-amazon-sns/)           | Comparison of messaging patterns.                          |
| [Kinesis vs SQS](https://aws.amazon.com/kinesis/data-streams/faqs/)                                                                         | Understand the difference between stream and queue models. |

---

## 7. Are the Options Tricky?

| Option       | Trickiness                                                               |
| ------------ | ------------------------------------------------------------------------ |
| SNS          | ⚠️ Commonly confused with queue-based systems — lacks message retention. |
| Redis on EC2 | ❌ Heavy lift — not a managed messaging solution.                        |
| SQS with DLQ | ✅ Purpose-built and highly scalable.                                    |
| Kinesis      | ⚠️ Meant for streaming, not reliable message processing with retries.    |

---

## 8. How to Approach Similar Questions

**Strategy**: Look for keywords like:

- **“retain failed messages”**
- **“delayed processing”**
- **“processing takes hours or days”**

These indicate the need for a **queue with retry logic and durability**. Avoid SNS and Redis unless pub/sub or cache is explicitly requested.

**Tip**: SQS is your go-to service for reliable, decoupled communication between apps when ordering and latency aren’t strict but durability and fault tolerance are.

---

## 9. Technology Deep Dive

| Feature                      | SQS                         | SNS              | Kinesis                     | Redis on EC2             |
| ---------------------------- | --------------------------- | ---------------- | --------------------------- | ------------------------ |
| Message retention            | ✅ Up to 14 days            | ❌ No            | ✅ 7 days (default)         | ⚠️ Requires custom logic |
| Built-in retry               | ✅ Yes                      | ❌ No            | ❌ Requires consumer logic  | ❌ No                    |
| DLQ support                  | ✅ Yes                      | ❌ No            | ❌ No native DLQ            | ❌ No                    |
| Long processing time support | ✅ Yes (visibility timeout) | ❌ No            | ⚠️ Complex for >1hr windows | ❌ Manual control        |
| Operational efficiency       | ✅ Fully managed            | ✅ Fully managed | ⚠️ Complex (KCL)            | ❌ High maintenance      |

---

## 10. Summary Table

| Requirement                      | Best Option  |
| -------------------------------- | ------------ |
| Message durability               | SQS          |
| Long processing time per message | SQS          |
| Isolation of failed messages     | SQS with DLQ |
| Real-time streaming analytics    | Kinesis      |
| Pub/sub notifications            | SNS          |

---

## 11. Concept Expansion / Key Facts

- **Amazon SQS** is a **fully managed, decoupled message queuing service** that supports long polling, visibility timeouts, retries, and **dead-letter queues** — all essential for workflows with delayed or failed processing.
- SQS stores messages durably for **up to 14 days**, giving plenty of time for asynchronous or long-running jobs.
- A **dead-letter queue (DLQ)** in SQS allows failed messages to be automatically rerouted so they don't block the queue. This isolates issues while letting the rest of the queue continue processing.
- **Kinesis Data Streams** is built for **real-time analytics**, not transactional message processing — and is not ideal when processing times span hours or days.
- **SNS** is a **notification system**, not a queue. Messages are pushed to subscribers and discarded if they fail, unless another queue is layered in manually — increasing complexity.
- Using **Redis on EC2** for this use case adds operational overhead (management, scaling, backup, failure handling) and lacks the built-in safety and scalability features of managed AWS messaging services.

---

---

title: "SAA-Q013: Designing Tiered Storage Architecture for Video Processing and Archival"
questionId: "saa-q013"
category: "Design Cost-Optimized Architectures"
tags: ["saa-c03", "instance-store", "s3", "glacier", "storage-tiering", "video-processing"]

---

## Question 'SAA-Q013'

A video production company is planning to move some of its workloads to the AWS Cloud. The company will require around 5 TB of storage for video processing with the maximum possible I/O performance. They also require over 400 TB of extremely durable storage for storing video files and 800 TB of storage for long-term archival.

**Which combinations of services should a Solutions Architect use to meet these requirements?**

- Amazon EC2 instance store for maximum performance, Amazon EFS for durable data storage, and Amazon S3 for archival storage.
- Amazon EBS for maximum performance, Amazon EFS for durable data storage, and Amazon S3 Glacier for archival storage.
- Amazon EBS for maximum performance, Amazon S3 for durable data storage, and Amazon S3 Glacier for archival storage.
- Amazon EC2 instance store for maximum performance, Amazon S3 for durable data storage, and Amazon S3 Glacier for archival storage.

---

## 1. In Simple English

The company needs three types of storage:

- Super-fast storage (5 TB) for video processing
- Very durable storage (400+ TB) for finalized video content
- Cheap, reliable storage (800 TB) for long-term archival

---

## 2. Verbiage & Realism

| Aspect         | Assessment                                                     |
| -------------- | -------------------------------------------------------------- |
| Clarity        | Well-written and structured for practical use cases.           |
| Realism        | Realistic — reflects a media company’s real-world cloud needs. |
| Trap Potential | High — subtle tradeoffs between ephemeral and durable IOPS.    |

---

## 3. What the Question is Testing

| Concept Being Tested                       | Explanation                                                     |
| ------------------------------------------ | --------------------------------------------------------------- |
| Storage tier selection                     | Evaluates matching storage types to performance and cost needs. |
| Durability vs. Ephemerality trade-offs     | Tests knowledge of instance store limitations.                  |
| Cost optimization in storage architectures | Encourages use of Glacier for cold data.                        |

---

## 4. Answer and Explanation

✅ **Correct Answer: Amazon EC2 instance store for maximum performance, Amazon S3 for durable data storage, and Amazon S3 Glacier for archival storage**

| Option                                                      | Verdict      | Explanation                                                                                                                            |
| ----------------------------------------------------------- | ------------ | -------------------------------------------------------------------------------------------------------------------------------------- |
| **Amazon EC2 instance store, Amazon EFS, Amazon S3**        | ❌ Incorrect | EFS is not cost-efficient for storing 400+ TB. S3 Glacier is more appropriate for archival data than S3 Standard.                      |
| **Amazon EBS, Amazon EFS, Amazon S3 Glacier**               | ❌ Incorrect | EBS is valid for processing, but EFS is not ideal for massive long-term storage due to cost.                                           |
| **Amazon EBS, Amazon S3, Amazon S3 Glacier**                | ❌ Plausible | EBS provides strong performance, but EC2 instance store delivers higher IOPS for ephemeral workloads.                                  |
| **Amazon EC2 instance store, Amazon S3, Amazon S3 Glacier** | ✅ Correct   | Instance store provides the best IOPS for short-term, in-memory processing. S3 and Glacier are ideal for durable and archival storage. |

---

## 5. Final Answer

- Amazon EC2 instance store for maximum performance
- Amazon S3 for durable data storage
- Amazon S3 Glacier for archival storage

---

## 6. Relevant AWS Documentation

| Topic                                                                                                         | Link                                             |
| ------------------------------------------------------------------------------------------------------------- | ------------------------------------------------ |
| [Amazon EC2 Instance Store](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/InstanceStorage.html)         | Fast ephemeral storage directly attached to EC2. |
| [Amazon S3 Storage Classes](https://aws.amazon.com/s3/storage-classes/)                                       | 11 9s durability, flexible for hot/warm storage. |
| [Amazon S3 Glacier Overview](https://aws.amazon.com/glacier/)                                                 | Ultra-low cost storage for archival data.        |
| [Storage Options in AWS](https://docs.aws.amazon.com/whitepapers/latest/storage-options/storage-options.html) | Comparison of use cases and limitations.         |

---

## 7. Are the Options Tricky?

| Option         | Trickiness                                                               |
| -------------- | ------------------------------------------------------------------------ |
| Instance store | ⚠️ Can be mistaken for permanent storage — it's ephemeral but very fast. |
| S3             | ✅ Standard for durable, scalable storage.                               |
| Glacier        | ✅ Obvious archival solution.                                            |
| EFS            | ⚠️ Sounds usable but cost-prohibitive at petabyte scale.                 |

---

## 8. How to Approach Similar Questions

**Strategy**: Break the workload into **storage classes**:

- Ephemeral high-performance → **Instance store**
- High-durability, hot object store → **S3**
- Low-cost archival → **S3 Glacier**

**Tip**: Watch for **ephemeral vs persistent** clues. If durability for the high-I/O workload isn't mentioned, **ephemeral instance store** is fair game.

---

## 9. Technology Deep Dive

| Requirement          | Instance Store          | EBS                                    | S3                    | Glacier                |
| -------------------- | ----------------------- | -------------------------------------- | --------------------- | ---------------------- |
| Max IOPS             | ✅ Highest              | ⚠️ High (but less than instance store) | ❌ N/A (object store) | ❌ N/A                 |
| Durability           | ❌ Ephemeral            | ✅ Durable                             | ✅ 11 9s              | ✅ Archival durability |
| Cost-efficiency (PB) | ❌ Not scalable         | ⚠️ Expensive at scale                  | ✅ Scales affordably  | ✅ Lowest cost         |
| Long-term use        | ❌ Temporary processing | ✅ Persistent                          | ✅ Long-term storage  | ✅ Archival only       |

---

## 10. Summary Table

| Storage Layer          | AWS Service Used   |
| ---------------------- | ------------------ |
| High-speed processing  | EC2 Instance Store |
| Durable object storage | Amazon S3          |
| Cold long-term archive | Amazon S3 Glacier  |

---

## 11. Concept Expansion / Key Facts

- **Amazon EC2 instance store** offers extremely high **I/O throughput and minimal latency** because the storage is physically attached to the host. It's ideal for **temporary, high-speed data processing**, such as real-time video editing or rendering pipelines where data can be discarded or copied out afterward.
- However, **it is not persistent** — if the instance is stopped or fails, the data is **lost**. That’s why it's only suitable when the **application logic handles durability externally** (e.g., checkpointing to S3).
- **Amazon S3** is the best fit for storing **completed video files**, offering **11 9s durability**, seamless global access, and lifecycle rules that can transition objects automatically to archival tiers like Glacier.
- **Amazon S3 Glacier** is built for **massive archival workloads**, where data is rarely accessed. Its cost is a fraction of S3 Standard, making it perfect for storing **800 TB** of media archives that don’t need to be retrieved frequently.
- Choosing the **correct tiered approach** lets organizations like media and film studios **optimize for performance, durability, and cost — all at scale**.

---

---

title: "SAA-Q014: Prioritizing Paid vs Free Users in SQS-Based Photo Processing"
questionId: "saa-q014"
category: "Design Cost-Optimized Architectures"
tags: ["saa-c03", "sqs", "queue-priority", "tiered-service", "s3-event-notification"]

---

## Question 'SAA-Q014'

A web application allows users to upload photos and add graphical elements to them. The application offers two tiers of service: free and paid. Photos uploaded by paid users should be processed before those submitted using the free tier. The photos are uploaded to an Amazon S3 bucket which uses an event notification to send the job information to Amazon SQS.

**How should a Solutions Architect configure the Amazon SQS deployment to meet these requirements?**

- Use a separate SQS FIFO queue for each tier. Set the free queue to use short polling and the paid queue to use long polling.
- Use one SQS standard queue. Use batching for the paid photos and short polling for the free photos.
- Use one SQS FIFO queue. Assign a higher priority to the paid photos so they are processed first.
- Use a separate SQS Standard queue for each tier. Configure Amazon EC2 instances to prioritize polling for the paid queue over the free queue.

---

## 1. In Simple English

We need to make sure **paid users’ photo jobs are processed first**. Photos from both free and paid users are sent to Amazon SQS via S3 events. The solution should respect the processing priority.

---

## 2. Verbiage & Realism

| Aspect         | Assessment                                                                                            |
| -------------- | ----------------------------------------------------------------------------------------------------- |
| Clarity        | Clear and practical — defines input (S3), mechanism (SQS), and goal (priority).                       |
| Realism        | High — reflects real-world use cases for freemium apps with tiered user experience.                   |
| Trap Potential | Moderate — options reference SQS modes like polling and FIFO priority, which are often misunderstood. |

---

## 3. What the Question is Testing

| Concept Being Tested              | Explanation                                                                    |
| --------------------------------- | ------------------------------------------------------------------------------ |
| SQS architecture and deployment   | Whether the candidate knows how to use multiple queues for priority workloads. |
| FIFO vs Standard queues           | Understanding the limitations of FIFO (no native priority support).            |
| Polling strategies for SQS queues | Understanding how EC2 workers interact with queues.                            |

---

## 4. Answer and Explanation

✅ **Correct Answer: Use a separate SQS Standard queue for each tier. Configure Amazon EC2 instances to prioritize polling for the paid queue over the free queue.**

| Option                                                                                                                                            | Verdict      | Explanation                                                                                                                                                                             |
| ------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Use a separate SQS FIFO queue for each tier. Set the free queue to use short polling and the paid queue to use long polling.**                  | ❌ Incorrect | Polling type does not influence processing priority. FIFO queues maintain strict order, but they do not support priority between groups.                                                |
| **Use one SQS standard queue. Use batching for the paid photos and short polling for the free photos.**                                           | ❌ Incorrect | Single standard queue cannot enforce priority. Batching and polling type don’t address the core requirement.                                                                            |
| **Use one SQS FIFO queue. Assign a higher priority to the paid photos so they are processed first.**                                              | ❌ Incorrect | FIFO queues do not support priority; messages are processed in exact order of arrival within message groups.                                                                            |
| **Use a separate SQS Standard queue for each tier. Configure Amazon EC2 instances to prioritize polling for the paid queue over the free queue.** | ✅ Correct   | This allows the system to **control processing priority at the consumer level**, giving preference to paid users without relying on native queue priority (which SQS does not support). |

---

## 5. Final Answer

- Use a separate SQS Standard queue for each tier
- Prioritize EC2 polling for the **paid queue** over the **free queue**

---

## 6. Relevant AWS Documentation

| Topic                                                                                                                                 | Link                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------- |
| [Amazon SQS Standard vs FIFO Queues](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-queue-types.html) | Describes queue types and limitations                   |
| [Amazon SQS Best Practices](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-best-practices.html)       | Covers worker polling strategies                        |
| [Using S3 Event Notifications with SQS](https://docs.aws.amazon.com/AmazonS3/latest/userguide/NotificationHowTo.html)                 | Explains S3-to-SQS integration                          |
| [Managing Message Processing Priorities](https://aws.amazon.com/blogs/compute/priority-queues-in-amazon-sqs-and-amazon-ec2/)          | AWS blog on implementing priority using multiple queues |

---

## 7. Are the Options Tricky?

| Option                                   | Trickiness                                                                   |
| ---------------------------------------- | ---------------------------------------------------------------------------- |
| FIFO queue w/ long polling               | ⚠️ Misleads by implying polling affects priority — it does not.              |
| Single standard queue                    | ⚠️ Suggests batching/short polling can manage priorities, which they cannot. |
| Priority on FIFO queue                   | ❌ Impossible — FIFO does not support priority within or across groups.      |
| Multiple standard queues + poll priority | ✅ Realistic and flexible workaround for prioritization.                     |

---

## 8. How to Approach Similar Questions

**Strategy**: Always ask:

- Are the requirements based on **order** (FIFO) or **priority** (paid over free)?
- Does the AWS service natively support **priorities**?

**Tip**: When native priority is not supported (like in SQS), simulate it with **separate queues** and **custom polling logic** in the consumer application. This keeps architecture scalable and behavior predictable.

---

## 9. Technology Deep Dive

| Capability                         | SQS FIFO Queue           | SQS Standard Queue      |
| ---------------------------------- | ------------------------ | ----------------------- |
| Message Order Guarantee            | ✅ Yes (strict ordering) | ❌ No                   |
| Native Priority Support            | ❌ Not supported         | ❌ Not supported        |
| Maximum Throughput                 | ❌ Limited by ordering   | ✅ Nearly unlimited     |
| Suitable for Tiered Prioritization | ❌ No                    | ✅ With separate queues |
| Delay Queues / DLQ Support         | ✅ Yes                   | ✅ Yes                  |

---

## 10. Summary Table

| Requirement                        | Best Practice                       |
| ---------------------------------- | ----------------------------------- |
| Prioritize paid over free messages | Use two SQS standard queues         |
| Ensure high throughput             | Avoid FIFO, use SQS Standard        |
| Control processing order manually  | Prioritize polling on EC2 consumers |

---

## 11. Concept Expansion / Key Facts

- **Amazon SQS does not support message prioritization natively**. Messages are processed in the order they are received (FIFO) or in no guaranteed order (Standard).
- To **enforce priority**, the best practice is to **separate workloads into different queues** and **control the polling behavior of consumers** (such as EC2 or Lambda).
- For example, EC2 worker instances can be programmed to poll the **paid queue first**, and only poll the **free queue** when the paid queue is empty. This ensures that paid users always receive faster processing without any native priority feature.
- **FIFO queues cannot prioritize one message group over another**, making them unsuitable for this use case.
- **Polling behavior (long or short polling)** affects latency and cost but does not enforce any priority between queues.
- By decoupling tiers into dedicated queues, you gain **greater control, scalability, and resilience** — making it an effective pattern for freemium or tiered-service applications in AWS.

---

---

title: "SAA-Q015: Backing Up NFS-Based On-Premises NAS Data to AWS"
questionId: "saa-q015"
category: "Design Secure Architectures"
tags: ["saa-c03", "storage-gateway", "file-gateway", "nfs", "offsite-backup", "s3"]

---

## Question 'SAA-Q015'

A company runs an application in a factory that has a small rack of physical compute resources. The application stores data on a network attached storage (NAS) device using the NFS protocol. The company requires a daily offsite backup of the application data.

**Which solution can a Solutions Architect recommend to meet this requirement?**

- Use an AWS Storage Gateway volume gateway with cached volumes on premises to replicate the data to Amazon S3.
- Use an AWS Storage Gateway file gateway hardware appliance on premises to replicate the data to Amazon S3.
- Create an IPSec VPN to AWS and configure the application to mount the Amazon EFS file system. Run a copy job to backup the data to EFS.
- Use an AWS Storage Gateway volume gateway with stored volumes on premises to replicate the data to Amazon S3.

---

## 1. In Simple English

The company needs to back up NFS-based application data from their on-premises NAS to AWS daily. The solution should support the NFS protocol and allow secure offsite backups with minimal disruption.

---

## 2. Verbiage & Realism

| Aspect         | Assessment                                                  |
| -------------- | ----------------------------------------------------------- |
| Clarity        | Clear — specifies NAS, NFS, and offsite backup goals.       |
| Realism        | High — many factories use local NAS and want S3 for backup. |
| Trap Potential | Moderate — storage gateway types are easy to confuse.       |

---

## 3. What the Question is Testing

| Concept Being Tested          | Explanation                                                |
| ----------------------------- | ---------------------------------------------------------- |
| AWS Storage Gateway use cases | Differentiates between file, volume, and tape gateways.    |
| Protocol compatibility (NFS)  | Tests if candidate matches the right gateway with NFS.     |
| Hybrid backup architecture    | Understanding how on-premises and cloud can be integrated. |

---

## 4. Answer and Explanation

✅ **Correct Answer: Use an AWS Storage Gateway file gateway hardware appliance on premises to replicate the data to Amazon S3.**

| Option                                                                                                                                      | Verdict      | Explanation                                                                                             |
| ------------------------------------------------------------------------------------------------------------------------------------------- | ------------ | ------------------------------------------------------------------------------------------------------- |
| **Use an AWS Storage Gateway volume gateway with cached volumes on premises to replicate the data to Amazon S3.**                           | ❌ Incorrect | Volume gateways present iSCSI block volumes, not NFS shares.                                            |
| **Use an AWS Storage Gateway file gateway hardware appliance on premises to replicate the data to Amazon S3.**                              | ✅ Correct   | File Gateway supports NFS and SMB. It allows on-prem apps to mount a local file share backed by S3.     |
| **Create an IPSec VPN to AWS and configure the application to mount the Amazon EFS file system. Run a copy job to backup the data to EFS.** | ❌ Incorrect | EFS is not designed to be mounted from on-premises directly and this introduces operational complexity. |
| **Use an AWS Storage Gateway volume gateway with stored volumes on premises to replicate the data to Amazon S3.**                           | ❌ Incorrect | Again, volume gateway supports iSCSI block storage, not NFS file sharing.                               |

---

## 5. Final Answer

- Use an AWS Storage Gateway file gateway hardware appliance on premises to replicate the data to Amazon S3

---

## 6. Relevant AWS Documentation

| Topic                                                                                                            | Link                                      |
| ---------------------------------------------------------------------------------------------------------------- | ----------------------------------------- |
| [AWS Storage Gateway Overview](https://aws.amazon.com/storagegateway/)                                           | High-level overview of gateway types      |
| [File Gateway Features](https://docs.aws.amazon.com/storagegateway/latest/userguide/WhatIsFileGateway.html)      | NFS/SMB support for S3-backed file shares |
| [Volume Gateway Use Cases](https://docs.aws.amazon.com/storagegateway/latest/userguide/WhatIsVolumeGateway.html) | Describes cached vs stored volumes        |
| [Hybrid Cloud Storage with AWS](https://aws.amazon.com/hybrid-cloud/storage/)                                    | Architectural patterns for hybrid backup  |

---

## 7. Are the Options Tricky?

| Option                          | Trickiness                                                         |
| ------------------------------- | ------------------------------------------------------------------ |
| Volume Gateway (cached/stored)  | ⚠️ Looks viable, but only supports block storage (iSCSI) not NFS.  |
| File Gateway hardware appliance | ✅ Clearly matches use case and protocol.                          |
| VPN + EFS                       | ❌ Unnecessarily complex, and not practical for simple NFS backup. |

---

## 8. How to Approach Similar Questions

**Strategy**: Match **protocol requirements** (NFS, SMB, iSCSI) to the **appropriate gateway type**:

- NFS/SMB → **File Gateway**
- iSCSI → **Volume Gateway**
- Tape backup → **Tape Gateway**

**Tip**: When you see "NAS" and "NFS", immediately lean toward **File Gateway**. Also consider if the option mentions **hardware appliance**, which is often required for disconnected or edge environments.

---

## 9. Technology Deep Dive

| Feature                  | File Gateway              | Volume Gateway (Cached)      | Volume Gateway (Stored)      | VPN + EFS                  |
| ------------------------ | ------------------------- | ---------------------------- | ---------------------------- | -------------------------- |
| Protocol Support         | ✅ NFS / SMB              | ❌ iSCSI only                | ❌ iSCSI only                | ⚠️ EFS (NFS) via VPC only  |
| Offsite Backup Target    | ✅ Amazon S3              | ✅ Amazon S3 (via snapshots) | ✅ Amazon S3 (via snapshots) | ⚠️ No built-in backup      |
| Setup Complexity         | ✅ Simple appliance setup | ⚠️ Moderate                  | ⚠️ Moderate                  | ❌ High operational effort |
| Best for NAS File Backup | ✅ Yes                    | ❌ No                        | ❌ No                        | ❌ No                      |

---

## 10. Summary Table

| Requirement             | Recommended AWS Service          |
| ----------------------- | -------------------------------- |
| NFS access on premises  | AWS Storage Gateway File Gateway |
| Daily cloud backups     | Replication to Amazon S3         |
| Factory/edge deployment | File Gateway hardware appliance  |

---

## 11. Concept Expansion / Key Facts

- **AWS Storage Gateway File Gateway** is the **only gateway** that supports **file-based protocols like NFS and SMB**, making it ideal for backing up NAS systems.
- The **hardware appliance** version is often used in factory or edge environments where running a virtual gateway may not be feasible.
- File Gateway **stores files locally for low-latency access** and **asynchronously uploads them to Amazon S3**, ensuring durability without interrupting local workflows.
- This setup enables **seamless integration of on-premises NAS devices with S3 buckets**, effectively extending cloud storage into on-prem environments.
- **Volume Gateways**, although they replicate data to AWS, operate as **block devices (iSCSI)**, which cannot interface directly with NAS devices that use file protocols.
- Attempting to use **EFS over VPN** is not only complex but also less efficient and less supported compared to using a native **File Gateway**.
- Overall, for **file-based backup workflows**, File Gateway offers the **simplest, most reliable, and protocol-aligned** solution in the AWS hybrid storage toolkit.

---

---

title: "saa-q016 – High-Availability Architecture for EC2 Web Tier and Database"
questionId: "saa-q016"
category: "Design Resilient Architectures"
tags: ["saa-c03", "multi-az", "auto-scaling", "application-load-balancer", "rds-multi-az"]

---

## Question 'SAA-Q016'

An eCommerce company runs an application on Amazon EC2 instances in public and private subnets. The web application runs in a public subnet and the database runs in a private subnet. Both the public and private subnets are in a single Availability Zone (AZ).

**Which combination of steps should a solutions architect take to provide high availability for this architecture?**  
_(Select TWO answers.)_

A. Create an EC2 Auto Scaling group and Application Load Balancer that spans across multiple AZs.  
B. Create new public and private subnets in a different AZ. Create a database using Amazon EC2 in one AZ.  
C. Create an EC2 Auto Scaling group in the public subnet and use an Application Load Balancer.  
D. Create new public and private subnets in a different AZ. Migrate the database to an Amazon RDS multi-AZ deployment.  
E. Create new public and private subnets in the same AZ but in a different Amazon VPC.

---

## 1. In Simple English

The company has all their application resources in one Availability Zone. If that zone fails, everything goes down.  
To prevent that:

- The **web layer** should be spread across **multiple AZs** using an **Application Load Balancer and Auto Scaling Group**.
- The **database** should be moved to **Amazon RDS with Multi-AZ** for automatic failover and replication.

---

## 2. Verbiage & Realism

| Aspect       | Assessment                                                                          |
| ------------ | ----------------------------------------------------------------------------------- |
| Clarity      | Clear scenario and goal (HA architecture).                                          |
| Realism      | Real-world pattern (lift-and-shift, EC2 + subnet setup).                            |
| Completeness | Covers web tier, DB tier, subnets, and VPC variation.                               |
| Traps        | Single-AZ setup disguised as HA (Option C), decoy with EC2 DB in new AZ (Option B). |

---

## 3. What the Question is Testing

| Concept                    | Why It Matters                                                     |
| -------------------------- | ------------------------------------------------------------------ |
| Multi-AZ Web Layer         | Ensures fault tolerance and traffic redirection during AZ outages. |
| RDS Multi-AZ               | Provides managed, synchronous replication with automatic failover. |
| Subnet Expansion           | Cross-AZ infrastructure needs subnet coverage in each AZ.          |
| Managed vs Self-managed DB | RDS reduces ops burden and is HA-ready.                            |

---

## 4. Answer and Explanation

✅ **Correct Answers:** A and D

| Option                                                                                                                 | Verdict | Explanation                                                              |
| ---------------------------------------------------------------------------------------------------------------------- | ------- | ------------------------------------------------------------------------ |
| A. Create an EC2 Auto Scaling group and Application Load Balancer that spans across multiple AZs.                      | ✅      | Distributes traffic and workloads across multiple AZs for web/app layer. |
| B. Create new public and private subnets in a different AZ. Create a database using Amazon EC2 in one AZ.              | ❌      | Still leaves the DB as a single point of failure; not HA.                |
| C. Create an EC2 Auto Scaling group in the public subnet and use an Application Load Balancer.                         | ❌      | Same AZ = no fault tolerance.                                            |
| D. Create new public and private subnets in a different AZ. Migrate the database to an Amazon RDS multi-AZ deployment. | ✅      | Adds AZ-level redundancy for the database with managed failover.         |
| E. Create new public and private subnets in the same AZ but in a different Amazon VPC.                                 | ❌      | Different VPC adds complexity but not availability.                      |

---

## 5. Final Answer

- ✅ A. Create an EC2 Auto Scaling group and Application Load Balancer that spans across multiple AZs.
- ✅ D. Create new public and private subnets in a different AZ. Migrate the database to an Amazon RDS multi-AZ deployment.

---

## 6. Relevant AWS Documentation

| Topic                              | Link                                                                                  |
| ---------------------------------- | ------------------------------------------------------------------------------------- |
| Application Load Balancer Overview | https://docs.aws.amazon.com/elasticloadbalancing/latest/application/introduction.html |
| Auto Scaling Groups                | https://docs.aws.amazon.com/autoscaling/ec2/userguide/auto-scaling-groups.html        |
| Amazon RDS Multi-AZ Deployments    | https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Concepts.MultiAZ.html          |
| Subnet Planning Across AZs         | https://docs.aws.amazon.com/vpc/latest/userguide/VPC_Subnets.html                     |

---

## 7. Are the Options Tricky?

| Option | Why It's Tricky                                                      |
| ------ | -------------------------------------------------------------------- |
| B      | Implies redundancy but keeps the DB as a self-managed EC2 in one AZ. |
| C      | Hints at HA with ALB, but limits everything to a single AZ.          |
| E      | Introduces VPC confusion without addressing AZ fault tolerance.      |

---

## 8. How to Approach Similar Questions

- **Scan for Single-AZ setups** – Immediate red flag.
- **Look for managed services like RDS Multi-AZ** for DB HA.
- **Verify that subnets and services span multiple AZs** — just adding a service isn’t enough if it’s scoped to one AZ.

---

## 9. Technology Deep Dive

| Feature           | ALB + Auto Scaling             | Amazon RDS Multi-AZ                |
| ----------------- | ------------------------------ | ---------------------------------- |
| Target Layer      | Web/App Tier                   | Database Tier                      |
| HA Mechanism      | Load balancing + health checks | Synchronous replication            |
| AZ Scope          | Cross-AZ                       | Primary + Standby in different AZs |
| Failover Handling | Redirect traffic to healthy AZ | Automatic failover to standby      |
| Ops Overhead      | Low                            | Very Low (fully managed)           |

---

## 10. Summary Table

| Layer    | Current Weakness    | Recommended Fix          |
| -------- | ------------------- | ------------------------ |
| Web/App  | Single-AZ, no scale | ALB + ASG across AZs (A) |
| Database | EC2 in one AZ       | RDS Multi-AZ (D)         |

---

## 11. Concept Expansion / Key Facts

- **Multi-AZ Deployment** is fundamental for AWS HA architecture.
- **EC2-hosted databases** require manual replication and failover — not recommended for production HA.
- **RDS Multi-AZ** = Synchronous replication + auto failover + no app change.
- Subnets must be present in every AZ you want to launch cross-AZ infrastructure in (e.g., RDS standby, ASG instances).

---

---

title: "saa-q017 – Decoupling EC2 and Lambda for Asynchronous Processing"
questionId: "saa-q017"
category: "Design Resilient Architectures"
tags: ["saa-c03", "sns", "ec2", "lambda", "asynchronous", "decoupling"]

---

## Question 'SAA-Q017'

An application running on Amazon EC2 needs to **asynchronously invoke** an AWS Lambda function to perform data processing. The services should be **decoupled**.

**Which service can be used to decouple the compute services?**  
_(Select ONE answer.)_

A. AWS Config  
B. AWS Step Functions  
C. Amazon SNS  
D. Amazon MQ

---

## 1. In Simple English

The EC2 instance needs to **trigger** a Lambda **without waiting for it to finish**.  
Also, EC2 and Lambda should be **loosely connected** — they shouldn't know each other's implementation details.

This is a perfect case for **decoupling using a messaging service**.

---

## 2. Verbiage & Realism

| Aspect       | Assessment                                                                            |
| ------------ | ------------------------------------------------------------------------------------- |
| Clarity      | Clearly asks about async invocation and decoupling.                                   |
| Realism      | Very common real-world use case in microservice architectures.                        |
| Completeness | Provides options that span config, orchestration, messaging, and brokers.             |
| Traps        | Step Functions (more orchestration than decoupling), Amazon MQ (heavier than needed). |

---

## 3. What the Question is Testing

| Concept                  | Why It Matters                                                       |
| ------------------------ | -------------------------------------------------------------------- |
| Decoupling services      | Makes systems more resilient, scalable, and easier to maintain.      |
| Async messaging patterns | Prevents blocking; allows for loosely coupled execution.             |
| Event-driven compute     | Common serverless architecture pattern with EC2-to-Lambda workflows. |

---

## 4. Answer and Explanation

✅ **Correct Answer:** C. **Amazon SNS**

| Option                | Verdict | Explanation                                                                                                                             |
| --------------------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| A. AWS Config         | ❌      | Tracks resource compliance; not used for compute messaging.                                                                             |
| B. AWS Step Functions | ❌      | Handles orchestration, but EC2 is not a typical trigger source and this is overkill for simple async tasks.                             |
| C. Amazon SNS         | ✅      | A lightweight pub/sub service that supports event-driven architecture. EC2 can publish to SNS, which can trigger Lambda asynchronously. |
| D. Amazon MQ          | ❌      | Full-featured broker service; overkill for simple decoupling. Also requires EC2 to manage connection logic.                             |

---

## 5. Final Answer

- ✅ **C. Amazon SNS**

---

## 6. Relevant AWS Documentation

| Topic                              | Link                                                                                  |
| ---------------------------------- | ------------------------------------------------------------------------------------- |
| Amazon SNS Overview                | https://docs.aws.amazon.com/sns/latest/dg/welcome.html                                |
| Using Amazon SNS to Trigger Lambda | https://docs.aws.amazon.com/lambda/latest/dg/with-sns.html                            |
| Asynchronous Messaging with SNS    | https://docs.aws.amazon.com/sns/latest/dg/sns-asynchronous-message-delivery.html      |
| Decoupling Microservices           | https://docs.aws.amazon.com/whitepapers/latest/microservices-on-aws/introduction.html |

---

## 7. Are the Options Tricky?

| Option            | Why It’s Tricky                                                                |
| ----------------- | ------------------------------------------------------------------------------ |
| B. Step Functions | Sounds async, but meant for orchestration, not event-driven decoupling.        |
| D. Amazon MQ      | Tempting as a message broker, but too complex for a simple EC2 → Lambda setup. |
| A. AWS Config     | Completely unrelated; included as a red herring.                               |

---

## 8. How to Approach Similar Questions

- **Watch for decoupling and async keywords** — often implies SNS or SQS.
- **Match service capabilities with question constraints** — lightweight vs orchestration vs auditing.
- **Avoid heavy/managed brokers unless there's legacy system integration.**

---

## 9. Technology Deep Dive

| Feature        | SNS                          | SQS                                          | Step Functions       | Amazon MQ                     |
| -------------- | ---------------------------- | -------------------------------------------- | -------------------- | ----------------------------- |
| Type           | Pub/Sub                      | Queue (Pull-based)                           | Orchestration        | Broker                        |
| Invocation     | Push-based (triggers Lambda) | Poll-based (Lambda via event source mapping) | Stateful workflows   | Requires protocol integration |
| Setup          | Simple                       | Simple to moderate                           | Moderate             | Complex                       |
| Ideal Use Case | Fan-out, async triggers      | Reliable task buffering                      | Multi-step workflows | Legacy integration            |

---

## 10. Summary Table

| Requirement                        | Best Fit                          |
| ---------------------------------- | --------------------------------- |
| Async Invocation                   | ✅ SNS                            |
| Decoupled Architecture             | ✅ SNS                            |
| Lightweight Setup                  | ✅ SNS                            |
| Complex Workflow or State Tracking | ❌ Step Functions (overkill here) |
| Legacy Broker Needed               | ❌ Amazon MQ (not needed here)    |

---

## 11. Concept Expansion / Key Facts

- **Amazon SNS** is ideal for real-time, event-driven communication between loosely coupled services.  
  It supports **multiple subscribers** (e.g., Lambda, SQS, HTTP endpoints) and uses a **push model** — perfect for asynchronous triggers.

- While **Step Functions** are great for workflows, they're not the best for decoupling **generic compute producers** (like EC2) from **event consumers** (like Lambda).

- **Amazon MQ** is used when integrating systems that require **JMS**, **AMQP**, or **STOMP** protocols — typically in **hybrid** or **enterprise legacy** scenarios.

- For EC2 → Lambda **asynchronous triggers**, both **Amazon SNS** and **Amazon SQS** are viable, but **SNS** is better for immediate **event-based fan-out** use cases.

---

---

title: "saa-q018 – Cost-Effective Latency Reduction for S3 Static Website with Regional Focus"
questionId: "saa-q018"
category: "Design High-Performing Architectures"
tags: ["saa-c03", "cloudfront", "latency", "price-class", "s3-static-site", "edge-optimization"]

---

## Question 'SAA-Q018'

A company offers an online product brochure that is delivered from a static website running on Amazon S3. The company’s customers are mainly in the **United States, Canada, and Europe**.

The company is looking to **cost-effectively reduce the latency** for users in these regions.

**What is the most cost-effective solution to these requirements?**  
_(Select ONE answer.)_

A. Create an Amazon CloudFront distribution that uses origins in U.S, Canada and Europe.  
B. Create an Amazon CloudFront distribution and set the price class to use all Edge Locations for best performance.  
C. Create an Amazon CloudFront distribution and set the price class to use only U.S, Canada and Europe.  
D. Create an Amazon CloudFront distribution and use Lambda@Edge to run the website's data processing closer to the users.

---

## 1. In Simple English

The company hosts a static website in S3 and wants it to load faster for users in North America and Europe **without spending extra money**.  
CloudFront helps reduce latency, and **Price Classes** let you choose which edge locations are used to optimize **cost** vs **performance**.

---

## 2. Verbiage & Realism

| Aspect       | Assessment                                                                           |
| ------------ | ------------------------------------------------------------------------------------ |
| Clarity      | Directly links geography with latency and cost.                                      |
| Realism      | Common pattern for global delivery of S3 static content.                             |
| Completeness | All relevant CloudFront options provided.                                            |
| Traps        | Lambda@Edge might sound performance-related but isn’t cost-effective or needed here. |

---

## 3. What the Question is Testing

| Concept                      | Why It Matters                                         |
| ---------------------------- | ------------------------------------------------------ |
| CloudFront Edge Optimization | Reduces latency by caching content closer to users.    |
| Price Classes                | Let you choose regional edge usage to control cost.    |
| Lambda@Edge Use Case         | Useful for dynamic processing, not static websites.    |
| Origin vs Edge Confusion     | Emphasizes role of edge caching over origin placement. |

---

## 4. Answer and Explanation

✅ **Correct Answer:** C. **Create an Amazon CloudFront distribution and set the price class to use only U.S, Canada and Europe.**

| Option                                                                                                                    | Verdict | Explanation                                                                                                                                            |
| ------------------------------------------------------------------------------------------------------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| A. Create an Amazon CloudFront distribution that uses origins in U.S, Canada and Europe.                                  | ❌      | Origins are not replicated automatically. You can’t specify multiple origin buckets unless architecting globally with S3 replication. Not needed here. |
| B. Create an Amazon CloudFront distribution and set the price class to use all Edge Locations for best performance.       | ❌      | Highest cost, unnecessary since users are only in specific regions.                                                                                    |
| C. Create an Amazon CloudFront distribution and set the price class to use only U.S, Canada and Europe.                   | ✅      | Balances performance and cost. Uses only edge locations relevant to the customer base.                                                                 |
| D. Create an Amazon CloudFront distribution and use Lambda@Edge to run the website's data processing closer to the users. | ❌      | Overkill for a static site. Adds complexity and cost without any benefit in this scenario.                                                             |

---

## 5. Final Answer

- ✅ **C. Create an Amazon CloudFront distribution and set the price class to use only U.S, Canada and Europe.**

---

## 6. Relevant AWS Documentation

| Topic                             | Link                                                                                                  |
| --------------------------------- | ----------------------------------------------------------------------------------------------------- |
| CloudFront Price Classes          | https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/PriceClass.html                    |
| CloudFront with S3 Static Website | https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/DownloadDistS3AndCustomOrigin.html |
| Lambda@Edge Use Cases             | https://docs.aws.amazon.com/lambda/latest/dg/lambda-edge.html                                         |

---

## 7. Are the Options Tricky?

| Option | Trickiness                                                                                            |
| ------ | ----------------------------------------------------------------------------------------------------- |
| A      | Misleads with "origins" — not relevant for regional edge delivery.                                    |
| B      | Seems like “best performance” is always best — but it contradicts the **cost-effective** requirement. |
| D      | Sounds like performance improvement, but doesn't apply to static content.                             |

---

## 8. How to Approach Similar Questions

- **Identify user geography.**
- **Choose Price Class** to match region and reduce edge delivery cost.
- **Avoid advanced services (like Lambda@Edge)** unless there's a clear need for custom logic or dynamic behavior.

---

## 9. Technology Deep Dive

| Feature         | CloudFront with Price Class                    | Lambda@Edge                          | Multiple Origins                                 |
| --------------- | ---------------------------------------------- | ------------------------------------ | ------------------------------------------------ |
| Use Case        | Static content distribution                    | Dynamic request processing           | Complex, regionally distributed origins          |
| Cost Efficiency | High when using region-specific edge locations | More expensive due to code execution | Higher ops + data transfer cost                  |
| Performance     | Optimized to regional edge                     | Adds minor latency for processing    | No improvement unless users are near all origins |
| Complexity      | Low                                            | Moderate to high                     | High                                             |

---

## 10. Summary Table

| Requirement                     | Best Match                           |
| ------------------------------- | ------------------------------------ |
| Low latency in US/Canada/Europe | ✅ CloudFront                        |
| Cost efficiency                 | ✅ Price Class (U.S, Canada, Europe) |
| No dynamic logic                | ✅ No Lambda@Edge                    |
| Avoid origin complexity         | ✅ Single S3 origin is sufficient    |

---

## 11. Concept Expansion / Key Facts

- **CloudFront Price Classes** allow you to **limit edge location coverage** to save on cost.

  - `Price Class 100` = US, Canada, Europe (lowest cost).
  - `Price Class 200` = Includes Asia + Middle East.
  - `Price Class All` = All edge locations globally (highest cost).

- **Edge locations** are where caching happens, not where S3 buckets must reside. Your S3 bucket can still be in a single region.

- **Lambda@Edge** is useful for header manipulation, redirects, or AB testing — **not needed for static brochure delivery**.

- Always use **CloudFront with S3 static websites** to improve performance and reduce global latency, especially with **geo-constrained audiences**.

---

---

title: "saa-q019 – Designing a Loosely Coupled, Scalable EC2 Compute Layer with Durable Job Storage"
questionId: "saa-q019"
category: "Design Resilient Architectures"
tags: ["saa-c03", "sqs", "auto-scaling", "decoupling", "durability", "stateless", "loosely-coupled"]

---

## Question 'SAA-Q019'

A solutions architect is designing an application on AWS. The **compute layer will run in parallel across EC2 instances**. The compute layer should **scale based on the number of jobs to be processed**. The compute layer is **stateless**.

The solutions architect must ensure that the application is **loosely coupled** and the **job items are durably stored**.

**Which design should the solutions architect use?**  
_(Select ONE answer.)_

A. Create an Amazon SNS topic to send the jobs that need to be processed. Create an Amazon EC2 Auto Scaling group for the compute application. Set the scaling policy for the Auto Scaling group to add and remove nodes based on the number of messages published to the SNS topic.  
B. Create an Amazon SQS queue to hold the jobs that need to be processed. Create an Amazon EC2 Auto Scaling group for the compute application. Set the scaling policy for the Auto Scaling group to add and remove nodes based on network usage.  
C. Create an Amazon SNS topic to send the jobs that need to be processed. Create an Amazon EC2 Auto Scaling group for the compute application. Set the scaling policy for the Auto Scaling group to add and remove nodes based on CPU usage.  
D. Create an Amazon SQS queue to hold the jobs that need to be processed. Create an Amazon EC2 Auto Scaling group for the compute application. Set the scaling policy for the Auto Scaling group to add and remove nodes based on the number of items in the SQS queue.

---

## 1. In Simple English

You have a batch-style app where jobs come in, get processed by EC2 instances, and you want:

- **Stateless compute**, so EC2s can come/go.
- **Durable job storage**, so jobs aren't lost.
- **Auto-scaling**, to handle more jobs when they come in.
- **Loose coupling**, so the producer doesn’t need to know about the compute layer directly.

---

## 2. Verbiage & Realism

| Aspect       | Assessment                                                                 |
| ------------ | -------------------------------------------------------------------------- |
| Clarity      | Clear about stateless compute, durable queue, scaling.                     |
| Realism      | Highly common architecture for batch processing with Auto Scaling and SQS. |
| Completeness | Includes distractors like SNS and irrelevant metrics like CPU/network.     |
| Traps        | Misuse of SNS, wrong scaling metric.                                       |

---

## 3. What the Question is Testing

| Concept                      | Why It Matters                                 |
| ---------------------------- | ---------------------------------------------- |
| Loosely Coupled Architecture | Makes system more fault-tolerant and scalable. |
| Stateless Compute            | Enables Auto Scaling without session loss.     |
| SQS Queue + ASG              | Common pattern for job queue processing.       |
| Metric-Based Scaling         | Ensures compute adjusts to workload.           |

---

## 4. Answer and Explanation

✅ **Correct Answer:** D. **Create an Amazon SQS queue to hold the jobs that need to be processed. Create an Amazon EC2 Auto Scaling group for the compute application. Set the scaling policy for the Auto Scaling group to add and remove nodes based on the number of items in the SQS queue.**

| Option                                           | Verdict | Explanation                                                                                                |
| ------------------------------------------------ | ------- | ---------------------------------------------------------------------------------------------------------- |
| A. SNS + ASG scaling based on published messages | ❌      | SNS is push-based and doesn't store messages durably. Also, Auto Scaling can't scale based on SNS metrics. |
| B. SQS + ASG scaling based on network usage      | ❌      | Network usage doesn't reflect job count; might under/over-scale.                                           |
| C. SNS + ASG scaling based on CPU usage          | ❌      | CPU may not reflect number of jobs in queue; SNS lacks durability.                                         |
| D. SQS + ASG scaling based on queue size         | ✅      | SQS provides **durable** job storage and decoupling; scaling by queue depth is best practice.              |

---

## 5. Final Answer

- ✅ **D. Create an Amazon SQS queue to hold the jobs that need to be processed. Create an Amazon EC2 Auto Scaling group for the compute application. Set the scaling policy for the Auto Scaling group to add and remove nodes based on the number of items in the SQS queue.**

---

## 6. Relevant AWS Documentation

| Topic                                  | Link                                                                                    |
| -------------------------------------- | --------------------------------------------------------------------------------------- |
| Amazon SQS Overview                    | https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/welcome.html |
| EC2 Auto Scaling with SQS Queue Depth  | https://docs.aws.amazon.com/autoscaling/ec2/userguide/as-using-sqs-queue.html           |
| Stateless Application Design           | https://docs.aws.amazon.com/whitepapers/latest/aws-overview/stateless-applications.html |
| Loose Coupling with Messaging Services | https://docs.aws.amazon.com/whitepapers/latest/microservices-on-aws/introduction.html   |

---

## 7. Are the Options Tricky?

| Option | Trickiness                                                                |
| ------ | ------------------------------------------------------------------------- |
| A      | SNS doesn’t retain jobs; scaling based on SNS message count isn’t viable. |
| B      | Sounds reasonable but network usage is unrelated to job queue size.       |
| C      | SNS again — plus CPU isn't a job-count proxy.                             |
| D      | Best practice for scalable, stateless compute workers.                    |

---

## 8. How to Approach Similar Questions

- **Look for keywords:** _stateless_, _durable_, _loosely coupled_ → think SQS.
- **Match scaling metrics to workload indicators:** queue size is better than CPU for batch jobs.
- **Avoid SNS unless fan-out or push-notifications are needed.**

---

## 9. Technology Deep Dive

| Feature            | Amazon SNS             | Amazon SQS                        |
| ------------------ | ---------------------- | --------------------------------- |
| Message Retention  | ❌ No (push only)      | ✅ Yes (durable queue)            |
| Message Pulling    | ❌ Not applicable      | ✅ Workers pull from queue        |
| Decoupling Support | Partial (push only)    | ✅ Full decoupling                |
| Scaling Metric     | N/A                    | Queue depth, oldest message age   |
| Use Case           | Notifications, fan-out | Job queues, background processing |

---

## 10. Summary Table

| Requirement               | Best Match             |
| ------------------------- | ---------------------- |
| Durable job storage       | ✅ SQS                 |
| Stateless compute scaling | ✅ EC2 ASG + SQS       |
| Loose coupling            | ✅ SQS                 |
| Metric-based auto scaling | ✅ Based on queue size |

---

## 11. Concept Expansion / Key Facts

- **Amazon SQS** is a fully managed message queue that supports **durable** storage of tasks. It's ideal for decoupling producers from consumers in scalable architectures.

- You can configure **Auto Scaling Group policies** that monitor the SQS **ApproximateNumberOfMessages** metric to increase or decrease the number of EC2 instances dynamically based on backlog.

- **Stateless compute nodes** are perfect for queue-based processing because they don’t retain session data. They can be replaced or scaled without impact.

- **Amazon SNS** is suited for **event fan-out** or **push notifications**, but does **not retain messages** and is not directly tied to Auto Scaling policy metrics.

---

---

title: "saa-q020 – Reliable and Secure Transfer of 5 TB Daily Data from On-Prem to S3"
questionId: "saa-q020"
category: "Design Resilient Architectures"
tags: ["saa-c03", "datasync", "direct-connect", "s3-transfer", "on-premises", "data-ingestion"]

---

## Question 'SAA-Q020'

A company runs an application in an on-premises data center that collects **environmental data from production machinery**. The data consists of **JSON files stored on NAS**, and around **5 TB of data is collected each day**.

The company must **upload this data to Amazon S3** where it can be processed by an analytics application. The data **must be transferred securely**.

**Which solution offers the MOST reliable and time-efficient data transfer?**  
_(Select ONE answer.)_

A. AWS Database Migration Service over the Internet.  
B. Amazon S3 Transfer Acceleration over the Internet.  
C. AWS DataSync over AWS Direct Connect.  
D. Multiple AWS Snowcone devices.

---

## 1. In Simple English

The company has 5 TB of **daily JSON data** sitting on a NAS device. They need to **move it securely and reliably to Amazon S3**. This is a **recurring, large-scale transfer**, not a one-time migration. It needs to be **automated, fast, and secure**.

---

## 2. Verbiage & Realism

| Aspect       | Assessment                                                                                 |
| ------------ | ------------------------------------------------------------------------------------------ |
| Clarity      | Clearly defines source, format, volume, and destination.                                   |
| Realism      | Real-world challenge: daily high-volume NAS-to-S3 ingestion.                               |
| Completeness | Options span different transfer methods, some viable, some misleading.                     |
| Traps        | Services not meant for file transfer (DMS, Snowcone), or poor fit for recurring workloads. |

---

## 3. What the Question is Testing

| Concept                 | Why It Matters                                                             |
| ----------------------- | -------------------------------------------------------------------------- |
| Right AWS transfer tool | Each transfer service (DataSync, Snowcone, etc.) fits different use cases. |
| Network optimization    | 5 TB/day requires efficiency — Direct Connect + DataSync is optimal.       |
| File system integration | NAS compatibility (DataSync supports NFS/SMB) is critical.                 |
| Secure transmission     | Data must be encrypted in transit and securely handled.                    |

---

## 4. Answer and Explanation

✅ **Correct Answer:** C. **AWS DataSync over AWS Direct Connect**

| Option                                               | Verdict | Explanation                                                                                                                                                                           |
| ---------------------------------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| A. AWS Database Migration Service over the Internet  | ❌      | DMS is for database migrations, not file-based (JSON) NAS transfers.                                                                                                                  |
| B. Amazon S3 Transfer Acceleration over the Internet | ❌      | Helps with upload speed over public internet but lacks NAS integration, limited to PUT requests.                                                                                      |
| C. AWS DataSync over AWS Direct Connect              | ✅      | DataSync supports **automated, secure transfers** from on-prem NAS (NFS/SMB) to S3. Direct Connect ensures **dedicated, high-bandwidth, low-latency link** for **5 TB/day** reliably. |
| D. Multiple AWS Snowcone devices                     | ❌      | Snowcone is ideal for **offline, intermittent, or remote** locations. Not efficient for **daily, continuous transfers**.                                                              |

---

## 5. Final Answer

- ✅ **C. AWS DataSync over AWS Direct Connect**

---

## 6. Relevant AWS Documentation

| Topic                     | Link                                                                             |
| ------------------------- | -------------------------------------------------------------------------------- |
| AWS DataSync Overview     | https://docs.aws.amazon.com/datasync/latest/userguide/what-is-datasync.html      |
| DataSync + Direct Connect | https://docs.aws.amazon.com/datasync/latest/userguide/datasync-network.html      |
| Snowcone Use Cases        | https://docs.aws.amazon.com/snowcone/latest/userguide/what-is-snowcone.html      |
| S3 Transfer Acceleration  | https://docs.aws.amazon.com/AmazonS3/latest/userguide/transfer-acceleration.html |

---

## 7. Are the Options Tricky?

| Option | Trickiness                                                                                     |
| ------ | ---------------------------------------------------------------------------------------------- |
| A      | Misleads with “migration” — DMS is not for file-based ingestion.                               |
| B      | Sounds attractive for speed, but lacks integration with NAS or automation for large volumes.   |
| D      | Seems viable at scale, but is **offline** and **manual** — wrong for recurring daily transfer. |

---

## 8. How to Approach Similar Questions

- **Match the data type** to the right transfer service (file vs DB).
- **Match the data frequency and volume** (one-time vs recurring, GB vs TB).
- **Watch for clues**: NAS + daily + secure = DataSync.
- **Offline options** (Snowcone/Snowball) are for intermittent or bandwidth-limited environments.

---

## 9. Technology Deep Dive

| Feature                  | AWS DataSync                    | S3 Transfer Acceleration | AWS DMS          | AWS Snowcone               |
| ------------------------ | ------------------------------- | ------------------------ | ---------------- | -------------------------- |
| File Support (JSON, NAS) | ✅ Native (NFS/SMB)             | ❌ Only PUT uploads      | ❌ Only DBs      | ✅ But manual process      |
| Secure Transfer          | ✅ Encryption in transit        | ✅ via HTTPS             | ✅ for DBs       | ✅ for device              |
| Transfer Type            | Online                          | Online                   | Online (DB only) | Offline                    |
| Scalable for 5 TB/day    | ✅                              | ❌                       | ❌               | ❌                         |
| Ideal Use Case           | Daily high-volume file transfer | Global web uploads       | DB migration     | Remote/off-grid collection |

---

## 10. Summary Table

| Requirement               | Best Solution                 |
| ------------------------- | ----------------------------- |
| Daily 5 TB file transfers | ✅ DataSync                   |
| NFS-based NAS source      | ✅ DataSync                   |
| Secure transfer           | ✅ DataSync (with encryption) |
| Reliability & automation  | ✅ DataSync                   |
| Dedicated network         | ✅ Direct Connect             |

---

## 11. Concept Expansion / Key Facts

- **AWS DataSync** is purpose-built for **automating large-scale transfers** between **on-prem file systems** (like NAS using NFS/SMB) and AWS storage (S3, EFS, FSx).
- Using **AWS Direct Connect** improves **reliability and throughput**, bypassing public internet, especially important when sending **5 TB daily**.
- **DataSync features** include encryption in transit, incremental transfer, data validation, and schedule automation — making it ideal for production ETL pipelines.
- **Transfer Acceleration** is helpful for internet uploads from **remote users**, not for **back-end ingestion from NAS**.
- **Snowcone** devices are intended for **offline transport**, particularly in **edge or disconnected** environments — not for continuous ingestion workflows.

---

---

title: "saa-q021 – Granting Least Privilege Cross-Account Access to an SQS Queue"
questionId: "saa-q021"
category: "Design Secure Architectures"
tags: ["saa-c03", "sqs", "cross-account-access", "least-privilege", "sendmessage", "iam-policy"]

---

## Question 'SAA-Q021'

A company is working with a **strategic partner** that has an application which must be able to **send messages** to one of the company’s **Amazon SQS queues**. The partner company has its **own AWS account**.

**How can a Solutions Architect provide least privilege access to the partner?**  
_(Select ONE answer.)_

A. Update the permission policy on the SQS queue to grant all permissions to the partner’s AWS account.  
B. Update the permission policy on the SQS queue to grant the `sqs:SendMessage` permission to the partner’s AWS account.  
C. Create a user account and grant the `sqs:SendMessage` permission for Amazon SQS. Share the credentials with the partner company.  
D. Create a cross-account role with access to all SQS queues and use the partner's AWS account in the trust document for the role.

---

## 1. In Simple English

The company needs to let a **partner AWS account send messages** into an existing **SQS queue**. The partner shouldn’t be allowed to delete or read messages — just send them.  
The solution should apply the **least privilege** rule and keep everything **secure, simple, and AWS-native**.

---

## 2. Verbiage & Realism

| Aspect       | Assessment                                                                                     |
| ------------ | ---------------------------------------------------------------------------------------------- |
| Clarity      | Clearly explains a cross-account scenario and desired action (send only).                      |
| Realism      | Very realistic — cross-account messaging is a common use case in enterprise architectures.     |
| Completeness | All common approaches are covered, both correct and incorrect.                                 |
| Traps        | Over-permissioning (Option A), IAM user sharing (Option C), unnecessary complexity (Option D). |

---

## 3. What the Question is Testing

| Concept                       | Why It Matters                                                     |
| ----------------------------- | ------------------------------------------------------------------ |
| Cross-account SQS permissions | Critical for external integrations with decoupled services.        |
| Least privilege               | Avoids giving access to unnecessary actions (delete, read, purge). |
| Policy location and scope     | Understand when to use resource policies vs. IAM roles or users.   |

---

## 4. Answer and Explanation

✅ **Correct Answer:** B. **Update the permission policy on the SQS queue to grant the `sqs:SendMessage` permission to the partner’s AWS account.**

| Option | Verdict | Explanation                                                                                               |
| ------ | ------- | --------------------------------------------------------------------------------------------------------- |
| A      | ❌      | Grants more than needed (`DeleteMessage`, `PurgeQueue`, etc.). Violates least privilege.                  |
| B      | ✅      | Grants exactly what’s needed (`SendMessage`) using a resource-based policy. Secure and minimal.           |
| C      | ❌      | IAM user sharing is insecure and against AWS best practices.                                              |
| D      | ❌      | Cross-account roles are useful, but not necessary for this use case — and it grants access to all queues. |

---

## 5. Final Answer

- ✅ **B. Update the permission policy on the SQS queue to grant the `sqs:SendMessage` permission to the partner’s AWS account.**

---

## 6. Relevant AWS Documentation

| Topic                         | Link                                                                                                              |
| ----------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| Amazon SQS Access Control     | https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-access-control.html                |
| SQS Policy Examples           | https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-using-identity-based-policies.html |
| Cross-Account Access Patterns | https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_common-scenarios_third-party.html                       |

---

## 7. Are the Options Tricky?

| Option | Trickiness                                                                                                     |
| ------ | -------------------------------------------------------------------------------------------------------------- |
| A      | “Grant all permissions” sounds like it will work, but is a dangerous anti-pattern.                             |
| C      | Creating users and sharing credentials is easy but insecure and deprecated.                                    |
| D      | Using a cross-account role sounds advanced but is excessive and unrelated to the specific queue-level control. |

---

## 8. How to Approach Similar Questions

- **Start with the verb** — what action is needed? (Send only? Read? Delete?)
- **Identify the subject** — is this a user, account, or service?
- Use **resource-based policies** (like SQS or S3) when you want to **grant access to an external account**.
- Use **IAM roles** only when the external party needs to assume a role for broader access.

---

## 9. Technology Deep Dive

| Feature              | Resource-based Policy       | IAM Role                     | IAM User                   |
| -------------------- | --------------------------- | ---------------------------- | -------------------------- |
| Cross-account access | ✅ Native support           | ✅ With trust policy         | ❌ Not ideal               |
| Scope of access      | Per-resource                | Per-role                     | Account-wide unless scoped |
| Best for             | SQS, S3, SNS                | Temporary credentials        | Deprecated use case        |
| Security posture     | Strong with least privilege | Also strong but more complex | Weak (static credentials)  |

---

## 10. Summary Table

| Requirement              | Best Match                |
| ------------------------ | ------------------------- |
| Allow only `SendMessage` | ✅ Option B               |
| Secure and simple setup  | ✅ Option B               |
| Least privilege enforced | ✅ Option B               |
| Cross-account support    | ✅ Resource policy on SQS |

---

## 11. Concept Expansion / Key Facts

When a third-party or partner organization needs to send data to an SQS queue in **your account**, the **simplest and most secure method** is to use a **resource-based access policy** on the queue itself.

Here's how this works:

- **Amazon SQS** supports attaching **resource policies** that specify which external AWS account (by `Account ID`) is allowed to perform specific actions.
- In this case, the partner **only needs permission to call `SendMessage`**, so your policy should **only include that action**.
- The **partner’s application** assumes a role **within their own account**, and uses their identity to call the SQS endpoint **in your account**, authorized by the policy you’ve attached.

Here is an example of such a policy:

```json
{
  "Version": "2012-10-17",
  "Id": "QueuePolicy",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "AWS": "arn:aws:iam::PARTNER_ACCOUNT_ID:root"
      },
      "Action": "sqs:SendMessage",
      "Resource": "arn:aws:sqs:us-east-1:YOUR_ACCOUNT_ID:YourQueueName"
    }
  ]
}
```

---

---

title: "saa-q022 – Hybrid Storage with Local Caching Without Re-Architecting On-Prem Applications"
questionId: "saa-q022"
category: "Design Resilient Architectures"
tags: ["saa-c03", "storage-gateway", "nfs", "block-storage", "hybrid-cloud", "local-caching"]

---

## Question 'SAA-Q022'

Storage capacity has become an issue for a company that runs **application servers on-premises**. The servers are connected to a combination of **block storage** and **NFS storage** solutions. The company requires a solution that supports **local caching** without **re-architecting its existing applications**.

**Which combination of changes can the company make to meet these requirements?**  
_(Select TWO answers.)_

A. Use the mount command on servers to mount Amazon S3 buckets using NFS.  
B. Use Amazon Elastic File System (EFS) volumes to replace the block storage.  
C. Use an AWS Storage Gateway file gateway to replace the NFS storage.  
D. Use an AWS Storage Gateway volume gateway to replace the block storage.  
E. Use AWS Direct Connect and mount an Amazon FSx for Windows File Server using iSCSI.

---

## 1. In Simple English

The company wants to **expand storage capacity**, but their apps are **on-premises** and can't be changed. They currently use:

- **Block storage** (like iSCSI or SAN disks), and
- **NFS (Network File System)** shared storage.

They need a **hybrid solution** that gives them access to **cloud-backed storage** with **local caching**, while keeping their existing file/block interface intact.

---

## 2. Verbiage & Realism

| Aspect       | Assessment                                                                         |
| ------------ | ---------------------------------------------------------------------------------- |
| Clarity      | Clearly describes on-prem constraints and goal of non-disruptive hybrid storage.   |
| Realism      | Mirrors real-world enterprise hybrid storage scenarios.                            |
| Completeness | Includes both correct AWS hybrid storage options and distractors.                  |
| Traps        | Misuse of S3 mount, EFS replacement without compatibility, iSCSI misunderstanding. |

---

## 3. What the Question is Testing

| Concept                               | Why It Matters                                           |
| ------------------------------------- | -------------------------------------------------------- |
| AWS hybrid storage                    | Matching AWS Storage Gateway types to on-prem workloads. |
| File vs Block interface compatibility | Understanding how NFS and block protocols are mapped.    |
| Local caching                         | Key feature of Storage Gateway for low-latency access.   |
| Minimal application disruption        | AWS-native ways to extend storage without app rewrites.  |

---

## 4. Answer and Explanation

✅ **Correct Answers:** C and D

| Option                                                                 | Verdict | Explanation                                                                                                                                                    |
| ---------------------------------------------------------------------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| A. Mount S3 using NFS                                                  | ❌      | Not natively possible. S3 is object storage and doesn’t support NFS mounts directly via standard `mount`. Requires third-party tools like s3fs or custom apps. |
| B. Use EFS to replace block storage                                    | ❌      | EFS is a file system (NFS-based) — not a block storage replacement. It can’t mimic the behavior of local block devices.                                        |
| C. Use AWS Storage Gateway **file gateway** to replace NFS storage     | ✅      | File Gateway exposes a **NFS/SMB interface**, backed by S3 with local caching. Perfect for NFS replacement with minimal changes.                               |
| D. Use AWS Storage Gateway **volume gateway** to replace block storage | ✅      | Volume Gateway provides block-level iSCSI storage, backed by S3, with local caching. Seamlessly integrates with existing block storage setups.                 |
| E. Use Direct Connect and mount FSx via iSCSI                          | ❌      | Amazon FSx for Windows uses **SMB**, not iSCSI. Also requires app compatibility and does not provide local caching for on-prem use.                            |

---

## 5. Final Answer

- ✅ **C. Use an AWS Storage Gateway file gateway to replace the NFS storage.**
- ✅ **D. Use an AWS Storage Gateway volume gateway to replace the block storage.**

---

## 6. Relevant AWS Documentation

| Topic                        | Link                                                                                  |
| ---------------------------- | ------------------------------------------------------------------------------------- |
| AWS Storage Gateway Overview | https://docs.aws.amazon.com/storagegateway/latest/userguide/WhatIsStorageGateway.html |
| File Gateway Details         | https://docs.aws.amazon.com/storagegateway/latest/userguide/WhatIsFileGateway.html    |
| Volume Gateway Details       | https://docs.aws.amazon.com/storagegateway/latest/userguide/WhatIsVolumeGateway.html  |
| FSx for Windows Overview     | https://docs.aws.amazon.com/fsx/latest/WindowsGuide/what-is.html                      |

---

## 7. Are the Options Tricky?

| Option | Trickiness                                                                            |
| ------ | ------------------------------------------------------------------------------------- |
| A      | Suggests direct NFS access to S3, which sounds possible but isn't supported natively. |
| B      | Implies file-to-block substitution, which isn't valid.                                |
| E      | Incorrectly assumes iSCSI support on FSx, which is SMB-only.                          |

---

## 8. How to Approach Similar Questions

- **Map interface type to gateway type**: NFS → File Gateway, Block → Volume Gateway.
- Look for **keywords like "local caching"** — this is a clear pointer toward Storage Gateway.
- Avoid assumptions about mounting object storage like S3 as if it were a POSIX filesystem.

---

## 9. Technology Deep Dive

| Feature           | File Gateway | Volume Gateway              | EFS                            | FSx                         | S3                                         |
| ----------------- | ------------ | --------------------------- | ------------------------------ | --------------------------- | ------------------------------------------ |
| Protocol          | NFS / SMB    | iSCSI                       | NFS                            | SMB                         | REST API                                   |
| Caching           | ✅ Local     | ✅ Local                    | ❌                             | ❌                          | ❌                                         |
| Use Case          | Replace NFS  | Replace block storage (SAN) | Native NFS for cloud workloads | Windows file shares         | Object storage                             |
| App Change Needed | ❌ None      | ❌ None                     | ✅ Yes (NFS required)          | ✅ Yes (SMB support needed) | ✅ Yes (requires S3 API or custom tooling) |

---

## 10. Summary Table

| Requirement                                           | Best AWS Service                     |
| ----------------------------------------------------- | ------------------------------------ |
| Replace on-prem NFS with minimal change               | ✅ File Gateway                      |
| Replace block storage (iSCSI) with cloud-backed disks | ✅ Volume Gateway                    |
| Local caching for low-latency access                  | ✅ Both gateways support this        |
| Native object access from on-prem                     | ❌ Not feasible without custom tools |

---

## 11. Concept Expansion / Key Facts

When migrating or extending on-premises storage to AWS **without rewriting applications**, the **AWS Storage Gateway** family offers purpose-built solutions:

- **File Gateway** lets on-prem systems access cloud-backed storage using **standard NFS or SMB protocols**, with **local cache** for low-latency reads and buffering writes. This is ideal for applications expecting a traditional file share, such as what NFS-based workloads rely on. File Gateway automatically stores data in Amazon S3 in object format, yet presents a filesystem-like interface on-prem.

- **Volume Gateway** provides **block storage** using the iSCSI protocol. Applications see it as a local disk, but data is stored in S3 in the backend. You can configure it in:
  - **Cached mode**, where the most frequently accessed data is stored locally, and the rest is fetched on-demand.
  - **Stored mode**, where the primary data is kept on-premises and backed up asynchronously to AWS.

These services allow for **incremental cloud adoption** while preserving legacy interfaces.

**What doesn’t work:**

- **Mounting S3 as NFS** is not supported by AWS natively. While third-party tools (like `s3fs`) exist, they are not reliable or supported in production.
- **EFS** is a cloud-only NFS solution — it can’t be directly mounted by on-prem servers unless through EC2 or via Transit Gateway with strict conditions.
- **Amazon FSx for Windows** is a fully managed SMB file system, but it's **not compatible with iSCSI** and has **no local cache** for on-prem reads.

Bottom line: **Storage Gateway** is AWS’s purpose-built hybrid solution for bridging on-prem workloads and cloud storage while offering **protocol compatibility and local caching**, which are key to seamless integration with legacy apps.

---

---

title: "saa-q023 – Enabling Cross-Region Disaster Recovery for EC2-Based Applications"
questionId: "saa-q023"
category: "Design Resilient Architectures"
tags: ["saa-c03", "ec2", "ami", "disaster-recovery", "cross-region", "ebs"]

---

## Question 'SAA-Q023'

A company's application is running on **Amazon EC2 instances in a single Region**. In the event of a disaster, a Solutions Architect needs to ensure that the resources can also be **deployed to a second Region**.

**Which combination of actions should the solutions architect take to accomplish this?**  
_(Select TWO answers.)_

A. Copy an Amazon Elastic Block Store (Amazon EBS) volume from Amazon S3 and launch an EC2 instance in the second Region using that EBS volume  
B. Detach a volume on an EC2 instance and copy it to an Amazon S3 bucket in the second Region  
C. Launch a new EC2 instance from an Amazon Machine Image (AMI) in the second Region  
D. Launch a new EC2 instance in the second Region and copy a volume from Amazon S3 to the new instance  
E. Copy an Amazon Machine Image (AMI) of an EC2 instance and specify the second Region for the destination

---

## 1. In Simple English

The app is running in one AWS Region, but we need a **backup plan** to deploy it in a **different Region** in case something goes wrong.  
We need to **replicate EC2-related resources** (like AMIs and EBS volumes) to a **different Region** so the app can be relaunched quickly.

---

## 2. Verbiage & Realism

| Aspect       | Assessment                                                                        |
| ------------ | --------------------------------------------------------------------------------- |
| Clarity      | Clear scenario about disaster recovery across AWS Regions.                        |
| Realism      | Highly common in real-world architectures where cross-region DR is a requirement. |
| Completeness | Mixes valid AMI copy actions with decoy options that confuse EBS/S3 workflows.    |
| Traps        | S3 as an intermediary for EBS snapshots or live data transfer (misleading).       |

---

## 3. What the Question is Testing

| Concept                   | Why It Matters                                                                    |
| ------------------------- | --------------------------------------------------------------------------------- |
| Cross-Region EC2 Recovery | Critical for high availability and disaster recovery planning.                    |
| AMI Portability           | Understanding how to copy AMIs across Regions.                                    |
| Launch Dependencies       | Recognizing that EC2 launch requires a compatible AMI or snapshot in that Region. |
| Misuse of S3 with EBS     | Identifying what workflows are valid for copying volumes.                         |

---

## 4. Answer and Explanation

✅ **Correct Answers:**

- **C. Launch a new EC2 instance from an Amazon Machine Image (AMI) in the second Region**
- **E. Copy an Amazon Machine Image (AMI) of an EC2 instance and specify the second Region for the destination**

| Option | Verdict | Explanation                                                                                                                                                    |
| ------ | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| A      | ❌      | EBS volumes are not copied from S3 directly. This flow doesn’t exist — EBS snapshots are stored in S3 _internally_, but you can't launch EC2 from S3 manually. |
| B      | ❌      | Detaching and manually copying a volume to S3 doesn’t provide a usable format in the second Region. Not a supported method.                                    |
| C      | ✅      | Once an AMI exists in a Region, EC2 can be launched from it immediately.                                                                                       |
| D      | ❌      | You cannot copy a bootable volume from S3 to an EC2 instance this way. No official support for this workflow.                                                  |
| E      | ✅      | You can copy an AMI to another Region using the AWS Management Console, CLI, or API, and it will be available for launching EC2 instances in that Region.      |

---

## 5. Final Answer

- ✅ **C. Launch a new EC2 instance from an Amazon Machine Image (AMI) in the second Region**
- ✅ **E. Copy an Amazon Machine Image (AMI) of an EC2 instance and specify the second Region for the destination**

---

## 6. Relevant AWS Documentation

| Topic                                | Link                                                                                      |
| ------------------------------------ | ----------------------------------------------------------------------------------------- |
| Copying an AMI to Another Region     | https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/CopyingAMIs.html                      |
| Using EC2 AMIs for Disaster Recovery | https://docs.aws.amazon.com/prescriptive-guidance/latest/disaster-recovery/ec2-based.html |
| EBS Snapshots and AMIs               | https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/AMIs.html                             |
| AMI Lifecycle and Launch Process     | https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-launching-instance.html           |

---

## 7. Are the Options Tricky?

| Option | Trickiness                                                                            |
| ------ | ------------------------------------------------------------------------------------- |
| A      | Suggests using S3 as a staging area for EBS volumes — not a valid AWS-supported path. |
| B      | Encourages a manual and unsupported method of copying volumes.                        |
| D      | Mentions launching EC2 and using S3 volumes — again, this is technically inaccurate.  |

---

## 8. How to Approach Similar Questions

- For **EC2 disaster recovery**, focus on **AMI replication and snapshot strategy**.
- **Don’t assume S3 is a direct destination for EBS volumes** unless talking about snapshots (even then, the process is abstracted).
- Always **launch EC2 from AMIs**, not from copied EBS volumes or S3 buckets.

---

## 9. Technology Deep Dive

| Feature                 | AMI                         | EBS Volume                  | EBS Snapshot                     | S3               |
| ----------------------- | --------------------------- | --------------------------- | -------------------------------- | ---------------- |
| Launch EC2 from         | ✅ Yes                      | ❌ No                       | ✅ With proper image association | ❌               |
| Cross-Region Copy       | ✅ Native support           | ❌ Manual workaround needed | ✅ Snapshot copy                 | ❌               |
| Stored in S3?           | ✅ Abstractly via snapshots | ✅ Backed by EBS infra      | ✅ Native                        | ✅ Object format |
| Disaster Recovery Ready | ✅ Yes                      | ❌ Not directly             | ✅ With snapshot lifecycle       | ❌               |

---

## 10. Summary Table

| Requirement                             | Best Solution                                 |
| --------------------------------------- | --------------------------------------------- |
| Recreate EC2 instance in another Region | ✅ AMI copy (Option E)                        |
| Launch EC2 in second Region             | ✅ Use existing AMI in that Region (Option C) |
| Avoid unsupported S3 copy hacks         | ✅ Skip A, B, D                               |

---

## 11. Concept Expansion / Key Facts

In AWS, the most reliable way to enable **cross-Region disaster recovery** for EC2 instances is through the **replication of Amazon Machine Images (AMIs)**. An AMI includes both the **boot volume snapshot** and the **launch configuration metadata** (such as instance type, root device, block mapping, etc.).

Here’s how it works:

1. **Create an AMI** of your EC2 instance (which internally uses an EBS snapshot).
2. **Copy that AMI** to the desired **target Region** using the console or CLI with the `--destination-region` parameter.
3. Once the AMI is present in the target Region, you can **launch a new EC2 instance** using that AMI, just like you would in the original Region.

EBS snapshots themselves **can be copied across Regions**, but that process does not automatically create a bootable AMI in the destination Region. You would need to **register a new AMI** using that snapshot — a more complex process compared to just copying the AMI directly.

Misconceptions:

- While **EBS snapshots are stored in Amazon S3 under the hood**, you **cannot access or mount them via S3** like files. There is **no valid method** to copy volumes from EC2 to S3 manually and relaunch from them.
- You **cannot launch an EC2 instance directly from a volume copied to S3**.
- You **cannot use `mount` to attach bootable volumes from S3**.

**Best practice:**  
For DR preparedness, include **regular AMI creation and cross-region copying** as part of your backup lifecycle policy or automation workflow. AWS Backup and Lifecycle Manager can help automate this.

---

---

title: "saa-q024 – Global App Deployment with Latency-Based Routing, Failover, and Whitelisted IPs"
questionId: "saa-q024"
category: "Design High-Performing Architectures"
tags: ["saa-c03", "global-accelerator", "latency-routing", "failover", "whitelisting", "nlb"]

---

## Question 'SAA-Q024'

A new application is to be published in **multiple regions around the world**. The Architect needs to ensure that **only 2 IP addresses need to be whitelisted**. The solution should **intelligently route traffic for lowest latency** and provide **fast regional failover**.

**How can this be achieved?**  
_(Select ONE answer.)_

A. Launch EC2 instances into multiple regions behind an NLB with a static IP address  
B. Launch EC2 instances into multiple regions behind an ALB and use Amazon CloudFront with a pair of static IP addresses  
C. Launch EC2 instances into multiple regions behind an ALB and use a Route 53 failover routing policy  
D. Launch EC2 instances into multiple regions behind an NLB and use AWS Global Accelerator

---

## 1. In Simple English

The company wants their app deployed globally.  
They want:

- **Only two IPs** to whitelist (e.g., for firewalls or client-side policies)
- **Low latency routing** (users should go to the closest region)
- **Automatic failover** if a region goes down

So the solution must provide:

- **Global routing intelligence**
- **Fixed/static entry points**
- **Fast failover and health checking**

---

## 2. Verbiage & Realism

| Aspect       | Assessment                                                                                                |
| ------------ | --------------------------------------------------------------------------------------------------------- |
| Clarity      | The question clearly states three requirements: global reach, latency-based routing, and IP whitelisting. |
| Realism      | Mirrors a real-world enterprise scenario involving third-party integration and security firewalls.        |
| Completeness | Presents a mix of semi-correct approaches and the precise AWS solution.                                   |
| Traps        | Confusing use of ALB, Route 53, or CloudFront which cannot offer static IPs directly.                     |

---

## 3. What the Question is Testing

| Concept                | Why It Matters                                                                                   |
| ---------------------- | ------------------------------------------------------------------------------------------------ |
| AWS Global Accelerator | Global load balancing with **static IPs**, intelligent routing, and health-check-based failover. |
| ALB vs NLB             | NLB supports static IPs; ALB does not.                                                           |
| Route 53 limitations   | DNS-based failover is slower and does not provide static IPs.                                    |
| CloudFront limitations | Great for caching, but not for direct static IP control or application-level failover.           |

---

## 4. Answer and Explanation

✅ **Correct Answer:** D. **Launch EC2 instances into multiple regions behind an NLB and use AWS Global Accelerator**

| Option | Verdict | Explanation                                                                                                                                                                |
| ------ | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| A      | ❌      | NLBs provide static IPs but are **Region-specific**. No global routing or intelligent failover.                                                                            |
| B      | ❌      | CloudFront does not provide **fixed IPs**, and is designed for **static content**, not global app failover.                                                                |
| C      | ❌      | Route 53 failover works, but it’s **DNS-based**, so failover is **slower** and **doesn’t provide static IPs**.                                                             |
| D      | ✅      | **Global Accelerator** provides two static **global anycast IPs**, intelligent routing, and health-based failover across **multiple Regions** — perfect for this use case. |

---

## 5. Final Answer

- ✅ **D. Launch EC2 instances into multiple regions behind an NLB and use AWS Global Accelerator**

---

## 6. Relevant AWS Documentation

| Topic                           | Link                                                                                           |
| ------------------------------- | ---------------------------------------------------------------------------------------------- |
| AWS Global Accelerator Overview | https://docs.aws.amazon.com/global-accelerator/latest/dg/what-is-global-accelerator.html       |
| Static IP Support               | https://docs.aws.amazon.com/global-accelerator/latest/dg/introduction-static-ip.html           |
| Global Failover                 | https://docs.aws.amazon.com/global-accelerator/latest/dg/about-endpoint-health-checks.html     |
| NLB vs ALB Comparison           | https://docs.aws.amazon.com/elasticloadbalancing/latest/userguide/elb-load-balancer-types.html |

---

## 7. Are the Options Tricky?

| Option | Why It’s Tricky                                                                                       |
| ------ | ----------------------------------------------------------------------------------------------------- |
| A      | NLBs have static IPs, but **no global routing or failover support** without Global Accelerator.       |
| B      | CloudFront has edge caching but **no static IPs**; it’s not meant for this purpose.                   |
| C      | Route 53 has **slow DNS propagation failover**, and **no IP-level whitelisting**.                     |
| D      | Fully satisfies all requirements — two static IPs, low-latency global routing, health-based failover. |

---

## 8. How to Approach Similar Questions

- Look for **keywords like “static IP” and “global failover”** — this almost always points to **AWS Global Accelerator**.
- Know when **ALB or Route 53** can't provide what’s needed (e.g., static IPs, fast failover).
- Understand **NLB + Global Accelerator** is a pattern for secure, high-performance, global-facing apps.

---

## 9. Technology Deep Dive

| Feature                  | ALB       | NLB           | CloudFront          | Route 53       | Global Accelerator     |
| ------------------------ | --------- | ------------- | ------------------- | -------------- | ---------------------- |
| Static IP Support        | ❌        | ✅            | ❌                  | ❌             | ✅ Two fixed IPs       |
| Global routing           | ❌        | ❌            | ✅ CDN only         | ✅ DNS-based   | ✅ Anycast-based       |
| Health checks & failover | ✅        | ✅            | Partial             | ✅ (slow)      | ✅ Fast failover       |
| Latency-based routing    | ❌        | ❌            | ✅ (cached content) | ✅             | ✅                     |
| Use Case Fit             | App-layer | Network-layer | Static content      | DNS resolution | ✅ Global App Delivery |

---

## 10. Summary Table

| Requirement                | Solution              |
| -------------------------- | --------------------- |
| Static IPs                 | ✅ Global Accelerator |
| Global low-latency routing | ✅ Global Accelerator |
| Fast regional failover     | ✅ Global Accelerator |
| App-level deployment       | ✅ NLB fronting EC2   |

---

## 11. Concept Expansion / Key Facts

**AWS Global Accelerator** is the **only native AWS service** that provides:

- **Two static IP addresses** (anycast) for global traffic entry.
- **Automatic, health-based failover** across AWS Regions in under 30 seconds.
- **Lowest-latency routing** using the AWS global network backbone — users are routed to the closest healthy endpoint.

In this architecture:

- You deploy **EC2 instances** behind **NLBs** in multiple AWS Regions.
- You attach those NLBs to **AWS Global Accelerator** as endpoints.
- Global Accelerator then handles **traffic steering, health checks, and global failover**.
- Clients only need to **whitelist the two IPs** of the accelerator — no matter where the traffic ends up geographically.

**Why not ALB or CloudFront?**

- ALB **does not support static IPs**.
- CloudFront is a **CDN**, not a global router for dynamic apps.
- Route 53 **does not provide static IPs** and **failover is DNS-based**, which means slow TTL propagation and lack of IP-based firewall compatibility.

**Bottom line:** When you see a requirement for:

- **Global reach**
- **Static IPs**
- **Latency-based routing**
- **Fast health-based failover**  
  👉 The best AWS-native solution is **Global Accelerator with NLBs in each region**.

---

---

title: "saa-q025 – Enforcing Password Complexity and Length for IAM Users"
questionId: "saa-q025"
category: "Design Secure Architectures"
tags: ["saa-c03", "iam", "password-policy", "security", "account-settings"]

---

## Question 'SAA-Q025'

A company requires that **all AWS IAM user accounts** have specific **complexity requirements and minimum password length**.

**How should a Solutions Architect accomplish this?**  
_(Select ONE answer.)_

A. Set a password policy for the entire AWS account.  
B. Set a password policy for each IAM user in the AWS account.  
C. Use an AWS Config rule to enforce the requirements when creating user accounts.  
D. Create an IAM policy that enforces the requirements and apply it to all users.

---

## 1. In Simple English

The company wants to make sure that **every IAM user has a strong password**. That means:

- A certain **minimum length**
- Rules like **uppercase, lowercase, symbols, numbers**, etc.

You want to **set this at the account level** so that **all users** are automatically affected.

---

## 2. Verbiage & Realism

| Aspect       | Assessment                                                                            |
| ------------ | ------------------------------------------------------------------------------------- |
| Clarity      | Straightforward security requirement.                                                 |
| Realism      | Very common requirement for compliance and access control.                            |
| Completeness | Mixes true control mechanisms with invalid methods (like IAM policies for passwords). |
| Traps        | IAM policies and Config rules can’t set password complexity.                          |

---

## 3. What the Question is Testing

| Concept                                       | Why It Matters                                                                     |
| --------------------------------------------- | ---------------------------------------------------------------------------------- |
| IAM Password Policies                         | Control complexity and length globally.                                            |
| Account-level vs user-level configuration     | Password policies are set once per account, not per-user.                          |
| Knowing the limits of IAM policies and Config | These tools **monitor or restrict access**, but do **not enforce password rules**. |

---

## 4. Answer and Explanation

✅ **Correct Answer:** A. **Set a password policy for the entire AWS account.**

| Option | Verdict | Explanation                                                                                                                                 |
| ------ | ------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| A      | ✅      | This is the correct method. IAM password policies apply to **all users in the account** and can enforce length and complexity requirements. |
| B      | ❌      | You **cannot set per-user password policies** in AWS.                                                                                       |
| C      | ❌      | AWS Config rules can **detect non-compliance**, but **not enforce password creation settings**.                                             |
| D      | ❌      | IAM policies control **permissions**, not password rules. They cannot enforce complexity or length.                                         |

---

## 5. Final Answer

- ✅ **A. Set a password policy for the entire AWS account.**

---

## 6. Relevant AWS Documentation

| Topic                         | Link                                                                                                   |
| ----------------------------- | ------------------------------------------------------------------------------------------------------ |
| Setting IAM Password Policies | https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_passwords_account-policy.html          |
| AWS Password Policy Reference | https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_passwords_account-policy-settings.html |
| IAM Best Practices            | https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html                                   |

---

## 7. Are the Options Tricky?

| Option | Trickiness                                                                              |
| ------ | --------------------------------------------------------------------------------------- |
| B      | Sounds logical, but AWS does not support user-level password policies.                  |
| C      | AWS Config is monitoring-only; it doesn’t apply enforcement during creation.            |
| D      | IAM policies are for access control, not credential formatting or password enforcement. |

---

## 8. How to Approach Similar Questions

- **Password settings → always account-level** in AWS.
- **IAM policies** = permission enforcement only.
- **AWS Config** = compliance monitoring, not enforcement.
- Look for “password complexity” or “password policy” = points to **account-level setting** in IAM.

---

## 9. Technology Deep Dive

| Feature                                               | IAM Password Policy | IAM Policy              | AWS Config Rule     |
| ----------------------------------------------------- | ------------------- | ----------------------- | ------------------- |
| Enforces password length                              | ✅                  | ❌                      | ❌                  |
| Enforces password complexity (e.g., symbols, numbers) | ✅                  | ❌                      | ❌                  |
| Applies to all users                                  | ✅                  | Depends on policy scope | ✅ (monitor only)   |
| Enforcement at time of password change                | ✅                  | ❌                      | ❌                  |
| Editable via CLI/Console/API                          | ✅                  | ✅ (for permissions)    | ✅ (for compliance) |

---

## 10. Summary Table

| Requirement                        | Best Match                        |
| ---------------------------------- | --------------------------------- |
| Enforce password length/complexity | ✅ IAM password policy (Option A) |
| Apply to all IAM users             | ✅ Account-level password policy  |
| Monitor but not enforce            | ❌ Config rule                    |
| Control permissions, not passwords | ❌ IAM policy                     |

---

## 11. Concept Expansion / Key Facts

An **IAM password policy** is an **account-level configuration** that applies to **all IAM users** in the AWS account who are allowed to sign in using a password (i.e., the AWS Management Console).

With a password policy, you can enforce rules such as:

- **Minimum password length**
- **Character complexity**: Require at least one uppercase, lowercase, symbol, or number
- **Password expiration**
- **Password reuse prevention**
- **Allow users to change their own password**

Here’s how to implement it:

1. Navigate to the IAM console.
2. Go to **Account Settings**.
3. Set a password policy with the required rules.

**Why not IAM policies?**  
IAM policies control **what users are allowed to do**, like accessing S3 or invoking Lambda. They don’t control how users **authenticate**.

**Why not AWS Config?**  
AWS Config is for **tracking and auditing** configuration compliance. You can **detect if a password policy exists**, but Config can’t create or enforce one.

**Best Practice:**  
Always enforce a strong password policy **at the account level**, and **use MFA** for all privileged users. Combine this with **IAM access analyzer**, **CloudTrail**, and **Config rules** for comprehensive security oversight.

---

---

title: "saa-q026 – Migrating Windows DFSR File Server Farm to AWS"
questionId: "saa-q026"
category: "Design Resilient Architectures"
tags: ["saa-c03", "fsx", "windows-file-server", "dfsr", "migration", "storage"]

---

## Question 'SAA-Q026'

A Microsoft Windows file server farm uses Distributed File System Replication (DFSR) to synchronize data in an on-premises environment. The infrastructure is being migrated to the AWS Cloud. Which service should the solutions architect use to replace the file server farm?

## Options:

- Amazon EFS
- Amazon EBS
- Amazon FSx
- AWS Storage Gateway

---

## 1. In Simple English

A company needs to replace their Windows file servers (that use DFS replication) with an AWS service. We must choose the option that best matches Windows file sharing capabilities.

---

## 2. Verbiage & Realism (Table)

| Key Phrases                | Real-World Implications                                |
| -------------------------- | ------------------------------------------------------ |
| "Windows file server farm" | Requires SMB protocol and Active Directory integration |
| "DFSR"                     | Needs native Windows file replication capabilities     |
| "Migrate to AWS Cloud"     | Requires full cloud-native service (not hybrid)        |

---

## 3. What the Question is Testing (Table)

| Core Concept                     | AWS Service Knowledge                                                      |
| -------------------------------- | -------------------------------------------------------------------------- |
| Windows file server replacements | Understanding FSx's Windows compatibility vs other storage services        |
| Protocol requirements            | Recognizing DFSR relies on SMB (not NFS)                                   |
| Cloud migration patterns         | Distinguishing between hybrid (Storage Gateway) and native cloud solutions |

---

## 4. Answer and Explanation (Table)

| Option              | Analysis                                                                             | Valid? |
| ------------------- | ------------------------------------------------------------------------------------ | ------ |
| Amazon EFS          | Linux-only (NFS protocol), no SMB or DFS support                                     | ❌     |
| Amazon EBS          | Raw block storage, not a managed file server solution                                | ❌     |
| **Amazon FSx**      | **Managed Windows file server with native SMB/DFS and Active Directory integration** | ✅     |
| AWS Storage Gateway | Caching appliance for hybrid setups, not a cloud-native replacement                  | ❌     |

---

## 5. Final Answer

**Amazon FSx**

---

## 6. Relevant AWS Documentation (Table)

| Resource                                                                                     | Description                                          |
| -------------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| [FSx for Windows](https://aws.amazon.com/fsx/windows/)                                       | Official product page with DFS compatibility details |
| [Migrating DFS to FSx](https://docs.aws.amazon.com/fsx/latest/WindowsGuide/migrate-dfs.html) | Step-by-step migration guide                         |

---

## 7. Are the Options Tricky? (Table)

| Option          | Why It's Tricky                                                                 |
| --------------- | ------------------------------------------------------------------------------- |
| EFS             | "File system" name suggests general usability, but lacks Windows features       |
| Storage Gateway | Sounds like a "gateway to cloud storage" but doesn't replace DFSR functionality |

---

## 8. How to Approach Similar Questions

**Strategy:**

1. **Identify key requirements**: Windows → SMB → DFS → AD integration
2. **Eliminate incompatible options**:
   - EFS (NFS only)
   - EBS (not a file server)
3. **Choose between remaining**:
   - FSx (cloud-native)
   - Storage Gateway (hybrid)

**Tip:** FSx is always the answer for Windows file server migrations.

---

## 9. Technology Deep Dive (Comparison Table)

| Feature          | Amazon FSx for Windows       | AWS Storage Gateway        |
| ---------------- | ---------------------------- | -------------------------- |
| Protocol Support | SMB 3.0 with DFS             | SMB (limited caching)      |
| AD Integration   | Full Kerberos authentication | Basic authentication       |
| Replication      | Multi-AZ sync                | On-prem sync only          |
| Management       | Fully managed                | Requires on-prem appliance |

---

## 10. Summary Table (Conclusion)

| Factor           | Amazon FSx          | Why?                                         |
| ---------------- | ------------------- | -------------------------------------------- |
| Protocol Support | ✅ SMB + DFS native | Critical for Windows file server replacement |
| Migration Ease   | ✅ Lift-and-shift   | Maintains existing permissions and shares    |
| Cloud-Native     | ✅ Fully managed    | No need to manage underlying infrastructure  |

---

## 11. Concept Expansion / Key Facts

**Critical Features of FSx for Windows:**

- **Active Directory Integration**: Maintains existing NTFS permissions
- **DFS-R Compatibility**: Supports both namespace (DFS-N) and replication (DFS-R)
- **Performance Options**: SSD/HDD storage with throughput up to 2 GB/s
- **Backup Integration**: Native VSS snapshots with AWS Backup

**Migration Path:**

1. Use AWS DataSync to transfer files
2. Recreate DFS Namespace pointing to FSx endpoints
3. Cutover DNS records to FSx shares

**Cost Consideration:**
FSx pricing includes:

- Storage capacity ($0.113/GB/month for SSD)
- Throughput capacity ($6.56/MBps/month)
- Backup storage (separate)

---

---

title: "SAA-Q027 – Migrating Windows DFSR to AWS (File Server Replacement)"
questionId: "SAA-Q027"
category: "Design Resilient Architectures"
tags: ["saa-c03", "fsx", "windows-file-server", "dfsr", "migration", "storage"]

---

## Question 'SAA-Q027'

A company is migrating from an on-premises infrastructure to the AWS Cloud. One of the company's applications stores files on a Windows file server farm that uses Distributed File System Replication (DFSR) to keep data in sync. A solutions architect needs to replace the file server farm. Which service should the solutions architect use?  
_(Single answer)_

## Options:

- Amazon FSx
- Amazon EFS
- Amazon S3
- AWS Storage Gateway

---

## 1. In Simple English

A company needs to move their Windows file servers (using DFS replication) to AWS. We must pick the AWS service that directly replaces this Windows-specific file sharing system.

---

## 2. Verbiage & Realism (Table)

| Key Phrases                | Real-World Implications                                |
| -------------------------- | ------------------------------------------------------ |
| "Windows file server farm" | Requires SMB protocol and Active Directory integration |
| "DFSR"                     | Needs native Windows file replication capabilities     |
| "Migrate to AWS Cloud"     | Requires full cloud-native service (not hybrid)        |

---

## 3. What the Question is Testing (Table)

| Core Concept                     | AWS Service Knowledge                                               |
| -------------------------------- | ------------------------------------------------------------------- |
| Windows file server replacements | Understanding FSx's Windows compatibility vs other storage services |
| Protocol requirements            | Recognizing DFSR relies on SMB (not NFS or object storage)          |
| Cloud-native migration           | Distinguishing between hybrid and native cloud solutions            |

---

## 4. Answer and Explanation (Table)

| Option              | Analysis                                                                             | Valid? |
| ------------------- | ------------------------------------------------------------------------------------ | ------ |
| **Amazon FSx**      | **Managed Windows file server with native SMB/DFS and Active Directory integration** | ✅     |
| Amazon EFS          | Linux-only (NFS protocol), no SMB or DFS support                                     | ❌     |
| Amazon S3           | Object storage, lacks file system semantics and SMB protocol                         | ❌     |
| AWS Storage Gateway | Caching appliance for hybrid setups, not a cloud-native replacement                  | ❌     |

---

## 5. Final Answer

**Amazon FSx**

---

## 6. Relevant AWS Documentation (Table)

| Resource                                                                                     | Description                                          |
| -------------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| [FSx for Windows](https://aws.amazon.com/fsx/windows/)                                       | Official product page with DFS compatibility details |
| [Migrating DFS to FSx](https://docs.aws.amazon.com/fsx/latest/WindowsGuide/migrate-dfs.html) | Step-by-step migration guide                         |

---

## 7. Are the Options Tricky? (Table)

| Option          | Why It's Tricky                                                              |
| --------------- | ---------------------------------------------------------------------------- |
| EFS             | "File system" name suggests general usability, but lacks Windows features    |
| S3              | "Storage" in name might mislead for file server use-cases                    |
| Storage Gateway | Implies connectivity to cloud storage but doesn't replace DFSR functionality |

---

## 8. How to Approach Similar Questions

**Strategy:**

1. **Identify non-negotiables**: Windows → SMB → DFS → AD integration
2. **Eliminate clearly wrong options**:
   - EFS (NFS only)
   - S3 (object storage)
3. **Confirm best fit**:
   - FSx is purpose-built for Windows file servers

**Tip:** When seeing "Windows file server + DFSR", think FSx immediately.

---

## 9. Technology Deep Dive (Comparison Table)

| Feature          | Amazon FSx for Windows       | Amazon EFS        | AWS Storage Gateway   |
| ---------------- | ---------------------------- | ----------------- | --------------------- |
| Protocol Support | SMB 3.0 with DFS             | NFS only          | SMB (limited caching) |
| AD Integration   | Full Kerberos authentication | Linux permissions | Basic authentication  |
| Use Case         | Windows file server          | Linux workloads   | Hybrid caching        |

---

## 10. Summary Table (Conclusion)

| Factor           | Amazon FSx           | Why?                                         |
| ---------------- | -------------------- | -------------------------------------------- |
| Protocol Support | ✅ SMB + DFS native  | Critical for Windows file server replacement |
| Feature Parity   | ✅ Full DFSR support | Direct replacement for on-prem functionality |
| Management       | ✅ Fully managed     | No OS patching or hardware management        |

---

## 11. Concept Expansion / Key Facts

**Why FSx is Mandatory Here:**

- **Active Directory Integration**: Preserves existing NTFS permissions
- **DFS-R Compatibility**: Supports both namespace (DFS-N) and replication (DFS-R)
- **Performance Tiers**: SSD options (up to 2 GB/s throughput)
- **Native Backups**: VSS snapshots with AWS Backup integration

**Migration Checklist:**

1. Pre-migration: Set up FSx with AD integration
2. Data transfer: Use AWS DataSync or Robocopy
3. Cutover: Update DFS-N to point to FSx endpoints
4. Validation: Test permissions and replication

**Cost Notes:**

- FSx pricing includes storage + throughput capacity
- More expensive than EFS/S3 but required for Windows compatibility

---

---

title: "SAA-Q028 – Private Connectivity Between EC2 and DynamoDB"
questionId: "SAA-Q028"
category: "Design Resilient Architectures"
tags: ["saa-c03", "vpc", "dynamodb", "endpoints", "networking"]

---

## Question 'SAA-Q028'

An Amazon VPC contains several Amazon EC2 instances. The instances need to make API calls to Amazon DynamoDB. A solutions architect needs to ensure that the API calls do not traverse the internet. How can this be accomplished? _(Select TWO.)_

## Options:

- Create a VPC peering connection between the VPC and DynamoDB
- Create a new DynamoDB table that uses the endpoint
- Create a gateway endpoint for DynamoDB
- Create a route table entry for the endpoint
- Create an ENI for the endpoint in each of the subnets of the VPC

---

## 1. In Simple English

We need to connect EC2 instances to DynamoDB without using the public internet. Choose the two correct methods from the options.

---

## 2. Verbiage & Realism (Table)

| Key Phrases                    | Real-World Implications                              |
| ------------------------------ | ---------------------------------------------------- |
| "Do not traverse the internet" | Requires private AWS network connectivity            |
| "API calls to DynamoDB"        | Needs VPC endpoint service (not peering or ENIs)     |
| "Select TWO"                   | Tests knowledge of endpoint configuration components |

---

## 3. What the Question is Testing (Table)

| Core Concept              | AWS Service Knowledge                                 |
| ------------------------- | ----------------------------------------------------- |
| VPC endpoint types        | Understanding gateway vs interface endpoints          |
| DynamoDB connectivity     | Knowing DynamoDB only supports gateway endpoints      |
| Route table configuration | Recognizing required routing for private connectivity |

---

## 4. Answer and Explanation (Table)

| Option                                             | Analysis                                                            | Valid? |
| -------------------------------------------------- | ------------------------------------------------------------------- | ------ |
| Create a VPC peering connection                    | DynamoDB doesn't support VPC peering (only for VPC-to-VPC)          | ❌     |
| Create a new DynamoDB table that uses the endpoint | Misleading - endpoints are VPC configurations, not table properties | ❌     |
| **Create a gateway endpoint for DynamoDB**         | **Correct - gateway endpoints provide private DynamoDB access**     | ✅     |
| **Create a route table entry for the endpoint**    | **Correct - required to route traffic through the endpoint**        | ✅     |
| Create an ENI for the endpoint                     | Interface endpoints use ENIs (but DynamoDB uses gateway endpoints)  | ❌     |

---

## 5. Final Answer

**Create a gateway endpoint for DynamoDB**  
**Create a route table entry for the endpoint**

---

## 6. Relevant AWS Documentation (Table)

| Resource                                                                                                        | Description                                 |
| --------------------------------------------------------------------------------------------------------------- | ------------------------------------------- |
| [VPC Gateway Endpoints](https://docs.aws.amazon.com/vpc/latest/privatelink/vpc-endpoints.html)                  | Official documentation on gateway endpoints |
| [DynamoDB VPC Connectivity](https://aws.amazon.com/blogs/database/access-amazon-dynamodb-from-your-amazon-vpc/) | Best practices for private access           |

---

## 7. Are the Options Tricky? (Table)

| Option                    | Why It's Tricky                                                        |
| ------------------------- | ---------------------------------------------------------------------- |
| VPC peering connection    | Suggests direct connection but DynamoDB doesn't support peering        |
| Create new DynamoDB table | Implies endpoint configuration is table-specific rather than VPC-level |
| Create an ENI             | Interface endpoints use ENIs, but DynamoDB requires gateway endpoints  |

---

## 8. How to Approach Similar Questions

**Strategy:**

1. **Identify service type**: DynamoDB → gateway endpoint (not interface)
2. **Eliminate impossible options**:
   - Peering (not supported for managed services)
   - ENIs (only for interface endpoints)
3. **Select configuration pairs**:
   - Endpoint creation + route table update
4. **Ignore misleading options** about table creation

**Tip:** For DynamoDB/S3 private access, always think "gateway endpoint + route tables".

---

## 9. Technology Deep Dive (Comparison Table)

| Feature                | Gateway Endpoint (DynamoDB)      | Interface Endpoint (e.g., SNS)   |
| ---------------------- | -------------------------------- | -------------------------------- |
| AWS Services Supported | S3 & DynamoDB only               | Most AWS services                |
| Network Layer          | Works at IP layer (route tables) | Uses ENIs in subnets             |
| Cost                   | Free                             | Hourly + data processing charges |
| Security               | Uses IAM policies                | Supports security groups         |

---

## 10. Summary Table (Conclusion)

| Factor              | Correct Approach         | Why?                                                          |
| ------------------- | ------------------------ | ------------------------------------------------------------- |
| Connectivity Method | Gateway endpoint         | Only supported method for DynamoDB private access             |
| Configuration       | Route table update       | Required to direct traffic through the endpoint               |
| Security            | IAM policies still apply | Endpoint doesn't bypass existing authentication/authorization |

---

## 11. Concept Expansion / Key Facts

**Critical Details About Gateway Endpoints:**

- **No Availability Risk**: Doesn't use ENIs, so no subnet dependency
- **Routing Logic**: Requires explicit route table entries pointing to `pl-xxxxxx`
- **Service-Specific**: Each endpoint only works for one service (S3 or DynamoDB)

**Implementation Steps:**

1. Create endpoint in VPC console (select DynamoDB)
2. Associate with route tables used by EC2 instances
3. Add route with destination `pl-xxxxxx` to endpoint
4. Verify connectivity using VPC Flow Logs

**Security Considerations:**

- Combine with DynamoDB resource policies for fine-grained access
- Monitor endpoint traffic via CloudWatch metrics
- Gateway endpoints don't support cross-region access

---

title: "SAA-Q029 – Restricting EC2 Instance Types Across AWS Organization Accounts"
questionId: "SAA-Q029"
category: "Design Secure Architectures"
tags: ["saa-c03", "aws-organizations", "scp", "ec2", "governance"]

---

## Question 'SAA-Q029'

An AWS Organization has an OU with multiple member accounts in it. The company needs to restrict the ability to launch only specific Amazon EC2 instance types. How can this policy be applied across the accounts with the least effort?  
_(Single answer)_

## Options:

- Use AWS Resource Access Manager to control which launch types can be used
- Create an SCP with an allow rule that allows launching the specific instance types
- Create an SCP with a deny rule that denies all but the specific instance types
- Create an IAM policy to deny launching all but the specific instance types

---

## 1. In Simple English

We need to limit which EC2 instance types can be launched across multiple AWS accounts in an Organization, using the simplest method.

---

## 2. Verbiage & Realism (Table)

| Key Phrases                | Real-World Implications                                |
| -------------------------- | ------------------------------------------------------ |
| "AWS Organization with OU" | Requires organization-wide solution (not per-account)  |
| "Multiple member accounts" | Needs centralized management capability                |
| "Least effort"             | Prioritizes service-native features over custom builds |

---

## 3. What the Question is Testing (Table)

| Core Concept                   | AWS Service Knowledge                                        |
| ------------------------------ | ------------------------------------------------------------ |
| AWS Organizations governance   | Understanding SCPs vs IAM policies                           |
| Permission boundary strategies | Knowing deny vs allow approaches in SCPs                     |
| Service control capabilities   | Recognizing RAM's purpose (resource sharing, not governance) |

---

## 4. Answer and Explanation (Table)

| Option                            | Analysis                                                                          | Valid? |
| --------------------------------- | --------------------------------------------------------------------------------- | ------ |
| AWS Resource Access Manager (RAM) | Designed for resource sharing, not instance type governance                       | ❌     |
| SCP with allow rule               | Allow rules are deny-by-default - too permissive for restriction needs            | ❌     |
| **SCP with deny rule**            | **Correct - denies all except approved instance types organization-wide**         | ✅     |
| IAM policy                        | Requires manual application in each account, violating "least effort" requirement | ❌     |

---

## 5. Final Answer

**Create an SCP with a deny rule that denies all but the specific instance types**

---

## 6. Relevant AWS Documentation (Table)

| Resource                                                                                                                                             | Description                              |
| ---------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| [AWS SCPs for EC2](https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps_examples.html#example-scp-ec2-instance-type) | Official SCP examples for instance types |
| [SCP Best Practices](https://docs.aws.amazon.com/organizations/latest/userguide/orgs_best-practices_scps.html)                                       | When to use deny vs allow rules          |

---

## 7. Are the Options Tricky? (Table)

| Option         | Why It's Tricky                                                      |
| -------------- | -------------------------------------------------------------------- |
| RAM            | Sounds management-related but solves different problem               |
| SCP allow rule | Counterintuitive - allow rules actually create permission gaps       |
| IAM policy     | Technically works but ignores organizational management capabilities |

---

## 8. How to Approach Similar Questions

**Strategy:**

1. **Identify scope**: Organization-wide → Think SCPs (not IAM)
2. **Determine restriction type**:
   - Deny unwanted actions (most secure)
   - Avoid allow-lists (too permissive)
3. **Eliminate non-governance services**:
   - RAM is for sharing, not restricting
4. **Choose most efficient**:
   - SCP applied at OU level affects all accounts automatically

**Tip:** For organization-wide restrictions, SCP deny rules are usually the answer.

---

## 9. Technology Deep Dive (Comparison Table)

| Method              | SCP Deny Rule                 | IAM Policy                     |
| ------------------- | ----------------------------- | ------------------------------ |
| Scope               | Entire OU/Organization        | Single account                 |
| Management Effort   | Set once at OU level          | Manual per-account application |
| Permission Boundary | Maximum permissions           | Explicit permissions           |
| EC2 Restriction     | Blocks non-compliant launches | Requires explicit allow rules  |

---

## 10. Summary Table (Conclusion)

| Factor   | SCP Deny Rule            | Why?                                    |
| -------- | ------------------------ | --------------------------------------- |
| Coverage | ✅ All OU accounts       | Meets multi-account requirement         |
| Effort   | ✅ Single configuration  | "Least effort" as specified in question |
| Security | ✅ Proactive restriction | Prevents unwanted launches by default   |

---

## 11. Concept Expansion / Key Facts

**Why SCP Deny Rules Win:**

- **Inheritance**: Automatically applies to all accounts in the OU
- **Deny Precedence**: Overrides any per-account IAM allow permissions
- **EC2 Control**: Can restrict by:
  - Instance type (e.g., `t2.*`)
  - Region
  - AMI IDs

**Sample SCP Policy:**

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Deny",
      "Action": "ec2:RunInstances",
      "Resource": "arn:aws:ec2:*:*:instance/*",
      "Condition": {
        "StringNotEquals": {
          "ec2:InstanceType": ["t3.micro", "m5.large"]
        }
      }
    }
  ]
}
```

## Key Differentiators:

1. **SCP Strategy Focus**: Highlighted why deny rules are preferred over allow rules in SCPs
2. **Policy Example**: Included actual JSON policy snippet in Key Facts
3. **IAM vs SCP Contrast**: Emphasized the organizational vs account-level control difference
4. **Implementation Guidance**: Added practical testing and monitoring tips

This maintains your preferred structure while addressing the organizational governance aspects of this question. The analysis shows why SCPs are superior to IAM for cross-account restrictions.

---

---

title: "saa-q030 – S3-Based Document Submission App with Versioning and Deletion Protection"
questionId: "saa-q030"
category: "Design Secure Architectures"
tags: ["saa-c03", "s3", "versioning", "mfa-delete", "document-protection", "storage"]

---

### Question 'SAA-Q030'

A Solutions Architect is creating a **document submission application for a school**. The application will use an **Amazon S3 bucket** for storage.

The solution must:

- **Prevent accidental deletion** of documents
- **Ensure all versions** of the documents are available
- Users must be able to **upload and modify** documents.

**Which combination of actions should be taken to meet these requirements?**  
_(Select TWO answers.)_

A. Enable versioning on the bucket  
B. Set read-only permissions on the bucket  
C. Enable MFA Delete on the bucket  
D. Encrypt the bucket using AWS SSE-S3  
E. Attach an IAM policy to the bucket

---

## 1. In Simple English

This app stores user-submitted documents in S3.  
The school wants to make sure:

- Files aren't deleted by mistake
- Old versions of files are preserved even after updates
- Users can still upload and edit their documents

---

## 2. Verbiage & Realism

| Aspect       | Assessment                                                                            |
| ------------ | ------------------------------------------------------------------------------------- |
| Clarity      | Clearly expresses real-world concerns: deletion protection, version history.          |
| Realism      | Common scenario in education and regulated document handling systems.                 |
| Completeness | Mixes required features (versioning, MFA delete) with distractors (read-only bucket). |
| Traps        | Encryption is a best practice but unrelated to versioning/deletion; IAM policy vague. |

---

## 3. What the Question is Testing

| Concept                   | Why It Matters                                                                   |
| ------------------------- | -------------------------------------------------------------------------------- |
| S3 Versioning             | Keeps multiple versions of an object — protects against overwrites and deletion. |
| MFA Delete                | Adds protection against version deletions — especially for privileged accounts.  |
| Permissions vs Protection | Read-only permissions would prevent required upload/modify functionality.        |
| Encryption                | Important for confidentiality, but not required for deletion/versioning needs.   |

---

## 4. Answer and Explanation

✅ **Correct Answers:**

- **A. Enable versioning on the bucket**
- **C. Enable MFA Delete on the bucket**

| Option                                     | Verdict | Explanation                                                                                                                                         |
| ------------------------------------------ | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| A. Enable versioning on the bucket         | ✅      | Preserves every version of a document — required for version history and deletion protection.                                                       |
| B. Set read-only permissions on the bucket | ❌      | Would block users from uploading/modifying documents — violates functional requirement.                                                             |
| C. Enable MFA Delete on the bucket         | ✅      | Prevents even administrators from deleting object versions without MFA. Adds an extra layer of deletion protection.                                 |
| D. Encrypt the bucket using AWS SSE-S3     | ❌      | Good practice for securing data, but doesn’t help with versioning or preventing deletions.                                                          |
| E. Attach an IAM policy to the bucket      | ❌      | IAM policies can restrict access, but don’t guarantee versioning or prevent deletion unless explicitly written — too vague without further context. |

---

## 5. Final Answer

- ✅ **A. Enable versioning on the bucket**
- ✅ **C. Enable MFA Delete on the bucket**

---

## 6. Relevant AWS Documentation

| Topic                  | Link                                                                                       |
| ---------------------- | ------------------------------------------------------------------------------------------ |
| Using Versioning in S3 | https://docs.aws.amazon.com/AmazonS3/latest/userguide/Versioning.html                      |
| MFA Delete in S3       | https://docs.aws.amazon.com/AmazonS3/latest/userguide/MultiFactorAuthenticationDelete.html |
| Protecting Data in S3  | https://docs.aws.amazon.com/AmazonS3/latest/userguide/security-best-practices.html         |

---

## 7. Are the Options Tricky?

| Option | Why It’s Tricky                                                                             |
| ------ | ------------------------------------------------------------------------------------------- |
| B      | Sounds like it would "protect" files, but it breaks functional requirements.                |
| D      | Encryption is unrelated to deletion/versioning protection.                                  |
| E      | Too vague — IAM policies can be restrictive or permissive depending on how they’re written. |

---

## 8. How to Approach Similar Questions

- Look for **"accidental deletion" → MFA Delete + versioning**
- **"Keep all versions" → versioning**
- Be wary of options like **“read-only” or IAM policy** unless specifically tied to the scenario’s permissions
- Don’t assume **encryption** solves data retention or access issues

---

## 9. Technology Deep Dive

| Feature                       | S3 Versioning | MFA Delete        | SSE-S3 | IAM Policy            |
| ----------------------------- | ------------- | ----------------- | ------ | --------------------- |
| Prevents object overwrite     | ✅            | ❌                | ❌     | ❌                    |
| Retains deleted versions      | ✅            | ✅ (when enabled) | ❌     | ❌                    |
| Requires extra auth to delete | ❌            | ✅                | ❌     | ❌                    |
| Data confidentiality          | ❌            | ❌                | ✅     | ❌                    |
| Access control                | ❌            | ❌                | ❌     | ✅ (granular control) |

---

## 10. Summary Table

| Requirement                       | Solution                          |
| --------------------------------- | --------------------------------- |
| Prevent accidental deletion       | ✅ Versioning + MFA Delete        |
| Maintain all document versions    | ✅ Versioning                     |
| Allow upload and modification     | ✅ Keep write permissions         |
| Avoid blocking user functionality | ❌ No read-only policy            |
| Encryption for security           | ❌ Not required for this scenario |

---

## 11. Concept Expansion / Key Facts

- **Amazon S3 Versioning** is a powerful mechanism that allows you to **retain all versions of an object**, including overwritten or deleted ones. If a user deletes a file, a **delete marker** is added, but the actual object still exists unless **permanently deleted**.

- **MFA Delete** adds a **second layer of protection** against accidental or unauthorized deletions. It requires that the requestor provide a valid **multi-factor authentication token** when attempting to **permanently delete an object version or disable versioning** — particularly useful for protecting against administrator error or compromise.

- Note: **MFA Delete can only be enabled using the AWS CLI or SDK**, not via the AWS Management Console.

- While **SSE-S3 (Server-Side Encryption with Amazon S3-managed keys)** ensures that data at rest is encrypted, it doesn't help with **accidental deletion or version retention**.

- **IAM policies** can grant or deny access to specific S3 actions, but they must be explicitly written to restrict deletions — and even then, without versioning, deletes are permanent.

Bottom line: For preserving document history and preventing unintended data loss in an S3-based app, **versioning and MFA Delete** are the best tools in your architectural toolbox.
