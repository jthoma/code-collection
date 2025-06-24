# AWS/VPC::EIP::Lambda

Here you can find a base [sam](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/what-is-sam.html) template, which will need the [aws sam cli](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html).

By deploying this template you would be billed, on actuals by AWS since the NAT gateway would cost about 0.06 USD per hour plus the data transfer charges. Before using this template please check the standard rates on the respective pricing pages.

The template contains the following components 

* [AWS::EC2::VPC](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ec2-vpc.html) Specifies a VPC with the specified IPv4 CIDR block. The smallest VPC you can create uses a /28 netmask (16 IPv4 addresses), and the largest uses a /16 netmask (65,536 IPv4 addresses).
* [AWS::EC2::InternetGateway](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ec2-internetgateway.html), Allocates an internet gateway for use with a VPC. After creating the Internet gateway, you then attach it to a VPC. 
* [AWS::EC2::VPCGatewayAttachment](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ec2-vpc-gateway-attachment.html), Attaches an internet gateway, or a virtual private gateway to a VPC, enabling connectivity between the internet and the VPC. 
* [AWS::EC2::Subnet](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ec2-subnet.html), Specifies a subnet for a VPC.
* [AWS::EC2::RouteTable](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ec2-route-table.html)
* [AWS::EC2::SubnetRouteTableAssociation](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ec2-subnet-route-table-assoc.html)
* [AWS::EC2::Route](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ec2-route.html)
* [AWS::EC2::NatGateway](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ec2-natgateway.html)
* [AWS::EC2::EIP](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-ec2-eip.html)
* [AWS::EC2::SecurityGroup](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-ec2-security-group.html)
* [AWS::EC2::SecurityGroupIngress](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-ec2-security-group-ingress.html)
* [AWS::Serverless::Function](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/sam-resource-function.html)

## [test-code](test-code/) 

A minimal code which will test the implimentation to show that the lambda is indeed 
connecting external resource from the same EIP as that in the cloudformation stack output.;) jthoma stands for Jiju Thomas Mathew, which is my full name
