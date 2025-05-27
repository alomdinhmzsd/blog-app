### **✅ Next Step: AWS Lambda Labs**

Now that you've completed **IAM, EC2, Auto Scaling, and Load Balancing**, it's time to **dive into AWS Lambda**.

---

### **🔹 Week Plan for AWS Lambda**

🔹 **Lab 1:** Create a basic Lambda function using AWS CLI.  
🔹 **Lab 2:** Invoke the Lambda function manually & with an API Gateway.  
🔹 **Lab 3:** Trigger Lambda with S3 events (upload a file to trigger).  
🔹 **Lab 4:** Trigger Lambda with DynamoDB Streams.  
🔹 **Lab 5:** Automate EC2 instance start/stop using Lambda.  
🔹 **Practice Exam:** Lambda-focused AWS Certified Architect Questions.

---

### **🔹 Lab 1: Creating a Basic AWS Lambda Function**

In this first lab, you'll create and invoke a basic **Python Lambda function**.

📌 **Step 1: Create the Lambda Execution Role**
Before creating the Lambda function, we need an **IAM role** for Lambda.

```bash
aws iam create-role \
    --role-name LambdaExecutionRole \
    --assume-role-policy-document '{
      "Version": "2012-10-17",
      "Statement": [
        {
          "Effect": "Allow",
          "Principal": { "Service": "lambda.amazonaws.com" },
          "Action": "sts:AssumeRole"
        }
      ]
    }'
```

✅ **Copy the Role ARN from the output.**

📌 **Attach permissions for writing logs:**

```bash
aws iam attach-role-policy \
    --role-name LambdaExecutionRole \
    --policy-arn arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole
```

---

📌 **Step 2: Write a Simple Lambda Function**
Create a Python file (`lambda_function.py`) with this content:

```python
import json

def lambda_handler(event, context):
    return {
        'statusCode': 200,
        'body': json.dumps('Hello from AWS Lambda!')
    }
}
```

---

📌 **Step 3: Zip the Lambda Function**

```bash
zip function.zip lambda_function.py
```

---

📌 **Step 4: Create the Lambda Function**
Replace `<ROLE-ARN>` with the IAM role ARN from **Step 1**:

```bash
aws lambda create-function \
    --function-name MyFirstLambda \
    --runtime python3.8 \
    --role <ROLE-ARN> \
    --handler lambda_function.lambda_handler \
    --zip-file fileb://function.zip
```

✅ This creates a Lambda function called `MyFirstLambda`.

---

📌 **Step 5: Invoke the Lambda Function**

```bash
aws lambda invoke --function-name MyFirstLambda output.txt
```

✅ Check the response:

```bash
cat output.txt
```

Expected Output:

```json
{ "statusCode": 200, "body": "Hello from AWS Lambda!" }
```

---

### **🚀 Next Steps**

1️⃣ Complete **Lab 1** (above).  
2️⃣ Let me know once you're done.  
3️⃣ Move on to **Lab 2 (Invoke Lambda via API Gateway).**

Let me know if you have any issues! 💪🔥

<h5>AWS Lambda LAB 2</h5>

---

# **📌 Lab 2: Invoke Lambda Manually & via API Gateway**

**Goal:**  
1️⃣ **Manually invoke your Lambda function using AWS CLI**.  
2️⃣ **Trigger Lambda using an API Gateway endpoint**.

---

## **✅ Step 1: Manually Invoke Lambda Using AWS CLI**

Since you already created **`MyLambdaFunction`**, let's manually invoke it.

### **🔹 1.1 Run This Command**

```bash
aws lambda invoke \
    --function-name MyLambdaFunction \
    --payload '{}' \
    response.json
```

💡 **What this does:**

- Calls `MyLambdaFunction` manually.
- Stores the response in `response.json`.

### **🔹 1.2 Check the Response**

```bash
cat response.json
```

**Expected Output (if Lambda is working correctly):**

```json
{
  "statusCode": 200,
  "body": "\"Hello from AWS Lambda!\""
}
```

🚀 **If you see this, your Lambda is working!**

---

## **✅ Step 2: Set Up API Gateway to Trigger Lambda**

Now, we’ll create an **API Gateway** that calls Lambda when accessed via a URL.

---

### **🔹 2.1 Create API Gateway**

Run:

```bash
aws apigatewayv2 create-api \
    --name "LambdaAPI" \
    --protocol-type "HTTP"
```

💡 **Copy the `ApiId` from the output** (e.g., `"ApiId": "a1b2c3d4e5"`).

