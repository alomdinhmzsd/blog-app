### **🛠 Week 3: Networking – VPC, Route 53, CloudFront Hands-on Labs**

📌 **Goal:** Gain hands-on experience with AWS networking by configuring Virtual Private Clouds (VPCs), Domain Name System (DNS) routing, and Content Delivery Networks (CDN).  
📌 **Key Services:**  
✅ Amazon Virtual Private Cloud (VPC)  
✅ Amazon Route 53  
✅ Amazon CloudFront

---

## **🔹 Lab 1: Create a Custom VPC with Public & Private Subnets**

✅ **Scenario:** You are setting up a secure network architecture for a web application with a public-facing web server and a private database.

### **Step 1: Create a VPC**

1. Go to **AWS Console → VPC**.
2. Click **Create VPC** → Select **VPC and More**.
3. Enter:
   - **Name**: `MyCustomVPC`
   - **IPv4 CIDR Block**: `10.0.0.0/16`
   - **Tenancy**: Default
4. Click **Create VPC**.

### **Step 2: Create Public & Private Subnets**

1. In the **VPC Dashboard**, go to **Subnets** → Click **Create Subnet**.
2. Select **MyCustomVPC**.
3. Create **two subnets**:
   - **Public Subnet** (10.0.1.0/24) → Select **us-east-1a**.
   - **Private Subnet** (10.0.2.0/24) → Select **us-east-1b**.
4. Click **Create Subnet**.

### **Step 3: Create an Internet Gateway**

1. Go to **Internet Gateways** → Click **Create Internet Gateway**.
2. Name it `MyIGW` → Click **Create**.
3. Select `MyIGW` → Click **Attach to VPC** → Select `MyCustomVPC`.

### **Step 4: Configure the Route Table**

1. Go to **Route Tables** → Click **Create Route Table**.
2. Name it `PublicRouteTable`, select **MyCustomVPC**.
3. Click **Create** → Select **PublicRouteTable**.
4. Click **Edit Routes** → Add:
   - **Destination:** `0.0.0.0/0`
   - **Target:** `MyIGW`
5. Click **Save Routes**.
6. Go to **Subnet Associations** → Select **Public Subnet** → Click **Save**.

📌 **Key Takeaway:** Now, instances in the **public subnet** can connect to the internet, while instances in the **private subnet** are isolated.

---

## **🔹 Lab 2: Configure Security Groups & Network ACLs**

✅ **Scenario:** Secure your VPC by allowing HTTP (80) and SSH (22) access only from your IP.

### **Step 1: Create a Security Group**

1. Go to **EC2 Dashboard → Security Groups** → Click **Create Security Group**.
2. Name it `WebServerSG`, select **MyCustomVPC**.
3. Under **Inbound Rules**, add:
   - **Type:** HTTP → **Source:** `0.0.0.0/0`
   - **Type:** SSH → **Source:** `Your IP`
4. Click **Create Security Group**.

### **Step 2: Configure Network ACL**

1. Go to **VPC → Network ACLs** → Click **Create Network ACL**.
2. Name it `MyCustomACL`, select **MyCustomVPC**.
3. Go to **Inbound Rules** → Add:
   - **Rule 100:** Allow `HTTP` from `0.0.0.0/0`.
   - **Rule 101:** Allow `SSH` from `Your IP`.
4. Go to **Outbound Rules** → Allow **All Traffic** to `0.0.0.0/0`.

📌 **Key Takeaway:** Security Groups act as **firewalls per instance**, while Network ACLs act as **firewalls at the subnet level**.

---

## **🔹 Lab 3: Deploy a Route 53 Hosted Zone & Test Failover Routing**

✅ **Scenario:** Set up a **custom domain** for a web application with **automatic failover** to a backup EC2 instance.

### **Step 1: Register a Domain (Optional)**

1. Go to **Route 53 → Domains** → Click **Register a Domain**.
2. Choose a name (e.g., `myapp.com`) → Complete registration.

### **Step 2: Create a Hosted Zone**

1. Go to **Route 53 → Hosted Zones** → Click **Create Hosted Zone**.
2. Enter:
   - **Domain Name:** `myapp.com`
   - **Type:** Public Hosted Zone
3. Click **Create Hosted Zone**.

### **Step 3: Configure Failover Routing**

1. Go to **Route 53 → Record Sets** → Click **Create Record**.
2. Select **A Record** → Enter `www.myapp.com`.
3. Choose **Failover** → Configure:
   - **Primary Record:** Point to EC2 Instance 1.
   - **Backup Record:** Point to EC2 Instance 2.
4. Click **Create**.

📌 **Key Takeaway:** **Failover Routing** ensures that if your primary EC2 instance goes down, Route 53 redirects traffic to the backup.

---

## **🔹 Lab 4: Set Up CloudFront for an S3 Static Website**

✅ **Scenario:** Speed up a static website by using **CloudFront CDN** to cache content at edge locations worldwide.

### **Step 1: Upload Website to S3**

1. Go to **S3 → Create Bucket**.
2. Name it `my-static-site` → Enable **Public Access**.
3. Upload `index.html`.

