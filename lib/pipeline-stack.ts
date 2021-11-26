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
			//***********Change the name of the pipeline***********
			pipelineName: "BlogPipelineChanged",

			synth: new CodeBuildStep("SynthStep", {
				input: CodePipelineSource.connection(
					"<Repo owner>/<Repo name>",
					"main",
					{
						connectionArn: "ARN OF THE CODESTAR CONNECTION MADE EARLIER"
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
