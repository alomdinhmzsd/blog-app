### **AWS Certified Solutions Architect – Associate (SAA-C03) Consolidated Study Plan**

**Study Style**:  
📖 **Work (Reading Material)** – Read and understand the concepts during work hours.  
🛠️ **Home (Hands-on Labs)** – Apply knowledge through practical labs when at home.

**📅 Current Progress:**

- **Week 1 (IAM & Security)** ✅ _Completed_
- **Week 2 (EC2 & Auto Scaling)** 🔄 _In Progress_

---

## **Week 2: Amazon EC2 & Auto Scaling** _(Current Week)_

📖 **Work (Reading Material)**

- Amazon Elastic Compute Cloud (EC2)
  - Overview
  - Launching EC2 Instances
  - Connecting to EC2
  - User Data & Metadata
  - Access Keys & IAM Roles with EC2
  - EC2 Instance Lifecycle (Nitro Instances & Nitro Enclaves)
  - EC2 Pricing Options (On-Demand, Reserved, Spot)
- Elastic Load Balancing & Auto Scaling
  - ALB vs NLB vs CLB
  - Auto Scaling Groups (ASG)
  - Scaling Policies & High Availability
  - Cross-Zone Load Balancing
  - Secure Listeners for ELB (SSL/TLS)
  - Session Stickiness
  - NAT Gateways for Private Subnets

🛠️ **Home (Hands-on Labs)**

- 🚀 Launch an EC2 instance and connect via SSH
- 🔄 Deploy an Auto Scaling Group with Load Balancer
- 🔁 Configure an EC2 instance with User Data to install software on launch
- 🛠️ Implement a NAT Gateway to allow internet access for private instances
- 🔐 Assign IAM Roles to EC2 instances and test permissions

---

## **Week 3: Networking – VPC, Route 53, CloudFront**

📖 **Work (Reading Material)**

- **Amazon Virtual Private Cloud (VPC)**
  - VPC Overview & CIDR Blocks
  - Security Groups vs Network ACLs
  - VPC Peering & Endpoints
  - AWS VPN & Direct Connect
  - Transit Gateway & IPv6 in VPC
  - VPC Flow Logs for Traffic Monitoring
- **Route 53**
  - DNS & Routing Policies (Latency, Failover, Weighted)
  - Route 53 Resolver
- **CloudFront**
  - CloudFront Caching, Signed URLs, OAI/OAC
  - SSL/TLS & Lambda@Edge

🛠️ **Home (Hands-on Labs)**

- 🏗️ Create a Custom VPC with Public & Private Subnets
- 🔐 Configure Security Groups & NACLs
- 🌍 Deploy a Route 53 Hosted Zone & Test Failover Routing
- 🚀 Set up CloudFront with an S3 static website & test caching

---

## **Week 4: Storage – S3, EBS, EFS, FSx**

📖 **Work (Reading Material)**

- **Amazon S3**
  - S3 Storage Classes & Lifecycle Rules
  - Versioning & Cross-Region Replication
  - S3 Encryption & IAM Policies
  - Presigned URLs & S3 Event Notifications
- **Block & File Storage**
  - EBS Volumes & Snapshots
  - Elastic File System (EFS)
  - FSx for Windows/Linux
  - AWS Storage Gateway

🛠️ **Home (Hands-on Labs)**

- 📦 Create & Secure an S3 Bucket with IAM Policies
- 🏗️ Set up S3 Versioning & Replication
- 🔐 Encrypt S3 Data using KMS
- 💽 Attach an EBS Volume to EC2 & Perform Snapshots
- 🖥️ Mount EFS on multiple EC2 instances

---

## **Week 5: Databases – RDS, DynamoDB, Aurora**

📖 **Work (Reading Material)**

- **Amazon RDS**
  - Multi-AZ vs. Read Replicas
  - Security & Performance Optimization
  - RDS Proxy & Snapshots
- **Amazon DynamoDB**
  - NoSQL Concepts
  - Global Tables & DAX
  - Streams & On-Demand Capacity
- **ElastiCache**
  - Redis vs. Memcached
  - Auto Scaling & Data Persistence

🛠️ **Home (Hands-on Labs)**

- 🏗️ Launch an RDS Instance & Test Multi-AZ Failover
- 🔄 Set up DynamoDB with Global Tables
- 🚀 Deploy ElastiCache for Caching with RDS

---

## **Week 6: Serverless – AWS Lambda, API Gateway, SQS, EventBridge**

📖 **Work (Reading Material)**

- **AWS Lambda**
  - Event-driven Compute Model
  - Integration with S3, DynamoDB, API Gateway
- **API Gateway**
  - REST API vs HTTP API
  - Throttling & Authorization
- **Messaging Services**
  - SQS (Queue-based Processing)
  - SNS (Notifications & Fan-Out)
  - EventBridge (Event-Driven Architecture)

🛠️ **Home (Hands-on Labs)**

- 🏗️ Deploy a Lambda function that resizes an image on S3 upload
- 🔁 Create an API Gateway REST API to trigger Lambda
- 📩 Set up SQS for decoupled architecture & test message processing

---

## **Week 7: High Availability, Disaster Recovery & Cost Optimization**

📖 **Work (Reading Material)**

- **High Availability (HA) & Fault Tolerance**
  - Multi-AZ & Read Replicas
  - Route 53 Failover Routing
- **AWS Backup & Disaster Recovery**
  - Backup Strategies & RPO/RTO
- **Cost Optimization**
  - AWS Budgets & Cost Explorer
  - Compute Savings Plans & Reserved Instances

🛠️ **Home (Hands-on Labs)**

- 📦 Configure AWS Backup for RDS & EC2
- 🔁 Test Route 53 Failover Routing
- 💰 Analyze AWS Cost Explorer & Set Up Budget Alerts

---

## **Week 8: Security, Compliance & Monitoring**

📖 **Work (Reading Material)**

- **AWS Security**
  - AWS KMS & CloudHSM
  - AWS Shield & WAF
  - GuardDuty & Macie
- **Monitoring & Logging**
  - Amazon CloudWatch
  - AWS CloudTrail
  - AWS Config & Compliance

🛠️ **Home (Hands-on Labs)**

- 📊 Configure CloudWatch Alarms for EC2 & RDS
- 🔄 Enable AWS Config Rules for Compliance Monitoring
- 🔐 Implement GuardDuty & AWS WAF for Threat Detection

---

## **Week 9: Exam Review – Hands-on & Practice Exams**

📖 **Work (Reading Material)**

- Review **AWS Well-Architected Framework**
- Revisit **IAM, Networking, Compute, Storage, Databases**
- Analyze **Practice Exam Mistakes & Weak Areas**

🛠️ **Home (Hands-on Labs)**

- 🚀 Troubleshoot AWS Deployment Issues
- 💡 Optimize Cost & Performance in AWS
- 📖 Take 3 Full-Length Practice Exams

---

### **📌 Key Study Tips**

✔ **Work Time** = Reading AWS Docs & Whitepapers  
✔ **Home Time** = Hands-on Labs & AWS Free Tier Practice  
✔ **Mock Exams** = Do at least 3 practice tests before the exam  
✔ **Take Notes** = Summarize Key AWS Concepts

---

### **🔹 Final Thoughts**

This **blended study approach** ensures **you read AWS concepts during work hours** and **apply them through hands-on labs at home**. It aligns with **real-world AWS experience** and **prepares you for the SAA-C03 exam** effectively.

Does this plan work better for you? 🚀💡
