	import { INodeType, INodeTypeDescription } from 'n8n-workflow';
	import {certificationFoldersOperations} from "./WedofCertificationFolders";
	export class Wedof implements INodeType {
		description: INodeTypeDescription = {
			// Basic node details will go here
			displayName: 'Wedof',
			name: 'Wedof',
			icon: 'file:wedof.svg',
			group: ['transform'],
			version: 1,
			subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
			description: 'Facilitez-vous la vie avec Wedof !',
			defaults: {
				name: 'Wedof',
			},
			inputs: ['main'],
			outputs: ['main'],
			credentials: [
				{
					name: 'WedofApi',
					required: true,
				},
			],
			requestDefaults: {
				baseURL: 'https://staging.wedof.fr/api',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					'x-api-key': '={{$credentials.apiKey}}'
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
							name: 'Dossier de certifications',
							value: 'certificationFolders',
						},
					],
					default: 'certificationFolders',
				},
				// Method goes here
				...certificationFoldersOperations,
			]
		};
	}
