### **🛠 IAM Hands-on Labs (Updated for AWS Console)**

📌 **Goal**: Reinforce IAM concepts with hands-on exercises  
📌 **What you’ll do**:  
✅ Create an **IAM Role** for EC2 to access S3 **without access keys**  
✅ Set up **MFA (Multi-Factor Authentication) for IAM users**  
✅ Implement **IAM Policies with Conditions** (IP-based, time-based access)

---

## **🔹 Lab 1: IAM Role for EC2 to Access S3 (Best Practice)**

✅ **Scenario**: Instead of using access keys, we will create an **IAM Role** for an EC2 instance to read/write to an S3 bucket.

---

### **Step 1: Create an IAM Role**

1. Go to **AWS Console** → **IAM**.
2. In the **left menu**, click **Roles**.
3. Click **Create Role**.
4. **Select Trusted Entity** → Choose **AWS Service**.
5. **Use case** → Select **EC2** → Click **Next**.
6. **Attach Permissions** → Search for `AmazonS3FullAccess` and **select it**.
7. **Click Next** → Name the role **EC2S3AccessRole**.
8. Click **Create Role**.

---

### **Step 2: Attach the IAM Role to an EC2 Instance**

1. Go to **AWS Console** → **EC2**.
2. Click **Instances** → Select an EC2 instance.
3. Click **Actions** → **Security** → **Modify IAM Role**.
4. Select the IAM Role **EC2S3AccessRole** → Click **Update IAM Role**.

---

### **Step 3: Verify S3 Access from EC2**

1. Connect to your EC2 instance via SSH:
   ```sh
   ssh -i my-key.pem ec2-user@<EC2-Public-IP>
   ```
2. Run the following command to list all S3 buckets:
   ```sh
   aws s3 ls
   ```
3. Try creating a test file and uploading it to S3:
   ```sh
   echo "Hello AWS" > testfile.txt
   aws s3 cp testfile.txt s3://your-bucket-name/
   ```
4. If successful, the EC2 instance can now interact with S3 **without storing access keys**.

📌 **Key Takeaway**: IAM Roles provide **temporary credentials** for AWS services, eliminating the need for hardcoded credentials.

---

## **🔹 Lab 2: Enforce MFA for IAM Users**

✅ **Scenario**: Ensure IAM users must enter an **MFA code** before making changes.

---

### **Step 1: Enable MFA for an IAM User**

1. Go to **AWS Console** → **IAM**.
2. Click **Users** → Select your IAM user (e.g., `TestUser`).
3. Click **Security credentials** tab.
4. Scroll down to **Multi-factor authentication (MFA)**.
5. Click **Assign MFA device**.
6. Choose **Virtual MFA device** → Click **Continue**.
7. Scan the QR code using **Google Authenticator** or **Authy**.
8. Enter two consecutive **MFA codes** from your app → Click **Assign MFA**.

---

### **Step 2: Enforce MFA in an IAM Policy**

1. Go to **AWS Console** → **IAM**.
2. Click **Policies** → Click **Create Policy**.
3. Click the **JSON** tab → Replace the contents with this:
   ```json
   {
     "Version": "2012-10-17",
     "Statement": [
       {
         "Effect": "Deny",
         "Action": "*",
         "Resource": "*",
         "Condition": {
           "BoolIfExists": {
             "aws:MultiFactorAuthPresent": "false"
           }
         }
       }
     ]
   }
   ```
4. Click **Next** → **Name the policy**: `EnforceMFA` → Click **Create Policy**.
5. Attach this policy to your **IAM User** or **Group**.

📌 **Key Takeaway**: Now, users **must enter an MFA code** before making any API or console changes.

---

## **🔹 Lab 3: Restrict IAM User Access by IP Address**

✅ **Scenario**: Ensure users can access AWS **only from a specific IP range**.

---

### **Step 1: Create an IAM Policy to Restrict Access by IP**

1. Go to **AWS Console** → **IAM**.
2. Click **Policies** → **Create Policy**.
3. Click the **JSON** tab → Paste this policy:
   ```json
   {
     "Version": "2012-10-17",
     "Statement": [
       {
         "Effect": "Deny",
         "Action": "*",
         "Resource": "*",
         "Condition": {
           "NotIpAddress": {
             "aws:SourceIp": "203.0.113.0/24"
           }
         }
       }
     ]
   }
   ```
4. Click **Next** → **Name the policy**: `RestrictIPAccess` → Click **Create Policy**.
5. Attach this policy to a **User or Group**.

📌 **Key Takeaway**: Users can now **only access AWS from a specific IP range**.

---

## **🔹 Lab 4: Grant IAM User Access Only During Work Hours**

✅ **Scenario**: Restrict AWS access to **Monday-Friday, 9 AM - 5 PM UTC**.

---

### **Step 1: Create an IAM Policy with Time-Based Conditions**

1. Go to **AWS Console** → **IAM**.
2. Click **Policies** → **Create Policy**.
3. Click the **JSON** tab → Paste this policy:
   ```json
   {
     "Version": "2012-10-17",
     "Statement": [
       {
         "Effect": "Deny",
         "Action": "*",
         "Resource": "*",
         "Condition": {
           "StringNotEqualsIfExists": {
             "aws:RequestTag/work-hours": "true"
           },
           "DateGreaterThan": {
             "aws:CurrentTime": "09:00:00Z"
           },
           "DateLessThan": {
             "aws:CurrentTime": "17:00:00Z"
           }
         }
       }
     ]
   }
   ```
4. Click **Next** → **Name the policy**: `WorkHoursOnly` → Click **Create Policy**.
5. Attach this policy to a **User or Group**.

📌 **Key Takeaway**: Users **cannot access AWS outside of 9 AM - 5 PM UTC**.

---

## **🔹 Summary**

| IAM Hands-on Lab                  | Concept                                                                              |
| --------------------------------- | ------------------------------------------------------------------------------------ |
| **Lab 1: IAM Role for EC2**       | Best practice for AWS services to access resources securely **without access keys**. |
| **Lab 2: Enforce MFA**            | Users **must enter an MFA code** before performing actions.                          |
| **Lab 3: Restrict Access by IP**  | AWS access is only allowed from **specific IPs**.                                    |
| **Lab 4: Work Hours Restriction** | AWS access is only allowed **during business hours**.                                |

---

### **📌 What’s Next?**

✅ Try the labs and let me know if you have any issues!  
✅ Once you're ready, we’ll move on to **EC2 (Launching and Managing Virtual Machines on AWS)**. 🚀