---

### **🔹 2.2 Integrate API Gateway with Lambda**

Run:

```bash
aws apigatewayv2 create-integration \
    --api-id <YOUR_API_ID> \
    --integration-type AWS_PROXY \
    --integration-uri arn:aws:lambda:us-east-1:034362031047:function:MyLambdaFunction \
    --payload-format-version 2.0
```

🔹 **Replace** `<YOUR_API_ID>` with the **API ID from Step 2.1**.  
🔹 **Replace** `arn:aws:lambda:us-east-1:034362031047:function:MyLambdaFunction` with **your Lambda ARN**.

**Copy the `IntegrationId` from the output** (e.g., `"IntegrationId": "xyz123"`).

---

### **🔹 2.3 Create a Route for API Gateway**

Run:

```bash
aws apigatewayv2 create-route \
    --api-id <YOUR_API_ID> \
    --route-key "GET /hello" \
    --target "integrations/<INTEGRATION_ID>"
```

🔹 **Replace** `<YOUR_API_ID>` with the **API ID** from Step 2.1.  
🔹 **Replace** `<INTEGRATION_ID>` with the **Integration ID** from Step 2.2.

---

### **🔹 2.4 Deploy API**

Run:

```bash
aws apigatewayv2 create-stage \
    --api-id <YOUR_API_ID> \
    --stage-name "dev" \
    --auto-deploy
```

✅ Now, your API is **live and ready to be tested!**

---

## **✅ Step 3: Test API Gateway Endpoint**

1️⃣ **Get API Gateway URL**

```bash
aws apigatewayv2 get-api --api-id <YOUR_API_ID>
```

Look for the `"ApiEndpoint"` in the output. It should look like:

```
"https://a1b2c3d4e5.execute-api.us-east-1.amazonaws.com"
```

2️⃣ **Invoke Lambda via API**

```bash
curl https://<API_GATEWAY_ID>.execute-api.us-east-1.amazonaws.com/dev/hello
```

🔹 **Replace `<API_GATEWAY_ID>` with your actual API ID**.

**Expected Response:**

```json
{
  "statusCode": 200,
  "body": "\"Hello from AWS Lambda!\""
}
```

🚀 **Now you’ve successfully connected API Gateway to Lambda!**

---

# **🔹 Summary of Lab 2**

| **Step** | **Action**                | **Command**                                                                   |
| -------- | ------------------------- | ----------------------------------------------------------------------------- |
| **1**    | Invoke Lambda manually    | `aws lambda invoke`                                                           |
| **2.1**  | Create API Gateway        | `aws apigatewayv2 create-api`                                                 |
| **2.2**  | Integrate Lambda with API | `aws apigatewayv2 create-integration`                                         |
| **2.3**  | Create Route (`/hello`)   | `aws apigatewayv2 create-route`                                               |
| **2.4**  | Deploy API                | `aws apigatewayv2 create-stage`                                               |
| **3**    | Test API                  | `curl https://<API_GATEWAY_ID>.execute-api.us-east-1.amazonaws.com/dev/hello` |

---

✅ **If you complete these steps, your Lambda function will be accessible through an API URL!**  
💡 **Let me know if you run into any issues!** 🚀

<h5>AWS Lambda LAB 3</h5>
📌  Lab 3: Trigger AWS Lambda with S3 Events
In this lab, you will:<br>

✅ **Create an S3 bucket**<br>
✅ **Configure S3 to trigger Lambda when a file is uploaded**<br>
✅ **Upload a file and verify Lambda execution**

---

### **✅ Step 1: Create an S3 Bucket**

Run:

```bash
aws s3 mb s3://my-lambda-bucket
```

🔹 **Replace** `my-lambda-bucket` with a unique bucket name.

Check if the bucket was created:

```bash
aws s3 ls
```

✅ If it appears in the list, it's ready!

---

### **✅ Step 2: Allow S3 to Invoke Lambda**

Run:

```bash
aws lambda add-permission \
    --function-name MyLambdaFunction \
    --statement-id s3-trigger \
    --action lambda:InvokeFunction \
    --principal s3.amazonaws.com \
    --source-arn arn:aws:s3:::my-lambda-bucket
```

🔹 **Replace** `my-lambda-bucket` with your actual bucket name.

---

### **✅ Step 3: Configure S3 to Trigger Lambda on File Upload**

Run:

