import type {
	INodeProperties,
} from 'n8n-workflow';


const getRF: INodeProperties[] = [
	{
		displayName: 'Numéro du dossier de formation',
		name: 'identifier',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['registrationFolders'],
				operation: ['getRF'],
			},
		},
		routing: {
			request: {
				method: 'GET',
				url: '=/registrationFolders/{{$value}}',
			},
		},
		required: true,
		default: '',
		description: 'Le numéro du dossier est l\'externalId',
	}
];

const getRFDocuments: INodeProperties[] = [
	{
		displayName: 'Numéro du dossier de formation',
		name: 'identifier',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['registrationFolders'],
				operation: ['getRFDocuments'],
			},
		},
		routing: {
			request: {
				method: 'GET',
				url: '=/registrationFolders/{{$value}}/files',
			},
		},
		required: true,
		default: '',
		description: 'Le numéro du dossier est l\'externalId',
	}
];

const getAllRF: INodeProperties[] = [
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['registrationFolders'],
				operation: ['getAllRF'],
			},
		},
		routing: {
			send: {
				type: 'query',
				property: 'limit',
			},
		},
		typeOptions: {
			minValue: 1,
			maxValue: 1000,
		},
		default: 50,
		description: 'Le nombre de résultats souhaités',
	},
	{
		displayName: 'Page',
		name: 'page',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['registrationFolders'],
				operation: ['getAllRF'],
			},
		},
		routing: {
			send: {
				type: 'query',
				property: 'page',
			},
		},
		typeOptions: {
			minValue: 1,
			maxValue: 1000,
		},
		default: '',
		description: 'Page',
	},
];

