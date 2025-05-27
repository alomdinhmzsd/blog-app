### **🛠 Week 4: AWS Storage Labs (S3, EBS, EFS, FSx)**

📌 **Goal:** Gain hands-on experience with AWS **storage solutions** (object, block, and file storage).  
📌 **Key Services:**  
✅ **Amazon S3** – Object storage for any data  
✅ **Amazon EBS** – Block storage for EC2  
✅ **Amazon EFS** – Scalable file storage  
✅ **Amazon FSx** – Managed file systems

---

## **🔹 Lab 1: Amazon S3 – Create a Bucket & Upload Files**

✅ **Scenario:** Store and manage files in **Amazon S3** using AWS Console & Boto3.

### **Step 1: Create an S3 Bucket (AWS Console)**

1. Go to **AWS Console → S3**.
2. Click **Create bucket**.
3. **Enter Bucket Name** (must be globally unique, e.g., `my-boto3-bucket-12345`).
4. Select a **region** (e.g., `us-east-1`).
5. Keep **Block all public access** **enabled**.
6. Click **Create Bucket**.

### **Step 2: Upload a File**

1. Click the **bucket name**.
2. Click **Upload** → Select a file (`example.txt`).
3. Click **Upload**.

---

### **🛠️ Step 3: Create an S3 Bucket (Boto3)**

```python
import boto3

s3 = boto3.client("s3")

bucket_name = "my-boto3-bucket-12345"  # Must be globally unique

# Create S3 bucket
s3.create_bucket(
    Bucket=bucket_name,
    CreateBucketConfiguration={"LocationConstraint": "us-east-1"},
)

print(f"✅ Created S3 bucket: {bucket_name}")
```

### **🛠️ Step 4: Upload a File to S3 (Boto3)**

```python
file_name = "example.txt"
s3.upload_file(file_name, bucket_name, "uploaded_example.txt")
print(f"✅ Uploaded {file_name} to {bucket_name}")
```

---

## **🔹 Lab 2: Amazon EBS – Create & Attach a Volume**

✅ **Scenario:** Create an **EBS volume**, attach it to an EC2 instance, and format it.

### **Step 1: Create an EBS Volume (AWS Console)**

1. Go to **EC2 → Volumes** → **Create Volume**.
2. Select **10 GiB, gp3 (General Purpose SSD)**.
3. Select **Availability Zone** where your EC2 instance is running.
4. Click **Create Volume**.

### **Step 2: Attach EBS to EC2**

1. Select the volume → Click **Actions → Attach Volume**.
2. Select **your EC2 instance**.
3. Attach as **`/dev/xvdf`**.

### **Step 3: Format & Mount EBS on EC2**

```bash
lsblk  # Check if volume is attached
sudo mkfs -t ext4 /dev/xvdf  # Format volume
sudo mkdir /mnt/ebs
sudo mount /dev/xvdf /mnt/ebs
df -h  # Verify mount
```

---

### **🛠️ Step 4: Create & Attach an EBS Volume (Boto3)**

```python
ec2 = boto3.client("ec2")

# Create a new EBS volume
response = ec2.create_volume(
    AvailabilityZone="us-east-1a",
    Size=10,
    VolumeType="gp3",
)
volume_id = response["VolumeId"]
print(f"✅ Created EBS Volume: {volume_id}")

# Attach Volume to EC2 Instance
instance_id = "i-0123456789abcdef0"  # Replace with your EC2 instance ID
ec2.attach_volume(
    VolumeId=volume_id,
    InstanceId=instance_id,
    Device="/dev/xvdf",
)
print(f"✅ Attached {volume_id} to {instance_id}")
```

---

## **🔹 Lab 3: Amazon EFS – Create & Mount a File System**

✅ **Scenario:** Create a **shared file system** for multiple EC2 instances.

### **🔹 Step 1: Create an EFS File System**

1. **Go to AWS Console → EFS → Create File System**.
2. **Select the correct VPC** (same as EC2).
3. Under **Network → Mount Targets**, ensure:
   - There is **a mount target for each AZ** you plan to use.
   - The **Security Group allows NFS (port 2049)**.
4. Click **Create File System**.

---

### **🔹 Step 2: Configure Security Groups**

1. **Find the Security Group attached to the EFS mount targets.**
2. **Edit the inbound rules**:
   - **Allow inbound NFS (port 2049) from the EC2 security group.**
   - **(Best Practice)**: Instead of `0.0.0.0/0`, allow **only the EC2 security group**.
3. **Edit the outbound rules**:
   - Allow **all outbound traffic** (or at least NFS traffic).

---

### **🔹 Step 3: Ensure Network ACLs Allow NFS**

1. **Go to AWS Console → VPC → Network ACLs**.
2. **Find the ACL attached to the EFS and EC2 subnets.**
3. **Add inbound rules:**
   - **Allow NFS (port 2049) from your EC2 subnet.**
4. **Add outbound rules:**
   - **Allow all traffic to your EC2 subnet.**

---

### **🔹 Step 4: Install the EFS Client on EC2**

1. **Connect to your EC2 instance via SSH.**
2. **Install the EFS client (Amazon Linux/AL2):**
   ```bash
   sudo yum install -y amazon-efs-utils
   ```
   _(For Ubuntu/Debian, use `sudo apt install nfs-common`)_

---

### **🔹 Step 5: Mount the EFS Volume**

1. **Create a mount directory (if it doesn’t exist):**
   ```bash
   sudo mkdir -p /mnt/efs
   ```
