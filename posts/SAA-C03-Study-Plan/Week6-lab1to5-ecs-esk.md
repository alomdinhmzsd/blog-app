### **🚀 Awesome! You're Ready for Week 5!**

Great job completing **Week 4 (S3, EBS, EFS, FSx labs)**! Now, let's move to **Week 5: AWS Compute, Containers, and Serverless**.

---

## **📅 Week 5 Study Plan: Compute, Containers & Serverless**

This week covers **EC2, Docker, ECS, EKS, Lambda, API Gateway, and Event-Driven Architectures**.

---

### **🛠 Week 5 Hands-on Labs**

📌 **Goal:** Understand compute services, container orchestration, and serverless execution.

### **✅ Lab 1: EC2 Spot and Reserved Instances**

✔ **Create a Spot Instance** to save costs.  
✔ **Request a Reserved Instance** and check pricing.  
✔ **Compare Spot vs. On-Demand pricing.**

### **✅ Lab 2: Amazon ECS (Elastic Container Service)**

✔ **Launch an ECS Cluster** in AWS Console.  
✔ **Deploy a Docker container** on AWS Fargate.  
✔ **Connect to the running container.**  
✔ **Run multiple tasks with ECS Service.**

### **✅ Lab 3: Amazon EKS (Kubernetes)**

✔ **Create an EKS Cluster using AWS CLI.**  
✔ **Deploy a simple app with `kubectl`.**  
✔ **Scale pods and check Cluster Autoscaler.**  
✔ **Set up an Application Load Balancer for EKS.**

### **✅ Lab 4: AWS Lambda + API Gateway**

✔ **Write a basic Lambda function (Python).**  
✔ **Trigger Lambda via API Gateway.**  
✔ **Return JSON response in Lambda.**  
✔ **Invoke Lambda from the CLI.**

### **✅ Lab 5: Event-Driven AWS**

✔ **Trigger Lambda from an S3 file upload.**  
✔ **Use EventBridge to schedule a Lambda function.**  
✔ **Integrate SQS + Lambda for async processing.**  
✔ **Set up SNS notifications from Lambda.**

---

## **🚀 Ready to Get Started?**

Let me know which **lab you want to start with first** or if you need **any modifications to the plan!** 🔥

### **🚀 Perfect Plan for Week 5 Labs!**

✔ **You will complete Labs 1-5 in the AWS Console (verbose for better understanding).**  
✔ **Once done, you will remove unnecessary services to avoid costs.**  
✔ **After finishing the Console labs, you will request the Boto3 version.**

---

### **🛠 Week 5 Hands-on Labs (AWS Console Version)**

Here’s the detailed step-by-step breakdown for each **Lab (1-5)**:

---

## **✅ Lab 1: EC2 Spot and Reserved Instances**

📌 **Goal:** Understand EC2 Spot & Reserved Instances for cost optimization.

### **Step 1: Create a Spot Instance**

1️⃣ **Go to AWS Console → EC2 → Instances → Launch Instance.**  
2️⃣ **Choose an Amazon Linux 2 AMI.**  
3️⃣ **Select "t2.micro" (Free Tier) or a larger instance type.**  
4️⃣ **Under Purchase Options, select "Request Spot Instance".**  
5️⃣ **Set a max price lower than On-Demand cost.**  
6️⃣ **Click "Launch" → Choose Key Pair → Click "Launch Instance".**  
7️⃣ **Check "Instance State" → If AWS terminates it, the price is too low.**

### **Step 2: Create a Reserved Instance**

1️⃣ **Go to EC2 → Reserved Instances → Purchase Reserved Instances.**  
2️⃣ **Filter for "t2.micro" → Select "1-year term".**  
3️⃣ **Compare pricing between On-Demand and Reserved Instances.**

📌 **Key Takeaway:** Spot Instances are cheaper but unreliable, Reserved Instances are cost-effective for steady workloads.

---

## **✅ Lab 2: Deploy a Docker Container with ECS (Fargate)**

📌 **Goal:** Run a containerized app on AWS ECS with Fargate (serverless).

### **Step 1: Create an ECS Cluster**

1️⃣ **Go to AWS Console → ECS → Create Cluster.**  
2️⃣ **Choose "Networking only" (Fargate).**  
3️⃣ **Enter a Cluster Name (e.g., `ecs-fargate-cluster`).**  
4️⃣ **Click "Create".**

### **Step 2: Create a Task Definition**

1️⃣ **Go to ECS → Task Definitions → Create New Task Definition.**  
2️⃣ **Select "Fargate" → Name it `my-ecs-task`.**  
3️⃣ **Click "Add Container" → Use `nginx` as Image.**  
4️⃣ **Set Memory to 512MB and CPU to 0.25 vCPU.**  
5️⃣ **Click "Create Task Definition".**

### **Step 3: Run the Task**