const getAllRFWithQueries: INodeProperties[] = [
	{
		displayName: 'Recherche',
		name: 'recherche',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['registrationFolders'],
				operation: ['getAllRFWithQueries'],
			},
		},
		routing: {
			send: {
				type: 'query',
				property: 'query',
			},
		},
		default: '',
		description: 'Rechercher par nom, prénom, email, n° de dossier, n° de formation, n° de certification etc.',
	},
	{
		displayName: 'Financement',
		name: 'type',
		type: 'multiOptions',
		displayOptions: {
			show: {
				resource: ['registrationFolders'],
				operation: ['getAllRFWithQueries'],
			},
		},
		options: [
			{name: "Tous", value: "all"},
			{name: "CPF", value: "cpf"},
			{name: "Kairos (AIF)", value: "kairosAif"},
			{name: "OPCO", value: "opco"},
			{name: "Entreprise", value: "company"},
			{name: "Autofinancement", value: "individual"},
			{name: "Pôle Emploi (Autres)", value: "poleEmploi"},
		],
		routing: {
			send: {
				type: 'query',
				property: 'type',
				value: "={{$value.join(',')}}"
			},
		},
		default: ['all'],
		description: 'Permet de n\'obtenir que les dossiers dans le type considéré - par défaut tous les types sont retournés.',
	},
	{
		displayName: 'État du dossier de formation',
		name: 'registrationFolderState',
		type: 'multiOptions',
		displayOptions: {
			show: {
				resource: ['registrationFolders'],
				operation: ['getAllRFWithQueries'],
			},
		},
		options: [
			{name: "Tous", value: "all"},
			{name: "Non traité", value: "notProcessed"},
			{name: "Validé", value: "validated"},
			{name: "Validé (En cours d'instruction Pôle emploi)", value: "waitingAcceptation"},
			{name: "Accepté", value: "accepted"},
			{name: "En formation", value: "inTraining"},
			{name: "Sortie de formation", value: "terminated"},
			{name: "Service fait déclaré", value: "serviceDone"},
			{name: "Service fait validé", value: "serviceDoneDeclared"},
			{name: "Annulé (par le titulaire)", value: "canceledByAttendee"},
			{name: "Annulation titulaire (non réalisé)", value: "canceledByAttendeeNotRealized"},
			{name: "Annulé (par l'organisme)", value: "canceledByOrganism"},
			{name: "Annulé (par le financeur)", value: "canceledByFinancer"},
			{name: "Refus titulaire", value: "refusedByAttendee"},
			{name: "Refusé (par l'organisme)", value: "refusedByOrganism"},
			{name: "Refusé (par le financeur)", value: "refusedByFinancer"},
			{name: "Annulé sans suite", value: "rejectedWithoutTitulaireSuite"}
		],
		routing: {
			send: {
				type: 'query',
				property: 'state',
				value: "={{$value.join(',')}}"
			},
		},
		default: ['all'],
		description: 'Permet de n\'obtenir que les dossiers dans l\'état considéré - par défaut tous les états sont retournés.',
	},
	{
		displayName: 'État du dossier de certification',
		name: 'certificationFolderState',
		type: 'multiOptions',
		displayOptions: {
			show: {
				resource: ['registrationFolders'],
				operation: ['getAllRFWithQueries'],
			},
		},
		options: [
			{name: "Tous", value: "all"},
			{name: "À enregistrer", value: "toRegister"},
			{name: "Enregistré", value: "registered"},
			{name: "Prêt à passer", value: "toTake"},
			{name: "À controler", value: "toControl"},
			{name: "Réussi", value: "success"},
			{name: "À repasser", value: "toRetake"},
			{name: "Echoué", value: "failed"},
			{name: "Refusé", value: "refused"},
			{name: "Abandonné", value: "aborted"}
		],
		routing: {
			send: {
				type: 'query',
				property: 'certificationFolderState',
				value: "={{$value.join(',')}}"
			},
		},
		default: ['all'],
		description: 'Permet de n\'obtenir que les dossiers dans l\'état d\'obtention de la formation considéré - par défaut tous les états sont retournés.',
	},
	{
		displayName: 'Financement',
		name: 'type',
		type: 'multiOptions',
		displayOptions: {
			show: {
				resource: ['registrationFolders'],
				operation: ['getAllRFWithQueries'],
			},
		},
		options: [
			{name: "Tous", value: "all"},
			{name: "CPF", value: "cpf"},
			{name: "Kairos (AIF)", value: "kairosAif"},
			{name: "OPCO", value: "opco"},
			{name: "Entreprise", value: "company"},
			{name: "Autofinancement", value: "individual"},
			{name: "Pôle Emploi (Autres)", value: "poleEmploi"},
		],
		routing: {
			send: {
				type: 'query',
				property: 'type',
				value: "={{$value.join(',')}}"
			},
		},
		default: ['all'],
		description: 'Permet de n\'obtenir que les dossiers dans le type considéré - par défaut tous les types sont retournés.',
	},
	{
		displayName: 'État de la facturation',
		name: 'billingState',
		type: 'multiOptions',
		displayOptions: {
			show: {
				resource: ['registrationFolders'],
				operation: ['getAllRFWithQueries'],
			},
		},
		options: [
			{name: "Tous", value: "all"},
			{name: "Pas facturable", value: "notBillable"},
			{name: "En attente du virement", value: "depositWait"},
			{name: "Virement effectué", value: "depositPaid"},
			{name: "A facturer", value: "toBill"},
			{name: "Facturé", value: "billed"},
			{name: "Payé", value: "paid"}
		],
		routing: {
			send: {
				type: 'query',
				property: 'billingState',
				value: "={{$value.join(',')}}"
			},
		},
		default: ['all'],
		description: 'Permet de n\'obtenir que les dossiers dans l\'état de facturation considéré - par défaut tous les états sont retournés.',
	},
	{
		displayName: 'État de contrôle',
		name: 'controlState',
		type: 'multiOptions',
		displayOptions: {
			show: {
				resource: ['registrationFolders'],
				operation: ['getAllRFWithQueries'],
			},
		},
		options: [
			{name: "Tous", value: "all"},
			{name: "Aucun contrôle", value: "notInControl"},
			{name: "En cours de contrôle", value: "inControl"},
			{name: "Contrôle terminé", value: "released"}
		],
		routing: {
			send: {
				type: 'query',
				property: 'controlState',
				value: "={{$value.join(',')}}"
			},
		},
		default: ['all'],
		description: 'Permet de n\'obtenir que les dossiers dans l\'état de contrôle considéré - par défaut tous les états sont retournés.',
	},
	{
		displayName: 'Période',
		name: 'periodRF',
		type: 'options',
		displayOptions: {
			show: {
				resource: ['registrationFolders'],
				operation: ['getAllRFWithQueries'],
			},
		},
		options: [
			{name: "Personnalisée", value: "custom" },
			{name: "Demain", value: "tomorrow"},
			{name: "Aujourd'hui", value: "today" },
			{name: "Hier", value: "yesterday"},
			{name: "7 derniers jours", value: "rollingWeek"},
			{name: "7 prochains jours", value: "rollingWeekFuture"},
			{name: "Semaine prochaine", value: "nextWeek"},
			{name: "Semaine précédente", value: "previousWeek"},
			{name: "Semaine courante", value: "currentWeek"},
			{name: "30 derniers jours", value: "rollingMonth"},
			{name: "30 prochains jours", value: "rollingMonthFuture"},
			{name: "Mois prochain", value: "nextMonth"},
			{name: "Mois précédent", value: "previousMonth"},
			{name: "Mois courant", value: "currentMonth"},
			{name: "12 derniers mois", value: "rollingYear"},
			{name: "12 prochains mois", value: "rollingYearFuture"},
			{name: "Année prochaine", value: "nextYear"},
			{name: "Année précédente", value: "previousYear"},
			{name: "Année courante", value: "currentYear"}
		],
		routing: {
			send: {
				type: 'query',
				property: 'period',
				value : '={{ $value !== \'\' ? $value : undefined }}'
			},
		},
		required: false,
		default: '',
		description: 'Filtre les dossiers de formation selon la période choisie.',
	},
	{
		displayName: "Depuis le",
		name: "since",
		type: "dateTime",
		displayOptions: {
			show: {
				"periodRF": ["custom"]
			}
		},
		routing: {
			send: {
				type: 'query',
				property: 'since',
			},
		},
		required: true,
		default: "",
		description: "Sélectionnez la date de début pour la période personnalisée."
	},
	{
		displayName: "Jusqu'au",
		name: "until",
		type: "dateTime",
		displayOptions: {
			show: {
				"periodRF": ["custom"]
			}
		},
		routing: {
			send: {
				type: 'query',
				property: 'until',
			},
		},
		required: true,
		default: "",
		description: "Sélectionnez la date de fin pour la période personnalisée."
	},
	{
		displayName: "Basé sur la date de",
		name: "filterOnStateDate",
		type: "options",
		displayOptions: {
			show: {
				"periodRF": ["custom", "tomorrow", "today", "yesterday", "rollingWeek",
					"rollingWeekFuture", "nextWeek", "previousWeek", "currentWeek", "rollingMonth",
					"rollingMonthFuture", "nextMonth", "previousMonth", "currentMonth", "rollingYear",
					"rollingYearFuture", "nextYear", "previousYear", "currentYear"
				]
			}
		},
		options: [
			{ name: "Passage à Non traité", value: "notProcessed" },
			{ name: "Passage à Validé", value: "validated" },
			{ name: "Passage à Validé (En cours d'instruction Pôle emploi)", value: "waitingAcceptation" },
			{ name: "Passage à Accepté", value: "accepted" },
			{ name: "Passage à En formation", value: "inTraining" },
			{ name: "Passage à Sortie de formation", value: "terminated" },
			{ name: "Passage à Service fait déclaré", value: "serviceDoneDeclared" },
			{ name: "Passage à Service fait validé", value: "serviceDoneValidated" },
			{ name: "Passage à Annulé (par le titulaire)", value: "canceledByAttendee" },
			{ name: "Passage à Annulation titulaire (non réalisé)", value: "canceledByAttendeeNotRealized" },
			{ name: "Passage à Annulé (par l'organisme)", value: "canceledByOrganism" },
			{ name: "Passage à Annulé (par le financeur)", value: "canceledByFinancer" },
			{ name: "Passage à Refus titulaire", value: "refusedByAttendee" },
			{ name: "Passage à Refusé (par l'organisme)", value: "refusedByOrganism" },
			{ name: "Passage à Refusé (par le financeur)", value: "refusedByFinancer" },
			{ name: "Dernière mise à jour (par défaut)", value: "lastUpdate" },
			{ name: "Date de début de session", value: "sessionStartDate" },
			{ name: "Date de fin de session", value: "sessionEndDate" }
		],
		routing: {
			send: {
				type: 'query',
				property: 'filterOnStateDate',
				value : '={{ $value !== "" ? $value : undefined }}'
			},
		},
		required: false,
		default: 'lastUpdate',
	},
	{
		displayName: 'Code de proposition',
		name: 'proposalCode',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['registrationFolders'],
				operation: ['getAllRFWithQueries'],
			},
		},
		routing: {
			send: {
				type: 'query',
				property: 'proposalCode',
			},
		},
		default: '',
		description: 'Permet de n\'obtenir que les dossiers associés à la proposition donnée.',
	},
	{
		displayName: 'Taux de complétion de la formation',
		name: 'completionRate',
		type: 'options',
		displayOptions: {
			show: {
				resource: ['registrationFolders'],
				operation: ['getAllRFWithQueries'],

			},
		},
		options: [
			{name: "Tous", value: "all"},
			{name: "Égal à 0%", value: "0"},
			{name: "Inférieur à 25%", value: "25<"},
			{name: "Comprise entre 25% et 80%", value: "25<>80"},
			{name: "Supérieur à 80%", value: ">80"},
			{name: "Égal à 100%", value: "100"}
		],
		routing: {
			send: {
				type: 'query',
				property: 'completionRate',
				value : '={{ $value !== \'all\' ? $value : undefined }}'
			},
		},
		default: 'all',
		description: 'Permet de n\'obtenir que les dossiers dont le taux d\'assiduité est égale à 0, inférieur à 25%, compris entre 25% et 80%, supérieurs à 80%, égal à 100% -par défaut tous les dossiers sont retournés.',
	},
	{
		displayName: 'Taux de complétion pas mis à jour depuis X jour(s)',
		name: 'daysSinceLastUpdatedCompletionRate',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['registrationFolders'],
				operation: ['getAllRFWithQueries'],
			},
		},
		routing: {
			send: {
				type: 'query',
				property: 'daysSinceLastUpdatedCompletionRate',
				value : '={{ $value !== \'\' ? $value : undefined }}'
			},
		},
		default: '',
		description: 'Permet de n\'obtenir que les dossiers pour lesquels le taux d\'avancement n\'a pas été mis à jour depuis plus de X jour(s), X étant le nombre de jours. -par défaut tous les dossiers sont retournés.',
	},
	{
		displayName: 'Tri sur critère',
		name: 'tri',
		type: 'options',
		displayOptions: {
			show: {
				resource: ['registrationFolders'],
				operation: ['getAllRFWithQueries'],
			},
		},
		options: [
			{name: "Prénom de l'apprenant", value: "firstName"},
			{name: "Nom de l'apprenant", value: "lastName"},
			{name: "Date de dernière mise à jour du dossier", value: "lastUpdate"}
		],
		routing: {
			send: {
				type: 'query',
				property: 'sort',
			},
		},
		default: 'lastUpdate',
		required: false,
		description: 'Tri les résultats sur un critère. dossier, par défaut \'Date de dernière mise à jour du dossier',
	},
	{
		displayName: 'Tri',
		name: 'order',
		type: 'options',
		displayOptions: {
			show: {
				resource: ['registrationFolders'],
				operation: ['getAllRFWithQueries'],
			},
		},
		options: [
			{name: "Ascendant", value: "asc"},
			{name: "Descendant", value: "desc"}
		],
		routing: {
			send: {
				type: 'query',
				property: 'order',
			},
		},
		default: 'desc',
		description: 'Tri les résultats par ordre ascendant ou descendant - par défaut descendant.',
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['registrationFolders'],
				operation: ['getAllRFWithQueries'],
			},
		},
		routing: {
			send: {
				type: 'query',
				property: 'limit',
			},
		},
		typeOptions: {
			minValue: 1,
			maxValue: 1000,
		},
		default: 100,
		description: 'Nombre d\'éléments retourné par requête - par défaut 10',
	},
	{
		displayName: 'Page',
		name: 'page',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['registrationFolders'],
				operation: ['getAllRFWithQueries'],
			},
		},
		routing: {
			send: {
				type: 'query',
				property: 'page',
			},
		},
		typeOptions: {
			minValue: 1,
		},
		default: 1,
		description: 'Numéro de page de la requête - par défaut la première.',
	},
];

