# AWS Resource Clean up

```python

import boto3
import logging
import os
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


def empty_s3_bucket():
    """Empties the S3 bucket before deletion."""
    try:
        bucket = s3.list_objects_v2(Bucket=S3_BUCKET_NAME)
        if "Contents" in bucket:
            for obj in bucket["Contents"]:
                s3.delete_object(Bucket=S3_BUCKET_NAME, Key=obj["Key"])
                logging.info(f"Deleted {obj['Key']} from S3 bucket.")
        logging.info("S3 bucket emptied.")
    except ClientError as e:
        logging.warning(f"Skipping S3 bucket emptying: {e}")


def cleanup():
    """Cleans up AWS resources (EC2, S3, Key Pair,
    IAM Role, Instance Profile, and Security Group)."""
    logging.info("Starting cleanup process...")

    try:
        # Terminate EC2 instance
        response = ec2.describe_instances(
            Filters=[{"Name": "tag:Name", "Values": [EC2_INSTANCE_NAME]}]
        )
        instances = [
            i["InstanceId"]
            for r in response["Reservations"]
            for i in r["Instances"]
            if i["State"]["Name"] != "terminated"
        ]
        if instances:
            ec2.terminate_instances(InstanceIds=instances)
            logging.info("EC2 instance terminated. Waiting for full shutdown...")
            ec2.get_waiter("instance_terminated").wait(InstanceIds=instances)
            logging.info("EC2 instance fully terminated.")

        # Empty and Delete S3 Bucket
        empty_s3_bucket()
        try:
            s3.delete_bucket(Bucket=S3_BUCKET_NAME)
            logging.info("S3 bucket deleted.")
        except ClientError as e:
            logging.warning(f"Skipping S3 bucket deletion: {e}")

        # Delete Key Pair
        try:
            ec2.delete_key_pair(KeyName=KEY_NAME)
            logging.info("Key pair deleted.")
            if os.path.exists(f"{KEY_NAME}.pem"):
                os.remove(f"{KEY_NAME}.pem")
                logging.info("Local key pair file removed.")
        except ClientError as e:
            logging.warning(f"Skipping key pair deletion: {e}")

        # Delete Security Group
        try:
            response = ec2.describe_security_groups(
                Filters=[{"Name": "group-name", "Values": [SECURITY_GROUP_NAME]}]
            )
            for group in response["SecurityGroups"]:
                ec2.delete_security_group(GroupId=group["GroupId"])
                logging.info(f"Security group {SECURITY_GROUP_NAME} deleted.")
        except ClientError as e:
            logging.warning(f"Skipping security group deletion: {e}")

        # Ensure the IAM Role is Detached from Instance Profile before deletion
        try:
            instance_profiles = iam.list_instance_profiles()
            for profile in instance_profiles["InstanceProfiles"]:
                if profile["InstanceProfileName"] == INSTANCE_PROFILE_NAME:
                    for role in profile["Roles"]:
                        iam.remove_role_from_instance_profile(
                            InstanceProfileName=INSTANCE_PROFILE_NAME,
                            RoleName=IAM_ROLE_NAME,
                        )
                        logging.info(
                            f"Detached role {IAM_ROLE_NAME} from instance profile {INSTANCE_PROFILE_NAME}."
                        )
                    iam.delete_instance_profile(
                        InstanceProfileName=INSTANCE_PROFILE_NAME
                    )
                    logging.info(f"Instance profile {INSTANCE_PROFILE_NAME} deleted.")
        except ClientError as e:
            logging.warning(f"Skipping instance profile deletion: {e}")

        # Detach Policy and Delete IAM Role
        try:
            policies = iam.list_attached_role_policies(RoleName=IAM_ROLE_NAME)
            for policy in policies.get("AttachedPolicies", []):
                iam.detach_role_policy(
                    RoleName=IAM_ROLE_NAME, PolicyArn=policy["PolicyArn"]
                )
                logging.info(
                    f"Detached policy {policy['PolicyArn']} from role {IAM_ROLE_NAME}."
                )

            iam.delete_role(RoleName=IAM_ROLE_NAME)
            logging.info("IAM role deleted.")
        except ClientError as e:
            logging.warning(f"Skipping IAM role deletion: {e}")

    except ClientError as e:
        logging.error(f"Error during cleanup: {e}")

cleanup()
```
