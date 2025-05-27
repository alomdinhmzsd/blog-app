### 🚀 **AWS SAA Exam Cram – Weekly Recap** 🚀

This week, we focused on **AWS Lambda & Elastic Beanstalk**, covering key concepts, hands-on labs, troubleshooting, and best practices. Here’s a **concise exam-focused recap** to reinforce what you’ve learned.

---

## ✅ **AWS Lambda**

### **Core Concepts**

- **Serverless computing**: AWS Lambda lets you run code without managing servers.
- **Event-driven**: Lambda is triggered by AWS services (S3, DynamoDB, API Gateway, etc.).
- **Execution Environment**: Each function runs in a containerized, ephemeral execution context.

### **Key Exam Topics**

1. **Lambda Triggers & Invocations**
   - **Synchronous**: API Gateway, ALB (Application Load Balancer), CLI.
   - **Asynchronous**: S3 events, SNS, EventBridge.
   - **Stream-based**: DynamoDB Streams, Kinesis.
2. **IAM & Security**

   - **Execution Role** (`AWSLambdaBasicExecutionRole`): Grants Lambda permissions to access AWS services.
   - **Resource Policies**: Required when external services (S3, API Gateway) invoke Lambda.

3. **Networking**

   - Default: **Public Lambda** (accesses the internet, no inbound connections).
   - **VPC Lambda**: Needed for private subnet access (e.g., RDS, ElastiCache).

4. **Monitoring & Logging**

   - **Amazon CloudWatch Logs**: Stores logs (`print()` or `logging` in code).
   - **X-Ray**: Traces execution flow for debugging.

5. **Scaling & Concurrency**

   - **Default concurrency limit**: 1,000 concurrent executions per account (soft limit).
   - **Provisioned Concurrency**: Reduces cold starts by pre-warming Lambda instances.

6. **Cold Starts vs Warm Starts**
   - **Cold Start**: Happens when a new execution environment is created (~100ms-1s latency).
   - **Warm Start**: Uses existing execution context (faster).

### **Labs Covered**

✅ **Lab 1**: Create & invoke a basic Lambda function via CLI.  
✅ **Lab 2**: Invoke Lambda via API Gateway.  
✅ **Lab 3**: Trigger Lambda with S3 events (uploading a file).  
✅ **Lab 4**: Trigger Lambda with DynamoDB Streams.  
✅ **Lab 5**: Automate EC2 start/stop using Lambda.

### **Common Troubleshooting Issues**

❌ **Lambda not executing?**

- Check IAM permissions (role must have `AWSLambdaBasicExecutionRole`).

❌ **Invocation failed?**

- Check **CloudWatch logs** for errors (`eb logs` in Beanstalk).

❌ **Slow response?**

- **Provisioned concurrency** to minimize cold starts.
- Optimize code and memory allocation.

---

## ✅ **AWS Elastic Beanstalk**

### **Core Concepts**

- **PaaS (Platform-as-a-Service)**: Deploys and manages web applications (Python, Node.js, Java, etc.).
- **Components**: **EC2, ALB, Auto Scaling, RDS (optional)**.
- **Deployment Options**:
  - **All-at-once**: Fast but can cause downtime.
  - **Rolling**: Deploys in batches, reducing downtime.
  - **Immutable**: Creates new instances, ensuring safe rollbacks.

### **Key Exam Topics**

1. **Deployment Process**

   - `eb init`: Initializes an Elastic Beanstalk application.
   - `eb create <env-name>`: Creates an environment.
   - `eb deploy`: Deploys the latest code update.
   - `eb logs`: Retrieves logs.
   - `eb status`: Shows environment health.
   - `eb terminate <env-name>`: Deletes an environment.

2. **Elastic Beanstalk Architecture**

   - **Auto Scaling Group (ASG)**: Ensures high availability.
   - **Load Balancer (ALB)**: Distributes traffic across instances.
   - **EC2 Instances**: Run the application.
   - **RDS (Optional)**: Can be attached for database storage.

3. **Procfile & Gunicorn**

   - Used to define how the application starts.
   - Example Procfile:
     ```plaintext
     web: gunicorn -w 4 -b 0.0.0.0:5000 application:app
     ```
   - Ensure Flask application is running on **port 5000** (`app.run(host="0.0.0.0", port=5000)`).

4. **Health Monitoring**
   - **Green** = Healthy, running smoothly.
   - **Yellow** = Some degraded performance.
   - **Red** = Major issues (instance failures, misconfigurations).

### **Labs Covered**

