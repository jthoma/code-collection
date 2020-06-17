# Some goodies from my devops environment

* [bash aliases](#bash_aliases)
* [aws-env-init](#envinit)
* [aws-permit-me](#permitme)

<a name="bash_aliases"></a>
## bash aliases

These snippets of code which can be added to the .bash_aliases in any [ubuntu](https://ubuntu.com) flavour, it may even work on [debian](https://www.debian.org/), but not sure, could make the environment for working in AWS a lot more easier. Not sure how this can be adopted to work on a [Mac](https://www.apple.com).

These are useful for advanced users and who might have to work on multiple AWS accounts simultaneously across different clients and multiple zones. Note that this helps only the *cli freaks*. 

The [aliases](./aliases.sh), on line 12 should be updated with a method to capture your machine IP if you are on a constantly changing ip, well if you could manage to get a stable static IP the aws-permit-me alias will not help much. But since I do work across multiple ISP and Mobile networks, I may need to find my IP, swap my old ip with the new one on a security group. For finding the ip any service can be used eg: [ifconfig.me](https://ifconfig.me/). But being an *aws sam freak* I did my own and you could also utilize the same from [here](../aws/echo-my-ip/).

The steps are first to create an admin group, create a user and add to the group, then create the programatic credentials when staring to access a new account. Once IAM user is created, then proceed with a tagged security group ( I extensively use EC2 ), and a key-pair. 

Now create a project folder run the [aws-env-init](./aws-env-init.sh) from this folder which will ask for the credentials and default region also the security group. This security group is updated with the current IP with "ALL Traffic" permitted when the [aws-permit-me](#permitme) is invoked. 

Aah! if you have to work on different regions, now is a time to create region based folders and in each of them add a new '.env' file with 
```
export AWS_DEFAULT_REGION=`basename $(pwd)`
'''

<a name="permitme"></a>
## aws-permit-me

Actually this is an alias command, once the .bash_aliases is updated with those from the [aliases.sh](./aliases.sh), and the shell is restared, this should be active. To explain how it works, first the current ip is identified, then checks if any previous ip was applied to the security group and revokes the same before adding permission for the current ip. Last the current ip is saved into .current.ip

## sshns and scpns

Nothing much other than to show that these aliases are already applied with ssh non secure switches, which help us to ignore the signature keys prompt. When there are hundreds of EC2 instances and while doing ssh into multiple ones, the known_hosts can grow to a very large size slowing down the ssh handshake.