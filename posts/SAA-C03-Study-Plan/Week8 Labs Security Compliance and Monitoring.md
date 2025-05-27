**Good morning! ☀️** You're officially on **Week 8: Security, Compliance & Monitoring** — the final core topic before we hit the exam review! 🔐📊⚙️

Here are **all the hands-on labs** for Week 8, organized into a neat checklist format just like before:

---

## 🧪 Week 8 Labs: Security, Compliance & Monitoring ✅✅✅

| ✅ Task      | 🔐 **Lab 1: CloudWatch Monitoring**     | 📜 **Lab 2: AWS Config & Compliance**                  | 🛡 **Lab 3: Threat Detection with GuardDuty & WAF** |
| ------------ | --------------------------------------- | ------------------------------------------------------ | -------------------------------------------------- |
| **Goal**     | Monitor EC2/RDS metrics & logs          | Enforce compliance using AWS Config                    | Detect and block suspicious activity               |
| **Services** | Amazon CloudWatch                       | AWS Config                                             | GuardDuty, AWS WAF                                 |
| **Setup**    | Enable detailed monitoring for EC2      | Record all resources in region                         | Enable GuardDuty                                   |
|              | Create custom CloudWatch alarm          | Create Config Rule: e.g., EC2 Instance Type = t2.micro | Create WAF Web ACL and add rules                   |
|              | Send Alarm → Email notification (SNS)   | Get compliance report                                  | Simulate threats with GuardDuty findings           |
| **Test**     | Trigger CPU Alarm by stress-testing EC2 | Launch non-compliant instance                          | Use test script or attempt port scan               |
| **Cleanup**  | Delete alarm & SNS topic                | Remove Config rule if desired                          | Disable GuardDuty & delete Web ACL                 |

---

## 🔹 Lab 1: Amazon CloudWatch Monitoring

### ✅ Goal

Monitor EC2/RDS metrics and trigger an alarm on high CPU.

### 🧱 Steps

1️⃣ **Enable Monitoring**

- Go to EC2 → Select Instance → Monitoring tab → Enable Detailed Monitoring (optional)

2️⃣ **Create CloudWatch Alarm**

- Go to CloudWatch → Alarms → Create Alarm
- Metric: EC2 → Per-Instance Metrics → CPUUtilization
- Condition: Threshold > 60% for 5 minutes

3️⃣ **Set Notification**

- Create an SNS Topic: `cpu-alarm-topic`
- Add your email → Confirm the email subscription

4️⃣ **Trigger Alarm**

- On the EC2 instance, run:
  ```bash
  yes > /dev/null &
  ```
- Check CloudWatch → Alarms → See it go from `OK → ALARM`

✅ You’re monitoring your instance like a pro!

---

## 🔹 Lab 2: AWS Config & Compliance

### ✅ Goal

Track all resource changes and enforce compliance rules.

### 🧱 Steps

1️⃣ **Enable AWS Config**

- Go to AWS Config → Set up → Record all resources in this region

2️⃣ **Create a Rule**

- Example rule: `desired-instance-type`
- Rule checks if EC2 instances are of type `t2.micro`

3️⃣ **Test Non-Compliance**

- Launch an EC2 instance that’s **not** `t2.micro` (e.g., `t3.micro`)
- Go to Config → Rules → View compliance status

4️⃣ **View Timeline**

- View Resource Timeline to audit EC2 or S3 changes

✅ You now have a compliance engine watching over your infrastructure.

---

## 🔹 Lab 3: AWS GuardDuty + WAF

### ✅ Goal

Detect suspicious activity and set up basic firewall protection.

### 🧱 Steps

### A. **Enable GuardDuty**

- Go to GuardDuty → Enable
- Wait for data collection

### (Optional) Simulate a threat:

- Use AWS sample script to simulate threat events
  ```bash
  curl https://guardduty.amazonaws.com/sample-threat
  ```

### B. **Enable AWS WAF**

- Go to WAF → Create Web ACL
- Add to CloudFront or ALB (if available)
- Add rule: Block IPs or SQL Injection attempts

✅ Now you’re detecting, alerting, and defending your AWS environment.

---

## 🧹 Optional Cleanup Checklist

- Delete alarms & SNS topics
- Remove AWS Config rules
- Disable GuardDuty
- Remove WAF rules / ACLs

---

Let me know when you want to start Lab 1 or if you'd like a script/command for anything! 🔧
