import { Stage, Construct, StageProps } from "@aws-cdk/core";

//***********Import te resource stack***********
import { CdkPipelinesBlogStack } from "./cdk-pipelines-blog-stack";

export class BlogPipelineStage extends Stage {
	constructor(scope: Construct, id: string, props?: StageProps) {
		super(scope, id, props);

		//***********Instantiate the resource stack***********
		new CdkPipelinesBlogStack(this, `CdkPipelinesBlogStack`);
	}
}
