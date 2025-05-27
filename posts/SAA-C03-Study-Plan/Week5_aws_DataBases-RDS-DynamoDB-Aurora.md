#### Reading material

Totally get it — that database section _is_ a firehose of information. 💥 No worries — we’ll break it down into **what matters most for the SAA-C03 exam**, plus some **real-world understanding** to help it stick.

Here’s a **clean breakdown** of the key services and what you actually need to know (organized by priority):

---

### 🔴 **TOP PRIORITY (Must-Know for Exam + Real Life)**

#### ✅ **Amazon RDS (Relational Database Service)**

- **Use Case**: Traditional SQL databases (MySQL, PostgreSQL, MariaDB, Oracle, SQL Server).
- **Key Points**:
  - **Managed service** (automated backups, patching, scaling).
  - **Multi-AZ** = High availability.
  - **Read Replicas** = Scaling reads (but not HA).
  - **Storage types**: General Purpose (gp3), Provisioned IOPS.
  - **Backups**: Snapshots, Point-in-time recovery.

#### ✅ **Amazon Aurora**

- **Use Case**: High-performance RDS-compatible DB (MySQL/PostgreSQL).
- **Key Points**:
  - Up to **5x faster than MySQL**.
  - **Auto-scaling**, **Multi-AZ**, up to **15 read replicas**.
  - **Aurora Serverless v2**: Scales based on load.

#### ✅ **Amazon DynamoDB (NoSQL)**

- **Use Case**: Fast key-value or document storage.
- **Key Points**:
  - **Fully managed**, **serverless**, **NoSQL**.
  - **On-Demand** or **Provisioned** capacity modes.
  - **DynamoDB Streams** = change data capture (triggers Lambda).
  - **DAX** = in-memory cache for faster reads.
  - **Global Tables** = Multi-region replication.

#### ✅ **Amazon ElastiCache**

- **Use Case**: Caching layer to reduce DB load (Redis or Memcached).
- **Key Points**:
  - Speeds up **frequent queries**.
  - Redis = persistence + replication.
  - Memcached = simple, in-memory only.

---

### 🟡 **SECOND PRIORITY (Understand the Concepts)**

#### ✅ **Amazon RDS Proxy**

- **Use Case**: Manages connections to RDS/Aurora for serverless apps.
- **Key Points**:
  - Improves scalability, security, failover speed.

#### ✅ **Amazon Redshift**

- **Use Case**: Data warehouse (OLAP).
- **Key Points**:
  - Columnar storage, fast analytics.
  - Use with BI tools (e.g., QuickSight, Tableau).

#### ✅ **Amazon EMR (Elastic MapReduce)**

- **Use Case**: Big Data processing using Hadoop/Spark.
- **Key Points**:
  - Used for batch processing at scale.
  - Cost-effective for large-scale ETL jobs.

#### ✅ **Amazon Kinesis**

- **Use Case**: Real-time data streaming.
- **Key Points**:
  - Ingest & process streaming data.
  - Variants: Data Streams, Firehose, Data Analytics.

---

### 🟢 **OPTIONAL (Low Priority for SAA, but good to know)**

- **Amazon Athena**: Query S3 data using SQL (serverless).
- **AWS Glue**: ETL service (used with Athena, Redshift).
- **OpenSearch**: Search & log analytics (formerly Elasticsearch).
- **AWS Batch**: Batch job processing at scale.

---

### 🧠 Quick Study Hack:

| **Service** | **Type**       | **Use Case**                    |
| ----------- | -------------- | ------------------------------- |
| RDS         | SQL            | Managed relational DB           |
| Aurora      | SQL            | High-performance MySQL/Postgres |
| DynamoDB    | NoSQL          | Serverless key-value DB         |
| ElastiCache | In-Memory      | Caching for RDS/DynamoDB        |
| Redshift    | OLAP           | Data warehousing & analytics    |
| EMR         | Big Data       | Hadoop/Spark batch jobs         |
| Kinesis     | Streaming      | Real-time data ingestion        |
| Athena      | Serverless SQL | Query S3 with SQL               |
| Glue        | ETL            | Serverless data prep            |
| OpenSearch  | Search         | Full-text search/log analysis   |

---

### 🧠 Memory Anchors (Cheat Codes)

- **RDS** = Traditional SQL apps (managed MySQL, PG, etc.).
- **Aurora** = RDS++ (faster, more scalable).
- **DynamoDB** = NoSQL key-value store, serverless, instant scaling.
- **ElastiCache** = Redis/Memcached → caching layer to speed up apps.
- **RDS Proxy** = Protect RDS from too many connections (e.g., from Lambda).
- **DynamoDB Global Tables** = Go global with fast writes everywhere.
- **DAX** = DynamoDB + Cache.
- **Redshift** = Big queries on huge data (think BI/reporting).
- **Athena** = Query S3 directly using SQL (serverless).
- **Glue** = ETL service, often used with Athena and Redshift.

