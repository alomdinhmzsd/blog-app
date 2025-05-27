### 🚀 **Week 2 - Day 1: S3 Deep Dive (Lab Plan)**

Today, we’ll focus on **Amazon S3**, covering **storage classes, security, encryption, and lifecycle policies**—all **critical** for the **AWS Certified Solutions Architect – Associate (SAA)** exam.

---

## 🏗 **Lab Objectives**

✔ **Understand S3 Storage Classes** (when to use each)  
✔ **Access Control** (Bucket Policies vs IAM Policies)  
✔ **S3 Encryption** (SSE-S3, SSE-KMS, SSE-C, Client-side)  
✔ **Lifecycle Policies & Versioning** (automate retention, deletion)

---

<h5>Lab 1 Day 1</h5>

## 🛠 **Step 1: Create an S3 Bucket**

📌 **Task**: Create an **S3 bucket** in AWS Console or CLI.

```sh
aws s3 mb s3://my-saa-s3-bucket
```

✅ **Verify**:

```sh
aws s3 ls
```

---

## 📂 **Step 2: S3 Storage Classes**

### 🔹 **S3 Storage Classes Overview**

| Storage Class               | Use Case                                       |
| --------------------------- | ---------------------------------------------- |
| **S3 Standard**             | Default, frequently accessed data              |
| **S3 IA**                   | Infrequently accessed but needs fast retrieval |
| **S3 One Zone-IA**          | Cheaper than IA, but stored in 1 AZ only       |
| **S3 Glacier**              | Archival, retrieval in minutes to hours        |
| **S3 Glacier Deep Archive** | Long-term backup, retrieval in hours           |

📌 **Task**: Upload an object to different **storage classes**

```sh
aws s3 cp myfile.txt s3://my-saa-s3-bucket/ --storage-class STANDARD
aws s3 cp myfile.txt s3://my-saa-s3-bucket/ --storage-class STANDARD_IA
aws s3 cp myfile.txt s3://my-saa-s3-bucket/ --storage-class GLACIER
```

✅ **Verify**:

```sh
aws s3 ls s3://my-saa-s3-bucket/ --summarize
```

---

## 🔒 **Step 3: S3 Security – Bucket Policies vs IAM Policies**

### 🔹 **IAM Policies**: Control who in your AWS **account** can access S3.

- Example: Grant read-only access to an IAM user.

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": "s3:ListBucket",
      "Resource": "arn:aws:s3:::my-saa-s3-bucket"
    }
  ]
}
```

### 🔹 **Bucket Policies**: Control who (including the **public**) can access the bucket.

- Example: Allow **public read access** to the bucket.

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::my-saa-s3-bucket/*"
    }
  ]
}
```

📌 **Task**: Apply the **bucket policy** via **AWS Console or CLI**  
✅ **Test with:**

```sh
curl https://my-saa-s3-bucket.s3.amazonaws.com/myfile.txt
```

---

## 🔐 **Step 4: S3 Encryption (SSE-S3, SSE-KMS, SSE-C, Client-side)**

| Encryption Type | How it Works                                      |
| --------------- | ------------------------------------------------- |
| **SSE-S3**      | AWS encrypts data using **AES-256**               |
| **SSE-KMS**     | AWS **KMS manages keys** (you can control access) |
| **SSE-C**       | You provide **your own key**                      |
| **Client-Side** | Encrypt before uploading to S3                    |

📌 **Task**: Upload an encrypted object using **SSE-S3**

```sh
aws s3 cp myfile.txt s3://my-saa-s3-bucket/ --sse AES256
```

✅ **Verify**:

```sh
aws s3api head-object --bucket my-saa-s3-bucket --key myfile.txt
```

(Look for `ServerSideEncryption: AES256` in the output)

---

## 🕒 **Step 5: Lifecycle Policies & Versioning**

📌 **Task**: Enable **Versioning**

```sh
aws s3api put-bucket-versioning --bucket my-saa-s3-bucket --versioning-configuration Status=Enabled
```

✅ **Verify**:

```sh
aws s3api get-bucket-versioning --bucket my-saa-s3-bucket
```

📌 **Task**: Apply a **Lifecycle Policy** (Move files from **Standard** to **IA**, then **Glacier**, and finally delete them)

```json
{
  "Rules": [
    {
      "ID": "MoveToGlacierAndDelete",
      "Filter": { "Prefix": "" },
      "Status": "Enabled",
      "Transitions": [
        { "Days": 30, "StorageClass": "STANDARD_IA" },
        { "Days": 90, "StorageClass": "GLACIER" }
      ],
      "Expiration": { "Days": 365 }
    }
  ]
}
```

✅ **Apply with**:

```sh
aws s3api put-bucket-lifecycle-configuration --bucket my-saa-s3-bucket --lifecycle-configuration file://lifecycle.json
```

---

## 🎯 **Key Takeaways for the SAA Exam**

✔ **S3 Storage Classes**: Choose the right class based on access frequency & cost.  
✔ **IAM vs Bucket Policies**: IAM controls AWS users, Bucket policies control external access.  
✔ **S3 Encryption**: Understand **SSE-S3, SSE-KMS, SSE-C, and client-side encryption**.  
✔ **Lifecycle Policies & Versioning**: Optimize storage costs by automatically transitioning & deleting objects.

---

🚀 **Lab Complete!** You’re now ready for **S3-based exam questions!** ✅

**Next up: S3 Performance & Data Transfers (Day 2)** 📦🚀
