Here's the enhanced version with AWS documentation sources and flashcards for ALB target group limitations:

## AWS Load Balancer Target Group Limitations

<h5> Documentation Sources</h5>

| Source Type                    | Description                           |
| ------------------------------ | ------------------------------------- |
| ALB Target Types Documentation | Official AWS docs on ALB target types |
| IP Address Target Requirements | Requirements for using IP targets     |
| ALB Target Group Limitations   | Service limits and constraints        |
| Service-Specific Limitations   | Flashcards for key limitations        |

## Flashcards

<h5> IP Target Requirements</h5>

| Front Side                                          | Back Side                                                                                                                                                                                                                                                                                                           |
| --------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **ALB Target Groups - IP Target Type Requirements** | - Only private IP addresses supported<br>- Must be from ALB's VPC or peered/connected networks<br>- Cannot use public IPs or Elastic IPs<br>- Targets can be EC2 instances, on-prem servers, or peered VPC resources<br>- Requires security groups allowing ALB traffic<br>- Health checks must succeed for routing |

<h5> Target Type Use Cases</h5>

| Front Side                                      | Back Side                                                                                                                                                                                                                                                                                 |
| ----------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **When to use IP targets vs instance targets?** | **Use IP targets when:**<br>- Targeting resources outside ALB's VPC (via peering/VPN)<br>- Routing to on-premises servers<br>- Using non-EC2 targets (like containers with private IPs)<br><br>**Use instance targets for:**<br>- EC2 instances in same VPC<br>- Auto-scaling integration |

<h5> ALB vs NLB Comparison</h5>

| Front Side                             | Back Side                                                                                                                                                                                                                   |
| -------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **ALB vs NLB - IP Target Differences** | **ALB:**<br>- Only private IP targets<br>- Supports path/header-based routing<br><br>**NLB:**<br>- Can use public/private IP targets<br>- Supports Elastic IPs<br>- Preserves source IP<br>- Better for extreme performance |

<h5> Additional Notes</h5>

| Category                | Content                                                               |
| ----------------------- | --------------------------------------------------------------------- |
| **Visual Cue**          | Draw a VPC diagram showing ALB routing to private IP targets          |
| **Exception Note**      | Network Load Balancers (NLBs) DO support public IP targets            |
| **Exam Trap**           | AWS might mix ALB/NLB questions to test your knowledge of differences |
| **Real-world Use Case** | "Migrating on-prem servers to AWS? Use IP targets during transition"  |

## AWS Load Balancer Comparison Tables

<h5> ALB vs NLB Core Differences</h5>

| Front Side                                        | Back Side                                                                                                                                                                                                                                                                                                                               |
| ------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **When to choose ALB over NLB (and vice versa)?** | **ALB (Layer 7):**<br>- Best for HTTP/HTTPS traffic<br>- Supports path/host-based routing<br>- Supports WebSockets<br>- Limitation: No static IP (use DNS name)<br><br>**NLB (Layer 4):**<br>- Best for TCP/UDP (e.g., gaming, IoT)<br>- Preserves source IP<br>- Supports static Elastic IPs<br>- Limitation: No content-based routing |

## Service Limits

<h5> ALB Hard Limits</h5>

| Front Side                   | Back Side                                                                                                                                                                  |
| ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **ALB's key service limits** | - Max listeners: 50 per ALB<br>- Max target groups: 3,000 per account<br>- Max rules per listener: 100<br>- Timeout: 1–4,000s (default: 60s)<br>- No FTP support (use NLB) |

<h5> NLB Hard Limits</h5>

| Front Side                   | Back Side                                                                                                                                                     |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **NLB's key service limits** | - Max listeners: 300 per NLB<br>- Max targets per AZ: 500 (IP targets)<br>- No HTTP/2 termination<br>- Static IPs: Must be Elastic IPs<br>- No SSL offloading |

## Health Checks & Features

<h5> ALB Health Checks</h5>

| Front Side                        | Back Side                                                                                                                                                          |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **ALB health check requirements** | - Protocols: HTTP, HTTPS, gRPC<br>- Path: 200–399 status code<br>- Interval: 5–300s (default: 30s)<br>- Timeout ≤ interval<br>- Unhealthy threshold: 2–10 failures |

<h5> Cross-Zone Load Balancing</h5>

| Front Side                              | Back Side                                                                                                                                                        |
| --------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Cross-zone differences (ALB vs NLB)** | **ALB:**<br>- Always enabled (free)<br>- Even distribution<br><br>**NLB:**<br>- Disabled by default<br>- Costs extra per AZ<br>- Required for equal distribution |

## SSL/TLS Capabilities

| Front Side             | Back Side                                                                                                                                                                                      |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **SSL/TLS comparison** | **ALB:**<br>- Native SSL termination<br>- Supports SNI (multiple certs)<br>- TLS 1.0–1.3<br><br>**NLB:**<br>- No native SSL offloading<br>- Requires TLS on targets<br>- End-to-end encryption |