const getRFActivitiesTasks: INodeProperties[] = [
	{
		displayName: 'Numéro du dossier de formation',
		name: 'identifier',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['registrationFolders'],
				operation: ['getRFActivitiesTasks'],
			},
		},
		routing: {
			request: {
				method: 'GET',
				url: '=/activities/RegistrationFolder/{{$value}}/',
			},
		},
		required: true,
		default: '',
		description: 'Le numéro du dossier est l\'externalId',
	}
];

const terminate: INodeProperties[] = [
	{
		displayName: 'Numéro du dossier de formation',
		name: 'identifier',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['registrationFolders'],
				operation: ['terminate'],
			},
		},
		routing: {
			request: {
				method: 'POST',
				url: '=/registrationFolders/{{$value}}/terminate',
			},
		},
		required: true,
		default: '',
		description: 'Le numéro du dossier est l\'externalId',
	},
	{
		displayName: 'Date de sortie de formation',
		name: 'date',
		type: 'dateTime',
		displayOptions: {
			show: {
				resource: ['registrationFolders'],
				operation: ['terminate'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'date',
			},
		},
		default: '',
		description: 'Date du sortie de formation au format YYYY-MM-DD. Par défaut, date du jour.',
	},
	{
		displayName: 'Code de sortie de formation',
		name: 'code',
		type: 'options',
		displayOptions: {
			show: {
				resource: ['registrationFolders'],
				operation: ['terminate'],
			},
		},
		typeOptions: {
			loadOptionsMethod: 'terminatedOrServiceDone',
		},
		default: ''
	},
	{
		displayName: 'Durée d\'absence (heures)',
		name: 'absenceDuration',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['registrationFolders'],
				operation: ['terminate'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'absenceDuration',
			},
		},
		default: '',
	},
]

