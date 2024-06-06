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
				default: 'certificationFolder',
				name: 'type',
				options: [
					{ name: 'Dossier de formation', value: 'registrationFolder' },
					{ name: 'Dossier de certification', value: 'certificationFolder' },
				],
				required: true,
				type: 'options',
			},
			{
				displayName: 'Trigger',
				displayOptions: {
					show: {
						type: ['certificationFolder'],
					},
				},
				name: 'events',
				placeholder: 'Sélectionnez un trigger',
				options: [
					{name: "Création d'un dossier", value: "certificationFolder.created"},
					{name: "Mise à jour du dossier", value: "certificationFolder.updated"},
					{name: "Accrochage réussi", value: "certificationFolder.accrochageOk"},
					{name: "Accrochage en erreur", value: "certificationFolder.accrochageKo"},
					{name: "À enregistrer", value: "certificationFolder.toRegister"},
					{name: "Enregistré", value: "certificationFolder.registered"},
					{name: "Prêt à passer", value: "certificationFolder.toTake"},
					{name: "À contrôler", value: "certificationFolder.toControl"},
					{name: "Réussi", value: "certificationFolder.success"},
					{name: "Refusé", value: "certificationFolder.refused"},
					{name: "Échoué", value: "certificationFolder.failed"},
					{name: "Abandonné", value: "certificationFolder.aborted"}
				],
				default: [],
				required: true,
				type: 'multiOptions',
			},
			{
				displayName: 'Trigger',
				displayOptions: {
					show: {
						type: ['registrationFolder'],
					},
				},
				name: 'events',
				placeholder: 'Sélectionnez un trigger',
				options: [
					{name: "Création d'un dossier", value: "registrationFolder.created"},
					{name: "Mise à jour d'un dossier", value: "registrationFolder.updated"},
					{name: "Annulé (par le titulaire)", value: "registrationFolder.canceledByAttendee"},
					{name: "Annulation titulaire (non réalisé)", value: "registrationFolder.canceledByAttendeeNotRealized"},
					{name: "Annulé (par l'organisme)", value: "registrationFolder.canceledByOrganism"},
					{name: "Annulé (par le financeur)", value: "registrationFolder.canceledByFinancer"},
					{name: "Refus titulaire", value: "registrationFolder.refusedByAttendee"},
					{name: "Refusé (par l'organisme)", value: "registrationFolder.refusedByOrganism"},
					{name: "Refusé (par le financeur)", value: "registrationFolder.refusedByFinancer"},
					{name: "Annulé sans suite", value: "registrationFolder.rejectedWithoutTitulaireSuite"},
					{name: "Non traité", value: "registrationFolder.notProcessed"},
					{name: "Validé", value: "registrationFolder.validated"},
					{name: "Validé (En cours d'instruction Pôle emploi)", value: "registrationFolder.waitingAcceptation"},
					{name: "Accepté", value: "registrationFolder.accepted"},
					{name: "En formation", value: "registrationFolder.inTraining"},
					{name: "Sortie de formation", value: "registrationFolder.terminated"},
					{name: "Service fait déclaré", value: "registrationFolder.serviceDone"},
					{name: "Service fait validé", value: "registrationFolder.serviceDoneDeclared"}
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
