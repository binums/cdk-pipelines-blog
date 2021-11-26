import * as cdk from "@aws-cdk/core";

//Import the lambda and apigateway constructs
import * as lambda from "@aws-cdk/aws-lambda";
import * as apigw from "@aws-cdk/aws-apigateway";

export class BlogResourcesStack extends cdk.Stack {
	constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
		super(scope, id, props);

		const blogLambda = new lambda.Function(this, `BlogLambdaHandler`, {
			runtime: lambda.Runtime.NODEJS_14_X,
			code: lambda.Code.fromAsset("lambda"),
			handler: "index.handler"
		});

		new apigw.LambdaRestApi(this, `BlogEndpoint`, {
			handler: blogLambda
		});
	}
}
