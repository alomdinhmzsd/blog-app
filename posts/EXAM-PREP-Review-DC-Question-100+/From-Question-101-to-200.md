---
title: 'SAA-Q101: Unexpected Costs with AWS Shield Advanced Across Multiple Accounts'
questionId: 'saa-q101'
category: 'Design Cost-Optimized Architectures'
tags:
  ['saa-c03', 'shield-advanced', 'ddos-protection', 'billing', 'multi-account']
---

### Question 'SAA-Q101'

Why is AWS Shield Advanced costing more than expected across multiple accounts?

- AWS Shield Advanced is being used for custom servers outside AWS
- Consolidated billing has not been enabled
- AWS Shield Advanced also covers AWS Shield Standard
- Savings Plans has not been enabled

---

## 1. In Simple English

You’re seeing higher-than-expected bills for AWS Shield Advanced (AWS’s premium DDoS protection service) across multiple AWS accounts. What’s the most likely reason?

---

## 2. Verbiage & Realism

| Aspect             | Evaluation                                                                                  |
| ------------------ | ------------------------------------------------------------------------------------------- |
| Clarity of Wording | Clear – focuses on cost implications of Shield Advanced in multi-account setups.            |
| Realistic Scenario | Very realistic – Shield Advanced pricing is often misunderstood in enterprise environments. |
| Terminology Usage  | Accurate AWS terms: "Shield Advanced", "Consolidated Billing", "Savings Plans".             |

---

## 3. What the Question is Testing

| Concept Being Tested  | Explanation                                                                                          |
| --------------------- | ---------------------------------------------------------------------------------------------------- |
| Shield Advanced Scope | Understanding that Shield Advanced **only protects AWS resources** (not external servers).           |
| Billing Optimization  | Knowledge that **Consolidated Billing** reduces costs for multi-account Shield Advanced deployments. |
| Cost Allocation       | Awareness that Shield Advanced is **not covered by Savings Plans**.                                  |

---

## 4. Answer and Explanation

✅ **Correct Answer:** `Consolidated billing has not been enabled`

| Option                                  | Verdict      | Detailed Reasoning                                                                                                                                                       |
| --------------------------------------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Used for custom servers outside AWS** | ❌ Incorrect | Shield Advanced **only protects AWS resources** (e.g., EC2, ALB, CloudFront). External servers are **not supported**.                                                    |
| **Consolidated billing not enabled**    | ✅ Correct   | Without consolidated billing, Shield Advanced charges **$3,000/month per account**. Enabling it reduces this to **$3,000/month for all accounts** under an Organization. |
| **Also covers AWS Shield Standard**     | ❌ Incorrect | Shield Advanced includes Standard’s features but doesn’t "cost more" because of it – Standard is free.                                                                   |
| **Savings Plans not enabled**           | ❌ Incorrect | Savings Plans **do not apply** to Shield Advanced (fixed $3,000/month fee).                                                                                              |

---

## 5. Final Answer

**Consolidated billing has not been enabled**

---

## 6. Relevant AWS Documentation (Table)

