import {
	IDataObject,
	IHookFunctions,
	IHttpRequestMethods,
	IWebhookFunctions,
	JsonObject,
	jsonParse,
	NodeApiError
} from "n8n-workflow";
import {IExecuteFunctions, ILoadOptionsFunctions, IPollFunctions} from "n8n-core";

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

export async function wedofApiRequest(
	this: IExecuteFunctions | ILoadOptionsFunctions | IPollFunctions,
	method: IHttpRequestMethods,
	endpoint: string,
	body: IDataObject = {},
	qs: IDataObject = {},
	uri?: string,
	option: IDataObject = {},
) {

	let options: IRequestOptions = {
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json'
		},
		method,
		body,
		qs,
		uri: uri || `https://staging.wedof.fr/api${endpoint}`,
		qsStringifyOptions: {
			arrayFormat: 'repeat',
		},
		json: true,
	};
	options = Object.assign({}, options, option);
	try {

		let credentialType = 'WedofApi';

		return await this.helpers.requestWithAuthentication.call(
			this,
			credentialType,
			options,
		);

	} catch (error) {
		if (error.code === 'ERR_OSSL_PEM_NO_START_LINE') {
			error.statusCode = '401';
		}

		if (error.httpCode === '400') {
			if (error.cause && ((error.cause.message as string) || '').includes('Invalid id value')) {
				const resource = this.getNodeParameter('resource', 0) as string;
				const errorOptions = {
					message: `Invalid ${resource} ID`,
					description: `${
						resource.charAt(0).toUpperCase() + resource.slice(1)
					} IDs should look something like this: 182b676d244938bd`,
				};
				throw new NodeApiError(this.getNode(), error as JsonObject, errorOptions);
			}
		}

		if (error.httpCode === '404') {
			let resource = this.getNodeParameter('resource', 0) as string;
			if (resource === 'label') {
				resource = 'label ID';
			}
			const errorOptions = {
				message: `${resource.charAt(0).toUpperCase() + resource.slice(1)} not found`,
				description: '',
			};
			throw new NodeApiError(this.getNode(), error as JsonObject, errorOptions);
		}

		if (error.httpCode === '409') {
			const resource = this.getNodeParameter('resource', 0) as string;
			if (resource === 'label') {
				const errorOptions = {
					message: 'Label name exists already',
					description: '',
				};
				throw new NodeApiError(this.getNode(), error as JsonObject, errorOptions);
			}
		}


		if (
			((error.message as string) || '').includes('Bad request - please check your parameters') &&
			error.description
		) {
			const errorOptions = {
				message: error.description,
				description: '',
			};
			throw new NodeApiError(this.getNode(), error as JsonObject, errorOptions);
		}
		console.log(error);
		throw new NodeApiError(this.getNode(), error as JsonObject, {
			message: error.message,
			description: error.description,
		});
	}
}

export async function wedofApiRequestAllItems(
	this: IExecuteFunctions | ILoadOptionsFunctions | IPollFunctions,
	method: IHttpRequestMethods,
	endpoint: string,
	body: any = {},
): Promise<any> {

	let responseData;

	responseData = await wedofApiRequest.call(this, method, endpoint, body as IDataObject);

	return responseData;
}