### **Step 2: Configure S3 as a Static Website**

1. Go to **Properties** → Click **Static Website Hosting**.
2. Select **Use this bucket to host a website**.
3. Enter:
   - **Index document:** `index.html`
4. Click **Save**.

### **Step 3: Deploy CloudFront**

1. Go to **CloudFront → Create Distribution**.
2. Select **Origin Domain** as `my-static-site.s3.amazonaws.com`.
3. Enable **OAI (Origin Access Identity)** for S3 security.
4. Click **Create Distribution**.

### **Step 4: Test CloudFront**

1. Copy **CloudFront URL** (e.g., `https://d1234567890.cloudfront.net`).
2. Open it in a browser → Your **static website** should load.

📌 **Key Takeaway:** CloudFront **caches content** for faster delivery while securing S3 access.

---

### **🔹 Summary of Week 3 Hands-on Labs**

| **Lab #** | **Networking Task**                               | **Concept**                                         |
| --------- | ------------------------------------------------- | --------------------------------------------------- |
| Lab 1     | Create a Custom VPC with Public & Private Subnets | Secure AWS networking                               |
| Lab 2     | Configure Security Groups & Network ACLs          | Control traffic at **instance** & **subnet** levels |
| Lab 3     | Deploy a Route 53 Hosted Zone & Test Failover     | DNS resolution & failover routing                   |
| Lab 4     | Set Up CloudFront for an S3 Static Website        | Speed up websites with **CDN caching**              |

✅ **What’s Next?**

- 🏗️ Try these labs in AWS Free Tier.
- 📩 Let me know if you have any issues!
- 🚀 Once you're ready, we move to **Week 4: Storage (S3, EBS, EFS, FSx).**

<h5>
Week3 Netwroking VPC Route 53 Cloudfront CLI
</h5>
That’s a great idea! Doing these **Week 3 Labs in Boto3** will give you a deeper understanding of **AWS automation** and **infrastructure as code**. I’ll provide **Boto3 scripts for each lab**, so you can practice both **manual AWS Console setup** and **automation with Python**.

---

## **🛠 Week 3: Networking Labs with Boto3**

📌 **Goal:** Automate AWS Networking tasks with **Boto3** in Python.  
📌 **Prerequisites:**
✅ Install **Boto3** (`pip install boto3`).  
✅ Configure AWS CLI (`aws configure`).  
✅ IAM user must have **VPC, EC2, Route 53, and CloudFront permissions**.

---

## **🔹 Lab 1 (Boto3): Create a VPC with Public & Private Subnets**

✅ **Scenario:** Automate VPC creation with Python, including **public/private subnets and an internet gateway**.

```python
import boto3

# Initialize the Boto3 client
ec2 = boto3.client("ec2")

# Step 1: Create VPC
response = ec2.create_vpc(CidrBlock="10.0.0.0/16")
vpc_id = response["Vpc"]["VpcId"]
print(f"✅ Created VPC: {vpc_id}")

# Enable DNS support
ec2.modify_vpc_attribute(VpcId=vpc_id, EnableDnsSupport={"Value": True})
ec2.modify_vpc_attribute(VpcId=vpc_id, EnableDnsHostnames={"Value": True})

# Step 2: Create Subnets
subnet1 = ec2.create_subnet(VpcId=vpc_id, CidrBlock="10.0.1.0/24", AvailabilityZone="us-east-1a")  # Public Subnet
subnet2 = ec2.create_subnet(VpcId=vpc_id, CidrBlock="10.0.2.0/24", AvailabilityZone="us-east-1b")  # Private Subnet
public_subnet_id = subnet1["Subnet"]["SubnetId"]
private_subnet_id = subnet2["Subnet"]["SubnetId"]
print(f"✅ Created Public Subnet: {public_subnet_id}")
print(f"✅ Created Private Subnet: {private_subnet_id}")

# Step 3: Create Internet Gateway & Attach to VPC
igw = ec2.create_internet_gateway()
igw_id = igw["InternetGateway"]["InternetGatewayId"]
ec2.attach_internet_gateway(VpcId=vpc_id, InternetGatewayId=igw_id)
print(f"✅ Created and Attached IGW: {igw_id}")

# Step 4: Create a Route Table and Associate with Public Subnet
route_table = ec2.create_route_table(VpcId=vpc_id)
rtb_id = route_table["RouteTable"]["RouteTableId"]
ec2.create_route(RouteTableId=rtb_id, DestinationCidrBlock="0.0.0.0/0", GatewayId=igw_id)
ec2.associate_route_table(SubnetId=public_subnet_id, RouteTableId=rtb_id)
print(f"✅ Created Route Table: {rtb_id} and associated with Public Subnet")

# Make Public Subnet Auto-assign Public IPs
ec2.modify_subnet_attribute(SubnetId=public_subnet_id, MapPublicIpOnLaunch={"Value": True})
print(f"✅ Public subnet will now auto-assign public IPs")
```

📌 **Key Takeaways:**