```bash
aws s3api put-bucket-notification-configuration \
    --bucket my-lambda-bucket \
    --notification-configuration '{
        "LambdaFunctionConfigurations": [
            {
                "LambdaFunctionArn": "arn:aws:lambda:us-east-1:034362031047:function:MyLambdaFunction",
                "Events": ["s3:ObjectCreated:*"]
            }
        ]
    }'
```

🔹 **Replace** `"arn:aws:lambda:us-east-1:034362031047:function:MyLambdaFunction"` with your actual Lambda ARN.

---

### **✅ Step 4: Upload a Test File to Trigger Lambda**

Run:

```bash
aws s3 cp testfile.txt s3://my-lambda-bucket/
```

🔹 **Replace** `testfile.txt` with any file on your system.

---

### **✅ Step 5: Verify Lambda Execution**

Check Lambda logs to confirm it was triggered:

```bash
aws logs tail /aws/lambda/MyLambdaFunction --follow
```

✅ **If logs show a new event, Lambda is working!** 🎉

---

### **🚀 Summary of Lab 3**

| **Step** | **Action**                     | **Command**                                           |
| -------- | ------------------------------ | ----------------------------------------------------- |
| **1**    | Create S3 Bucket               | `aws s3 mb s3://my-lambda-bucket`                     |
| **2**    | Allow S3 to Invoke Lambda      | `aws lambda add-permission ...`                       |
| **3**    | Configure S3 to Trigger Lambda | `aws s3api put-bucket-notification-configuration ...` |
| **4**    | Upload a File                  | `aws s3 cp testfile.txt s3://my-lambda-bucket/`       |
| **5**    | Verify Execution               | `aws logs tail /aws/lambda/MyLambdaFunction --follow` |

🚀 **Try these steps, and let me know if Lambda gets triggered!** If all goes well, we’ll move to **Lab 4 (DynamoDB Streams).** 🔥

<h5>AWS Lambda LAB 4</h5>

🚀 **Lab 4: Trigger Lambda with DynamoDB Streams**

In this lab, we’ll:  
✅ **Create a DynamoDB table**  
✅ **Enable DynamoDB Streams**  
✅ **Attach a Lambda function to listen for changes**  
✅ **Insert/update items and verify Lambda execution**

---

### **✅ Step 1: Create a DynamoDB Table**

Run:

```bash
aws dynamodb create-table \
    --table-name MyDynamoDBTable \
    --attribute-definitions AttributeName=ID,AttributeType=S \
    --key-schema AttributeName=ID,KeyType=HASH \
    --billing-mode PAY_PER_REQUEST \
    --stream-specification StreamEnabled=true,StreamViewType=NEW_AND_OLD_IMAGES
```

🔹 This creates a **DynamoDB table** named `MyDynamoDBTable`.  
🔹 The table includes **DynamoDB Streams**, capturing both **new and old item data**.

---

### **✅ Step 2: Get the DynamoDB Stream ARN**

Run:

```bash
aws dynamodb describe-table --table-name MyDynamoDBTable \
    --query "Table.LatestStreamArn" --output text
```

Copy the **Stream ARN** for the next step.

---

### **✅ Step 3: Allow DynamoDB to Trigger Lambda**

Run:

```bash
aws lambda add-permission \
    --function-name MyLambdaFunction \
    --statement-id dynamodb-stream \
    --action lambda:InvokeFunction \
    --principal dynamodb.amazonaws.com \
    --source-arn "PASTE_STREAM_ARN_HERE"
```

🔹 **Replace** `"PASTE_STREAM_ARN_HERE"` with the **Stream ARN** from Step 2.

---

### **✅ Step 4: Attach DynamoDB Stream to Lambda**

Run:

```bash
aws lambda create-event-source-mapping \
    --function-name MyLambdaFunction \
    --event-source "PASTE_STREAM_ARN_HERE" \
    --starting-position LATEST
```

🔹 This connects **DynamoDB Streams** to your **Lambda function**.

---

### **✅ Step 5: Insert an Item in DynamoDB**

Run:

```bash
aws dynamodb put-item \
    --table-name MyDynamoDBTable \
    --item '{"ID": {"S": "123"}, "Name": {"S": "John Doe"}}'
```

🔹 This **adds a new item** (`ID: 123, Name: John Doe`) to the DynamoDB table.  
🔹 This **should trigger your Lambda function**.

---

### **✅ Step 6: Verify Lambda Execution**

Run:

```bash
aws logs tail /aws/lambda/MyLambdaFunction --follow
```

✅ **Expected Output:**  
Your Lambda function should log the event, showing the **inserted DynamoDB item**.

