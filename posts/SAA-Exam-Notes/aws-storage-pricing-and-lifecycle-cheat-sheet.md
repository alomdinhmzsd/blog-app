Here's a **compact yet powerful AWS Storage Pricing & Lifecycle Cheat Sheet** that summarizes the **cost structure, access pattern, and lifecycle tiering options** across S3, EBS, and EFS — perfect for **SAA-C03 exam prep or real-world architecture decisions**.

---

## 📘 AWS Storage Pricing & Lifecycle Cheat Sheet

---

### 🪣 **Amazon S3 – Object Storage**

| Storage Class               | Use Case                    | Price (per GB/month)\* | Lifecycle Eligible | Notes                             |
| --------------------------- | --------------------------- | ---------------------- | ------------------ | --------------------------------- |
| **S3 Standard**             | Frequent access             | \~\$0.023              | Yes                | Default; high durability (11 9s)  |
| **S3 Intelligent-Tiering**  | Unknown/variable access     | \~\$0.023 + monitoring | Yes                | Moves between tiers automatically |
| **S3 Standard-IA**          | Infrequent, rapid access    | \~\$0.0125             | Yes                | Min 30-day storage; retrieval fee |
| **S3 One Zone-IA**          | Infrequent, one AZ          | \~\$0.01               | Yes                | Cheaper, but lower availability   |
| **S3 Glacier Instant**      | Archival, instant retrieval | \~\$0.004              | Yes                | Lower cost, immediate access      |
| **S3 Glacier Flexible**     | Archival, hours to retrieve | \~\$0.0036             | Yes                | Cheapest long-term storage        |
| **S3 Glacier Deep Archive** | Rarely accessed, long-term  | \~\$0.00099            | Yes                | Cheapest option; 12–48h retrieval |
| **S3 Reduced Redundancy**   | Deprecated                  | -                      | No                 | Not recommended anymore           |

📦 **Lifecycle**: Use S3 lifecycle rules to automatically transition data between classes based on **age**, **last access**, or **prefix**.

---

### 💽 **Amazon EBS – Block Storage**

| Volume Type                   | Use Case                      | Price (per GB/month)\* | Lifecycle Eligible | Notes                                             |
| ----------------------------- | ----------------------------- | ---------------------- | ------------------ | ------------------------------------------------- |
| **gp3 (General Purpose SSD)** | Balanced, burst workloads     | \~\$0.08               | ❌                 | Recommended default for general EC2               |
| **gp2**                       | Legacy SSD option             | \~\$0.10               | ❌                 | Performance tied to size (deprecated for new use) |
| **io1/io2**                   | IOPS-intensive apps           | \~\$0.125 – \$0.138    | ❌                 | Provisioned IOPS separately                       |
| **st1 (Throughput HDD)**      | Streaming data, logs          | \~\$0.045              | ❌                 | Lower IOPS, high throughput                       |
| **sc1 (Cold HDD)**            | Rarely accessed block storage | \~\$0.025              | ❌                 | Cheapest, very low throughput                     |

🧠 **Key Point**: **EBS bills for provisioned size**, **not actual usage**.

---

### 📁 **Amazon EFS – File Storage**

| Storage Class             | Use Case                    | Price (per GB/month)\* | Lifecycle Eligible | Notes                        |
| ------------------------- | --------------------------- | ---------------------- | ------------------ | ---------------------------- |
| **EFS Standard**          | Shared file access, active  | \~\$0.30               | Yes (via EFS IA)   | Auto-scales, POSIX-compliant |
| **EFS Infrequent Access** | Infrequently accessed files | \~\$0.025              | Yes                | 90-day min; cheaper tier     |

💡 **Lifecycle**: EFS supports **automatic lifecycle management** that moves files to IA after 7, 14, 30, 60, or 90 days of inactivity.

---

### 📊 Summary: Cheapest to Most Expensive (1GB, 1 Month)

| Service                     | Estimated Monthly Cost | Notes                    |
| --------------------------- | ---------------------- | ------------------------ |
| **S3 Glacier Deep Archive** | \~\$0.001              | Very long retrieval time |
| **S3 Glacier Flexible**     | \~\$0.004              | 3–5 hrs retrieval        |
| **S3 Glacier Instant**      | \~\$0.0045             | Instant access           |
| **S3 One Zone-IA**          | \~\$0.01               | One AZ, cheaper          |
| **S3 Standard-IA**          | \~\$0.0125             | 30-day min               |
| **S3 Standard**             | \~\$0.023              | Frequent access          |
| **EFS IA**                  | \~\$0.025              | Shared filesystem, slow  |
| **EBS sc1 (cold HDD)**      | \~\$0.025              | Block storage, slow      |
| **EBS st1 (throughput)**    | \~\$0.045              | Sequential data          |
| **EBS gp3**                 | \~\$0.08               | General SSD              |
| **EFS Standard**            | \~\$0.30               | Most expensive           |

\*Pricing is approximate and region-dependent, based on `us-east-1`.

---

## 🧠 Lifecycle Automation Tips

| Service | Lifecycle Policy Available? | Notes                                 |
| ------- | --------------------------- | ------------------------------------- |
| **S3**  | ✅ Yes – full control       | Transition by age, access pattern     |
| **EFS** | ✅ Yes – for IA tier        | Auto-move after inactivity            |
| **EBS** | ❌ No native lifecycle      | Must use Lambda + scripts for cleanup |

---

Would you like this exported as a **PDF** or ready-to-paste Markdown/Notion format?
