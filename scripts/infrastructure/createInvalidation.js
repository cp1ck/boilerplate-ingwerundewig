const AWS = require('aws-sdk');

const cloudFormation = new AWS.CloudFormation();
const cloudFront = new AWS.CloudFront();
const stackName = process.argv[2];

cloudFormation.describeStacks({
    StackName: stackName
}, (error, data) => {
    if (error) {
        console.log(error.code, error);
        process.exit(1);
    } else {
        const stack = data.Stacks[0];
        stack.Outputs.forEach((output) => {
            if (output.OutputKey === 'CloudfrontDistributionID') {
                cloudFront.createInvalidation({
                    DistributionId: output.OutputValue,
                    InvalidationBatch: {
                        CallerReference: `${stackName}-${new Date().getTime()}`,
                        Paths: {
                            Quantity: 1,
                            Items: [
                                '/*'
                            ]
                        }
                    }
                }, (error) => {
                    if (error) {
                        console.log(error.code, error);
                        process.exit(1);
                    } else {
                        process.exit();
                    }
                });
            }
        });
    }
});
