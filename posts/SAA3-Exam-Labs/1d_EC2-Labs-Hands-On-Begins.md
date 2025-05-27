### ** EC2 Labs: Hands-On Learning Begins!**

Now that you've mastered IAM, let's **dive into EC2** with hands-on labs!  
We'll follow a structured approach to cover the key **EC2 topics** for the AWS **Solutions Architect Associate (SAA-C03)** exam.

---

### **🔹 EC2 Labs Plan**

1️⃣ **Launch & Connect to an EC2 Instance** ✅ _(Basic EC2 setup, key pairs, security groups)_  
2️⃣ **EC2 Security Groups & Network Access** _(Inbound/outbound rules, ping, SSH, HTTP access)_  
3️⃣ **Elastic IPs & Auto Scaling** _(Static IP, scaling instances automatically)_  
4️⃣ **Load Balancers & High Availability** _(Application Load Balancer, Target Groups)_  
5️⃣ **EBS Volumes & Snapshots** _(Attach, resize, and back up storage disks)_

---

### **🔹 EC2 Lab 1: Launch & Connect to an EC2 Instance**

✅ **Goal:**

- Launch an **EC2 instance** (Amazon Linux 2023)
- Connect via **SSH** from your Mac
- Verify network settings with **ping**

---

### **🔹 Step 1: Launch an EC2 Instance**

#### **📌 Option 1: AWS Console**

1️⃣ Navigate to **EC2 Dashboard** → Click **Launch Instance**  
2️⃣ **Choose an AMI**: Select **Amazon Linux 2023 (64-bit x86)**  
3️⃣ **Instance Type**: Select **t2.micro** (Free Tier)  
4️⃣ **Key Pair**: Choose an existing key or create a new one (Download `my-key.pem`)  
5️⃣ **Security Group**:

- Allow **SSH (22)** from **your IP**
- Allow **HTTP (80)** (Optional)  
  6️⃣ **Click "Launch"**, wait for instance to start

---

#### **📌 Option 2: AWS CLI (Faster)**

Run this from your Mac:

```bash
aws ec2 run-instances \
    --image-id ami-014d544cfef21b42d \
    --count 1 \
    --instance-type t2.micro \
    --key-name my-key \
    --security-groups default \
    --tag-specifications 'ResourceType=instance,Tags=[{Key=Name,Value=MyFirstEC2}]'
```

✅ This will launch an EC2 instance and name it **"MyFirstEC2"**.

---

### **🔹 Step 2: Find the Public IP**

Once your instance is running, find the **Public IP**:

```bash
aws ec2 describe-instances --query "Reservations[*].Instances[*].PublicIpAddress" --output text
```

Copy the IP **(e.g., `34.229.12.45`)** for SSH.

---

### **🔹 Step 3: SSH into EC2 from Mac**

```bash
ssh -i my-key.pem ec2-user@<Public-IP>
```

✅ **Expected Output:**

- You should see `[ec2-user@ip-172-31-XX-XX ~]$`, meaning SSH is working.

🚨 **Troubleshooting:**

- If `Permission denied (publickey)`, ensure **your key is correct** and the **security group allows SSH from your IP**.

---

### **🔹 Step 4: Verify Internet Connectivity from EC2**

Run this inside your EC2 instance:

```bash
ping -c 4 google.com
```

✅ **If it works**, the instance **has internet access**.  
🚨 **If it fails**, check the **security group outbound rules**.

---

### **🚀 Lab 1 Complete!**

You have:  
✅ Launched an **EC2 instance**  
✅ Connected via **SSH**  
✅ Verified **network connectivity**

---

### **🔹 Next Steps**

🔹 **Lab 2: EC2 Security Groups & Network Access** _(Test firewall rules, allow/block traffic)_  
🔹 **Do you want to keep this instance running or terminate it now?**

<h4>EC2 LAB 2</h4>

### **🚀 EC2 Lab 2: Security Groups & Network Access**

Now that you've launched and connected to an EC2 instance, let's test **Security Groups (firewall rules)**.

✅ **Goal:**

- Modify Security Groups to allow/deny traffic
- Test inbound & outbound network rules
- Understand how Security Groups control EC2 access

---

## **🔹 Step 1: Verify Your Current Security Group**

Before making changes, **list your current rules**:

```bash
aws ec2 describe-security-groups --group-names IAMLabSecurityGroup
```

✅ **Expected Output:**

- This should show **inbound & outbound rules** for your security group.
- You should see at least **port 22 (SSH) open**.

---

## **🔹 Step 2: Test ICMP (Ping) Rules**

📌 **Check if your EC2 instance can be pinged from your Mac**:

```bash
ping <Public-IP>
```

- ✅ **If it works**, ICMP is allowed.
- ❌ **If it fails**, the security group **blocks ping requests**.

📌 **To allow ICMP (ping), add this rule**:

```bash
aws ec2 authorize-security-group-ingress \
    --group-name IAMLabSecurityGroup \
    --protocol icmp \
    --port -1 \
    --cidr 0.0.0.0/0
```

Now **ping your instance again**. It should now respond.

---