1️⃣ **Go to ECS → Clusters → Select `ecs-fargate-cluster`.**  
2️⃣ **Click "Run New Task" → Select `my-ecs-task`.**  
3️⃣ **Click "Run Task".**  
4️⃣ **Check logs to verify the container is running.**

📌 **Key Takeaway:** Fargate lets you run containers without managing EC2.

---

## **✅ Lab 3: Deploy Kubernetes on AWS EKS**

📌 **Goal:** Deploy a Kubernetes cluster with EKS and run an application.

### **Step 1: Create an EKS Cluster**

1️⃣ **Go to AWS Console → EKS → Create Cluster.**  
2️⃣ **Enter a Cluster Name (`my-eks-cluster`).**  
3️⃣ **Choose IAM Role → Select "EKS-Cluster-Role".**  
4️⃣ **Select Networking (VPC & Subnet) → Click "Create".**  
5️⃣ **Wait for the cluster to be Active.**

### **Step 2: Connect and Deploy an App**

1️⃣ **Install `kubectl` on your local machine (`eksctl` optional).**  
2️⃣ **Run the following to connect:**

```bash
aws eks update-kubeconfig --region us-east-1 --name my-eks-cluster
```

3️⃣ **Deploy a test application:**

```bash
kubectl apply -f https://k8s.io/examples/application/deployment.yaml
```

4️⃣ **Check running pods:**

```bash
kubectl get pods
```

📌 **Key Takeaway:** EKS manages Kubernetes clusters in AWS.

---

## **✅ Lab 4: AWS Lambda + API Gateway**

📌 **Goal:** Create a serverless API using Lambda + API Gateway.

### **Step 1: Create a Lambda Function**

1️⃣ **Go to AWS Console → Lambda → Create Function.**  
2️⃣ **Choose "Author from Scratch" → Name it `my-lambda-function`.**  
3️⃣ **Select Runtime: `Python 3.9`.**  
4️⃣ **Click "Create Function".**

### **Step 2: Write the Function**

1️⃣ **Replace function code with:**

```python
import json

def lambda_handler(event, context):
    return {
        "statusCode": 200,
        "body": json.dumps({"message": "Hello from Lambda!"})
    }
```

2️⃣ **Click "Deploy".**

### **Step 3: Create an API Gateway**

1️⃣ **Go to AWS Console → API Gateway → Create API.**  
2️⃣ **Select "REST API" → Click "Create".**  
3️⃣ **Create a new resource `/hello`.**  
4️⃣ **Attach Lambda Function → Deploy API.**  
5️⃣ **Invoke the API and check the response.**

📌 **Key Takeaway:** API Gateway lets you expose Lambda functions via HTTP.

---

## **✅ Lab 5: Event-Driven AWS (S3, Lambda, SNS)**

📌 **Goal:** Automate event-driven workflows in AWS.

### **Step 1: Create an S3 Bucket**

1️⃣ **Go to AWS Console → S3 → Create Bucket.**  
2️⃣ **Name it `my-s3-event-bucket`.**  
3️⃣ **Enable Event Notifications → Select "Lambda Function".**

### **Step 2: Create a Lambda Function for S3 Events**

1️⃣ **Go to AWS Console → Lambda → Create Function.**  
2️⃣ **Select "Python 3.9" → Name it `s3-event-processor`.**  
3️⃣ **Replace code with:**

```python
import json

def lambda_handler(event, context):
    print("S3 Event:", json.dumps(event))
    return {"statusCode": 200, "body": "Success"}
```

4️⃣ **Click "Deploy".**

### **Step 3: Test by Uploading a File to S3**

1️⃣ **Upload a file to `my-s3-event-bucket`.**  
2️⃣ **Go to AWS Console → Lambda → Check logs.**

📌 **Key Takeaway:** AWS automates workflows using event-driven architectures.

---

## **✅ Lab Cleanup: Remove Unused Services**

To avoid **AWS charges**, delete resources **after testing**.

### **Delete EC2 Instances**

```bash
aws ec2 terminate-instances --instance-ids i-xxxxxxxxxxxx
```

### **Delete ECS Cluster**

```bash
aws ecs delete-cluster --cluster ecs-fargate-cluster
```

### **Delete EKS Cluster**

```bash
aws eks delete-cluster --name my-eks-cluster
```

### **Delete Lambda Functions**

```bash
aws lambda delete-function --function-name my-lambda-function
```

### **Delete API Gateway**

```bash
aws apigateway delete-rest-api --rest-api-id xxxxxxxx
```

### **Delete S3 Bucket**

```bash
aws s3 rb s3://my-s3-event-bucket --force
```

📌 **Key Takeaway:** Always clean up to avoid AWS charges.

---

## **🚀 Next Steps**

✔ **Complete Labs 1-5 in the AWS Console (verbose mode).**  
✔ **Remove unnecessary services after each lab.**  
✔ **Once done, request Boto3 versions for scripting automation.**

🔥 **Let me know when you're ready for the Boto3 version!** 🚀
