import * as cdk from "@aws-cdk/core";
import {
	CodeBuildStep,
	CodePipeline,
	CodePipelineSource
} from "@aws-cdk/pipelines";

//***********Import the pipeline stage***********
import { BlogPipelineStage } from "./pipeline-stage";

export class MyPipelineStack extends cdk.Stack {
	constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
		super(scope, id, props);

		const pipeline = new CodePipeline(this, "BlogPipeline", {
			pipelineName: "BlogPipeline",
			synth: new CodeBuildStep("SynthStep", {
				input: CodePipelineSource.connection(
					"binums/cdk-pipelines-blog",
					"main",
					{
						connectionArn:
							"arn:aws:codestar-connections:ap-south-1:541084636585:connection/1a1c6c84-f01d-4b8c-bd88-2aba210d2d0a"
					}
				),
				installCommands: ["npm install -g aws-cdk"],
				commands: ["npm ci", "npm run build", "npx cdk synth"]
			})
		});

		//***********Instantiate the stage and add it to the pipeline***********
		const deploy = new BlogPipelineStage(this, "Deploy");
		pipeline.addStage(deploy);
	}
}
