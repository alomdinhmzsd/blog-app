<h5>AWS S3 – Day 2 Lab Overview</h5>
### **AWS S3 – Day 2 Lab Overview** 🚀  
This lab covers **security, replication, performance optimization, and hybrid storage** options for S3.

---

## **🔹 1. S3 Block Public Access (Security Feature)**

**Concept:**

- AWS **by default** makes **new buckets private**.
- **Block Public Access settings** prevent users from **accidentally** making objects public.
- This is **recommended for security** unless the bucket is explicitly meant to be public.

**✅ Task: Check & Enable Block Public Access**

1. **Check current settings**:
   ```sh
   aws s3api get-public-access-block --bucket my-saa-s3-bucket
   ```
2. **Block public access for a bucket**:
   ```sh
   aws s3api put-public-access-block \
   --bucket my-saa-s3-bucket \
   --public-access-block-configuration \
    BlockPublicAcls=true,
    IgnorePublicAcls=true,
    BlockPublicPolicy=true,
    RestrictPublicBuckets=true
   ```
3. **Verify it’s blocked**:
   ```sh
   aws s3api get-bucket-acl --bucket my-saa-s3-bucket
   ```

**💡 Exam Tip:**  
AWS **recommends enabling Block Public Access** unless explicitly hosting a public website.

---

## **🔹 2. S3 Cross-Region Replication (CRR) vs Same-Region Replication (SRR)**

**Concept:**

- **CRR**: Automatically replicates **objects to a different AWS region** (for DR).
- **SRR**: Replicates objects **within the same region** (compliance, cost optimization).
- **Replication does NOT copy existing objects, only new uploads.**
- **Versioning must be enabled** for replication.

### **✅ Task: Enable Cross-Region Replication (CRR)**

1. **Enable versioning on source and destination buckets**:
   ```sh
   aws s3api put-bucket-versioning --bucket my-saa-s3-bucket --versioning-configuration Status=Enabled
   aws s3api put-bucket-versioning --bucket my-replica-bucket --versioning-configuration Status=Enabled
   ```
2. **Create an IAM role for S3 Replication**:
   ```sh
   aws iam create-role --role-name S3ReplicationRole --assume-role-policy-document file://trust-policy.json
   ```
3. **Attach necessary permissions**:
   ```sh
   aws iam attach-role-policy --role-name S3ReplicationRole --policy-arn arn:aws:iam::aws:policy/service-role/AmazonS3FullAccess
   ```
4. **Enable replication** (change destination bucket accordingly):

   ```sh
   aws s3api put-bucket-replication --bucket my-saa-s3-bucket --replication-configuration file://replication-config.json
   ```

   _(The `replication-config.json` file should define source, destination, and IAM role for replication.)_

5. **Test by uploading a file**:
   ```sh
   aws s3 cp myfile.txt s3://my-saa-s3-bucket/
   aws s3 ls s3://my-replica-bucket/ --summarize
   ```

**💡 Exam Tip:**  
CRR is **charged for inter-region data transfer**, whereas **SRR is cheaper but remains in the same region**.

---

## **🔹 3. Pre-Signed URLs vs Signed Cookies (Temporary Access to S3)**

**Concept:**

- **Pre-signed URLs**: Grant **temporary access** to a specific **S3 object** (for downloads/uploads).
- **Signed Cookies**: Used for **restricted access** to multiple S3 objects via **CloudFront**.

### **✅ Task: Generate a Pre-Signed URL for an Object**

```sh
aws s3 presign s3://my-saa-s3-bucket/private-file.txt --expires-in 600
```

This allows **temporary access for 10 minutes**.

**💡 Exam Tip:**

- **Pre-signed URLs** → When granting **temporary access to a single object**.
- **Signed Cookies** → When **restricting access to multiple objects in CloudFront**.

---

## **🔹 4. S3 Transfer Acceleration (Faster Uploads)**

**Concept:**

- **Speeds up S3 uploads using AWS Edge Locations**.
- Useful for **global users uploading large files**.

### **✅ Task: Enable Transfer Acceleration**

1. **Enable acceleration on a bucket**:
   ```sh
   aws s3api put-bucket-accelerate-configuration --bucket my-saa-s3-bucket --accelerate-configuration Status=Enabled
   ```
2. **Check status**:
   ```sh
   aws s3api get-bucket-accelerate-configuration --bucket my-saa-s3-bucket
   ```
3. **Upload using acceleration**:
   ```sh
   aws s3 cp myfile.txt s3://my-saa-s3-bucket/ --endpoint-url https://s3-accelerate.amazonaws.com
   ```

**💡 Exam Tip:**

- **S3 Transfer Acceleration is NOT free** (adds cost).
- Best for **large file uploads from distant locations**.

---

## **🔹 5. AWS Snowball & Snowmobile (Hybrid Storage for Large Data Transfers)**

**Concept:**

- **AWS Snowball**:
  - Physical storage device for **transferring 80TB–100TB of data** to AWS.
  - Used when **network bandwidth is too slow**.
- **AWS Snowmobile**:
  - **Massive data transfer service** (for PB-scale data).
  - **A literal shipping container with storage servers**.

### **✅ Task: Explore Snowball Options**

1. Open **AWS Console** → **AWS Snowball**.
2. Click **Create Job** and explore options.
3. Check **pricing & use cases**.

**💡 Exam Tip:**

- **Use Snowball** for **80TB–100TB data transfers**.
- **Use Snowmobile** for **1PB+ (petabyte-scale) data migration**.
- **Both are useful when internet speeds are too slow**.

---

### **🔥 Summary – Key Takeaways for SAA Exam**

✅ **Block Public Access**: Prevents accidental public exposure of S3 buckets.  
✅ **CRR vs SRR**:

- **CRR** for disaster recovery (cross-region).
- **SRR** for compliance (same region).  
  ✅ **Pre-signed URLs vs Signed Cookies**:
- **Pre-signed URL**: Temporary access to one object.
- **Signed Cookies**: Access multiple objects (CloudFront).  
  ✅ **S3 Transfer Acceleration**: Faster global uploads (adds cost).  
  ✅ **Snowball & Snowmobile**: Offline large-scale data migration.

---

🎯 **Next Steps:** Ready to test these concepts with hands-on tasks? 🚀