---

Would you like a **condensed visual cheat sheet** or a **quiz-style review** next to test your recall before labs?

### 🧪 Week 5: Hands-on Labs (Databases – RDS, DynamoDB, Aurora)

#### ✅ **Lab 1: Launch an RDS Instance & Test Multi-AZ Failover**

**Goal:** Create a MySQL RDS DB instance with Multi-AZ for high availability.

**Steps Overview:**

1. Go to **RDS → Create Database**.
2. Engine: Select **MySQL** or **PostgreSQL**.
3. Use **Standard Create**.
4. Choose **Multi-AZ DB instance deployment**.
5. Instance type: db.t3.micro (Free Tier).
6. Storage: General Purpose (SSD), 20GB.
7. Set username/password.
8. Enable public access: **Yes**
9. Set VPC Security Group: allow **port 3306** from your IP.
10. Launch & wait for creation (~10 mins).
11. Test connection with:

```bash
mysql -h <endpoint> -u <username> -p
```

12. Simulate failover: **Actions → Reboot with failover**

---

#### ✅ **Lab 2: Set up DynamoDB with Global Tables**

**Goal:** Explore cross-region replication for DynamoDB tables.

**Steps Overview:**

1. Go to **DynamoDB → Create Table**.
2. Table name: `Students`, Partition Key: `StudentID (String)`
3. Enable:
   - **Point-in-time recovery**
   - **Encryption at rest**
4. After creation → Go to **Global Tables → Add Region** (e.g., `us-west-2`)
5. Add some items manually or via AWS CLI:
   ```bash
   aws dynamodb put-item --table-name Students --item '{"StudentID":{"S":"001"},"Name":{"S":"John"}}'
   ```
6. Verify replication in the added region.

---

#### ✅ **Lab 3: Deploy ElastiCache for Caching with RDS**

**Goal:** Improve app performance using Redis cache.

**Steps Overview:**

1. Go to **ElastiCache → Redis → Create Cluster**.
2. Subnet Group: Use default or create if needed.
3. Select instance type: `cache.t3.micro`
4. Enable Multi-AZ (if available in Free Tier).
5. Set **Security Group** to allow your EC2 IP or VPC.
6. After creation, test via EC2 instance:
   ```bash
   redis-cli -h <primary-endpoint>
   ```

---

---

#### 1️⃣ **Launch an RDS Instance & Test Multi-AZ Failover**

**Objective:** Deploy a fault-tolerant database instance using Amazon RDS with Multi-AZ enabled.

**Steps:**

- Go to **RDS Console → Create database**
- Choose engine: **MySQL** or **PostgreSQL**
- Deployment option: **Multi-AZ DB instance**
- Instance size: **db.t3.micro (Free tier eligible)**
- Storage: Default (General Purpose SSD)
- Set master username/password
- Select default VPC & Subnet Group
- Enable **public access** and allow port **3306** (MySQL) or **5432** (PostgreSQL) in security group
- Create the DB, wait for it to become **Available**
- Use **EC2 or MySQL Workbench** to connect
- Test failover by rebooting with failover option

---

#### 2️⃣ **Set up DynamoDB with Global Tables**

**Objective:** Deploy a globally distributed NoSQL table across multiple AWS regions.

**Steps:**

- Go to **DynamoDB Console → Create table**
- Set table name (e.g., `Users`), primary key (e.g., `UserID`)
- Enable **DynamoDB Streams**
- Once created, go to **Global Tables → Add Region**
- Choose a second region (e.g., `us-west-2`)
- Test replication by writing data in one region and reading from another

---

#### 3️⃣ **Deploy ElastiCache for Caching with RDS**

**Objective:** Improve read performance by deploying ElastiCache with RDS backend.

**Steps:**

- Go to **ElastiCache Console → Create Cluster**
- Choose **Redis** or **Memcached**
- Choose Node Type: **cache.t3.micro**
- Select default VPC & subnet group
- Allow inbound port **6379** (Redis) in security group
- Use **EC2 instance** with Redis CLI or Python (`redis-py`) to connect and test caching behavior
- Connect your sample app or script to both **RDS** and **Redis** to cache DB queries

---

Let me know when you're ready to move to **Week 6**, or if you'd like the hands-on labs in **JSON, PDF, checklist**, or any custom format to help track them.

📌 _Tip:_ Document what worked, where you got stuck, and what the output was after each lab. It’ll boost your retention and confidence.