const serviceDone: INodeProperties[] = [
	{
		displayName: 'Numéro du dossier de formation',
		name: 'identifier',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['registrationFolders'],
				operation: ['serviceDone'],
			},
		},
		routing: {
			request: {
				method: 'POST',
				url: '=/registrationFolders/{{$value}}/serviceDone',
			},
		},
		required: true,
		default: '',
		description: 'Le numéro du dossier est l\'externalId',
	},
	{
		displayName: 'Durée d\'absence (heures)',
		name: 'absenceDuration',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['registrationFolders'],
				operation: ['serviceDone'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'absenceDuration',
			},
		},
		default: '',
	},
	{
		displayName: 'Absence pour force majeure',
		name: 'forceMajeureAbsence',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['registrationFolders'],
				operation: ['serviceDone'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'forceMajeureAbsence',
			},
		},
		default: 'false',
	},
	{
		displayName: 'Durée de la formation',
		name: 'trainingDuration',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['registrationFolders'],
				operation: ['serviceDone'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'trainingDuration',
			},
		},
		default: 0,
		description: 'Date du sortie de formation au format YYYY-MM-DD. Par défaut, date du jour.',
	},
	{
		displayName: 'Code de sortie de formation',
		name: 'code',
		type: 'options',
		displayOptions: {
			show: {
				resource: ['registrationFolders'],
				operation: ['serviceDone'],
			},
		},
		typeOptions: {
			loadOptionsMethod: 'terminatedOrServiceDone',
		},
		routing: {
			send: {
				type: 'body',
				property: 'code',
			},
		},
		default: '',
	},
]

const inTraining: INodeProperties[] = [
	{
		displayName: 'Numéro du dossier de formation',
		name: 'identifier',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['registrationFolders'],
				operation: ['inTraining'],
			},
		},
		routing: {
			request: {
				method: 'POST',
				url: '=/registrationFolders/{{$value}}/inTraining',
			},
		},
		required: true,
		default: '',
		description: 'Le numéro du dossier est l\'externalId',
	},
	{
		displayName: 'Date du passage en formation',
		name: 'date',
		type: 'dateTime',
		displayOptions: {
			show: {
				resource: ['registrationFolders'],
				operation: ['inTraining'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'date',
				value: "={{$value}}"
			},
		},
		default: '',
		required: true
	},
]

const validate: INodeProperties[] = [
	{
		displayName: 'Numéro du dossier de formation',
		name: 'identifier',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['registrationFolders'],
				operation: ['validate'],
			},
		},
		routing: {
			request: {
				method: 'POST',
				url: '=/registrationFolders/{{$value}}/validate',
			},
		},
		required: true,
		default: '',
		description: 'Le numéro du dossier est l\'externalId',
	},
	{
		displayName: 'Durée totale de la formation (heures)',
		name: 'indicativeDuration',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['registrationFolders'],
				operation: ['validate'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'indicativeDuration',
			},
		},
		default: '',
	},
	{
		displayName: 'Durée par semaine de la formation (heures)',
		name: 'weeklyDuration',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['registrationFolders'],
				operation: ['validate'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'weeklyDuration',
			},
		},
		default: '',
	},
]

