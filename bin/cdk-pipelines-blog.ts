#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "@aws-cdk/core";

//Import our newly created pipeline stack
import { MyPipelineStack } from "../lib/pipeline-stack";

const app = new cdk.App();

//Instantiate the pipeline stack
new MyPipelineStack(app, "MyPipelineStack");