- **Creates a VPC, subnets, internet gateway, and route table.**
- **Public subnet auto-assigns public IPs.**
- **Private subnet remains isolated (no IGW connection).**

---

## **🔹 Lab 2 (Boto3): Configure Security Groups & Network ACLs**

✅ **Scenario:** Secure the VPC using **Security Groups (SGs)** and **Network ACLs** with Python.

```python
# Step 1: Create Security Group
sg_response = ec2.create_security_group(
    GroupName="WebServerSG",
    Description="Allow HTTP and SSH",
    VpcId=vpc_id,
)
sg_id = sg_response["GroupId"]
print(f"✅ Created Security Group: {sg_id}")

# Step 2: Add Inbound Rules (Allow HTTP & SSH)
ec2.authorize_security_group_ingress(
    GroupId=sg_id,
    IpPermissions=[
        {"IpProtocol": "tcp", "FromPort": 80, "ToPort": 80, "IpRanges": [{"CidrIp": "0.0.0.0/0"}]},
        {"IpProtocol": "tcp", "FromPort": 22, "ToPort": 22, "IpRanges": [{"CidrIp": "YOUR_IP/32"}]},  # Replace YOUR_IP
    ],
)
print(f"✅ Security Group Rules Added: HTTP (80) & SSH (22)")

# Step 3: Create Network ACL
nacl_response = ec2.create_network_acl(VpcId=vpc_id)
nacl_id = nacl_response["NetworkAcl"]["NetworkAclId"]
print(f"✅ Created Network ACL: {nacl_id}")

# Step 4: Allow HTTP & SSH in Network ACL
ec2.create_network_acl_entry(NetworkAclId=nacl_id, RuleNumber=100, Protocol="6", CidrBlock="0.0.0.0/0", PortRange={"From": 80, "To": 80}, Egress=False, RuleAction="allow")
ec2.create_network_acl_entry(NetworkAclId=nacl_id, RuleNumber=101, Protocol="6", CidrBlock="YOUR_IP/32", PortRange={"From": 22, "To": 22}, Egress=False, RuleAction="allow")

print(f"✅ Network ACL configured to allow HTTP and SSH")
```

📌 **Key Takeaways:**

- **Security Groups control access per instance** (firewall at the instance level).
- **Network ACLs control access at the subnet level** (firewall for the entire subnet).

---

## **🔹 Lab 3 (Boto3): Deploy a Route 53 Hosted Zone & Set Failover**

✅ **Scenario:** Automate **Route 53** domain setup & failover routing.

```python
route53 = boto3.client("route53")

# Step 1: Create a Hosted Zone
response = route53.create_hosted_zone(
    Name="myapp.com",
    CallerReference="myapp-123456",
)
hosted_zone_id = response["HostedZone"]["Id"]
print(f"✅ Created Route 53 Hosted Zone: {hosted_zone_id}")

# Step 2: Create Primary & Failover Records
route53.change_resource_record_sets(
    HostedZoneId=hosted_zone_id,
    ChangeBatch={
        "Changes": [
            {
                "Action": "CREATE",
                "ResourceRecordSet": {
                    "Name": "www.myapp.com",
                    "Type": "A",
                    "SetIdentifier": "Primary",
                    "Failover": "PRIMARY",
                    "TTL": 60,
                    "ResourceRecords": [{"Value": "PRIMARY_EC2_IP"}],  # Replace with EC2 Public IP
                },
            },
            {
                "Action": "CREATE",
                "ResourceRecordSet": {
                    "Name": "www.myapp.com",
                    "Type": "A",
                    "SetIdentifier": "Backup",
                    "Failover": "SECONDARY",
                    "TTL": 60,
                    "ResourceRecords": [{"Value": "BACKUP_EC2_IP"}],  # Replace with Backup EC2 Public IP
                },
            },
        ]
    },
)
print(f"✅ Created Route 53 Failover Routing for www.myapp.com")
```

📌 **Key Takeaways:**

- **Primary & secondary EC2 instances are used for failover.**
- **Route 53 automatically switches traffic if the primary instance fails.**

---

## **🔹 Lab 4 (Boto3): Deploy CloudFront for an S3 Static Website**

✅ **Scenario:** Automate **CloudFront** setup for an S3-hosted static website.

```python
cloudfront = boto3.client("cloudfront")

# Step 1: Create a CloudFront Distribution
response = cloudfront.create_distribution(
    DistributionConfig={
        "CallerReference": "myapp-123",
        "Origins": [{"Id": "S3-myapp", "DomainName": "my-static-site.s3.amazonaws.com"}],
        "DefaultRootObject": "index.html",
        "Enabled": True,
    }
)
dist_id = response["Distribution"]["Id"]
print(f"✅ Created CloudFront Distribution: {dist_id}")
```

📌 **Key Takeaways:**

- **CloudFront accelerates S3 content delivery.**
- **Automated deployment via Boto3 simplifies CDN setup.**

---

### **📌 What’s Next?**

- ✅ Try these **Boto3 labs** and let me know if you hit any issues!
- 🚀 Next, we move on to **Week 4 (S3, EBS, EFS, FSx Labs in AWS Console & Boto3).**