## **🔹 Step 3: Block SSH (Port 22) & Test**

📌 **To block SSH (port 22), remove it from your security group**:

```bash
aws ec2 revoke-security-group-ingress \
    --group-name IAMLabSecurityGroup \
    --protocol tcp \
    --port 22 \
    --cidr 0.0.0.0/0
```

📌 **Now, try to SSH again**:

```bash
ssh -i my-key.pem ec2-user@<Public-IP>
```

❌ **Expected Result:**

- You should see **"Connection refused"** because **port 22 is blocked**.

📌 **Re-enable SSH (port 22) to restore access**:

```bash
aws ec2 authorize-security-group-ingress \
    --group-name IAMLabSecurityGroup \
    --protocol tcp \
    --port 22 \
    --cidr 0.0.0.0/0
```

✅ Now **SSH should work again**.

---

## **🔹 Step 4: Test HTTP Access (Port 80)**

📌 **Install a simple web server on your EC2 instance**:

```bash
sudo yum install -y httpd
sudo systemctl start httpd
sudo systemctl enable httpd
echo "Hello from EC2!" | sudo tee /var/www/html/index.html
```

📌 **Try accessing the Public IP in your browser**:  
🔗 Open **`http://<Public-IP>`** in Chrome/Safari.

❌ **If it fails**, add HTTP (port 80) to the security group:

```bash
aws ec2 authorize-security-group-ingress \
    --group-name IAMLabSecurityGroup \
    --protocol tcp \
    --port 80 \
    --cidr 0.0.0.0/0
```

✅ **Now, the webpage should load!** 🎉

---

### **🚀 Lab 2 Complete!**

You learned:
✅ **How to modify Security Groups**  
✅ **How to allow/deny SSH & ICMP traffic**  
✅ **How to serve a webpage from EC2**

---

### **🔹 Next Steps**

🔹 **Lab 3: Elastic IPs & Auto Scaling** _(Assign static IPs, prevent public IP changes, scale instances automatically)_  
🔹 **Do you want to terminate this instance before moving forward?**

Let me know how you’d like to proceed! 💪🔥

<h4>EC2 LAB 3</h4>
### **🚀 EC2 Lab 3: Elastic IPs & Auto Scaling**

Now that you've **nailed the EC2 concepts**, let’s get hands-on with **Elastic IPs & Auto Scaling**.

---

### **📌 Are We On Schedule?**

Yes! 🎯 **You’re on track with the study plan!**

✅ **Week 1 (IAM) →** Completed ✅ (Labs + Questions)  
✅ **Week 2 (EC2) →** **On Schedule** (Labs 1 & 2 done, EC2 questions solid)  
🔹 **Next Step:** **Elastic IPs & Auto Scaling (Lab 3)**  
📌 If we keep this pace, we’ll finish **Auto Scaling, Load Balancing & Lambda** before the month ends. 🚀

---

### **🔹 EC2 Lab 3: Elastic IPs & Auto Scaling**

✅ **Goal:**  
1️⃣ **Allocate & Attach an Elastic IP** (Prevent public IP changes)  
2️⃣ **Set Up Auto Scaling** (Ensure EC2 scales based on CPU load)

---

## **🔹 Step 1: Allocate & Attach an Elastic IP**

By default, when you stop/start an EC2 instance, it gets a **new public IP**. **Elastic IPs (EIPs)** solve this by assigning a **static IP**.

📌 **Allocate an Elastic IP**  
Run this command from **your Mac**:

```bash
aws ec2 allocate-address --domain vpc
```

✅ **Expected Output:**

```json
{
  "PublicIp": "44.202.15.123",
  "AllocationId": "eipalloc-0abc1234"
}
```

- Copy the **`AllocationId`** (`eipalloc-0abc1234`) for the next step.

📌 **Associate the Elastic IP to Your Instance**  
Replace `<Instance-ID>` and `<AllocationId>` with your values:

```bash
aws ec2 associate-address --instance-id <Instance-ID> --allocation-id <AllocationId>
```

✅ Now, your instance has a **permanent public IP**. Even if you stop/start, the IP **won’t change**.

---

## **🔹 Step 2: Set Up Auto Scaling**

Auto Scaling **automatically adds/removes EC2 instances** based on demand.

📌 **Create a Launch Template** (Defines EC2 settings)

```bash
aws ec2 create-launch-template \
    --launch-template-name MyAutoScalingTemplate \
    --version-description "Initial version" \
    --launch-template-data '{
        "ImageId":"ami-014d544cfef21b42d",
        "InstanceType":"t2.micro",
        "KeyName":"my-key"
    }'
```

✅ This template is used to launch new instances in Auto Scaling.

📌 **Create an Auto Scaling Group**

```bash
aws autoscaling create-auto-scaling-group \
    --auto-scaling-group-name MyScalingGroup \
    --launch-template LaunchTemplateName=MyAutoScalingTemplate,Version=1 \
    --min-size 1 --max-size 3 --desired-capacity 1 \
    --vpc-zone-identifier subnet-1234abcd
```

✅ This ensures **at least 1 instance running**, but can **scale up to 3**.

