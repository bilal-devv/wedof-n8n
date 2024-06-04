/* eslint-disable n8n-nodes-base/node-filename-against-convention */
import type {
	IHookFunctions,
	INodeType,
	INodeTypeDescription,
	IWebhookFunctions,
	IWebhookResponseData,
} from 'n8n-workflow';
import { WedofWebhookApi } from './GenericFunctions';

export class WedofTrigger implements INodeType {
	description: INodeTypeDescription = {
		credentials: [
			{
				name: 'WedofApi',
				required: true,
			},
		],
		displayName: 'Wedof Trigger',
		defaults: {
			name: 'Wedof Trigger',
		},
		description: 'Facilitez-vous la vie avec Wedof !',
		group: ['trigger'],
		icon: 'file:wedof.svg',
		inputs: [],
		// keep sendinblue name for backward compatibility
		name: 'wedofTrigger',
		outputs: ['main'],
		version: 1,
		webhooks: [
			{
				name: 'default',
				httpMethod: 'POST',
				responseMode: 'onReceived',
				path: 'webhooks',
			},
		],
		properties: [
			{
				displayName: 'Resource',
				default: 'certification',
				name: 'type',
				options: [
					{ name: 'formation', value: 'formation' },
					{ name: 'certification', value: 'certification' },
				],
				required: true,
				type: 'options',
			},
			{
				displayName: 'Trigger',
				displayOptions: {
					show: {
						type: ['certification'],
					},
				},
				name: 'events',
				placeholder: 'Add Event',
				options: [
					{
						name: 'Dossier de certification à contrôler',
						value: 'certificationFolder.toControl',
						description: 'Dossier de certification à contrôler',
					},
					{
						name: 'Dossier de certification actualisé/mis à jour',
						value: 'certificationFolder.updated',
						description: 'Dossier de certification actualisé/mis à jour',
					},
				],
				default: [],
				required: true,
				type: 'multiOptions',
			},
			{
				displayName: 'Trigger',
				displayOptions: {
					show: {
						type: ['formation'],
					},
				},
				name: 'events',
				placeholder: 'Add Event',
				options: [
					{
						name: 'Dossier de formation actualisé/mis à jour',
						value: 'registrationFolder.updated',
						description: 'Dossier de formation actualisé/mis à jour',
					},
				],
				default: [],
				required: true,
				type: 'multiOptions',
			},
		],
	};

	webhookMethods = {
		default: {
			async checkExists(this: IHookFunctions): Promise<boolean> {
				const webhookData = this.getWorkflowStaticData('node');

				const webhookUrl = this.getNodeWebhookUrl('default') as string;

				const type = this.getNodeParameter('type') as string;

				const events = this.getNodeParameter('events') as string[];

				try {
					const { webhooks } = await WedofWebhookApi.fetchWebhooks(this, type);

					for (const webhook of webhooks) {
						if (
							webhook.type === type &&
							webhook.events.every((event) => events.includes(event)) &&
							webhookUrl === webhook.url
						) {
							webhookData.webhookId = webhook.id;
							return true;
						}
					}
					// If it did not error then the webhook exists
					return false;
				} catch (err) {
					return false;
				}
			},
			async create(this: IHookFunctions): Promise<boolean> {
				const webhookData = this.getWorkflowStaticData('node');

				const webhookUrl = this.getNodeWebhookUrl('default') as string;

				const events = this.getNodeParameter('events') as string[];

				const secret = '';

				const enabled = '';

				const ignoreSsl =  '';

				const responseData = await WedofWebhookApi.createWebHook(this, webhookUrl, events, secret, enabled, ignoreSsl);

				if (responseData?.id === undefined) {
					// Required data is missing so was not successful
					return false;
				}

				webhookData.webhookId = responseData.id;

				return true;
			},
			async delete(this: IHookFunctions): Promise<boolean> {
				const webhookData = this.getWorkflowStaticData('node');

				if (webhookData.webhookId !== undefined) {
					try {
						await WedofWebhookApi.deleteWebhook(this, webhookData.webhookId as string);
					} catch (error) {
						return false;
					}

					// Remove from the static workflow data so that it is clear
					// that no webhooks are registered anymore
					delete webhookData.webhookId;
					delete webhookData.webhookEvents;
					delete webhookData.hookSecret;
				}

				return true;
			},
		},
	};

	async webhook(this: IWebhookFunctions): Promise<IWebhookResponseData> {
		// The data to return and so start the workflow with
		const bodyData = this.getBodyData();

		return {
			workflowData: [this.helpers.returnJsonArray(bodyData)],
		};
	}
}