✅ **Lab 1**: Deploy a sample Python Flask application using Elastic Beanstalk.  
✅ **Lab 2**: Debug application issues (`eb logs`, `eb status`).  
✅ **Lab 3**: Fix Procfile & Gunicorn port mismatch.  
✅ **Lab 4**: Restart EC2 instance manually due to missing `eb restart` command.

### **Common Troubleshooting Issues**

❌ **502 Bad Gateway?**

- **Check Gunicorn logs** (`eb logs | grep gunicorn`).
- Ensure Gunicorn is running on **port 5000**, not 8000.

❌ **Application not found?**

- Fix Procfile: `web: gunicorn -w 4 -b 0.0.0.0:5000 application:app`
- Ensure `application.py` exists and defines `app = Flask(__name__)`.

❌ **Elastic Beanstalk unhealthy?**

- Restart EC2: **Reboot via AWS Console**.
- `eb terminate <env>` and recreate (`eb create <env>`).

---

## **📝 Key Takeaways for the AWS SAA Exam**

- **Lambda is event-driven**, scalable, and integrates with S3, DynamoDB, and API Gateway.
- **Elastic Beanstalk abstracts infrastructure**, allowing easy deployment and management.
- **IAM permissions are crucial** for Lambda execution roles.
- **Elastic Beanstalk health checks** help diagnose issues (`Green`, `Yellow`, `Red`).
- **Networking matters**: Lambda outside VPC has internet; inside VPC needs NAT for outbound.
- **Gunicorn & Procfile must match AWS Beanstalk expectations**.

---

### **Next Up: AWS RDS (Next Week)**

- **Relational database management**
- **RDS Multi-AZ vs. Read Replicas**
- **Connecting RDS to EC2 & Lambda**
- **Aurora vs. MySQL vs. PostgreSQL in AWS**
- **Backup & disaster recovery strategies**

---

This recap covers **exam-relevant topics** you practiced, ensuring you're well-prepared for **AWS Certified Solutions Architect - Associate (SAA-C03)**. If you need **flashcards, practice questions, or deep dives into specific areas**, let me know! 🚀

<h5>More summary</h5>

### **📌 AWS SAA Exam Cram – Week 1 Recap (Compute & IAM)**

This covers all the key **AWS Certified Solutions Architect – Associate (SAA-C03)** topics from **Week 1**, ensuring you retain everything needed for the exam.

---

## ✅ **Compute Services**

### **1️⃣ Amazon EC2 (Elastic Compute Cloud)**

🔹 **What is EC2?**

- Virtual machines in the cloud, scalable on-demand.
- Different **Instance Types** for computing needs:
  - **General Purpose** (T3, M5) – Balanced CPU/memory.
  - **Compute Optimized** (C5) – High-performance computing.
  - **Memory Optimized** (R5, X1) – In-memory databases.
  - **Storage Optimized** (I3, D2) – Large storage workloads.
  - **GPU Instances** (P4, G5) – Machine Learning/Graphics.

🔹 **Pricing Models**

- **On-Demand** – Pay per second/minute (best for short-term workloads).
- **Reserved Instances (RI)** – 1 to 3-year commitment, cheaper.
- **Spot Instances** – Up to 90% discount, can be interrupted.
- **Dedicated Hosts** – Physical server for compliance.

🔹 **Key EC2 Concepts**

- **Security Groups**: Firewall rules for inbound/outbound traffic.
- **Elastic Block Store (EBS)**: Persistent storage for EC2.
- **Elastic IPs**: Static IP address assigned to an EC2 instance.
- **User Data & Metadata**:
  - **User Data**: Run scripts at instance launch (e.g., install packages).
  - **Metadata**: Retrieve instance details (`curl http://169.254.169.254/latest/meta-data`).

### **2️⃣ Load Balancing (Elastic Load Balancer - ELB)**

- **Types of Load Balancers**:

  - **Application Load Balancer (ALB)** – Layer 7 (HTTP/HTTPS, path-based routing).
  - **Network Load Balancer (NLB)** – Layer 4 (TCP/UDP, extreme performance).
  - **Classic Load Balancer (CLB)** – Older, less flexible.

- **Cross-Zone Load Balancing**: Ensures even traffic distribution across AZs.
- **Sticky Sessions**: Ensures users stay connected to the same instance.
- **Health Checks**: Determines if an instance is healthy before routing traffic.

🔹 **Hands-on Lab**:  
✅ Created an EC2 instance, connected via SSH, installed web server (`nginx`), and assigned a security group.

### **3️⃣ Auto Scaling Groups (ASG)**