📌 **Attach a Scaling Policy (CPU-based scaling)**

```bash
aws autoscaling put-scaling-policy \
    --auto-scaling-group-name MyScalingGroup \
    --policy-name CPUAutoScalePolicy \
    --policy-type TargetTrackingScaling \
    --target-tracking-configuration '{
        "PredefinedMetricSpecification": {
            "PredefinedMetricType": "ASGAverageCPUUtilization"
        },
        "TargetValue": 50.0
    }'
```

✅ If CPU usage **goes above 50%**, Auto Scaling **adds instances**.

---

### **🚀 Lab 3 Complete!**

✅ **Elastic IP prevents public IP changes**  
✅ **Auto Scaling ensures EC2 scales with demand**

---

### **🔹 Next Steps**

- **Do you want to terminate this instance before moving forward?**
- **Continue to Load Balancing (Lab 4)**?

Let me know how you’d like to proceed! 💪🔥

<h5>📌 Regarding CPU Usage for Auto Scaling</h5>

✅ Yes, **reducing the threshold to 10% CPU usage** will **force scaling** faster.  
📌 Run this command to **update the policy**:

```bash
aws autoscaling put-scaling-policy \
    --auto-scaling-group-name MyScalingGroup \
    --policy-name CPUAutoScalePolicy \
    --policy-type TargetTrackingScaling \
    --target-tracking-configuration '{
        "PredefinedMetricSpecification": {
            "PredefinedMetricType": "ASGAverageCPUUtilization"
        },
        "TargetValue": 10.0
    }'
```

This way, **new instances will launch more aggressively**.

✅ **To artificially increase CPU load** inside EC2:

```bash
dd if=/dev/zero of=/dev/null &
```

This command will **generate CPU load** indefinitely.

To stop it:

```bash
pkill dd
```

---

<h4>EC2 LAB 4</h4>

### **🚀 EC2 Lab 4: Load Balancing (ALB & Target Groups)**

Now that we have **Elastic IPs & Auto Scaling**, let’s move on to **Load Balancing**!

---

### **🔹 EC2 Lab 4: Load Balancing (ALB & Target Groups)**

✅ **Goal:**  
1️⃣ **Create an Application Load Balancer (ALB)**  
2️⃣ **Register EC2 instances to a Target Group**  
3️⃣ **Test Load Balancing**

---

## **🔹 Step 1: Create a Target Group**

Target Groups **manage which EC2 instances the Load Balancer forwards traffic to**.

📌 **Create a Target Group**

```bash
aws elbv2 create-target-group \
    --name MyTargetGroup \
    --protocol HTTP \
    --port 80 \
    --vpc-id vpc-1234abcd
```

✅ This **creates a Target Group** for **EC2 instances running HTTP servers**.

---

## **🔹 Step 2: Attach EC2 Instances to Target Group**

📌 **Get the instance IDs**

```bash
aws ec2 describe-instances --query "Reservations[*].Instances[*].InstanceId" --output text
```

📌 **Register instances to the Target Group**

```bash
aws elbv2 register-targets \
    --target-group-arn arn:aws:elasticloadbalancing:us-east-1:123456789012:targetgroup/MyTargetGroup/abcd1234 \
    --targets Id=<Instance-ID>
```

✅ Now, the **Target Group** has an EC2 instance attached.

---

## **🔹 Step 3: Create an Application Load Balancer (ALB)**

📌 **Create the ALB**

```bash
aws elbv2 create-load-balancer \
    --name MyLoadBalancer \
    --subnets subnet-1234abcd subnet-5678efgh \
    --security-groups sg-0f1622dc083911d7c
```

✅ The **ALB is now set up** and waiting for connections.

---

## **🔹 Step 4: Create a Listener for HTTP Traffic**

📌 **Set up ALB to forward HTTP requests to the Target Group**

```bash
aws elbv2 create-listener \
    --load-balancer-arn arn:aws:elasticloadbalancing:us-east-1:123456789012:loadbalancer/app/MyLoadBalancer/abcd1234 \
    --protocol HTTP --port 80 \
    --default-actions Type=forward,TargetGroupArn=arn:aws:elasticloadbalancing:us-east-1:123456789012:targetgroup/MyTargetGroup/abcd1234
```

✅ Now, **incoming traffic on ALB (port 80) is routed to EC2 instances**.

---

### **🔹 Step 5: Test Load Balancing**

📌 **Get the ALB's DNS name**

```bash
aws elbv2 describe-load-balancers --query "LoadBalancers[*].DNSName" --output text
```

📌 **Open in a browser**

```bash
http://<ALB-DNS-Name>
```

✅ If configured correctly, you should see the **EC2 response page**.

---

### **🚀 Lab 4 Complete!**

✅ **EC2 instances now receive traffic through ALB**  
✅ **Auto Scaling adjusts EC2 instance count**  
✅ **Traffic is load balanced between instances**

---

### **🔹 Next Steps**

- **Do you want to terminate existing instances?**
- **Move on to EC2 Storage (EBS Volumes & Snapshots)?**

Let me know how you’d like to proceed! 💪🔥