2. **Mount EFS using the correct DNS name:**

   ```bash
   sudo mount -t efs fs-xxxxxxxx:/ /mnt/efs
   ```

   _(Replace `fs-xxxxxxxx` with your actual EFS ID)_

3. **If mount fails, force NFS 4.1:**
   ```bash
   sudo mount -t nfs4 -o nfsvers=4.1 fs-xxxxxxxx.efs.us-east-1.amazonaws.com:/ /mnt/efs
   ```
4. **Verify the mount:**
   ```bash
   df -h
   ```

---

### **🔹 Step 6: Automatically Mount EFS on Reboot (Optional)**

To ensure **EFS mounts automatically on reboot**, add this to `/etc/fstab`:

```bash
fs-xxxxxxxx.efs.us-east-1.amazonaws.com:/ /mnt/efs efs defaults,_netdev 0 0
```

✔ Now, **EFS will mount on startup**.

---

## **🚀 Summary: Updated Steps for Reliable Mounting**

✔ **Step 1**: Create EFS **in the same VPC** as EC2, add mount targets.  
✔ **Step 2**: **Ensure Security Groups** allow NFS (`2049`) **from EC2.**  
✔ **Step 3**: **Check Network ACLs** (must allow NFS traffic).  
✔ **Step 4**: **Install `amazon-efs-utils` on EC2**.  
✔ **Step 5**: **Mount EFS (`sudo mount -t efs ...`)**.  
✔ **Step 6** (Optional): **Add to `/etc/fstab` for auto-mount.**

---

### **🔥 Try this next time and let me know if it's smooth sailing!** 🚀

---

### **🛠️ Step 3: Create an EFS File System (Boto3)**

---

```python

import boto3
import time

# Initialize clients
efs = boto3.client("efs")
ec2 = boto3.client("ec2")
route53 = boto3.client("route53")

# Define parameters
efs_name = "MyEFS"
security_group_id = "sg-094585c586ab9fc46"  # Replace with your correct SG ID
vpc_id = "vpc-0a9762a6eed9c7bf1"  # Replace with your correct VPC ID

# Step 1: Create EFS File System
response = efs.create_file_system(
    CreationToken=efs_name,
    PerformanceMode="generalPurpose",
    Encrypted=True,
    ThroughputMode="elastic",
)
efs_id = response["FileSystemId"]
print(f"✅ Created EFS File System: {efs_id}")

# Wait for EFS to be ready
time.sleep(30)

# Step 2: Get all subnets in the VPC
subnets = ec2.describe_subnets(Filters=[{"Name": "vpc-id", "Values": [vpc_id]}])[
    "Subnets"
]

# Step 3: Create Mount Targets in each subnet
for subnet in subnets:
    az = subnet["AvailabilityZone"]
    subnet_id = subnet["SubnetId"]

    print(f"🔹 Creating Mount Target in {az} ({subnet_id})...")

    efs.create_mount_target(
        FileSystemId=efs_id,
        SubnetId=subnet_id,
        SecurityGroups=[security_group_id],
    )

print("✅ All mount targets created.")

# Step 4: Verify mount targets
time.sleep(20)

# Get the list of mount targets
mount_targets = efs.describe_mount_targets(FileSystemId=efs_id)

# Fetch AZ information by looking up the subnet
for target in mount_targets["MountTargets"]:
    subnet_id = target["SubnetId"]

    # Fetch AZ for the subnet
    subnet_info = ec2.describe_subnets(SubnetIds=[subnet_id])
    az = subnet_info["Subnets"][0]["AvailabilityZone"]

    print(f"✔ Mount Target in {az} - {target['MountTargetId']}")


# DONE ✅
print("🎉 EFS Setup Complete!")

```

## **🔹 Lab 4: Amazon FSx – Create a Managed File System**

✅ **Scenario:** Set up an **FSx for Windows File Server**.

### **Step 1: Create FSx (AWS Console)**

1. Go to **AWS Console → FSx → Create File System**.
2. Select **FSx for Windows File Server**.
3. Choose **Deployment Type: Single-AZ**.
4. Click **Create File System**.

### **Step 2: Connect to FSx from Windows**

1. Run `net use`:
   ```cmd
   net use Z: \\fs-xxxxxx.aws-region.amazonaws.com\share
   ```

---

### **🛠️ Step 3: Create FSx File System (Boto3)**

```python
fsx = boto3.client("fsx")

response = fsx.create_file_system(
    FileSystemType="WINDOWS",
    StorageCapacity=300,
    SubnetIds=["subnet-xxxxxx"],  # Replace with your subnet
)
fsx_id = response["FileSystem"]["FileSystemId"]
print(f"✅ Created FSx File System: {fsx_id}")
```

---

## **🔹 Summary of Week 4 Hands-on Labs**

| **Lab #** | **AWS Storage Task**               | **Concept**                 |
| --------- | ---------------------------------- | --------------------------- |
| Lab 1     | Create an S3 bucket & upload files | Object storage              |
| Lab 2     | Create & attach an EBS volume      | Block storage for EC2       |
| Lab 3     | Create & mount an EFS file system  | Scalable shared file system |
| Lab 4     | Create an FSx file system          | Managed Windows file system |

---

## **🚀 What’s Next?**

✅ **Try the AWS Console labs first**  
✅ **Run the Boto3 scripts to automate them**  
✅ **Let me know if you hit any issues!**

Once you're ready, we’ll move to **Week 5 (Database Labs: RDS, DynamoDB, ElastiCache, Redshift).** 🚀🔥
