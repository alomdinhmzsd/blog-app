#### ✅**Lab 1: AWS Backup for EC2 & RDS** ✅

---

## 🧪 **Lab 1: Configure AWS Backup for EC2 & RDS**

### ✅ **Goal**

Automatically back up your EC2 and RDS resources using AWS Backup.

---

### 🧱 **Step-by-Step**

#### 1️⃣ **Go to AWS Backup Console**

🔗 [AWS Backup Console](https://console.aws.amazon.com/backup/)

---

#### 2️⃣ **Create a Backup Vault**

📦 A vault stores your backups (or use `Default` vault).

- Click **"Backup vaults"** → **Create Backup vault**
  - Name: `ec2-rds-backup-vault`
  - Encryption key: Default (AWS-managed key)
  - Click **Create backup vault**

✅ _Vault created_

---

#### 3️⃣ **Create a Backup Plan**

📅 Backup plans define when and how often backups run.

- Go to **"Backup plans"** → **Create backup plan**
- Choose **Build a new plan**
  - **Name:** `EC2-RDS-Backup-Plan`
  - **Rule Name:** `daily-backup`
    - Backup frequency: **Daily**
    - Backup window: Leave default
    - Transition to cold storage: Never
    - Retention: **7 days**
    - Backup vault: `ec2-rds-backup-vault`
- Click **Create plan**

✅ _Plan created_

---

#### 4️⃣ **Assign Resources**

🔗 Link EC2 and RDS to the plan

- On your plan page → Click **Assign resources**
  - Resource assignment name: `ec2-rds-assignment`
  - IAM role: `Default` (Auto-created)
  - Resource type: EC2, RDS
  - Choose your EC2 instance and RDS DB instance

✅ _Resources assigned_

---

#### 5️⃣ **Verify Backup**

⏳ Wait for the first backup (or manually trigger one):

- Go to **Backup jobs** tab
- You’ll see status as `PENDING` → `RUNNING` → `COMPLETED`
- Go to **Backup Vaults** → Select your vault → Click backup to inspect details

---

✅ _You’re now backing up EC2 and RDS securely with AWS Backup!_

#### Here’s what to expect when you restore an EC2 instance from a backup:

---

### ✅ **What Happens When You Restore EC2 via AWS Backup:**

| Feature               | Behavior                                                                         |
| --------------------- | -------------------------------------------------------------------------------- |
| **New Instance**      | ✅ A brand-new EC2 instance will be launched                                     |
| **Original Instance** | ❌ Not overwritten — your old instance remains unless you delete it              |
| **Instance Type**     | You can choose during restore (or use the same as the original)                  |
| **Key Pair**          | You must select an existing SSH key pair to access it                            |
| **Security Group**    | You must assign a security group (e.g., `WebAccess`)                             |
| **Public IP**         | Optional — enable if you want to SSH into it from outside                        |
| **Tags, Volumes**     | These can be preserved or modified                                               |
| **Billing**           | It's billed like a regular EC2 instance (free tier applies if t2.micro/t3.micro) |

---

### ✅ Steps (After Selecting the Backup):

1. Click **Restore**.
2. Enter a new name (or leave default).
3. Choose:
   - Instance type (e.g., `t2.micro`)
   - Key pair (must be one you own)
   - Security group (e.g., `WebAccess`)
   - Subnet/VPC (should match or be compatible with original)
   - Enable public IP (if needed)
4. Review & Confirm.
5. Wait 1–2 minutes for the instance to appear in EC2 console.

---

Once it’s ready, you can SSH in just like before:

```bash
ssh -i your-key.pem ec2-user@<public-ip>
```

---

Let me know if you'd like to walk through **RDS restore** next or finish verifying the new EC2.

Welcome back! 🙌 Glad to see you’re ready to tackle the next lab.

We’re jumping into <h5>**Week 7: Lab 2 – Route 53 Failover Routing** 🧭🌐</h5>

---

### ✅ **Lab 2: Test Route 53 Failover Routing**

**Goal:** Build a high availability DNS failover setup using **Route 53**, with one EC2 as Primary and another as Secondary.

---

### 🧱 **Step-by-Step Instructions**

#### 1️⃣ **Launch Two EC2 Instances**

- **Primary EC2**: e.g., `Primary-Server`
- **Secondary EC2**: e.g., `Secondary-Server`
- Use **Amazon Linux 2023** (Free tier `t2.micro`)
- Use the **same key pair** and **security group** allowing **HTTP (port 80)** and **SSH (port 22)**

---

#### 2️⃣ **Install Apache Web Server**

Login to both EC2s via SSH and run:

**Primary EC2:**

```bash
sudo yum install -y httpd
echo "Primary Server" | sudo tee /var/www/html/index.html
sudo systemctl enable httpd
sudo systemctl start httpd
```

**Secondary EC2:**

```bash
sudo yum install -y httpd
echo "Secondary Server" | sudo tee /var/www/html/index.html
sudo systemctl enable httpd
sudo systemctl start httpd
```

✅ Test by visiting each public IP in a browser – you should see “Primary Server” and “Secondary Server”.

---

#### 3️⃣ **Create Route 53 Hosted Zone**

If you don’t have a domain:

- Go to Route 53 → **Hosted Zones** → Create new hosted zone
- Choose a domain you own (or buy one via Route 53)

---

#### 4️⃣ **Create Health Check**

Go to **Route 53 → Health Checks**:

- Create Health Check:
  - **Endpoint type**: IP address
  - **IP address**: Primary EC2 public IP
  - **Port**: 80
  - **Path**: `/`
  - Leave other settings default

---

#### 5️⃣ **Create DNS Records**

Inside your Hosted Zone:

- **Primary A record**:

  - Name: `www` (or whatever you prefer)
  - Type: A record
  - Value: **Primary EC2 public IP**
  - Routing policy: **Failover**
  - Failover type: **Primary**
  - Associate Health Check: ✅

- **Secondary A record**:
  - Name: `www` (same as Primary)
  - Value: **Secondary EC2 public IP**
  - Routing policy: **Failover**
  - Failover type: **Secondary**

---

#### 6️⃣ **Test the Failover**

- Visit the DNS name in browser (`www.yourdomain.com`)
- You should see **“Primary Server”**
- Now simulate failure:
  ```bash
  sudo systemctl stop httpd
  ```
- Wait 1–2 minutes for Health Check to fail
- Refresh browser → should see **“Secondary Server”**

---

When you're ready, I can walk you through the **EC2 steps** first or help with creating the **Hosted Zone and Records** in Route 53.

Just let me know what you want to start with ✅