- **Automatically scales EC2 instances** up/down based on demand.
- Uses **Launch Templates** or **Launch Configurations**.
- Scaling **Policies**:
  - **Target Tracking** (e.g., keep CPU at 50%).
  - **Step Scaling** (add instances based on thresholds).
  - **Scheduled Scaling** (e.g., scale up at 9 AM, down at 6 PM).

🔹 **Hands-on Lab**:  
✅ Created an **Auto Scaling Group** with an **ALB**, ensuring high availability.

---

## ✅ **AWS Lambda (Serverless Compute)**

- **No servers to manage** – AWS runs your code in response to events.
- **Event-driven execution** – Triggered by S3, DynamoDB, API Gateway, etc.
- **Short-lived execution** – Default timeout = 15 minutes.
- **Runtime environments**: Python, Node.js, Go, Java, etc.

🔹 **Common Triggers:**

- **S3 Events** (file upload triggers a Lambda function).
- **DynamoDB Streams** (change data capture).
- **API Gateway** (serverless REST APIs).
- **EventBridge (CloudWatch Events)** (scheduled Lambda execution).

🔹 **Lambda Execution Role**

- Must have **IAM Role** with policies (`AWSLambdaBasicExecutionRole`).
- Example **Lambda Function** in Python:

  ```python
  import json

  def lambda_handler(event, context):
      return {
          "statusCode": 200,
          "body": json.dumps("Hello from Lambda!")
      }
  ```

🔹 **Hands-on Lab**:  
✅ Created a Lambda function, tested it via CLI & AWS Console.

---

## ✅ **Elastic Beanstalk (PaaS)**

- **Fully managed service** for deploying applications (Python, Node.js, Java, PHP, Ruby, .NET).
- **Abstracts EC2, ELB, Auto Scaling Groups**.
- **Supported Deployment Modes**:
  - **All-at-once** (fastest but risky).
  - **Rolling Updates** (safe, minimal downtime).
  - **Blue/Green Deployments** (new version runs in parallel).

🔹 **Hands-on Lab**:  
✅ Deployed a **Flask** app with Elastic Beanstalk using `eb init`, `eb create`, and `eb deploy`.

---

## ✅ **Identity and Access Management (IAM)**

### **1️⃣ IAM Users, Groups, and Policies**

- **Users**: Individual AWS accounts with permissions.
- **Groups**: Collection of users with shared permissions.
- **Policies**: JSON-based rules granting/denying permissions.
- **Best Practices**:
  - **Grant Least Privilege**: Give only necessary permissions.
  - **Use IAM Roles**: Instead of embedding credentials in apps.