const billing: INodeProperties[] = [
	{
		displayName: 'Numéro du dossier de formation',
		name: 'identifier',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['registrationFolders'],
				operation: ['billing'],
			},
		},
		routing: {
			request: {
				method: 'POST',
				url: '=/registrationFolders/{{$value}}/billing',
			},
		},
		required: true,
		default: '',
		description: 'Le numéro du dossier est l\'externalId',
	},
	{
		displayName: 'Numéro de facture',
		name: 'bllNumber',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['registrationFolders'],
				operation: ['billing'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'billNumber',
			},
		},
		required: true,
		default: '',
	},
	{
		displayName: 'TVA en %',
		name: 'vatRate',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['registrationFolders'],
				operation: ['billing'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'vatRate',
			},
		},
		default: '',
	}
]

const cancel: INodeProperties[] = [
	{
		displayName: 'Numéro du dossier de formation',
		name: 'identifier',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['registrationFolders'],
				operation: ['cancel'],
			},
		},
		routing: {
			request: {
				method: 'POST',
				url: '=/registrationFolders/{{$value}}/cancel',
			},
		},
		required: true,
		default: '',
		description: 'Le numéro du dossier est l\'externalId',
	},
	{
		displayName: 'Code d\'annulation',
		name: 'code',
		type: 'options',
		displayOptions: {
			show: {
				resource: ['registrationFolders'],
				operation: ['cancel'],
			},
		},
		typeOptions: {
			loadOptionsMethod: 'canceled',
		},
		routing: {
			send: {
				type: 'body',
				property: 'code',
			},
		},
		required: true,
		default: '',
	},
	{
		displayName: 'Description',
		name: 'description',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['registrationFolders'],
				operation: ['cancel'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'description',
			},
		},
		description: 'Texte expliquant les raisons de l\'annulation',
		default: '',
	}
]

const updateRF: INodeProperties[] = [
	{
		displayName: 'Numéro du dossier de formation',
		name: 'identifier',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['registrationFolders'],
				operation: ['updateRF'],
			},
		},
		routing: {
			request: {
				method: 'PUT',
				url: '=/registrationFolders/{{$value}}',
			},
		},
		required: true,
		default: '',
		description: 'Le numéro du dossier est l\'externalId',
	},
	{
		displayName: 'Prix - Nouveau tarif en €',
		name: 'price',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['registrationFolders'],
				operation: ['updateRF'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'priceChange.price',
				value: "={{$value}}"
			},
		},
		default: ''
	},
	{
		displayName: 'Notes privées',
		name: 'notes',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['registrationFolders'],
				operation: ['updateRF'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'notes',
			},
		},
		default: '',
	},
	{
		displayName: 'Date de début de la session',
		name: 'sessionStartDate',
		type: 'dateTime',
		displayOptions: {
			show: {
				resource: ['registrationFolders'],
				operation: ['updateRF'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'trainingActionInfo.sessionStartDate',
			},
		},
		default: '',
	},
	{
		displayName: 'Date de fin de la sessionn',
		name: 'sessionEndDate',
		type: 'dateTime',
		displayOptions: {
			show: {
				resource: ['registrationFolders'],
				operation: ['updateRF'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'trainingActionInfo.sessionEndDate',
			},
		},
		default: '',
	},
	{
		displayName: 'Durée totale de la formation (heures)',
		name: 'indicativeDuration',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['registrationFolders'],
				operation: ['updateRF'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'trainingActionInfo.indicativeDuration',
			},
		},
		default: '',
	},
	{
		displayName: 'Durée par semaine de la formation (heures)',
		name: 'weeklyDuration',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['registrationFolders'],
				operation: ['updateRF'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'trainingActionInfo.weeklyDuration',
			},
		},
		default: '',
	},
]

