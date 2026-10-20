import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	NodeOperationError,
} from 'n8n-workflow';

export class Modelflare implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'ModelFlare',
		name: 'modelflare',
		icon: 'file:modelflare.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interact with ModelFlare API',
		defaults: {
			name: 'ModelFlare',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'modelflareApi',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: '={{$credentials.baseUrl}}',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Chat',
						value: 'chat',
					},
					{
						name: 'Model',
						value: 'model',
					},
				],
				default: 'chat',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['chat'],
					},
				},
				options: [
					{
						name: 'Create Completion',
						value: 'createCompletion',
						description: 'Create a chat completion',
						action: 'Create a chat completion',
					},
				],
				default: 'createCompletion',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['model'],
					},
				},
				options: [
					{
						name: 'List',
						value: 'list',
						description: 'List available models',
						action: 'List available models',
					},
				],
				default: 'list',
			},
			{
				displayName: 'Model',
				name: 'model',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['chat'],
						operation: ['createCompletion'],
					},
				},
				default: 'gpt-5.4',
				required: true,
				description: 'Model identifier to use (e.g., gpt-5.4, claude-opus-5-5, gemini-3.8-flash)',
			},
			{
				displayName: 'Messages',
				name: 'messages',
				type: 'fixedCollection',
				typeOptions: {
					multipleValues: true,
				},
				displayOptions: {
					show: {
						resource: ['chat'],
						operation: ['createCompletion'],
					},
				},
				default: {},
				placeholder: 'Add Message',
				options: [
					{
						name: 'messageValues',
						displayName: 'Message',
						values: [
							{
								displayName: 'Role',
								name: 'role',
								type: 'options',
								options: [
									{
										name: 'System',
										value: 'system',
									},
									{
										name: 'User',
										value: 'user',
									},
									{
										name: 'Assistant',
										value: 'assistant',
									},
								],
								default: 'user',
							},
							{
								displayName: 'Content',
								name: 'content',
								type: 'string',
								default: '',
								description: 'Message content',
							},
						],
					},
				],
			},
			{
				displayName: 'Additional Fields',
				name: 'additionalFields',
				type: 'collection',
				placeholder: 'Add Field',
				default: {},
				displayOptions: {
					show: {
						resource: ['chat'],
						operation: ['createCompletion'],
					},
				},
				options: [
					{
						displayName: 'Temperature',
						name: 'temperature',
						type: 'number',
						typeOptions: {
							minValue: 0,
							maxValue: 2,
							numberPrecision: 1,
						},
						default: 1,
						description: 'Sampling temperature to use',
					},
					{
						displayName: 'Max Tokens',
						name: 'max_tokens',
						type: 'number',
						default: 1000,
						description: 'Maximum number of tokens to generate',
					},
					{
						displayName: 'Stream',
						name: 'stream',
						type: 'boolean',
						default: false,
						description: 'Whether to stream the response',
					},
				],
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];
		const resource = this.getNodeParameter('resource', 0);
		const operation = this.getNodeParameter('operation', 0);

		for (let i = 0; i < items.length; i++) {
			try {
				if (resource === 'chat') {
					if (operation === 'createCompletion') {
						const model = this.getNodeParameter('model', i) as string;
						const messages = this.getNodeParameter('messages', i) as {
							messageValues: Array<{ role: string; content: string }>;
						};
						const additionalFields = this.getNodeParameter('additionalFields', i) as {
							temperature?: number;
							max_tokens?: number;
							stream?: boolean;
						};

						const body: any = {
							model,
							messages: messages.messageValues || [],
							...additionalFields,
						};

						const response = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'modelflareApi',
							{
								method: 'POST',
								url: '/v1/chat/completions',
								body,
							},
						);

						returnData.push({
							json: response,
							pairedItem: { item: i },
						});
					}
				} else if (resource === 'model') {
					if (operation === 'list') {
						const response = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'modelflareApi',
							{
								method: 'GET',
								url: '/api/v1/models',
							},
						);

						returnData.push({
							json: response,
							pairedItem: { item: i },
						});
					}
				}
			} catch (error) {
				if (this.continueOnFail()) {
					const errorMessage = error instanceof Error ? error.message : String(error);
					returnData.push({
						json: {
							error: errorMessage,
						},
						pairedItem: { item: i },
					});
					continue;
				}
				throw new NodeOperationError(
					this.getNode(),
					error instanceof Error ? error : new Error(String(error)),
					{
						itemIndex: i,
					},
				);
			}
		}

		return [returnData];
	}
}