🔹 **Example IAM Policy (Read-only access to S3)**:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": "s3:ListBucket",
      "Resource": "arn:aws:s3:::example-bucket"
    }
  ]
}
```

### **2️⃣ IAM Roles**

- **Assigned to AWS services** (EC2, Lambda, RDS).
- **Example Use Case**:
  - **EC2 Role**: Allows an instance to access S3 without hardcoding credentials.
  - **Lambda Role**: Grants permissions to write logs to CloudWatch.

🔹 **Hands-on Lab**:  
✅ Created an IAM Role for EC2 to access **S3**, attached it to an instance.

### **3️⃣ IAM Federation & STS (Security Token Service)**

- **Federation**: Allows users to log in with existing credentials (Google, Microsoft, Active Directory).
- **STS (Security Token Service)**:
  - Generates **temporary credentials** for IAM users/roles.
  - Used in **cross-account access**.

🔹 **Hands-on Lab**:  
✅ Enabled **IAM MFA**, explored STS AssumeRole.

---

## **📝 Key Takeaways for the AWS SAA Exam**

✅ **EC2:**

- Security Groups control inbound/outbound traffic.
- Choose the right **Instance Type & Pricing Model**.
- **EBS volumes persist even if the instance stops**.

✅ **Auto Scaling & Load Balancing:**

- **Auto Scaling Group (ASG)** ensures resilience.
- **ALB/NLB** distributes traffic across EC2 instances.

✅ **Lambda:**

- **Serverless, event-driven compute**.
- Runs **stateless functions**, triggered by AWS events.
- **Execution roles (IAM)** define permissions.

✅ **Elastic Beanstalk:**

- **Managed PaaS**, abstracts EC2/ASG/ELB.
- **Green/Blue deployment recommended** for zero downtime.

✅ **IAM:**

- **IAM Users, Groups, Policies, Roles** are fundamental.
- **Use IAM Roles for EC2 & Lambda** (no hardcoded credentials).
- **MFA & STS** enhance security.

---

### **📌 What’s Next?**

**Week 2: Databases & Storage**
🔹 **RDS (MySQL, PostgreSQL, Aurora)**
🔹 **DynamoDB (NoSQL)**
🔹 **S3 (Storage classes, encryption, replication)**
🔹 **EBS vs. EFS vs. S3**
🔹 **Hands-on: RDS setup, DynamoDB queries, S3 lifecycle rules**

---

This **exam cram** gives you all the **SAA-C03 exam-relevant knowledge** from **Week 1**. 🚀  
If you need **practice questions, flashcards, or deep dives**, let me know!

<h5>More summary</h5>
### **📌 AWS SAA Exam Cram – Week 1 Detailed Breakdown**
This section elaborates on each AWS concept covered in **Week 1** with **actions, tasks, and real-world exam relevance** to ensure you're prepared for the **AWS Certified Solutions Architect – Associate (SAA-C03)** exam.

---

## **✅ Compute Services**

### **1️⃣ Amazon EC2 (Elastic Compute Cloud)**

## **📖 Concept:**

EC2 provides **scalable compute capacity** in the AWS cloud, allowing you to run virtual machines.

## **🔹 Key Actions & Tasks:**

- **Launch an EC2 instance** from the AWS Console or CLI.
- **Attach an IAM Role** to give the instance permissions (e.g., access to S3).
- **Configure Security Groups** (firewall rules for inbound/outbound traffic).
- **Use EC2 User Data** to automate software installation at boot.

## **⚡ Exam-Relevant Points:**

✅ Understand **Instance Types** (T3, M5, C5, etc.).  
✅ **EBS Volumes** persist data even if the instance stops.  
✅ **Security Groups** act as **stateful** firewalls (Rules apply to both inbound and outbound traffic).  
✅ **Spot Instances** are **cheapest** but can be terminated anytime.  
✅ **Elastic IPs** are public IPs that **remain the same** after reboots.

🔹 **Example Exam Question:**  
_"Your EC2 instance is running a database, but after stopping and starting it, the public IP has changed. How do you ensure the IP remains the same?"_  
**Answer:** Use an **Elastic IP**.

---

### **2️⃣ Load Balancing (Elastic Load Balancer - ELB)**

## **📖 Concept:**

ELB distributes incoming traffic across multiple EC2 instances, improving availability and fault tolerance.

## **🔹 Key Actions & Tasks:**

- **Deploy an Application Load Balancer (ALB)** for HTTP/HTTPS traffic.
- **Enable Sticky Sessions** (if needed) to keep users on the same instance.
- **Configure Health Checks** to monitor EC2 instance health.

## **⚡ Exam-Relevant Points:**

✅ **ALB** = Layer **7** (HTTP/HTTPS, path-based routing).  
✅ **NLB** = Layer **4** (TCP/UDP, extreme performance).  
✅ **Cross-Zone Load Balancing** = Ensures traffic is evenly distributed.

🔹 **Example Exam Question:**  
_"Your website experiences uneven traffic distribution across instances despite having multiple AZs. How do you fix this?"_  
**Answer:** Enable **Cross-Zone Load Balancing**.

---

### **3️⃣ Auto Scaling Groups (ASG)**

## **📖 Concept:**

ASG automatically adds or removes EC2 instances based on demand.

## **🔹 Key Actions & Tasks:**

- **Define Scaling Policies** (Target Tracking, Step Scaling, Scheduled Scaling).
- **Attach an ALB to the ASG** for high availability.
- **Ensure ASG spans multiple Availability Zones (AZs).**

## **⚡ Exam-Relevant Points:**

✅ **Auto Scaling reduces costs** by adding/removing instances dynamically.  
✅ **Scheduled Scaling** is used for predictable traffic patterns.  
✅ **Lifecycle Hooks** allow you to run custom scripts **before terminating an instance**.

🔹 **Example Exam Question:**  
_"Your web app traffic spikes at 9 AM and drops at 6 PM daily. How do you optimize costs?"_  
**Answer:** Use **Scheduled Scaling** to add instances at 9 AM and remove them at 6 PM.

---

## **✅ AWS Lambda (Serverless Compute)**

## **📖 Concept:**

Lambda runs code **without provisioning or managing servers**. It is **event-driven** and scales automatically.

## **🔹 Key Actions & Tasks:**

- **Create a Lambda function** in Python or Node.js.
- **Configure an S3 Event Trigger** to execute Lambda when a file is uploaded.
- **Attach IAM Roles** to Lambda for permissions (e.g., writing logs to CloudWatch).

## **⚡ Exam-Relevant Points:**

✅ **Execution timeout**: Default is **15 minutes**.  
✅ **Cold Starts**: First execution takes longer due to initialization.  
✅ **Concurrency Limit**: Default is **1000 concurrent executions per region**.  
✅ **IAM Role Required**: Lambda needs permission to access resources (S3, DynamoDB, etc.).

🔹 **Example Exam Question:**  
_"A Lambda function needs to write logs to CloudWatch. How do you grant it permissions?"_  
**Answer:** Attach the **AWSLambdaBasicExecutionRole** IAM role.

---

## **✅ Elastic Beanstalk (PaaS)**

## **📖 Concept:**

Elastic Beanstalk (EB) is a **Platform-as-a-Service (PaaS)** that automates EC2, ELB, and ASG deployments.

## **🔹 Key Actions & Tasks:**

- **Deploy a Python (Flask) app** using `eb init`, `eb create`, and `eb deploy`.
- **Use Elastic Beanstalk Logs** (`eb logs`) for debugging.
- **Set up Environment Variables** (`eb setenv`).

## **⚡ Exam-Relevant Points:**

✅ **Blue/Green Deployments** reduce downtime.  
✅ **All-at-once deployment** is **fastest but risky**.  
✅ **Rolling Updates** deploy in batches, reducing risk.

🔹 **Example Exam Question:**  
_"Your Elastic Beanstalk app is updated frequently. How do you minimize downtime?"_  
**Answer:** Use **Blue/Green Deployments**.

---

## **✅ Identity and Access Management (IAM)**

### **1️⃣ IAM Users, Groups, and Policies**

## **📖 Concept:**

IAM manages authentication and authorization using **Users, Groups, Roles, and Policies**.

## **🔹 Key Actions & Tasks:**

- **Create IAM Users** and assign them roles.
- **Define Policies** using JSON to grant access.
- **Enable MFA (Multi-Factor Authentication)** for security.

## **⚡ Exam-Relevant Points:**

✅ **IAM Policies** grant or deny permissions.  
✅ **IAM Users & Groups** provide authentication.  
✅ **Least Privilege Principle**: Only give required permissions.

🔹 **Example Exam Question:**  
_"A new developer needs read-only access to S3. What do you do?"_  
**Answer:** Attach an **IAM Policy** with `"s3:ListBucket"` permission.

---

### **2️⃣ IAM Roles & STS (Security Token Service)**

## **📖 Concept:**

IAM **Roles** allow AWS services to assume permissions **without storing credentials**.

## **🔹 Key Actions & Tasks:**

- **Create an IAM Role for EC2** to access S3.
- **Use STS AssumeRole** to provide temporary access.

## **⚡ Exam-Relevant Points:**

✅ **IAM Roles are used by AWS services** (EC2, Lambda, RDS).  
✅ **STS provides temporary credentials** for cross-account access.

🔹 **Example Exam Question:**  
_"How can an EC2 instance access S3 without storing credentials?"_  
**Answer:** Attach an **IAM Role with S3 permissions**.

---

### **3️⃣ IAM Federation & MFA**

## **📖 Concept:**

IAM **Federation** allows **external identity providers (Google, Active Directory)** to log into AWS.

## **🔹 Key Actions & Tasks:**

- **Enable IAM Federation** to integrate AWS with an external authentication provider.
- **Require MFA for IAM Users** for security.

## **⚡ Exam-Relevant Points:**

✅ **IAM Federation integrates with Active Directory, Google, etc.**  
✅ **MFA enhances security** for sensitive operations.

🔹 **Example Exam Question:**  
_"Your company wants employees to log into AWS using corporate credentials. What should you use?"_  
**Answer:** **IAM Federation** (via SAML).

---

## **🚀 Final Exam Preparation Checklist**

🔲 **EC2**: Security Groups, Instance Types, Auto Scaling.  
🔲 **ELB**: ALB vs. NLB, health checks, sticky sessions.  
🔲 **Auto Scaling**: Scaling policies, launch configurations.  
🔲 **Lambda**: Triggers (S3, DynamoDB), execution role.  
🔲 **Elastic Beanstalk**: Deployments, logs, environments.  
🔲 **IAM**: Users, Groups, Roles, STS, MFA, Federation.

---

### **📌 What’s Next?**

**Week 2: Databases & Storage**
🔹 **RDS (Relational Databases: MySQL, PostgreSQL, Aurora)**  
🔹 **DynamoDB (NoSQL, Global Tables, Streams)**  
🔹 **S3 (Storage Classes, Lifecycle, Encryption, Replication)**  
🔹 **Hands-on Labs: Setup RDS, DynamoDB, S3 storage policies**

🔥 **This wraps up Week 1! Let me know if you need flashcards, deep dives, or practice questions.** 🚀
