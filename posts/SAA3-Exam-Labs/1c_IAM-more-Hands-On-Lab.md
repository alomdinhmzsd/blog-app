### **Hands-on IAM Labs for AWS SAA-C03 Exam**

Now that you've covered the basics, let's dive deeper into **IAM hands-on labs** focusing on key exam topics before moving to EC2.

---

### **🔹 IAM Lab 1: Creating and Enforcing MFA for a User**

🔹 **Objective**: Enforce MFA (Multi-Factor Authentication) for an IAM user  
✅ **Create an IAM User**  
✅ **Attach an MFA device**  
✅ **Create an IAM Policy to Enforce MFA Before Using AWS Services**

#### **Steps:**

1. **Create a new IAM user** (e.g., `MFAUser`) **without access keys**.
2. **Attach an MFA device** to the user (use Google Authenticator or AWS MFA app).
3. **Create a new IAM policy** that requires MFA before performing actions:
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
4. **Attach the policy to the user** and test if the user can perform actions without MFA.

---

### **🔹 IAM Lab 2: IAM Group-Based Permissions**

🔹 **Objective**: Implement permission boundaries using IAM groups  
✅ **Create IAM Groups for Different Roles**  
✅ **Attach Policies to Each Group**  
✅ **Assign Users to Groups and Test Permissions**

#### **Steps:**

1. **Create IAM groups**:

   - `AdminsGroup` → Full admin access
   - `DevelopersGroup` → EC2 and S3 limited access
   - `ReadOnlyGroup` → Read-only access to all resources

2. **Attach Policies**:

   - `AdminsGroup` → Attach `AdministratorAccess`
   - `DevelopersGroup` → Attach:
     ```json
     {
       "Version": "2012-10-17",
       "Statement": [
         {
           "Effect": "Allow",
           "Action": ["ec2:*", "s3:*"],
           "Resource": "*"
         }
       ]
     }
     ```
   - `ReadOnlyGroup` → Attach `ReadOnlyAccess`

3. **Create IAM users** and add them to respective groups.
4. **Test access** using the IAM Policy Simulator.

---

### **🔹 IAM Lab 3: Using IAM Roles with S3 Access**

🔹 **Objective**: Securely access S3 using IAM Roles  
✅ **Create an IAM Role for S3 Access**  
✅ **Launch an EC2 instance and attach the role**  
✅ **Verify S3 access from EC2**

#### **Steps:**

1. **Create an IAM Role** (`S3AccessRole`) with:
   - **Trusted Entity**: `EC2`
   - **Permissions**:
     ```json
     {
       "Version": "2012-10-17",
       "Statement": [
         {
           "Effect": "Allow",
           "Action": ["s3:ListBucket", "s3:GetObject"],
           "Resource": [
             "arn:aws:s3:::your-bucket-name",
             "arn:aws:s3:::your-bucket-name/*"
           ]
         }
       ]
     }
     ```
2. **Attach the role to an EC2 instance**.
3. **SSH into EC2 and test S3 access**:
   ```bash
   aws s3 ls s3://your-bucket-name
   ```

---

### **🔹 IAM Lab 4: Creating a Custom Permission Boundary**

🔹 **Objective**: Limit IAM users' ability to create high-privilege roles  
✅ **Set up a permission boundary**  
✅ **Restrict actions while allowing specific operations**

#### **Steps:**

1. **Create a new permission boundary policy**:
   ```json
   {
     "Version": "2012-10-17",
     "Statement": [
       {
         "Effect": "Allow",
         "Action": ["s3:*", "ec2:DescribeInstances"],
         "Resource": "*"
       },
       {
         "Effect": "Deny",
         "Action": "iam:*",
         "Resource": "*"
       }
     ]
   }
   ```
2. **Attach the permission boundary to a user**.
3. **Test if the user can perform IAM actions (should be denied)**.

---

Would you like **Python scripts** for some of these labs? 🚀
