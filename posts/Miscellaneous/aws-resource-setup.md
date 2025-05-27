# AWS Resource Setup

```python

import boto3
import logging
import json
from botocore.exceptions import ClientError

# Configure logging
logging.basicConfig(
    level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s"
)

# AWS Clients
ec2 = boto3.client("ec2")
s3 = boto3.client("s3")
iam = boto3.client("iam")

# Global Variables
AWS_REGION = "us-east-1"
S3_BUCKET_NAME = "iam-lab-bucket-123456789"
IAM_ROLE_NAME = "EC2S3AccessRole"
INSTANCE_PROFILE_NAME = "EC2S3InstanceProfile"
EC2_INSTANCE_NAME = "IAMLabEC2"
KEY_NAME = "my-key"
SECURITY_GROUP_NAME = "IAMLabSecurityGroup"


def key_pair_exists():
    """Checks if the key pair already exists."""
    try:
        ec2.describe_key_pairs(KeyNames=[KEY_NAME])
        return True
    except ClientError:
        return False


def create_key_pair():
    """Creates an EC2 key pair and saves it locally if it does not exist."""
    if key_pair_exists():
        logging.info(f"Key pair {KEY_NAME} already exists. Skipping creation.")
        return
    try:
        key_pair = ec2.create_key_pair(KeyName=KEY_NAME)
        with open(f"{KEY_NAME}.pem", "w") as file:
            file.write(key_pair["KeyMaterial"])
        logging.info(f"Key pair {KEY_NAME} created successfully.")
    except ClientError as e:
        logging.error(f"Error creating key pair: {e}")


def create_instance_profile():
    """Creates an IAM instance profile and associates it with the IAM role."""
    try:
        iam.create_instance_profile(InstanceProfileName=INSTANCE_PROFILE_NAME)
        iam.add_role_to_instance_profile(
            InstanceProfileName=INSTANCE_PROFILE_NAME, RoleName=IAM_ROLE_NAME
        )
        logging.info(
            f"Instance profile {INSTANCE_PROFILE_NAME} created and role {IAM_ROLE_NAME} attached."
        )
    except ClientError as e:
        logging.warning(f"Skipping instance profile creation: {e}")


def create_s3_bucket():
    """Creates an S3 bucket if it does not exist."""
    try:
        s3.create_bucket(Bucket=S3_BUCKET_NAME)
        logging.info(f"S3 bucket {S3_BUCKET_NAME} created successfully.")
    except ClientError as e:
        logging.warning(f"Skipping S3 bucket creation: {e}")


def create_iam_role():
    """Creates an IAM role for EC2 to access S3 if it does not exist."""
    assume_role_policy = {
        "Version": "2012-10-17",
        "Statement": [
            {
                "Effect": "Allow",
                "Principal": {"Service": "ec2.amazonaws.com"},
                "Action": "sts:AssumeRole",
            }
        ],
    }
    try:
        iam.create_role(
            RoleName=IAM_ROLE_NAME,
            AssumeRolePolicyDocument=json.dumps(assume_role_policy),
        )
        iam.attach_role_policy(
            RoleName=IAM_ROLE_NAME,
            PolicyArn="arn:aws:iam::aws:policy/AmazonS3FullAccess",
        )
        logging.info(
            f"IAM role {IAM_ROLE_NAME} created and attached to S3FullAccess policy."
        )
    except ClientError as e:
        logging.warning(f"Skipping IAM role creation: {e}")


def create_security_group():
    """Creates a security group allowing SSH and HTTP access."""
    try:
        response = ec2.create_security_group(
            GroupName=SECURITY_GROUP_NAME, Description="Security group for IAM Lab EC2"
        )
        security_group_id = response["GroupId"]
        logging.info(
            f"Security group {SECURITY_GROUP_NAME} created with ID {security_group_id}."
        )

        # Allow SSH (port 22) and HTTP (port 80) access
        ec2.authorize_security_group_ingress(
            GroupId=security_group_id,
            IpPermissions=[
                {
                    "IpProtocol": "tcp",
                    "FromPort": 22,
                    "ToPort": 22,
                    "IpRanges": [{"CidrIp": "0.0.0.0/0"}],
                },
                {
                    "IpProtocol": "tcp",
                    "FromPort": 80,
                    "ToPort": 80,
                    "IpRanges": [{"CidrIp": "0.0.0.0/0"}],
                },
            ],
        )
    except ClientError as e:
        logging.warning(f"Skipping security group creation: {e}")


def launch_ec2_instance():
    """Launches an EC2 instance with the IAM role and security group."""
    try:
        response = ec2.run_instances(
            ImageId="ami-014d544cfef21b42d",  # Amazon Linux 2 AMI in us-east-1
            InstanceType="t2.micro",
            KeyName=KEY_NAME,
            MinCount=1,
            MaxCount=1,
            SecurityGroups=[SECURITY_GROUP_NAME],
            IamInstanceProfile={"Name": INSTANCE_PROFILE_NAME},
            TagSpecifications=[
                {
                    "ResourceType": "instance",
                    "Tags": [{"Key": "Name", "Value": EC2_INSTANCE_NAME}],
                }
            ],
        )
        instance_id = response["Instances"][0]["InstanceId"]
        logging.info(
            f"EC2 instance {EC2_INSTANCE_NAME} launched with ID {instance_id}."
        )
    except ClientError as e:
        logging.error(f"Error launching EC2 instance: {e}")


if __name__ == "__main__":
    action = input("Enter 'setup' to create resources or 'cleanup' to remove them: ")
    if action.lower() == "setup":
        create_key_pair()
        create_s3_bucket()
        create_iam_role()
        create_instance_profile()
        create_security_group()
        launch_ec2_instance()
        logging.info(
            "Setup complete. Run script again with 'cleanup' to remove resources."
        )
    elif action.lower() == "cleanup":
        pass  # Cleanup function to be re-added later
    else:
        logging.info("Invalid input. Please enter 'setup' or 'cleanup'.")

```
