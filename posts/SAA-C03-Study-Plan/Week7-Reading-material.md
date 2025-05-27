Great! For **Week 7: High Availability (HA), Disaster Recovery & Cost Optimization**, here’s a curated list of key topics with links to the most relevant AWS documentation. These are the **priority readings** for your AWS Certified Solutions Architect – Associate (SAA-C03) exam prep:

---

### 🔐 **High Availability (HA) & Fault Tolerance**

1. **[Regions and Availability Zones (AZs)](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-regions-availability-zones.html)**

   - Understand how to design multi-AZ/multi-region deployments for resilience.

2. **[Elastic Load Balancing (ALB/NLB)](https://docs.aws.amazon.com/elasticloadbalancing/latest/userguide/introduction.html)**

   - Focus on cross-zone load balancing and fault tolerance.

3. **[Auto Scaling Groups (ASG)](https://docs.aws.amazon.com/autoscaling/ec2/userguide/what-is-amazon-ec2-auto-scaling.html)**

   - Emphasize using health checks, multi-AZ scaling, and replacement of failed instances.

4. **[RDS Multi-AZ vs. Read Replica](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Concepts.MultiAZ.html)**

   - Know the difference between high availability and scalability in RDS.

5. **[Route 53 Failover Routing](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/routing-policy.html#routing-policy-failover)**
   - Read how DNS failover works for disaster recovery.

---

### 💾 **Disaster Recovery (DR)**

1. **[AWS Backup](https://docs.aws.amazon.com/aws-backup/latest/devguide/whatisbackup.html)**

   - Covers centralized backup across services, lifecycle policies, and cross-region backup.

2. **[Disaster Recovery Strategies](https://docs.aws.amazon.com/whitepapers/latest/disaster-recovery-workloads-on-aws/disaster-recovery-workloads-on-aws.html)** (Whitepaper)

   - Focus on 4 strategies:
     - Backup & Restore
     - Pilot Light
     - Warm Standby
     - Multi-Site Active/Active

3. **[Recovery Time Objective (RTO) vs Recovery Point Objective (RPO)](https://docs.aws.amazon.com/whitepapers/latest/disaster-recovery-workloads-on-aws/rto-and-rpo.html)**
   - Important exam concept—know how to pick the right DR strategy.

---

### 💰 **Cost Optimization**

1. **[AWS Budgets](https://docs.aws.amazon.com/cost-management/latest/userguide/budgets-managing-costs.html)**

   - Focus on alerts and enforcing limits.

2. **[Cost Explorer](https://docs.aws.amazon.com/cost-management/latest/userguide/ce-what-is.html)**

   - Know how to analyze past costs and usage trends.

3. **[Savings Plans vs. Reserved Instances](https://docs.aws.amazon.com/savingsplans/latest/userguide/what-is-savings-plans.html)**

   - Understand how to save costs on EC2, Lambda, Fargate.

4. **[Trusted Advisor – Cost Optimization Checks](https://docs.aws.amazon.com/awssupport/latest/user/trusted-advisor.html)**
   - Learn what trusted advisor recommends to reduce cost.

---

Once you read these, you’ll be in great shape to tackle the labs tomorrow.

Let me know when you're ready to go hands-on, and I’ll walk you through each lab step-by-step. ✅
