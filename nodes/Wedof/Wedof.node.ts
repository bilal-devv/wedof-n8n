	import {INodePropertyOptions, INodeType, INodeTypeDescription} from 'n8n-workflow';
	import {certificationFoldersOperations} from "./WedofCertificationFolders";
	import {registrationFoldersOperations} from "./WedofRegistrationFolders";
	import {ILoadOptionsFunctions} from "n8n-core";
	import {wedofApiRequestAllItems} from "./GenericFunctions";
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
					testedBy: {
						request: {
							method: 'GET',
							url: '/users/me',
						},
					},
				},

			],
			requestDefaults: {
				baseURL: 'https://staging.wedof.fr/api',
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
							name: 'Dossier de certifications',
							value: 'certificationFolders',
						},
						{
							name: 'Dossier de formations',
							value: 'registrationFolders',
						},
					],
					default: 'registrationFolders',
				},
				// Method goes here
				...certificationFoldersOperations,
				...registrationFoldersOperations
			]
		};
		methods = {
			loadOptions: {
				async terminatedOrServiceDone(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
					const returnData: INodePropertyOptions[] = [];
					const datas = await wedofApiRequestAllItems.call(this, 'GET', '/registrationFoldersReasons?type=terminated');
					for (const data of datas) {
						const name = data.label;
						const value = data.code;
						returnData.push({
							name: name,
							value: value,
						});
					}
					return returnData;
				},
				async canceled(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
					const returnData: INodePropertyOptions[] = [];
					const datas = await wedofApiRequestAllItems.call(this, 'GET', '/registrationFoldersReasons?type=canceled');
					for (const data of datas) {
						const name = data.label;
						const value = data.code;
						returnData.push({
							name: name,
							value: value,
						});
					}
					return returnData;
				},
				async usersOrganisms(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
					const returnData: INodePropertyOptions[] = [];
					const datas = await wedofApiRequestAllItems.call(this, 'GET', '/users/me');
					const users = await wedofApiRequestAllItems.call(this, 'GET', `/users?siret=${datas._links.mainOrganism.siret}`);
					for (const data of users) {
						const name = data.name;
						const value = data.email;
						returnData.push({
							name: name,
							value: value,
						});
					}
					return returnData;
				},
			}
		}

	}
