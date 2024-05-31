import {IHookFunctions, IWebhookFunctions, jsonParse} from "n8n-workflow";

class IRequestOptions {
}

export namespace WedofWebhookApi {
	interface WebhookDetails {
		url: string;
		id: number;
		secret: string;
		events: string[];
		siret: string;
		type: string;
		enabled: boolean;
		ignoreSsl: boolean;
	}

	interface WebhookId {
		id: string;
	}

	interface Webhooks {
		webhooks: WebhookDetails[];
	}

	const credentialsName = 'WedofApi';
	const baseURL = 'https://www.staging.wedof.fr/api';
	export const supportedAuthMap = new Map<string, (ref: IWebhookFunctions) => Promise<string>>([
		[
			'apiKey',
			async (ref: IWebhookFunctions): Promise<string> => {
				const credentials = await ref.getCredentials(credentialsName);
				return credentials.sharedSecret as string;
			},
		],
	]);

	export const fetchWebhooks = async (ref: IHookFunctions, webhookId: string): Promise<Webhooks> => {
		const endpoint = `${baseURL}/webhooks/${webhookId}`;

		const options: IRequestOptions = {
			method: 'GET',
			headers: {
				Accept: 'application/json',
			},
			uri: endpoint,
		};

		const webhooks = (await ref.helpers.requestWithAuthentication.call(
			ref,
			credentialsName,
			options,
		)) as string;

		return await jsonParse(webhooks);
	};

	export const createWebHook = async (
		ref: IHookFunctions,
		url: string,
		events: string[],
		secret: string,
		enabled: string,
		ignoreSsl: string,
	): Promise<WebhookId> => {
		const endpoint = `${baseURL}/webhooks`;

		const options: IRequestOptions = {
			method: 'POST',
			headers: {
				Accept: 'application/json',
			},
			uri: endpoint,
			body: {
				url,
				events,
				secret,
				enabled,
				ignoreSsl
			},
		};

		const webhookId = await ref.helpers.requestWithAuthentication.call(
			ref,
			credentialsName,
			options,
		);

		return await jsonParse(webhookId as string);
	};

	export const deleteWebhook = async (ref: IHookFunctions, webhookId: string) => {
		const endpoint = `${baseURL}/webhooks/${webhookId}`;
		const body = {};

		const options: IRequestOptions = {
			method: 'DELETE',
			headers: {
				Accept: 'application/json',
			},
			uri: endpoint,
			body,
		};

		return await ref.helpers.requestWithAuthentication.call(ref, credentialsName, options);
	};
}