---

### **🎯 Summary**

| **Step** | **Action**                       | **Command**                                           |
| -------- | -------------------------------- | ----------------------------------------------------- |
| ✅ **1** | Create DynamoDB Table            | `aws dynamodb create-table ...`                       |
| ✅ **2** | Get DynamoDB Stream ARN          | `aws dynamodb describe-table ...`                     |
| ✅ **3** | Allow DynamoDB to Trigger Lambda | `aws lambda add-permission ...`                       |
| ✅ **4** | Attach Stream to Lambda          | `aws lambda create-event-source-mapping ...`          |
| ✅ **5** | Insert an Item in DynamoDB       | `aws dynamodb put-item ...`                           |
| ✅ **6** | Check Lambda Execution           | `aws logs tail /aws/lambda/MyLambdaFunction --follow` |

🚀 **Try these steps and let me know if Lambda is triggered!** 🔥  
Once confirmed, we’ll move on to **Lab 5: Automate EC2 instance start/stop using Lambda.** 🚀

<h5>AWS Lambda LAB 5</h5>

🚀 **Lab 5: Automate EC2 Instance Start/Stop Using Lambda**

In this lab, you will:  
✅ **List running EC2 instances**  
✅ **Stop or start instances using Lambda**  
✅ **Use an environment variable to control behavior**  
✅ **(Optional) Schedule it with EventBridge**

---

🚀 **AWS Lambda Lab 5: Automate EC2 Instance Start/Stop**  
This lab will teach you how to use **AWS Lambda** to automatically **start and stop EC2 instances** using the AWS SDK (`boto3`).

---

## **✅ Step 1: Manually Create an EC2 Instance**

Before Lambda can start or stop instances, you **need an EC2 instance to manage**.

Run this command to create a **basic Amazon Linux EC2 instance**:

```bash
aws ec2 run-instances \
    --image-id ami-0c55b159cbfafe1f0 \
    --instance-type t2.micro \
    --count 1 \
    --key-name MyKeyPair \
    --security-groups default \
    --tag-specifications 'ResourceType=instance,Tags=[{Key=Name,Value=Lambda-Test-Instance}]'
```

📌 **Explanation of Parameters:**

- **`--image-id`** → Amazon Linux 2 AMI (`ami-0c55b159cbfafe1f0`, check your region for updates).
- **`--instance-type`** → Uses a `t2.micro` instance (Free-tier eligible).
- **`--count 1`** → Launches **1 instance**.
- **`--key-name`** → Replace `MyKeyPair` with your actual **SSH key pair name**.
- **`--security-groups`** → Uses the **default security group**.
- **`--tag-specifications`** → Names it **"Lambda-Test-Instance"**.

✅ **After ~30 seconds**, check if the instance is running:

```bash
aws ec2 describe-instances --query "Reservations[*].Instances[*].{ID:InstanceId,State:State.Name}" --output table
```

✅ **Expected Output (if successful):**

```
----------------------
| DescribeInstances |
+----------------+-----------+
| ID             | State     |
+----------------+-----------+
| i-0123456789abcdef0 | running   |
+----------------+-----------+
```

🚀 **Now you have an EC2 instance for Lambda to control!**

---

## **✅ Step 2: Create the Lambda Function**

Now, create a new Python file called **`lambda_function.py`** with this content:

```python
import boto3
import os

# Initialize EC2 client
ec2 = boto3.client("ec2", region_name="us-east-1")

# Get action from environment variable (default: stop instances)
ACTION = os.getenv("EC2_ACTION", "stop").lower()

def lambda_handler(event, context):
    # Get all running EC2 instances
    response = ec2.describe_instances(Filters=[{"Name": "instance-state-name", "Values": ["running"]}])

    instance_ids = []
    for reservation in response["Reservations"]:
        for instance in reservation["Instances"]:
            instance_ids.append(instance["InstanceId"])

    if not instance_ids:
        print("✅ No running instances found.")
        return {"statusCode": 200, "message": "No instances to process."}

    # Perform start/stop action based on environment variable
    if ACTION == "start":
        print(f"🚀 Starting instances: {instance_ids}")
        ec2.start_instances(InstanceIds=instance_ids)
    else:
        print(f"🛑 Stopping instances: {instance_ids}")
        ec2.stop_instances(InstanceIds=instance_ids)

    return {"statusCode": 200, "message": f"EC2 instances {ACTION}ed: {instance_ids}"}
```