const postTaskRF: INodeProperties[] = [
	{
		displayName: 'Numéro du dossier de formation',
		name: 'identifier',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['registrationFolders'],
				operation: ['postTaskRF'],
			},
		},
		routing: {
			request: {
				method: 'POST',
				url: '=/activities/RegistrationFolder/{{$value}}',
			},
		},
		required: true,
		default: '',
		description: 'Le numéro du dossier est l\'externalId',
	},
	{
		displayName: 'Titre',
		name: 'title',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['registrationFolders'],
				operation: ['postTaskRF'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'title',
			},
		},
		default: '',
		required: true
	},
	{
		displayName: 'Date d\'échéance',
		name: 'dueDate',
		type: 'dateTime',
		displayOptions: {
			show: {
				resource: ['registrationFolders'],
				operation: ['postTaskRF'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'dueDate',
				value : '={{ $value !== \'\' ? $value : undefined }}'
			},
		},
		required: false,
		default: '',
	},
	{
		displayName: 'Type',
		name: 'type',
		type: 'options',
		displayOptions: {
			show: {
				resource: ['registrationFolders'],
				operation: ['postTaskRF'],
			},
		},
		options: [
			{name: "Téléphone", value: "phone"},
			{name: "Email", value: "email"},
			{name: "Meeting", value: "meeting"},
			{name: "Chat", value: "chat"},
			{name: "SMS", value: "sms"},
			{name: "Formation", value: "training"},
			{name: "Remarque", value: "remark"},
			{name: "Document", value: "file"}
		],
		routing: {
			send: {
				type: 'body',
				property: 'type',
				value: '={{$value}}'
			},
		},
		required: true,
		default: '',
	},
	{
		displayName: 'Associée à Qualiopi',
		name: 'qualiopiIndicators',
		type: 'multiOptions',
		displayOptions: {
			show: {
				resource: ['registrationFolders'],
				operation: ['postTaskRF'],
			},
		},
		options: [
			{
				name: "Ind. 1 : Informations du public",
				value: 1
			},
			{
				name: "Ind. 2 : Indicateurs de résultats",
				value: 2
			},
			{
				name: "Ind. 3 : Obtentions des formations",
				value: 3
			},
			{
				name: "Ind. 4 : Analyse du besoin",
				value: 4
			},
			{
				name: "Ind. 5 : Objectifs de la prestation",
				value: 5
			},
			{
				name: "Ind. 6 : Mise en oeuvre de la prestation",
				value: 6
			},
			{
				name: "Ind. 7 : Adéquation contenus / exigences",
				value: 7
			},
			{
				name: "Ind. 8 : Positionnement à l'entrée",
				value: 8
			},
			{
				name: "Ind. 9 : Condition de déroulement",
				value: 9
			},
			{
				name: "Ind. 10 : Adaptation de la prestation",
				value: 10
			},
			{
				name: "Ind. 11 : Atteinte des objectifs",
				value: 11
			},
			{
				name: "Ind. 12 : Engagement des bénéficiaires",
				value: 12
			},
			{
				name: "Ind. 13 : Coordination des apprentis",
				value: 13
			},
			{
				name: "Ind. 14 : Exercice de la citoyenneté",
				value: 14
			},
			{
				name: "Ind. 15 : Droits à devoirs de l'apprenti",
				value: 15
			},
			{
				name: "Ind. 16 : Présentation à la formation",
				value: 16
			},
			{
				name: "Ind. 17 : Moyens humains et techniques",
				value: 17
			},
			{
				name: "Ind. 18 : Coordination des acteurs",
				value: 18
			},
			{
				name: "Ind. 19 : Ressources pédagogiques",
				value: 19
			},
			{
				name: "Ind. 20 : Personnels dédiés",
				value: 20
			},
			{
				name: "Ind. 21 : Compétences des acteurs",
				value: 21
			},
			{
				name: "Ind. 22 : Gestion des compétences",
				value: 22
			},
			{
				name: "Ind. 23 : Veille légale et réglementaire",
				value: 23
			},
			{
				name: "Ind. 24 : Veille emplois et métiers",
				value: 24
			},
			{
				name: "Ind. 25 : Veille technologique",
				value: 25
			},
			{
				name: "Ind. 26 : Public en situation de handicap",
				value: 26
			},
			{
				name: "Ind. 27 : Sous-traitance et portage salarial",
				value: 27
			},
			{
				name: "Ind. 28 : Formation Situation de travail",
				value: 28
			},
			{
				name: "Ind. 29 : Insertion professionnelle",
				value: 29
			},
			{
				name: "Ind. 30 : Recueil des appréciations",
				value: 30
			},
			{
				name: "Ind. 31 : Traitement des réclamations",
				value: 31
			},
			{
				name: "Ind. 32 : Mesures d'amélioration continue",
				value: 32
			}
		],
		routing: {
			send: {
				type: 'body',
				property: 'qualiopiIndicators',
			},
		},
		required: false,
		default: '',
	},
	{
		displayName: 'Description',
		name: 'description',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['registrationFolders'],
				operation: ['postTaskRF'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'description',
			},
		},
		required: false,
		default: '',
	},
	{
		displayName: 'Responsable (email de l\'utilisateur)',
		name: 'userEmail',
		type: 'options',
		displayOptions: {
			show: {
				resource: ['registrationFolders'],
				operation: ['postTaskRF'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'userEmail',
			},
		},
		typeOptions: {
			loadOptionsMethod: 'usersOrganisms'
		},
		default: '',
		description: 'L\'email utilisateur doit faire partis des emails des utilisateurs liés à l\'organisme.',
		required: true
	},
	{
		displayName: 'Lien (url) vers la tâche',
		name: 'link',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['registrationFolders'],
				operation: ['postTaskRF'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'link',
			},
		},
		default: '',
	},
	{
		displayName: 'Source de donnée de la tâche (humaine ou non)',
		name: 'origin',
		type: 'hidden',
		displayOptions: {
			show: {
				resource: ['registrationFolders'],
				operation: ['postTaskRF'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'origin',
				value: "={{$value}}"
			},
		},
		default: 'manual',
	},
]

