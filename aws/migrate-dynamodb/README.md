## AWS DynamoDB structure copy to another region

I recently had the complication of moving 100+ Dynamodb tables from the Singapre Region to Mumbai. I tried out all sorts of methods as suggested by various community members at multiple sites. Backup and Restore were mostly suggested, but eventually, it seemed that there was a huge wall that was that the tables should be created with the standard configuration in the target region before restoring data could happen. 

# Dependencies

* Linux Ubuntu preferred
* aws cli 
* nodejs at least v12.8.0 

# Be responsible and take care *not to export and create in the same region*

The cfg.sh is the main configuration file and while migrating from one region to another this has to be edited in between, for updating the DEFAULT REGION and if needed the rest of the credentials also.

# Process

* Update credentials into the "cfg.sh" 
* Invoke export.sh to export table configurations. 
* Update "cfg.sh" to setup the REGION 
* Invoke create.sh to create the tables 


# Role of NodeJS

The rewrite.js is invoked internally while export.sh is running in the loop. To explain, this was my first choice as it was easy for me to recreate the structure for the cli-input-json. *Note* in case of any error related to parsing input json with aws cli, then the rewrite has failed on your exported json. This was done with reference to the exported json using describe-table output JSON and the configuration in my environment.


# Disclaimer

This worked for me in my environment your milage can vary
* Ubuntu 20.04.6 LTS 
* aws-cli/2.0.34 Python/3.7.3 Linux/5.4.0-205-generic botocore/2.0.0dev38
* NodeJS v12.8.0