## Integration Features

<h5> AWS WAF Integration</h5>

| Front Side           | Back Side                                                                                   |
| -------------------- | ------------------------------------------------------------------------------------------- |
| **ALB with AWS WAF** | - ALB only (NLB incompatible)<br>- Supports SQLi/XSS rules<br>- Regional scope (not global) |

<h5> Lambda Integration</h5>

| Front Side           | Back Side                                                                  |
| -------------------- | -------------------------------------------------------------------------- |
| **Lambda as target** | - ALB only<br>- Requires lambda:InvokeFunction<br>- Max timeout: 5 minutes |

## AWS Service Limits Reference

<h5> EC2 Limits</h5>

| Limit                        | Value | Notes                      |
| ---------------------------- | ----- | -------------------------- |
| Instances per Region         | 1,300 | Soft limit, can increase   |
| Elastic IPs per Region       | 5     | Use NAT Gateway for more   |
| VPCs per Region              | 5     | Soft limit                 |
| Security Groups per Instance | 5     | Each allows up to 60 rules |
| AMI Copies per Region        | 50    | Per AMI                    |

<h5> S3 Limits</h5>

| Limit                      | Value         | Notes                 |
| -------------------------- | ------------- | --------------------- |
| Buckets per Account        | 100           | Soft limit            |
| Maximum Object Size        | 5TB           | 5GB single PUT upload |
| PUT/COPY/POST Requests     | 3,500/sec     | Per prefix            |
| Lifecycle Rules per Bucket | 1,000         |                       |
| File System Locking        | Not supported | Use S3 Object Lock    |

<h5> RDS Limits</h5>

| Limit                       | Value           | Notes                    |
| --------------------------- | --------------- | ------------------------ |
| DB Instances per Region     | 40              | Soft limit               |
| Multi-AZ Deployments        | Limited engines | MySQL, PostgreSQL, etc.  |
| Read Replicas per Master    | 5               | 15 for Aurora            |
| Parameter Groups per Region | 50              |                          |
| Backup Retention Period     | 1-35 days       | Up to 35 days for Aurora |

<h5> Lambda Limits</h5>

| Limit                   | Value                       | Notes          |
| ----------------------- | --------------------------- | -------------- |
| Memory Range            | 128MB-10GB                  | 1MB increments |
| Timeout                 | 15 minutes                  | Maximum        |
| Concurrent Executions   | 1,000                       | Soft limit     |
| Deployment Package Size | 50MB (direct)<br>250MB (S3) |                |
| /tmp Storage            | 512MB-10GB                  |                |

<h5> DynamoDB Limits</h5>

| Limit               | Value     | Notes                  |
| ------------------- | --------- | ---------------------- |
| Table Size          | Unlimited | Partition limits apply |
| Maximum Item Size   | 400KB     |                        |
| WCUs/RCUs per Table | 40,000    | Default soft limit     |
| LSIs per Table      | 5         | Max 10GB per partition |
| GSIs per Table      | 20        |                        |

<h5> VPC & Networking Limits</h5>

| Limit                      | Value | Notes            |
| -------------------------- | ----- | ---------------- |
| Subnets per VPC            | 200   | Soft limit       |
| Route Tables per VPC       | 200   | Soft limit       |
| IPv4 CIDRs per VPC         | 5     | Max /16, min /28 |
| NAT Gateways per AZ        | 5     | Soft limit       |
| VPN Connections per Region | 50    | Soft limit       |

<h5> IAM Limits</h5>

| Limit                        | Value       | Notes             |
| ---------------------------- | ----------- | ----------------- |
| Policies per Entity          | 10          | Managed + inline  |
| Roles per Account            | 1,000       | Soft limit        |
| Instance Profiles per Region | 1,000       |                   |
| Policy Document Size         | 2,048 chars | 6,144 for managed |

<h5> CloudFront Limits</h5>

| Limit                            | Value         | Notes                    |
| -------------------------------- | ------------- | ------------------------ |
| Distributions per Account        | 200           | Soft limit               |
| Origins per Distribution         | 25            |                          |
| Cache Behaviors per Distribution | 50            |                          |
| Maximum TTL                      | 2 years       | Default: 24 hours        |
| SSH/RDP Access                   | Not supported | Use EC2 Instance Connect |

<h5> Other Service Limits</h5>

| Service     | Key Limit                                  |
| ----------- | ------------------------------------------ |
| SQS         | 120,000 inflight messages (standard queue) |
| SNS         | 100,000 topics per account                 |
| KMS         | 10,000 keys per account                    |
| ECS         | 5,000 tasks per cluster (Fargate)          |
| API Gateway | 10,000 requests/sec (regional)             |