const postActivityRF: INodeProperties[] = [
	{
		displayName: 'Numéro du dossier de formation',
		name: 'identifier',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['registrationFolders'],
				operation: ['postActivityRF'],
			},
		},
		routing: {
			request: {
				method: 'POST',
				url: '=/activities/RegistrationFolder/{{$value}}',
			},
		},
		required: true,
		default: '',
		description: 'Le numéro du dossier est l\'externalId',
	},
	{
		displayName: 'Titre',
		name: 'title',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['registrationFolders'],
				operation: ['postActivityRF'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'title',
			},
		},
		default: '',
		required: true
	},
	{
		displayName: 'Type',
		name: 'type',
		type: 'options',
		displayOptions: {
			show: {
				resource: ['registrationFolders'],
				operation: ['postActivityRF'],
			},
		},
		options: [
			{name: "Téléphone", value: "phone"},
			{name: "Email", value: "email"},
			{name: "Meeting", value: "meeting"},
			{name: "Chat", value: "chat"},
			{name: "SMS", value: "sms"},
			{name: "Formation", value: "training"},
			{name: "Remarque", value: "remark"},
			{name: "Document", value: "file"}
		],
		routing: {
			send: {
				type: 'body',
				property: 'type',
				value: '={{$value}}'
			},
		},
		required: true,
		default: '',
	},
	{
		displayName: 'Associée à Qualiopi',
		name: 'qualiopiIndicators',
		type: 'multiOptions',
		displayOptions: {
			show: {
				resource: ['registrationFolders'],
				operation: ['postActivityRF'],
			},
		},
		options: [
			{
				name: "Ind. 1 : Informations du public",
				value: 1
			},
			{
				name: "Ind. 2 : Indicateurs de résultats",
				value: 2
			},
			{
				name: "Ind. 3 : Obtentions des formations",
				value: 3
			},
			{
				name: "Ind. 4 : Analyse du besoin",
				value: 4
			},
			{
				name: "Ind. 5 : Objectifs de la prestation",
				value: 5
			},
			{
				name: "Ind. 6 : Mise en oeuvre de la prestation",
				value: 6
			},
			{
				name: "Ind. 7 : Adéquation contenus / exigences",
				value: 7
			},
			{
				name: "Ind. 8 : Positionnement à l'entrée",
				value: 8
			},
			{
				name: "Ind. 9 : Condition de déroulement",
				value: 9
			},
			{
				name: "Ind. 10 : Adaptation de la prestation",
				value: 10
			},
			{
				name: "Ind. 11 : Atteinte des objectifs",
				value: 11
			},
			{
				name: "Ind. 12 : Engagement des bénéficiaires",
				value: 12
			},
			{
				name: "Ind. 13 : Coordination des apprentis",
				value: 13
			},
			{
				name: "Ind. 14 : Exercice de la citoyenneté",
				value: 14
			},
			{
				name: "Ind. 15 : Droits à devoirs de l'apprenti",
				value: 15
			},
			{
				name: "Ind. 16 : Présentation à la formation",
				value: 16
			},
			{
				name: "Ind. 17 : Moyens humains et techniques",
				value: 17
			},
			{
				name: "Ind. 18 : Coordination des acteurs",
				value: 18
			},
			{
				name: "Ind. 19 : Ressources pédagogiques",
				value: 19
			},
			{
				name: "Ind. 20 : Personnels dédiés",
				value: 20
			},
			{
				name: "Ind. 21 : Compétences des acteurs",
				value: 21
			},
			{
				name: "Ind. 22 : Gestion des compétences",
				value: 22
			},
			{
				name: "Ind. 23 : Veille légale et réglementaire",
				value: 23
			},
			{
				name: "Ind. 24 : Veille emplois et métiers",
				value: 24
			},
			{
				name: "Ind. 25 : Veille technologique",
				value: 25
			},
			{
				name: "Ind. 26 : Public en situation de handicap",
				value: 26
			},
			{
				name: "Ind. 27 : Sous-traitance et portage salarial",
				value: 27
			},
			{
				name: "Ind. 28 : Formation Situation de travail",
				value: 28
			},
			{
				name: "Ind. 29 : Insertion professionnelle",
				value: 29
			},
			{
				name: "Ind. 30 : Recueil des appréciations",
				value: 30
			},
			{
				name: "Ind. 31 : Traitement des réclamations",
				value: 31
			},
			{
				name: "Ind. 32 : Mesures d'amélioration continue",
				value: 32
			}
		],
		routing: {
			send: {
				type: 'body',
				property: 'qualiopiIndicators',
			},
		},
		required: false,
		default: '',
	},
	{
		displayName: 'Description',
		name: 'description',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['registrationFolders'],
				operation: ['postActivityRF'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'description',
			},
		},
		required: false,
		default: '',
	},
	{
		displayName: 'Responsable (email de l\'utilisateur)',
		name: 'userEmail',
		type: 'options',
		displayOptions: {
			show: {
				resource: ['registrationFolders'],
				operation: ['postActivityRF'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'userEmail',
			},
		},
		typeOptions: {
			loadOptionsMethod: 'usersOrganisms'
		},
		default: '',
		description: 'L\'email utilisateur doit faire partis des emails des utilisateurs liés à l\'organisme.',
		required: true
	},
	{
		displayName: 'Date de début de la tâche',
		name: 'eventTime',
		type: 'dateTime',
		displayOptions: {
			show: {
				resource: ['registrationFolders'],
				operation: ['postActivityRF'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'eventTime',
				value: "={{$value}}"
			},
		},
		default: '',
		required: true
	},
	{
		displayName: 'Date de fin de l\'activité',
		name: 'eventEndTime',
		type: 'dateTime',
		displayOptions: {
			show: {
				resource: ['registrationFolders'],
				operation: ['postActivityRF'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'eventEndTime',
				value : '={{ $value !== \'\' ? $value : undefined }}'
			},
		},
		required: false,
		default: '',
	},
	{
		displayName: 'Lien (url) vers la tâche',
		name: 'link',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['registrationFolders'],
				operation: ['postActivityRF'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'link',
			},
		},
		required: false,
		default: '',
	},
	{
		displayName: 'Source de donnée de la tâche (humaine ou non)',
		name: 'origin',
		type: 'hidden',
		displayOptions: {
			show: {
				resource: ['registrationFolders'],
				operation: ['postActivityRF'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'origin',
				value: "={{$value}}"
			},
		},
		default: 'manual',
	},
]
const sendRFFiles: INodeProperties[] = [
	{
		displayName: 'Numéro du dossier de certification',
		name: 'identifier',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['registrationFolders'],
				operation: ['sendRFFiles'],
			},
		},
		routing: {
			request: {
				method: 'GET',
				url: '=/registrationFolders/{{$value}}/files',
			},
		},
		required: true,
		default: '',
		description: 'Le numéro du dossier est l\'id',
	},
	{
		displayName: 'Titre',
		name: 'title',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['registrationFolders'],
				operation: ['sendRFFiles'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'title',
			},
		},
		required: true,
		default: '',
	},
	{
		displayName: 'Type du fichier',
		name: 'typeId',
		type: 'string',
		description: "C'est le typeId du fichier que vous souhaitez upload",
		displayOptions: {
			show: {
				resource: ['registrationFolders'],
				operation: ['sendRFFiles'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'typeId',
			},
		},
		required: true,
		default: '',
	},
	{
		displayName: 'Fichier',
		name: 'file',
		type: 'string',
		description: 'Binary du fichier attendu',
		displayOptions: {
			show: {
				resource: ['registrationFolders'],
				operation: ['sendRFFiles'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'file',
			},
		},
		required: true,
		default: '',
	}
];
export const registrationFoldersOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: [
					'registrationFolders',
				],
			},
		},
		options: [
			{
				name: 'Récupérer un dossier',
				value: 'getRF',
				action: 'Récupérer un dossier',
			},
			{
				name: 'Liste des documents d\'un dossier',
				value: 'getRFDocuments',
				action: 'La liste des documents renseignés et attendus pour un dossier'
			},
			{
				name: 'Liste des dossiers',
				value: 'getAllRF',
				action: 'Liste des dossiers de mon l\'organisme\n',
				routing: {
					request: {
						method: 'GET',
						url: '=/registrationFolders',
					},
				},
			},
			{
				name: 'Rechercher un ou plusieurs dossiers',
				value: 'getAllRFWithQueries',
				action: 'Rechercher un ou plusieurs dossiers',
				routing: {
					request: {
						method: 'GET',
						url: '=/registrationFolders',
					},
				},
			},
			{
				name: 'Liste de toutes les activités et tâches d\'un dossier',
				value: 'getRFActivitiesTasks',
				action: 'Récupère l\'ensemble des activités et tâches liées à un dossier'
			},
			{
				name: 'Mettre à jour un dossier',
				value: 'updateRF',
				action: 'Mettre à un jour un dossier'
			},
			{
				name: 'Passer un dossier à l’état : sortie de formation',
				value: 'terminate',
				action: 'Change l\'état d\'un dossier vers : sortie de formation'
			},
			{
				name: 'Passer un dossier à l’état : service fait déclaré',
				value: 'serviceDone',
				action: 'Change l\'état d\'un dossier vers : service fait déclaré'
			},
			{
				name: 'Passer un dossier à l’état : en formation',
				value: 'inTraining',
				action: 'Change l\'état d\'un dossier vers : en formation'
			},
			{
				name: 'Passer un dossier à l’état : validé',
				value: 'validate',
				action: 'Change l\'état d\'un dossier vers : validé'
			},
			{
				name: 'Passer un dossier à l’état : facturé',
				value: 'billing',
				action: 'Change l\'état d\'un dossier vers : facturé'
			},
			{
				name: 'Passer un dossier à l’état : annulé',
				value: 'cancel',
				action: 'Change l\'état d\'un dossier vers : annulé'
			},
			{
				name: 'Passer un dossier à l’état : à contrôler',
				value: 'control',
				action: 'Change l\'état d\'un dossier vers : à contrôler'
			},
			{
				name: 'Passer un dossier à l’état : abandonné',
				value: 'abort',
				action: 'Change l\'état d\'un dossier vers : abandonné'
			},
			{
				name: 'Créer une tâche pour un dossier',
				value: 'postTaskRF',
				action: 'Créer une tâche pour un dossier'
			},
			{
				name: 'Créer une activité pour un dossier',
				value: 'postActivityRF',
				action: 'Créer une activité pour un dossier'
			},
			{
				name: 'Envoyer un fichier',
				value: 'sendRFFiles',
				action: 'Envoyer un fichier',
			},
		],
		default: 'getRF',
	},
	...getRF,
	...getRFDocuments,
	...getAllRF,
	...getAllRFWithQueries,
	...getRFActivitiesTasks,
	...terminate,
	...serviceDone,
	...inTraining,
	...validate,
	...billing,
	...cancel,
	...updateRF,
	...postTaskRF,
	...postActivityRF,
	...sendRFFiles
]