🔹 **By default, this function stops running instances.**  
🔹 **To make it start instances, set `EC2_ACTION=start` in the environment.**

---

## **✅ Step 3: Create and Upload Lambda Function**

1️⃣ **Zip the function file:**

```bash
zip lambda_function.zip lambda_function.py
```

2️⃣ **Create the Lambda function:**

```bash
aws lambda create-function \
    --function-name EC2AutoControl \
    --runtime python3.9 \
    --role arn:aws:iam::034362031047:role/LambdaExecutionRole \
    --handler lambda_function.lambda_handler \
    --zip-file fileb://lambda_function.zip \
    --environment Variables="{EC2_ACTION=stop}"
```

✅ **This creates a Lambda function that stops EC2 instances by default.**

---

## **✅ Step 4: Grant EC2 Control Permissions**

Attach the **`AmazonEC2FullAccess`** policy to your Lambda role:

```bash
aws iam attach-role-policy \
    --role-name LambdaExecutionRole \
    --policy-arn arn:aws:iam::aws:policy/AmazonEC2FullAccess
```

✅ **Now Lambda has permission to start/stop EC2 instances.**

---

## **✅ Step 5: Test Stopping Instances**

Run:

```bash
aws lambda invoke --function-name EC2AutoControl output.json
```

Then check the output:

```bash
cat output.json
```

- **If Lambda finds running instances**, it should stop them.
- If it says `"No instances to process."`, the instance might already be stopped.

---

## **✅ Step 6: Test Starting Instances**

Change the Lambda **environment variable** to `"start"`:

```bash
aws lambda update-function-configuration \
    --function-name EC2AutoControl \
    --environment Variables="{EC2_ACTION=start}"
```

Then invoke it:

```bash
aws lambda invoke --function-name EC2AutoControl output.json
```

✅ **Now Lambda should start your stopped instances.**

---

## **✅ Step 7: Check Logs & Verify in AWS Console**

Check the logs for details:

```bash
aws logs tail /aws/lambda/EC2AutoControl --follow
```

✅ **Expected Log Output (if Lambda successfully found instances):**

```
🚀 Starting instances: ['i-0123456789abcdef0']
🛑 Stopping instances: ['i-0123456789abcdef0']
```

Go to **AWS Console → EC2 → Instances**, and **confirm if the instance started/stopped**.

---

## **✅ (Optional) Step 8: Automate with EventBridge**

To **automatically start instances at 9 AM UTC daily**, run:

```bash
aws events put-rule \
    --name "EC2AutoControlSchedule" \
    --schedule-expression "cron(0 9 * * ? *)"
```

Then attach it to Lambda:

```bash
aws lambda add-permission \
    --function-name EC2AutoControl \
    --statement-id eventbridge-invoke \
    --action lambda:InvokeFunction \
    --principal events.amazonaws.com \
    --source-arn "arn:aws:events:us-east-1:034362031047:rule/EC2AutoControlSchedule"

aws events put-targets \
    --rule "EC2AutoControlSchedule" \
    --targets "Id"="1","Arn"="arn:aws:lambda:us-east-1:034362031047:function:EC2AutoControl"
```

✅ **Now your EC2 instances will start automatically at 9 AM UTC!**

---

## **🎯 Final Summary**

| **Step**            | **Action**                                  | **Command**                                         |
| ------------------- | ------------------------------------------- | --------------------------------------------------- |
| ✅ **1**            | **Create an EC2 instance manually**         | `aws ec2 run-instances ...`                         |
| ✅ **2**            | **Write Lambda function to control EC2**    | `lambda_function.py`                                |
| ✅ **3**            | **Upload Lambda function to AWS**           | `aws lambda create-function ...`                    |
| ✅ **4**            | **Grant EC2 control permissions to Lambda** | `aws iam attach-role-policy ...`                    |
| ✅ **5**            | **Invoke Lambda to stop instances**         | `aws lambda invoke ...`                             |
| ✅ **6**            | **Modify Lambda to start instances**        | `aws lambda update-function-configuration ...`      |
| ✅ **7**            | **Check logs for instance activity**        | `aws logs tail /aws/lambda/EC2AutoControl --follow` |
| ✅ **8 (Optional)** | **Automate start/stop with EventBridge**    | `aws events put-rule ...`                           |

🚀 **Now you can start & stop EC2 instances using Lambda!** 🔥

---

**📌 Print this out and follow each step.** If anything goes wrong, let me know where you get stuck, and I'll troubleshoot with you! 😊
