## 🧾 **AWS EC2 Auto Scaling Policies – Cheat Sheet**

| Policy Type           | Category  | Trigger Type        | Use Case / Best When...                                          | Notes                                                                    |
| --------------------- | --------- | ------------------- | ---------------------------------------------------------------- | ------------------------------------------------------------------------ |
| **Target Tracking**   | Dynamic   | Metric-based (auto) | You want to **maintain a target value** like 50% CPU             | 🔸 **"Thermostat" policy** – simple to set up, AWS adjusts automatically |
| **Step Scaling**      | Dynamic   | CloudWatch alarm    | You want to scale **gradually** based on metric thresholds       | 🔸 Define steps like CPU > 70% = +1, > 85% = +2                          |
| **Simple Scaling**    | Dynamic   | CloudWatch alarm    | You need **1 alarm → 1 action** with cooldown                    | 🔸 Legacy-style, now mostly replaced by **Step Scaling**                 |
| **Scheduled Scaling** | Scheduled | Time-based (cron)   | You expect **predictable demand changes** (e.g., business hours) | 🔸 Scaling happens **at exact time** regardless of metric                |

---

## 🔍 Quick Policy Selection Guide

| Goal                                     | Best Policy                |
| ---------------------------------------- | -------------------------- |
| Maintain 50% CPU                         | ✅ Target Tracking         |
| Add more instances in steps as CPU rises | ✅ Step Scaling            |
| Scale at 8am, shrink at 6pm              | ✅ Scheduled Scaling       |
| Trigger action from alarm with delay     | ⚠️ Simple Scaling (legacy) |

---

## 🧠 Additional Notes:

- **You can combine policies**:

  - Use **Target Tracking** for CPU
  - Use **Scheduled Scaling** for known business hours

- **Target Tracking** only allows **one policy per metric** per Auto Scaling Group

- **Scheduled Scaling** overrides dynamic scaling **at the scheduled time**, but metric-based policies **take over afterward**

---

### 🧠 Pro Tip for Exams:

If the question says:

- **“Maintain performance”** → Think **Target Tracking**
- **“Scale when CPU is > 70%”** → Think **Step Scaling**
- **“Increase capacity before peak hours”** → Think **Scheduled Scaling**
- **“CloudWatch alarm triggers action”** → Possibly **Simple**, but likely **Step Scaling**

---

### 🕓 **Scheduled Actions for Auto Scaling**

| 🔹 **Prompt**                                      | 🔸 **Answer**                                                                                                                                                                                                                                                           |
| -------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **When should you use scheduled scaling actions?** | Use when traffic is **predictable** or time-bound                                                                                                                                                                                                                       |
| **Use Cases**                                      | - 🕘 Business hours (e.g., 9AM–5PM)<br>- 📣 Marketing events / Black Friday<br>- 🗂️ Batch processing windows                                                                                                                                                            |
| **Configuration Example**                          | `bash<br>aws autoscaling put-scheduled-update-group-action \<br>  --auto-scaling-group-name my-asg \<br>  --scheduled-action-name scale-up-morning \<br>  --start-time "2025-05-19T08:00:00Z" \<br>  --min-size 4 \<br>  --max-size 10 \<br>  --desired-capacity 6<br>` |
| **Notes**                                          | - Scheduled scaling executes **regardless of metrics**<br>- Can be combined with dynamic scaling policies (target tracking resumes after schedule ends)                                                                                                                 |

---

### Exam Tip: Always choose over reactive policies when "predictable" is mentioned.

## Compare step scaling and target tracking policies.

| Feature      | Step Scaling                              | Target Tracking               |
| ------------ | ----------------------------------------- | ----------------------------- |
| **Response** | After CloudWatch alarms                   | Real-time metric tracking     |
| **Best For** | Complex tiered responses                  | Steady-state apps             |
| **Setup**    | Multiple adjustment tiers                 | Single target (e.g., 70% CPU) |
| **Example**  | Scale out when CPU >70%, add more if >85% | Maintain 60% CPU at all times |

## Exam Trap: Target tracking can overscale during sudden spikes.

---

### 📦 **Lifecycle Hooks**

| 🔹 **Prompt**                              | 🔸 **Answer**                                                                                                                                                                                                                       |
| ------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **What problem do lifecycle hooks solve?** | Add a buffer step between launching/terminating an instance and it entering/leaving service.                                                                                                                                        |
| **Use Cases**                              | - Install software before launch<br>- Drain connections before termination<br>- Capture logs before instance dies                                                                                                                   |
| **Configuration Example**                  | `bash<br>aws autoscaling put-lifecycle-hook \<br>  --lifecycle-hook-name "my-hook" \<br>  --auto-scaling-group-name "my-asg" \<br>  --lifecycle-transition "autoscaling:EC2_INSTANCE_LAUNCHING" \<br>  --heartbeat-timeout 300<br>` |
| **Key Limit**                              | 🔐 Max 50 lifecycle hooks per Auto Scaling Group                                                                                                                                                                                    |

---

### 📈 **Scaling Policy Triggers**

| **Metric / Scenario**        | **Best Scaling Policy**            | **Why / Real-World Context**                    |
| ---------------------------- | ---------------------------------- | ----------------------------------------------- |
| **CPU Utilization**          | 🎯 **Target Tracking**             | Maintain steady performance (e.g., app servers) |
| **SQS Queue Depth**          | 📊 **Step Scaling**                | Handle bursty traffic (e.g., worker tiers)      |
| **Request Count per Target** | 🎯 **Target Tracking**             | Scales based on ALB metrics (web-facing apps)   |
| **E-commerce Workloads**     | 🕓 **Scheduled + Target Tracking** | Predictable daily cycles with steady scaling    |
| **Data Processing Jobs**     | 📊 **Step Scaling**                | Handle dynamic input rates (queues, logs, etc.) |

---

### 💰 **Cost Optimization Scaling**

| **Prompt**                                                   | **Techniques / Concepts**                                                                           |
| ------------------------------------------------------------ | --------------------------------------------------------------------------------------------------- |
| **How to scale cost-effectively for unpredictable traffic?** |                                                                                                     |
| 🔹 **Warm Pools**                                            | Keep pre-initialized stopped EC2s to reduce launch latency & cost                                   |
| 🔹 **Mixed Instances**                                       | Use combination of Spot + On-Demand + multiple instance types                                       |
| 🔹 **Predictive Scaling**                                    | Use machine learning to forecast traffic & scale in advance                                         |
| 🔹 **Termination Policies**                                  | Prioritize which instances to terminate first (e.g., oldest, lowest AZ)                             |
| 💡 **Exam Tip**                                              | "Cost-effective" often hints at using **Spot Instances**, **Warm Pools**, or **Predictive Scaling** |

---

Let me know if you want this exported as a Markdown file, Notion-ready doc, or integrated with your quiz app!