| Resource                                                                                                       | Key Insight                                                                    |
| -------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| [Shield Advanced Pricing](https://aws.amazon.com/shield/pricing/)                                              | "With AWS Organizations, pay $3,000/month per organization (not per account)." |
| [Shield Advanced Features](https://aws.amazon.com/shield/features/)                                            | Confirms protection is **only for AWS resources**.                             |
| [Consolidated Billing](https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/consolidated-billing.html) | Explains cost aggregation for services like Shield Advanced.                   |

---

## 7. Are the Options Tricky?

| Option                          | Why It’s Tricky                                                           |
| ------------------------------- | ------------------------------------------------------------------------- |
| Custom servers outside AWS      | Plausible if unaware of Shield Advanced’s AWS-only scope.                 |
| Shield Advanced covers Standard | Misleading – implies a cost relationship where none exists.               |
| Savings Plans not enabled       | Sounds like a cost-optimization issue but irrelevant for Shield Advanced. |

---

## 8. How to Approach Similar Questions

**Step-by-Step Strategy:**

1. **Scope Check**: Shield Advanced = AWS resources only (eliminate "external servers").
2. **Pricing Model**: Fixed $3,000/month (eliminate "Savings Plans").
3. **Multi-Account Context**: Always check for **Consolidated Billing** in cost-related questions.

**Red Flags:**

- "Outside AWS" → Immediately invalid for most AWS-native services.
- "Savings Plans" → Only applies to compute usage (EC2, Lambda, Fargate).

---

## 9. Technology Deep Dive

| Scenario                                  | Cost Impact                                  |
| ----------------------------------------- | -------------------------------------------- |
| 10 accounts without Consolidated Billing  | $30,000/month ($3k/account)                  |
| 10 accounts **with** Consolidated Billing | $3,000/month (for all accounts)              |
| On-premises servers + Shield Advanced     | $3,000/month + **no protection** for on-prem |

---

## 10. Summary Table

| Key Point            | Detail                                                        |
| -------------------- | ------------------------------------------------------------- |
| Shield Advanced Cost | $3,000/month per **organization** (with Consolidated Billing) |
| Protection Scope     | Only AWS resources (EC2, ALB, Global Accelerator, etc.)       |
| Savings Plans        | **Not applicable** – fixed monthly fee                        |

---

## 11. Concept Expansion / Key Facts

- **Why Consolidated Billing Matters**:

  - Without it, each account pays the full $3,000/month.
  - With it, all accounts in an Organization share **one $3,000 fee**.

- **Common Misconceptions**:

  - Myth: Shield Advanced protects hybrid environments. **Truth**: AWS-only.
  - Myth: Usage affects pricing. **Truth**: Flat fee regardless of traffic volume.

- **Exam Tip**:  
  Shield Advanced questions often test **scope** (AWS-only) and **billing** (Consolidated Billing requirement).

---

---

title: "SAA-Q102: Addressing Performance Lag During Predictable Traffic Spikes"
questionId: "saa-q102"
category: "Design High-Performing Architectures"
tags: ["saa-c03", "autoscaling", "performance", "scaling-policies", "scheduled-actions"]

---

### Question 'SAA-Q102'

How to address performance lag during predictable daily traffic spikes?

- Configure a lifecycle hook before peak traffic
- Configure a step scaling policy
- Configure a target tracking policy
- Configure a scheduled action to scale-out before peak traffic

---

## 1. In Simple English

Your application experiences **predictable** traffic spikes (e.g., daily at 9 AM). How do you proactively prevent performance slowdowns when the surge hits?

---

## 2. Verbiage & Realism

| Aspect      | Evaluation                                                                                  |
| ----------- | ------------------------------------------------------------------------------------------- |
| Clarity     | Clear – focuses on solving **predictable** (not reactive) scaling needs.                    |
| Realism     | Very realistic – daily traffic patterns (e.g., business hours) are common.                  |
| Terminology | Correct AWS terms: "lifecycle hook", "step scaling", "target tracking", "scheduled action". |

---

## 3. What the Question is Testing

| Concept                         | Why It Matters                                                                                   |
| ------------------------------- | ------------------------------------------------------------------------------------------------ |
| Predictable vs. Dynamic Scaling | Scheduled actions are for **known** patterns; scaling policies are for **unknown** fluctuations. |
| Proactive Scaling               | Distinguishes between **pre-warming** (scheduled) vs. **reactive** (metric-based) scaling.       |
| Scaling Tools                   | Tests knowledge of which AWS tool fits which use case.                                           |

---

## 4. Answer and Explanation

✅ **Correct Answer:** `Configure a scheduled action to scale-out before peak traffic`

| Option                     | Verdict      | Detailed Reasoning                                                                                               |
| -------------------------- | ------------ | ---------------------------------------------------------------------------------------------------------------- |
| **Lifecycle hook**         | ❌ Incorrect | Lifecycle hooks manage **instance state transitions** (e.g., scaling-in delays), not scaling triggers.           |
| **Step scaling policy**    | ❌ Incorrect | Step scaling reacts to **real-time metrics** (e.g., CPU > 70%), but causes lag for **predictable** spikes.       |
| **Target tracking policy** | ❌ Incorrect | Like step scaling, it’s **reactive** – adjusts capacity based on live metrics (e.g., request count).             |
| **Scheduled action**       | ✅ Correct   | **Proactively** scales resources **before** predicted traffic spikes (e.g., "Add 5 instances at 8:30 AM daily"). |

---

## 5. Final Answer

**Configure a scheduled action to scale-out before peak traffic**

---

## 6. Relevant AWS Documentation (Table)

| Resource                                                                                        | Key Insight                                                             |
| ----------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| [Scheduled Scaling](https://docs.aws.amazon.com/autoscaling/ec2/userguide/schedule_time.html)   | "Schedule scaling actions for predictable load changes."                |
| [Scaling Policy Types](https://docs.aws.amazon.com/autoscaling/ec2/userguide/scaling_plan.html) | Compares dynamic (metric-based) vs. scheduled scaling.                  |
| [Lifecycle Hooks](https://docs.aws.amazon.com/autoscaling/ec2/userguide/lifecycle-hooks.html)   | Explains their role in instance state management, not scaling triggers. |

---

## 7. Are the Options Tricky?

| Option               | Why It’s Tricky                                                                                |
| -------------------- | ---------------------------------------------------------------------------------------------- |
| Lifecycle hook       | Sounds related to scaling but is about **instance lifecycle management**.                      |
| Step/target tracking | Both are valid scaling policies but **reactive**, making them poor for **predictable** spikes. |
| Scheduled action     | Obvious if you know the difference between proactive/reactive scaling.                         |

---

## 8. How to Approach Similar Questions

**Key Strategy:**

- **Predictable** = Scheduled actions (e.g., "every weekday at 8 AM").
- **Unpredictable** = Dynamic scaling (step/target tracking).

**Red Flags:**

- "Performance lag" + "predictable" → Implies **proactive** scaling is needed.
- "Lifecycle hook" → Almost always a distractor in scaling questions.

---

## 9. Technology Deep Dive

| Method           | Use Case                                    | Latency Impact                               |
| ---------------- | ------------------------------------------- | -------------------------------------------- |
| Scheduled action | Known traffic patterns (e.g., Black Friday) | **Pre-warms** resources → minimal lag.       |
| Step scaling     | Sudden metric breaches (e.g., CPU spike)    | 1–5 minute lag while scaling reacts.         |
| Target tracking  | Steady metric adherence (e.g., 60% CPU)     | Faster than step scaling but still reactive. |

---

## 10. Summary Table

| Key Point                       | Detail                               |
| ------------------------------- | ------------------------------------ |
| Best for predictable spikes     | Scheduled actions                    |
| AWS Service Used                | EC2 Auto Scaling Groups              |
| Alternative for hybrid patterns | Scheduled + dynamic scaling combined |

---

## 11. Concept Expansion / Key Facts

- **Scheduled Actions**:

  - Set **minimum/desired capacity** at specific times (e.g., `desired=10` at 8 AM).
  - Supports **one-time** or **recurring** schedules (e.g., cron expressions).

- **Combining Strategies**:  
  Use scheduled actions **with** dynamic scaling to handle predictable spikes + unexpected surges.

- **Exam Tip**:  
  If the question mentions "predictable," "daily," or "known," **scheduled scaling** is likely the answer.

---

title: "SAA-Q103: Dedicated High-Performance Connection Between On-Premises and AWS"
questionId: "saa-q103"
category: "Design Secure and Resilient Architectures"
tags: ["saa-c03", "hybrid-architecture", "direct-connect", "vpn", "network-encryption"]

---

### Question 'SAA-Q103'

The engineering team at an e-commerce company wants to establish a dedicated, encrypted, low latency, and high throughput connection between its data center and AWS Cloud. The engineering team has set aside sufficient time to account for the operational overhead of establishing this connection. As a solutions architect, which of the following solutions would you recommend to the company?

- Use site-to-site VPN to establish a connection between the data center and AWS Cloud
- Use AWS Direct Connect to establish a connection between the data center and AWS Cloud
- Use AWS Direct Connect plus VPN to establish a connection between the data center and AWS Cloud
- Use VPC transit gateway to establish a connection between the data center and AWS Cloud

---

## 1. In Simple English

An e-commerce company needs a **fast, private, and secure** pipeline between their on-premises servers and AWS. They’re willing to invest time/resources to set it up properly. What’s the best solution?

---

## 2. Verbiage & Realism

| Aspect      | Evaluation                                                                               |
| ----------- | ---------------------------------------------------------------------------------------- |
| Clarity     | Clear – emphasizes **dedicated, encrypted, low-latency, high-throughput** requirements.  |
| Realism     | Very realistic – e-commerce often needs hybrid connectivity for inventory/order systems. |
| Terminology | Accurate AWS terms: "Direct Connect", "VPN", "Transit Gateway".                          |

---

## 3. What the Question is Testing

| Concept                     | Why It Matters                                                               |
| --------------------------- | ---------------------------------------------------------------------------- |
| Hybrid Connectivity Options | Understanding tradeoffs between VPN, Direct Connect, and combined solutions. |
| Performance vs. Security    | Direct Connect provides **throughput/latency**; VPN adds **encryption**.     |
| Operational Overhead        | Direct Connect + VPN requires more setup but meets all requirements.         |

---

## 4. Answer and Explanation

✅ **Correct Answer:** `Use AWS Direct Connect plus VPN to establish a connection between the data center and AWS Cloud`

| Option                   | Verdict      | Detailed Reasoning                                                                            |
| ------------------------ | ------------ | --------------------------------------------------------------------------------------------- |
| **Site-to-site VPN**     | ❌ Incorrect | VPN alone is encrypted but **higher latency/lower throughput** (internet-dependent).          |
| **Direct Connect only**  | ❌ Incorrect | Provides **dedicated low-latency** connection but **lacks native encryption**.                |
| **Direct Connect + VPN** | ✅ Correct   | Combines **dedicated bandwidth** (Direct Connect) with **encryption** (VPN over private VIF). |
| **Transit Gateway**      | ❌ Incorrect | Transit Gateway manages **VPC-to-VPC** traffic, not on-prem-to-AWS connections.               |

---

## 5. Final Answer

**Use AWS Direct Connect plus VPN to establish a connection between the data center and AWS Cloud**

---

## 6. Relevant AWS Documentation (Table)

| Resource                                                                                                                                            | Key Insight                                                            |
| --------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| [Direct Connect + VPN](https://docs.aws.amazon.com/whitepapers/latest/aws-vpc-connectivity-options/network-to-amazon-vpc-connectivity-options.html) | "For encrypted traffic over Direct Connect, use a VPN tunnel."         |
| [Direct Connect Features](https://aws.amazon.com/directconnect/features/)                                                                           | Highlights **consistent latency/throughput** but no native encryption. |
| [Transit Gateway Use Cases](https://docs.aws.amazon.com/vpc/latest/tgw/what-is-transit-gateway.html)                                                | Confirms it’s for **AWS-to-AWS** networking, not hybrid.               |

---

## 7. Are the Options Tricky?

| Option              | Why It’s Tricky                                                               |
| ------------------- | ----------------------------------------------------------------------------- |
| Site-to-site VPN    | Plausible if "encrypted" is overemphasized, but misses **performance** needs. |
| Direct Connect only | Tempting for performance but fails **encryption** requirement.                |
| Transit Gateway     | Sounds like a "gateway" for all traffic but is AWS-internal only.             |

---

## 8. How to Approach Similar Questions

**Step-by-Step Strategy:**

1. **List Requirements**: Here – dedicated, encrypted, low latency, high throughput.
2. **Map to AWS Services**:
   - Dedicated + performance = **Direct Connect**.
   - Encryption = **VPN** (IPsec).
3. **Eliminate Mismatches**:
   - VPN alone = slow.
   - Direct Connect alone = unencrypted.

**Red Flags:**

- "Transit Gateway" → Only for AWS resources.
- "Operational overhead" → Implies complex but justified solutions (e.g., Direct Connect + VPN).

---

## 9. Technology Deep Dive

| Solution             | Latency         | Throughput         | Encryption | Setup Complexity     |
| -------------------- | --------------- | ------------------ | ---------- | -------------------- |
| Site-to-site VPN     | High (internet) | Low (~1.25 Gbps)   | ✅         | Low                  |
| Direct Connect       | Low (dedicated) | High (10/100 Gbps) | ❌         | High                 |
| Direct Connect + VPN | Low             | High               | ✅         | Very High            |
| Transit Gateway      | N/A             | N/A                | N/A        | N/A (wrong use case) |

---

## 10. Summary Table

| Key Point             | Detail                                       |
| --------------------- | -------------------------------------------- |
| Best for Performance  | Direct Connect                               |
| Best for Security     | VPN                                          |
| Ideal Hybrid Solution | Direct Connect + VPN (encrypted private VIF) |
| Wrong Tool            | Transit Gateway (VPC-only)                   |

---

## 11. Concept Expansion / Key Facts

- **Why Combine Direct Connect + VPN?**

  - Direct Connect provides **private, high-speed** links but isn’t encrypted.
  - VPN adds **IPsec encryption** without sacrificing performance (since it runs over the private connection).

- **Operational Overhead Explained**:

  - Direct Connect requires **physical cross-connects** at an AWS Direct Connect Location.
  - VPN setup needs **Customer Gateway (CGW)** and **Virtual Private Gateway (VGW)** configuration.

- **Alternatives**:
  - For **cost-sensitive** use cases: VPN-only (tradeoffs accepted).
  - For **ultra-low latency**: Direct Connect + MACsec (Layer 2 encryption).

---

---

title: "SAA-Q104: Irreversible Amazon S3 Features"
questionId: "saa-q104"
category: "Design Cost-Optimized Architectures"
tags: ["saa-c03", "s3", "versioning", "bucket-properties", "aws-storage"]

---

### Question 'SAA-Q104'

Which of the following features of an Amazon S3 bucket can only be suspended once they have been enabled?

- Requester Pays
- Server Access Logging
- Static Website Hosting
- Versioning

---

## 1. In Simple English

Some S3 bucket features act like "one-way switches" - once turned on, you can't fully turn them off, only pause them. Which feature behaves this way?

---

## 2. Verbiage & Realism

| Aspect      | Evaluation                                                                   |
| ----------- | ---------------------------------------------------------------------------- |
| Clarity     | Crystal clear - asks about irreversible S3 features                          |
| Realism     | Very realistic - versioning suspension is a common operational consideration |
| Terminology | Perfect AWS terms: "Requester Pays", "Versioning", etc.                      |

## 3. What the Question is Testing

| Concept                 | Why It Matters                                                |
| ----------------------- | ------------------------------------------------------------- |
| S3 Feature Mutability   | Understanding which bucket properties can't be fully disabled |
| Versioning Implications | Knowing versioning can only be suspended, not removed         |
| Cost Considerations     | Versioning continues storage costs even when suspended        |

---

## 4. Answer and Explanation

✅ **Correct Answer:** `Versioning`

| Option                     | Verdict      | Detailed Reasoning                                                 |
| -------------------------- | ------------ | ------------------------------------------------------------------ |
| **Requester Pays**         | ❌ Incorrect | Can be fully disabled at any time                                  |
| **Server Access Logging**  | ❌ Incorrect | Can be turned on/off freely                                        |
| **Static Website Hosting** | ❌ Incorrect | Can be completely disabled                                         |
| **Versioning**             | ✅ Correct   | Once enabled, can only be **suspended** (existing versions remain) |

---

## 5. Final Answer

**Versioning**

---

## 6. Relevant AWS Documentation (Table)

| Resource                                                                                          | Key Insight                                                     |
| ------------------------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| [S3 Versioning](https://docs.aws.amazon.com/AmazonS3/latest/userguide/Versioning.html)            | "You can suspend versioning, but you cannot remove it entirely" |
| [Requester Pays](https://docs.aws.amazon.com/AmazonS3/latest/userguide/RequesterPaysBuckets.html) | Can be enabled/disabled freely                                  |
| [S3 Feature Comparison](https://aws.amazon.com/s3/features/)                                      | Shows mutable vs. immutable features                            |

---

## 7. Are the Options Tricky?

| Option                 | Why It's Tricky                                       |
| ---------------------- | ----------------------------------------------------- |
| Requester Pays         | Sounds like a billing change that might be locked     |
| Server Access Logging  | Feels like it might persist due to audit requirements |
| Static Website Hosting | Seems fundamental to bucket configuration             |

---

## 8. How to Approach Similar Questions

**Key Strategy:**

1. Look for features that fundamentally change how S3 stores data (versioning affects object storage at a core level)
2. Eliminate logging/billing features first (typically mutable)
3. Remember: Versioning is the only "one-way switch" in core S3 features

**Red Flags:**

- "Only be suspended" → Almost always points to versioning
- Features affecting storage mechanics → Higher chance of being irreversible

---

## 9. Technology Deep Dive

| Feature         | Can Be Disabled? | Persistent Effects            |
| --------------- | ---------------- | ----------------------------- |
| Versioning      | Only suspended   | Keeps all existing versions   |
| Requester Pays  | Yes              | No lingering effects          |
| Server Logging  | Yes              | Only affects new requests     |
| Website Hosting | Yes              | Removes all website endpoints |

---

## 10. Summary Table

| Key Point            | Detail                                                  |
| -------------------- | ------------------------------------------------------- |
| Irreversible Feature | Versioning                                              |
| Why Irreversible     | Maintains data integrity of existing versions           |
| Cost Impact          | Continue paying for stored versions even when suspended |

---

## 11. Concept Expansion / Key Facts

- **Versioning Mechanics:**

  - When suspended:
    - Stops creating new versions
    - Maintains all existing versions
    - Can be re-enabled later

- **Why AWS Designed It This Way:**

  - Prevents accidental data loss from versioning disablement
  - Ensures compliance with data retention policies

- **Exam Tip:**  
  If a question mentions "cannot be disabled" or "only suspended" for S3, think **versioning** first.

- **Real-World Impact:**  
  Companies often don't realize they'll keep paying for versions after suspension - a major cost consideration.

---

title: "SAA-Q105: Improving Resilience for Social Media Application Traffic Spikes"
questionId: "saa-q105"
category: "Design Resilient Architectures"
tags: ["saa-c03", "autoscaling", "aurora", "cloudfront", "global-accelerator"]

---

### Question 'SAA-Q105'

A company manages a multi-tier social media application that runs on EC2 instances behind an Application Load Balancer. The instances run in an EC2 Auto Scaling group across multiple Availability Zones and use an Amazon Aurora database. As a solutions architect, you have been tasked to make the application more resilient to periodic spikes in request rates. Which of the following solutions would you recommend for the given use-case? _(Select two)_

- Use AWS Shield
- Use Aurora Replica
- Use CloudFront distribution in front of the Application Load Balancer
- Use AWS Global Accelerator
- Use AWS Direct Connect

---

## 1. In Simple English

A social media app (with EC2 + ALB + Aurora) needs to handle sudden traffic surges better. What TWO changes would help most?

---

## 2. Verbiage & Realism

| Aspect      | Evaluation                                                     |
| ----------- | -------------------------------------------------------------- |
| Clarity     | Clear - focuses on resilience during traffic spikes            |
| Realism     | Very realistic - social media apps commonly face viral traffic |
| Terminology | Correct AWS terms for all services mentioned                   |

---

## 3. What the Question is Testing

| Concept                  | Why It Matters                                              |
| ------------------------ | ----------------------------------------------------------- |
| Scaling Frontend Traffic | CloudFront caches static content and reduces backend load   |
| Scaling Database Reads   | Aurora replicas handle read spikes without affecting writer |
| DDoS Protection          | Shield is irrelevant for performance scaling                |
| Network Optimization     | Global Accelerator helps but isn't primary for resilience   |

---

## 4. Answer and Explanation

✅ **Correct Answers:**  
`Use Aurora Replica`  
`Use CloudFront distribution in front of the Application Load Balancer`

| Option                 | Verdict      | Detailed Reasoning                                                 |
| ---------------------- | ------------ | ------------------------------------------------------------------ |
| **AWS Shield**         | ❌ Incorrect | Protects against DDoS but doesn't improve traffic spike resilience |
| **Aurora Replica**     | ✅ Correct   | Offloads read traffic from primary DB during spikes                |
| **CloudFront**         | ✅ Correct   | Caches static content and reduces load on backend instances        |
| **Global Accelerator** | ❌ Incorrect | Improves latency but doesn't directly help with scaling            |
| **Direct Connect**     | ❌ Incorrect | For dedicated network connection, not traffic scaling              |

---

## 5. Final Answers

**Use Aurora Replica**  
**Use CloudFront distribution in front of the Application Load Balancer**

---

## 6. Relevant AWS Documentation (Table)

| Resource                                                                                                     | Key Insight                                                              |
| ------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------ |
| [Aurora Read Replicas](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/Aurora.Replication.html) | "Read replicas handle read traffic without impacting writer performance" |
| [CloudFront for Dynamic Content](https://aws.amazon.com/cloudfront/dynamic-content/)                         | "Cache static assets and terminate SSL at edge"                          |
| [ALB + CloudFront](https://aws.amazon.com/premiumsupport/knowledge-center/cloudfront-distribution-alb/)      | Recommended pattern for scaling web applications                         |

---

## 7. Are the Options Tricky?

| Option             | Why It's Tricky                                            |
| ------------------ | ---------------------------------------------------------- |
| Global Accelerator | Sounds performance-related but is for routing optimization |
| AWS Shield         | Security seems related but doesn't address scaling         |
| Direct Connect     | Feels like "enterprise-grade" solution but wrong use case  |

---

## 8. How to Approach Similar Questions

**Step-by-Step Strategy:**

1. Identify bottleneck points (here: backend instances and database)
2. For frontend: Cache static content (CloudFront)
3. For database: Scale reads (Aurora Replicas)
4. Eliminate:
   - Security solutions (Shield)
   - Network solutions (Direct Connect/GA) unless latency is focus

**Red Flags:**

- "Periodic spikes" → Think scaling/caching, not security/networking
- "Multi-tier" → Need to protect both app and database layers

---

## 9. Technology Deep Dive

| Solution           | Impact on Traffic Spikes | Implementation Time         |
| ------------------ | ------------------------ | --------------------------- |
| Aurora Replica     | Scales read capacity     | Minutes (replica creation)  |
| CloudFront         | Reduces origin requests  | Hours (DNS propagation)     |
| Global Accelerator | 20% latency improvement  | Minutes (endpoint creation) |

---

## 10. Summary Table

| Layer    | Solution       | Benefit                            |
| -------- | -------------- | ---------------------------------- |
| Frontend | CloudFront     | Caches static content at edge      |
| Database | Aurora Replica | Scales read operations elastically |

---

## 11. Concept Expansion / Key Facts

- **CloudFront Advanced Use:**

  - Can cache even dynamic content with proper TTL settings
  - Supports Lambda@Edge for request/response manipulation

- **Aurora Replica Benefits:**

  - Can promote to writer if primary fails
  - Available in different regions for disaster recovery

- **Why Not Others:**

  - Shield: Only mitigates malicious traffic, not legitimate spikes
  - Direct Connect: Doesn't scale the application itself
  - Global Accelerator: Helps consistent performance but not capacity

- **Exam Tip:**  
  When seeing "traffic spikes" + "multi-tier", think:
  1. Frontend caching
  2. Database read scaling

---

title: "SAA-Q106: AWS Lambda Runtime Language Support"
questionId: "saa-q106"
category: "Design Serverless Architectures"
tags: ["saa-c03", "lambda", "serverless", "runtime", "programming-languages"]

---

### Question 'SAA-Q106'

An IT Company wants to move all the compute components of its AWS Cloud infrastructure into serverless architecture. Their development stack comprises a mix of backend programming languages and the company would like to explore the support offered by the AWS Lambda runtime for their programming languages stack. Can you identify the programming languages supported by the Lambda runtime? _(Select two)_

- Go
- C
- C#/.NET
- R
- PHP

---

## 1. In Simple English

Which two of these programming languages can you natively run on AWS Lambda without custom workarounds?

---

## 2. Verbiage & Realism

| Aspect      | Evaluation                                                                               |
| ----------- | ---------------------------------------------------------------------------------------- |
| Clarity     | Clear – focuses on native Lambda language support                                        |
| Realism     | Very realistic – companies often assess Lambda compatibility during serverless migration |
| Terminology | Correct AWS terms: "Lambda runtime", "serverless architecture"                           |

---

## 3. What the Question is Testing

| Concept                | Why It Matters                                          |
| ---------------------- | ------------------------------------------------------- |
| Lambda Native Runtimes | Understanding which languages AWS officially supports   |
| Serverless Migration   | Knowing language constraints when moving to Lambda      |
| Custom Runtime Option  | Awareness that unsupported languages require extra work |

---

## 4. Answer and Explanation

✅ **Correct Answers:**  
`C#/.NET`  
`Go`

| Option      | Verdict      | Detailed Reasoning                               |
| ----------- | ------------ | ------------------------------------------------ |
| **Go**      | ✅ Correct   | Native support since 2018 (Go 1.x)               |
| **C**       | ❌ Incorrect | Requires custom runtime (not natively supported) |
| **C#/.NET** | ✅ Correct   | Supports .NET Core 3.1, .NET 6, and .NET 7       |
| **R**       | ❌ Incorrect | Requires custom runtime or container image       |
| **PHP**     | ❌ Incorrect | Only via custom runtime (e.g., using Bref)       |

---

## 5. Final Answers

**C#/.NET**  
**Go**

---

## 6. Relevant AWS Documentation (Table)

| Resource                                                                             | Key Insight                                 |
| ------------------------------------------------------------------------------------ | ------------------------------------------- |
| [Lambda Runtimes](https://docs.aws.amazon.com/lambda/latest/dg/lambda-runtimes.html) | Lists all natively supported runtimes       |
| [Custom Runtimes](https://docs.aws.amazon.com/lambda/latest/dg/runtimes-custom.html) | Explains how to use unsupported languages   |
| [Lambda FAQs](https://aws.amazon.com/lambda/faqs/)                                   | Confirms Go and .NET are 1st-class citizens |

---

## 7. Are the Options Tricky?

| Option | Why It's Tricky                                              |
| ------ | ------------------------------------------------------------ |
| C      | Feels "close" to C++ (which is supported via custom runtime) |
| PHP    | Popular web language but not natively supported              |
| R      | Data science teams might assume support exists               |

---

## 8. How to Approach Similar Questions

**Step-by-Step Strategy:**

1. Recall Lambda's **natively supported** languages (Node.js, Python, Ruby, Java, Go, .NET, Custom Runtime)
2. Eliminate:
   - Languages needing custom runtimes (C, PHP, R)
   - Legacy languages not mentioned in AWS docs
3. Verify version support (e.g., .NET Core vs. .NET Framework)

**Red Flags:**

- "Supported by Lambda runtime" → Focus on **native** support, not workarounds
- "Select two" → Usually 1 obvious choice + 1 semi-obvious (Go is less known than .NET)

---

## 9. Technology Deep Dive

| Language | Native Support | Notes                                             |
| -------- | -------------- | ------------------------------------------------- |
| Go       | ✅ Since 2018  | Uses `go1.x` runtime                              |
| C#/.NET  | ✅ .NET Core+  | Excludes legacy .NET Framework                    |
| C        | ❌             | Requires custom runtime or Lambda Container Image |
| R        | ❌             | Must use custom runtime or Docker                 |
| PHP      | ❌             | Community-supported via Bref                      |

---

## 10. Summary Table

| Key Point            | Detail                                    |
| -------------------- | ----------------------------------------- |
| Natively Supported   | Go, C#/.NET, Python, Node.js, Java, Ruby  |
| Requires Custom Work | C, C++, PHP, R, Fortran                   |
| Container Option     | All languages via Lambda Container Images |

---

## 11. Concept Expansion / Key Facts

- **Why Native Matters:**

  - Automatic runtime updates from AWS
  - Built-in integration with Lambda services
  - No maintenance overhead

- **Custom Runtime Workflow:**

  1. Package language interpreter
  2. Implement Lambda runtime API
  3. Increased cold start times

- **Exam Tip:**  
  Newer languages (Go, Ruby) are less frequently tested than Python/Node.js

- **Real-World Consideration:**  
  Companies using PHP often use Bref (community project) instead of native solutions
