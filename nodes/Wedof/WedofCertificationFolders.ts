import type {
	INodeProperties,
} from 'n8n-workflow';


const getCF: INodeProperties[] = [
	{
		displayName: 'Numéro du dossier de certification',
		name: 'identifier',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['certificationFolders'],
				operation: ['getCF'],
			},
		},
		routing: {
			request: {
				method: 'GET',
				url: '=/certificationFolders/{{$value}}',
			},
		},
		required: true,
		default: '',
		description: 'Le numéro du dossier est l\'id',
	}
];

const getCFFiles: INodeProperties[] = [
	{
		displayName: 'Numéro du dossier de certification',
		name: 'identifier',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['certificationFolders'],
				operation: ['getCFFiles'],
			},
		},
		routing: {
			request: {
				method: 'GET',
				url: '=/certificationFolders/{{$value}}/files',
			},
		},
		required: true,
		default: '',
		description: 'Le numéro du dossier est l\'id',
	}
];

const getAllCF: INodeProperties[] = [
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['certificationFolders'],
				operation: ['getAllCF'],
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
				resource: ['certificationFolders'],
				operation: ['getAllCF'],
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
		default: '',
		description: 'Page',
	},
];

const getAllCFsWithQueries: INodeProperties[] = [
	{
		displayName: 'Recherche',
		name: 'recherche',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['certificationFolders'],
				operation: ['getAllCFsWithQueries'],
			},
		},
		routing: {
			send: {
				type: 'query',
				property: 'query',
			},
		},
		default: '',
		description: 'Rechercher par nom, prénom, email, n° de dossier, n° de certification etc.',
	},
	{
		displayName: 'État du dossier de formation',
		name: 'registrationFolderState',
		type: 'multiOptions',
		displayOptions: {
			show: {
				resource: ['certificationFolders'],
				operation: ['getAllCFsWithQueries'],
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
				property: 'registrationFolderState',
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
				resource: ['certificationFolders'],
				operation: ['getAllCFsWithQueries'],
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
				property: 'state',
				value: "={{$value.join(',')}}"
			},
		},
		default: ['all'],
		description: 'Permet de n\'obtenir que les dossiers dans l\'état d\'obtention de la certification considéré - par défaut tous les états sont retournés.',
	},
	{
		displayName: 'Période',
		name: 'periodCF',
		type: 'options',
		displayOptions: {
			show: {
				resource: ['certificationFolders'],
				operation: ['getAllCFsWithQueries'],
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
			{name: "Année courante", value: "currentYear"},
			{name: "Période de facturation Wedof en cours", value: "wedofInvoice"}
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
				"periodCF": ["custom"]
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
				"periodCF": ["custom"]
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
				"periodCF": ["custom", "tomorrow", "today", "yesterday", "rollingWeek",
					"rollingWeekFuture", "nextWeek", "previousWeek", "currentWeek", "rollingMonth",
					"rollingMonthFuture", "nextMonth", "previousMonth", "currentMonth", "rollingYear",
					"rollingYearFuture", "nextYear", "previousYear", "currentYear", "wedofInvoice"
				]
			}
		},
		options: [
			{ name: "Dernier changement d'état (par défaut)", value: "stateLastUpdate" },
			{ name: "Facturable par Wedof", value: "wedofInvoice" },
			{ name: "Passage à À enregistrer", value: "toRegister" },
			{ name: "Passage à Enregistré", value: "registered" },
			{ name: "Passage à Prêt à passer", value: "toTake" },
			{ name: "Passage à À contrôler", value: "toControl" },
			{ name: "Passage à Réussi", value: "success" },
			{ name: "Passage à À repasser", value: "toRetake" },
			{ name: "Passage à Échoué", value: "failed" },
			{ name: "Passage à Refusé", value: "refused" },
			{ name: "Passage à Abandonné", value: "aborted" },
			{ name: "Début de l'examen", value: "examinationDate" },
			{ name: "Fin de l'examen", value: "examinationEndDate" },
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
			{ name: "Passage à Annulé sans suite", value: "rejectedWithoutTitulaireSuite" }
		],
		routing: {
			send: {
				type: 'query',
				property: 'filterOnStateDate',
				value : '={{ $value !== "" ? $value : undefined }}'
			},
		},
		required: false,
		default: 'stateLastUpdate',
	},
	{
		displayName: 'Tri sur critère',
		name: 'tri',
		type: 'options',
		displayOptions: {
			show: {
				resource: ['certificationFolders'],
				operation: ['getAllCFsWithQueries'],
			},
		},
		options: [
			{name: "Date du dernier changement d'état", value: "stateLastUpdate"},
			{name: "Date du dernier dossier mis à réussi", value: "successDate"},
			{name: "Numéro de dossier", value: "id"}
		],
		routing: {
			send: {
				type: 'query',
				property: 'sort',
			},
		},
		default: 'stateLastUpdate',
		required: false,
		description: 'Tri les résultats sur un critère. dossier, par défaut \'Date de dernière mise à jour du dossier\'.',
	},
	{
		displayName: 'Tri',
		name: 'order',
		type: 'options',
		displayOptions: {
			show: {
				resource: ['certificationFolders'],
				operation: ['getAllCFsWithQueries'],
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
		displayName: 'État de l\'accrochage',
		name: 'cdcState',
		type: 'multiOptions',
		displayOptions: {
			show: {
				resource: ['certificationFolders'],
				operation: ['getAllCFsWithQueries'],
			},
		},
		options: [
			{name: "Tous", value: "all"},
			{name: "Jamais accroché", value: "notExported"},
			{name: "Envoyé et en attente de l'accusé", value: "exported"},
			{name: "Accrochage réussi", value: "processedOk"},
			{name: "Accrochage en erreur", value: "processedKo"}
		],
		routing: {
			send: {
				type: 'query',
				property: 'cdcState',
				value: "={{$value.join(',')}}"
			},
		},
		default: ['all'],
		description: 'Permet d\'indiquer où en est le dossier de certification dans le processus d\'accrochage auprès de la CDC',
	},
	{
		displayName: 'Exclus de l\'accrochage',
		name: 'cdcExcluded',
		type: 'options',
		displayOptions: {
			show: {
				resource: ['certificationFolders'],
				operation: ['getAllCFsWithQueries'],
			},
		},
		options: [
			{name: "Tous", value: "all"},
			{name: "Oui", value: true},
			{name: "Non", value: false}
		],
		routing: {
			send: {
				type: 'query',
				property: 'cdcExcluded',
				value : '={{ $value !== "all" ? $value : undefined }}'
			},
		},
		default: 'all',
		description: 'Permet de filtrer les dossiers de certification qui sont exclus de l\'accrochage',
	},
	{
		displayName: 'Données apprenant complètes',
		name: 'cdcCompliant',
		type: 'options',
		displayOptions: {
			show: {
				resource: ['certificationFolders'],
				operation: ['getAllCFsWithQueries'],
			},
		},
		options: [
			{name: "Tous", value: "all"},
			{name: "Oui", value: true},
			{name: "Non", value: false}
		],
		routing: {
			send: {
				type: 'query',
				property: 'cdcCompliant',
				value : '={{ $value !== \'all\' ? $value : undefined }}'
			},
		},
		default: 'all',
		description: 'Permet de filtrer les dossiers de certification selon le fait qu\'ils contiennent les données de l\'apprenant obligatoires pour l\'accrochage en cas d\'obtention de la certification',
	},
	{
		displayName: 'Inclus dans les prochains accrochages',
		name: 'cdcToExport',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['certificationFolders'],
				operation: ['getAllCFsWithQueries'],
			},
		},
		routing: {
			send: {
				type: 'query',
				property: 'cdcToExport',
			},
		},
		default: true,
		description: 'Permet de filtrer les dossiers de certification qui devront être inclus dans les prochains exports pour l\'accrochage (par défaut oui, sauf si déjà accroché avec succès)',
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['certificationFolders'],
				operation: ['getAllCFsWithQueries'],
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
				resource: ['certificationFolders'],
				operation: ['getAllCFsWithQueries'],
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

const getCFActivitiesTasks: INodeProperties[] = [
	{
		displayName: 'Numéro du dossier de certification',
		name: 'identifier',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['certificationFolders'],
				operation: ['getCFActivitiesTasks'],
			},
		},
		routing: {
			request: {
				method: 'GET',
				url: '=/activities/CertificationFolder/{{$value}}/',
			},
		},
		required: true,
		default: '',
		description: 'Le numéro du dossier est l\'id',
	}
];

const success: INodeProperties[] = [
	{
		displayName: 'Numéro du dossier de certification',
		name: 'identifier',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['certificationFolders'],
				operation: ['success'],
			},
		},
		routing: {
			request: {
				method: 'POST',
				url: '=/certificationFolders/{{$value}}/success',
			},
		},
		required: true,
		default: '',
		description: 'Le numéro du dossier est l\'id',
	},
	{
		displayName: 'Détail du résultat de l\'examen',
		name: 'detailedResult',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['certificationFolders'],
				operation: ['success'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'detailedResult',
			},
		},
		default: '',
		description: 'Score ou base de notation atteint par le titulaire lors de la certification',
	},
	{
		displayName: 'Date d\'obtention de la certification',
		name: 'issueDate',
		type: 'dateTime',
		displayOptions: {
			show: {
				resource: ['certificationFolders'],
				operation: ['success'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'issueDate',
				value: "={{$value}}"
			},
		},
		default: '',
		required: true
	},
	{
		displayName: 'Lien vers la preuve numérique de l\'obtention de la certification',
		name: 'digitalProofLink',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['certificationFolders'],
				operation: ['success'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'digitalProofLink',
			},
		},
		default: '',
		description: 'Dans le cas où une preuve de la certification est remise sous forme numérique, indiquer le lien d’accès qui doit être durable et vérifié.'
	},
	{
		displayName: 'Commentaire',
		name: 'comment',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['certificationFolders'],
				operation: ['success'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'comment',
			},
		},
		default: '',
	},
	{
		displayName: 'Mention obtenue',
		name: 'gradePass',
		type: 'options',
		displayOptions: {
			show: {
				resource: ['certificationFolders'],
				operation: ['success'],
			},
		},
		options: [
			{name: "Sans mention", value: "SANS_MENTION"},
			{name: "Mention assez bien", value: "MENTION_ASSEZ_BIEN"},
			{name: "Mention bien", value: "MENTION_BIEN"},
			{name: "Mention très bien", value: "MENTION_TRES_BIEN"},
			{name: "Mention très bien avec félicitations du jury", value: "MENTION_TRES_BIEN_AVEC_FELICITATIONS_DU_JURY"}
		],
		routing: {
			send: {
				type: 'body',
				property: 'gradePass',
			},
		},
		default: '',
	},
	{
		displayName: 'Nomenclature européeenne pour les certifications de langues',
		name: 'europeanLanguageLevel',
		type: 'options',
		displayOptions: {
			show: {
				resource: ['certificationFolders'],
				operation: ['success'],
			},
		},
		options: [
			{name: "C2", value: "C2"},
			{name: "C1", value: "C1"},
			{name: "B2", value: "B2"},
			{name: "B1", value: "B1"},
			{name: "A2", value: "A2"},
			{name: "A1", value: "A1"},
			{name: "Insuffisant", value: "Insuffisant"},
		],
		routing: {
			send: {
				type: 'body',
				property: 'europeanLanguageLevel',
			},
		},
		default: '',
	},
]

const refuse: INodeProperties[] = [
	{
		displayName: 'Numéro du dossier de certification',
		name: 'identifier',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['certificationFolders'],
				operation: ['refuse'],
			},
		},
		routing: {
			request: {
				method: 'POST',
				url: '=/certificationFolders/{{$value}}/refuse',
			},
		},
		required: true,
		default: '',
		description: 'Le numéro du dossier est l\'id',
	},
	{
		displayName: 'Commentaire',
		name: 'comment',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['certificationFolders'],
				operation: ['refuse'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'comment',
			},
		},
		default: '',
	}
]

const take: INodeProperties[] = [
	{
		displayName: 'Numéro du dossier de certification',
		name: 'identifier',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['certificationFolders'],
				operation: ['take'],
			},
		},
		routing: {
			request: {
				method: 'POST',
				url: '=/certificationFolders/{{$value}}/take',
			},
		},
		required: true,
		default: '',
		description: 'Le numéro du dossier est l\'id',
	},
	{
		displayName: 'Date de début de l\'examen',
		name: 'examinationDate',
		type: 'dateTime',
		displayOptions: {
			show: {
				resource: ['certificationFolders'],
				operation: ['take'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'examinationDate',
				value: "={{$value}}"
			},
		},
		default: '',
	},
	{
		displayName: 'Date de fin de l\'examen',
		name: 'examinationEndDate',
		type: 'dateTime',
		displayOptions: {
			show: {
				resource: ['certificationFolders'],
				operation: ['take'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'examinationEndDate',
				value: "={{$value}}"
			},
		},
		default: '',
	},
	{
		displayName: 'Lieu de passage de l\'examin',
		name: 'examinationPlace',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['certificationFolders'],
				operation: ['take'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'examinationPlace',
			},
		},
		default: '',
		description: 'Le numéro du dossier est l\'id',
	},
	{
		displayName: 'Mention obtenue',
		name: 'examinationType',
		type: 'options',
		displayOptions: {
			show: {
				resource: ['certificationFolders'],
				operation: ['take'],
			},
		},
		options: [
			{name: "À distance", value: "A_DISTANCE"},
			{name: "En présentiel", value: "EN_PRESENTIEL"},
			{name: "Mixte (à distance et en présentiel)", value: "MIXTE"},
		],
		routing: {
			send: {
				type: 'body',
				property: 'examinationType',
				value: '={{$value}}'
			},
		},
		default: '',
	},
	{
		displayName: 'Date d\'inscription à la certification',
		name: 'enrollmentDate',
		type: 'dateTime',
		displayOptions: {
			show: {
				resource: ['certificationFolders'],
				operation: ['take'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'enrollmentDate',
				value: "={{$value}}"
			},
		},
		default: '',
	},
	{
		displayName: 'Commentaire',
		name: 'comment',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['certificationFolders'],
				operation: ['take'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'comment',
			},
		},
		default: '',
	}
]

const register: INodeProperties[] = [
	{
		displayName: 'Numéro du dossier de certification',
		name: 'identifier',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['certificationFolders'],
				operation: ['register'],
			},
		},
		routing: {
			request: {
				method: 'POST',
				url: '=/certificationFolders/{{$value}}/register',
			},
		},
		required: true,
		default: '',
		description: 'Le numéro du dossier est l\'id',
	},
	{
		displayName: 'Date de début de l\'examen',
		name: 'examinationDate',
		type: 'dateTime',
		displayOptions: {
			show: {
				resource: ['certificationFolders'],
				operation: ['register'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'examinationDate',
				value: "={{$value}}"
			},
		},
		default: '',
	},
	{
		displayName: 'Date de fin de l\'examen',
		name: 'examinationEndDate',
		type: 'dateTime',
		displayOptions: {
			show: {
				resource: ['certificationFolders'],
				operation: ['register'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'examinationEndDate',
				value: "={{$value}}"
			},
		},
		default: '',
	},
	{
		displayName: 'Lieu de passage de l\'examin',
		name: 'examinationPlace',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['certificationFolders'],
				operation: ['register'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'examinationPlace',
			},
		},
		default: '',
		description: 'Le numéro du dossier est l\'id',
	},
	{
		displayName: 'Mention obtenue',
		name: 'examinationType',
		type: 'options',
		displayOptions: {
			show: {
				resource: ['certificationFolders'],
				operation: ['register'],
			},
		},
		options: [
			{name: "À distance", value: "A_DISTANCE"},
			{name: "En présentiel", value: "EN_PRESENTIEL"},
			{name: "Mixte (à distance et en présentiel)", value: "MIXTE"},
		],
		routing: {
			send: {
				type: 'body',
				property: 'examinationType',
				value: '={{$value}}'
			},
		},
		default: '',
	},
	{
		displayName: 'Date d\'inscription à la certification',
		name: 'enrollmentDate',
		type: 'dateTime',
		displayOptions: {
			show: {
				resource: ['certificationFolders'],
				operation: ['register'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'enrollmentDate',
				value: "={{$value}}"
			},
		},
		default: '',
	},
	{
		displayName: 'Commentaire',
		name: 'comment',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['certificationFolders'],
				operation: ['register'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'comment',
			},
		},
		default: '',
	}
]

const fail: INodeProperties[] = [
	{
		displayName: 'Numéro du dossier de certification',
		name: 'identifier',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['certificationFolders'],
				operation: ['fail'],
			},
		},
		routing: {
			request: {
				method: 'POST',
				url: '=/certificationFolders/{{$value}}/fail',
			},
		},
		required: true,
		default: '',
		description: 'Le numéro du dossier est l\'id',
	},
	{
		displayName: 'Détail du résultat de l\'examen',
		name: 'detailedResult',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['certificationFolders'],
				operation: ['fail'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'detailedResult',
			},
		},
		default: '',
		description: 'Score ou base de notation atteint par le titulaire lors de la certification',
	},
	{
		displayName: 'Commentaire',
		name: 'comment',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['certificationFolders'],
				operation: ['fail'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'comment',
			},
		},
		default: '',
	},
	{
		displayName: 'Nomenclature européeenne pour les certifications de langues',
		name: 'europeanLanguageLevel',
		type: 'options',
		displayOptions: {
			show: {
				resource: ['certificationFolders'],
				operation: ['fail'],
			},
		},
		options: [
			{name: "C2", value: "C2"},
			{name: "C1", value: "C1"},
			{name: "B2", value: "B2"},
			{name: "B1", value: "B1"},
			{name: "A2", value: "A2"},
			{name: "A1", value: "A1"},
			{name: "Insuffisant", value: "Insuffisant"},
		],
		routing: {
			send: {
				type: 'body',
				property: 'europeanLanguageLevel',
			},
		},
		default: '',
	},
]

const retake: INodeProperties[] = [
	{
		displayName: 'Numéro du dossier de certification',
		name: 'identifier',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['certificationFolders'],
				operation: ['retake'],
			},
		},
		routing: {
			request: {
				method: 'POST',
				url: '=/certificationFolders/{{$value}}/retake',
			},
		},
		required: true,
		default: '',
		description: 'Le numéro du dossier est l\'id',
	},
	{
		displayName: 'Date de début de l\'examen',
		name: 'examinationDate',
		type: 'dateTime',
		displayOptions: {
			show: {
				resource: ['certificationFolders'],
				operation: ['retake'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'examinationDate',
				value: "={{$value}}"
			},
		},
		default: '',
	},
	{
		displayName: 'Date de fin de l\'examen',
		name: 'examinationEndDate',
		type: 'dateTime',
		displayOptions: {
			show: {
				resource: ['certificationFolders'],
				operation: ['retake'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'examinationEndDate',
				value: "={{$value}}"
			},
		},
		default: '',
	},
	{
		displayName: 'Lieu de passage de l\'examin',
		name: 'examinationPlace',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['certificationFolders'],
				operation: ['retake'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'examinationPlace',
			},
		},
		default: '',
		description: 'Le numéro du dossier est l\'id',
	},
	{
		displayName: 'Mention obtenue',
		name: 'examinationType',
		type: 'options',
		displayOptions: {
			show: {
				resource: ['certificationFolders'],
				operation: ['retake'],
			},
		},
		options: [
			{name: "À distance", value: "A_DISTANCE"},
			{name: "En présentiel", value: "EN_PRESENTIEL"},
			{name: "Mixte (à distance et en présentiel)", value: "MIXTE"},
		],
		routing: {
			send: {
				type: 'body',
				property: 'examinationType',
				value: '={{$value}}'
			},
		},
		default: '',
	},
	{
		displayName: 'Date d\'inscription à la certification',
		name: 'enrollmentDate',
		type: 'dateTime',
		displayOptions: {
			show: {
				resource: ['certificationFolders'],
				operation: ['retake'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'enrollmentDate',
				value: "={{$value}}"
			},
		},
		default: '',
	},
	{
		displayName: 'Commentaire',
		name: 'comment',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['certificationFolders'],
				operation: ['retake'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'comment',
			},
		},
		default: '',
	}
]

const control: INodeProperties[] = [
	{
		displayName: 'Numéro du dossier de certification',
		name: 'identifier',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['certificationFolders'],
				operation: ['control'],
			},
		},
		routing: {
			request: {
				method: 'POST',
				url: '=/certificationFolders/{{$value}}/control',
			},
		},
		required: true,
		default: '',
		description: 'Le numéro du dossier est l\'id',
	},
	{
		displayName: 'Date de début de l\'examen',
		name: 'examinationDate',
		type: 'dateTime',
		displayOptions: {
			show: {
				resource: ['certificationFolders'],
				operation: ['control'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'examinationDate',
				value: "={{$value}}"
			},
		},
		default: '',
	},
	{
		displayName: 'Date de fin de l\'examen',
		name: 'examinationEndDate',
		type: 'dateTime',
		displayOptions: {
			show: {
				resource: ['certificationFolders'],
				operation: ['control'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'examinationEndDate',
				value: "={{$value}}"
			},
		},
		default: '',
	},
	{
		displayName: 'Lieu de passage de l\'examin',
		name: 'examinationPlace',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['certificationFolders'],
				operation: ['control'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'examinationPlace',
			},
		},
		default: '',
		description: 'Le numéro du dossier est l\'id',
	},
	{
		displayName: 'Mention obtenue',
		name: 'examinationType',
		type: 'options',
		displayOptions: {
			show: {
				resource: ['certificationFolders'],
				operation: ['control'],
			},
		},
		options: [
			{name: "À distance", value: "A_DISTANCE"},
			{name: "En présentiel", value: "EN_PRESENTIEL"},
			{name: "Mixte (à distance et en présentiel)", value: "MIXTE"},
		],
		routing: {
			send: {
				type: 'body',
				property: 'examinationType',
				value: '={{$value}}'
			},
		},
		default: '',
	},
	{
		displayName: 'Date d\'inscription à la certification',
		name: 'enrollmentDate',
		type: 'dateTime',
		displayOptions: {
			show: {
				resource: ['certificationFolders'],
				operation: ['control'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'enrollmentDate',
				value: "={{$value}}"
			},
		},
		default: '',
	},
	{
		displayName: 'Commentaire',
		name: 'comment',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['certificationFolders'],
				operation: ['control'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'comment',
			},
		},
		default: '',
	}
]

const abort: INodeProperties[] = [
	{
		displayName: 'Numéro du dossier de certification',
		name: 'identifier',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['certificationFolders'],
				operation: ['abort'],
			},
		},
		routing: {
			request: {
				method: 'POST',
				url: '=/certificationFolders/{{$value}}/fail',
			},
		},
		required: true,
		default: '',
		description: 'Le numéro du dossier est l\'id',
	},
	{
		displayName: 'Commentaire',
		name: 'comment',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['certificationFolders'],
				operation: ['abort'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'comment',
			},
		},
		default: '',
	},
]

const updateCF: INodeProperties[] = [
	{
		displayName: 'Numéro du dossier de certification',
		name: 'identifier',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['certificationFolders'],
				operation: ['updateCF'],
			},
		},
		routing: {
			request: {
				method: 'PUT',
				url: '=/certificationFolders/CertificationFolder',
			},
		},
		required: true,
		default: '',
		description: 'Le numéro du dossier est l\'id',
	},
	{
		displayName: 'Dossier à l\'initiative de',
		name: 'type',
		type: 'options',
		displayOptions: {
			show: {
				resource: ['registrationFolders'],
				operation: ['updateCF'],
			},
		},
		options: [
			{name: "Certifié(e)", value: "certifie"},
			{name: "Organisme de formation", value: "of"},
			{name: "Pôle Emploi", value: "pole_emploi"},
			{name: "Employeur", value: "employeur"},
			{name: "Autre", value: "autre"}
		],
		routing: {
			send: {
				type: 'body',
				property: 'type',
				value: "={{$value.join(',')}}"
			},
		},
		default: '',
		description: 'Permet de n\'obtenir que les dossiers dans le type considéré - par défaut tous les types sont retournés.',
	},
	{
		displayName: 'Date de début de l\'examen',
		name: 'examinationDate',
		type: 'dateTime',
		displayOptions: {
			show: {
				resource: ['certificationFolders'],
				operation: ['updateCF'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'examinationDate',
				value: "={{$value}}"
			},
		},
		default: '',
	},
	{
		displayName: 'Date de fin de l\'examen',
		name: 'examinationEndDate',
		type: 'dateTime',
		displayOptions: {
			show: {
				resource: ['certificationFolders'],
				operation: ['updateCF'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'examinationEndDate',
				value: "={{$value}}"
			},
		},
		default: '',
	},
	{
		displayName: 'Date d\'inscription à la certification',
		name: 'enrollmentDate',
		type: 'dateTime',
		displayOptions: {
			show: {
				resource: ['certificationFolders'],
				operation: ['updateCF'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'enrollmentDate',
				value: "={{$value}}"
			},
		},
		default: '',
	},
	{
		displayName: 'Lieu de passage de l\'examen',
		name: 'examinationPlace',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['certificationFolders'],
				operation: ['updateCF'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'examinationPlace',
			},
		},
		default: '',
		description: 'Peut être modifié dans les états de certifications "registered/enregistré", "toTake/prêt à passer", "toControl/ à contrôler", "toRetake/prêt à repasser" | peut-être mis à jour par le certificateur et le partenaire'
	},
	{
		displayName: 'Modalité de l\'examen',
		name: 'examinationType',
		type: 'options',
		displayOptions: {
			show: {
				resource: ['certificationFolders'],
				operation: ['updateCF'],
			},
		},
		options: [
			{name: "À distance", value: "A_DISTANCE"},
			{name: "En présentiel", value: "EN_PRESENTIEL"},
			{name: "Mixte (à distance et en présentiel)", value: "MIXTE"},
		],
		routing: {
			send: {
				type: 'body',
				property: 'examinationType',
				value: '={{$value}}'
			},
		},
		default: '',
		description: 'Peut être modifié dans les états de certifications "registered/enregistré", "toTake/prêt à passer", "toControl/ à contrôler", "toRetake/prêt à repasser" | peut-être mis à jour par le certificateur et le partenaire'
	},
	{
		displayName: 'Commentaire',
		name: 'comment',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['certificationFolders'],
				operation: ['updateCF'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'comment',
			},
		},
		default: '',
	},
	{
		displayName: 'Tags', // PROBLEM
		name: 'tags',
		type: 'collection',
		description : 'Liste de tags associée au dossier de certification',
		displayOptions: {
			show: {
				resource: ['certificationFolders'],
				operation: ['updateCF'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'tags',
			},
		},
		default: '',
	},
	{
	displayName: 'Exclus de l\'accrochage',
	name: 'cdcExcluded',
	type: 'boolean',
	displayOptions: {
		show: {
			resource: ['certificationFolders'],
			operation: ['updateCF'],
		},
	},
	routing: {
		send: {
			type: 'body',
			property: 'cdcExcluded',
		},
	},
	default: '',
	description: 'Permet de filtrer les dossiers de certification qui sont exclus de l\'accrochage',
},
	{
		displayName: 'Prix HT',
		name: 'amountHt',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['certificationFolders'],
				operation: ['updateCF'],
			},
		},
		description: 'Prix de vente du passage de la certification (Hors Taxe)',
		routing: {
			send: {
				type: 'body',
				property: 'amountHt',
			},
		},
		default: '',
	}
]

const postTaskCF: INodeProperties[] = [
	{
		displayName: 'Numéro du dossier de certification',
		name: 'identifier',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['certificationFolders'],
				operation: ['postTaskCF'],
			},
		},
		routing: {
			request: {
				method: 'POST',
				url: '=/activities/CertificationFolder/{{$value}}',
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
				resource: ['certificationFolders'],
				operation: ['postTaskCF'],
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
				resource: ['certificationFolders'],
				operation: ['postTaskCF'],
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
				resource: ['certificationFolders'],
				operation: ['postTaskCF'],
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
				resource: ['certificationFolders'],
				operation: ['postTaskCF'],
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
				name: "Ind. 3 : Obtentions des certifications",
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
				name: "Ind. 16 : Présentation à la certification",
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
				resource: ['certificationFolders'],
				operation: ['postTaskCF'],
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
				resource: ['certificationFolders'],
				operation: ['postTaskCF'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'userEmail',
			},
		},
		typeOptions: {
			loadOptionsMethod: 'usersOrganism'
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
				resource: ['certificationFolders'],
				operation: ['postTaskCF'],
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
				resource: ['certificationFolders'],
				operation: ['postTaskCF'],
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

const postActivityCF: INodeProperties[] = [
	{
		displayName: 'Numéro du dossier de certification',
		name: 'identifier',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['certificationFolders'],
				operation: ['postActivityCF'],
			},
		},
		routing: {
			request: {
				method: 'POST',
				url: '=/activities/CertificationFolder/{{$value}}',
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
				resource: ['certificationFolders'],
				operation: ['postActivityCF'],
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
				resource: ['certificationFolders'],
				operation: ['postActivityCF'],
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
				resource: ['certificationFolders'],
				operation: ['postActivityCF'],
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
				name: "Ind. 3 : Obtentions des certifications",
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
				name: "Ind. 16 : Présentation à la certification",
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
				resource: ['certificationFolders'],
				operation: ['postActivityCF'],
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
				resource: ['certificationFolders'],
				operation: ['postActivityCF'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'userEmail',
			},
		},
		typeOptions: {
			loadOptionsMethod: 'usersOrganism'
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
				resource: ['certificationFolders'],
				operation: ['postActivityCF'],
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
				resource: ['certificationFolders'],
				operation: ['postActivityCF'],
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
				resource: ['certificationFolders'],
				operation: ['postActivityCF'],
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
				resource: ['certificationFolders'],
				operation: ['postActivityCF'],

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

const sendCFFiles: INodeProperties[] = [
	{
		displayName: 'Numéro du dossier de certification',
		name: 'identifier',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['certificationFolders'],
				operation: ['sendCFFiles'],
			},
		},
		routing: {
			request: {
				method: 'GET',
				url: '=/certificationFolders/{{$value}}/files',
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
				resource: ['certificationFolders'],
				operation: ['sendCFFiles'],
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
				resource: ['certificationFolders'],
				operation: ['sendCFFiles'],
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
				resource: ['certificationFolders'],
				operation: ['sendCFFiles'],
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


export const certificationFoldersOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: [
					'certificationFolders',
				],
			},
		},
		options: [
			{
				name: 'Récupérer un dossier de certification',
				value: 'getCF',
				action: 'Récupérer un dossier',
			},
			{
				name: 'Liste des documents d\'un dossier de certification',
				value: 'getCFFiles',
				action: 'La liste des documents renseignés et attendus pour un dossier'
			},
			{
				name: 'Liste des dossiers de certification',
				value: 'getAllCF',
				action: 'Liste des dossiers de mon l\'organisme\n',
				routing: {
					request: {
						method: 'GET',
						url: '=/certificationFolders',
					},
				},
			},
			{
				name: 'Rechercher un ou plusieurs dossiers de certification',
				value: 'getAllCFsWithQueries',
				action: 'Rechercher un ou plusieurs dossiers',
				routing: {
					request: {
						method: 'GET',
						url: '=/certificationFolders',
					},
				},
			},
			{
				name: 'Liste de toutes les activités et tâches d\'un dossier',
				value: 'getCFActivitiesTasks',
				action: 'Liste de toutes les activités et tâches d\'un dossier',
			},
			{
				name: 'Mettre à jour un dossier',
				value: 'updateCF',
				action: 'Mettre à un jour un dossier'
			},
			{
				name: 'Passer un dossier à l’état : réussi',
				value: 'success',
				action: 'Change l\'état d\'un dossier vers : réussi'
			},
			{
				name: 'Passer un dossier à l’état : refuser',
				value: 'refuse',
				action: 'Change l\'état d\'un dossier vers : refuser'
			},
			{
				name: 'Passer un dossier à l’état : prêt à passer',
				value: 'take',
				action: 'Change l\'état d\'un dossier vers : prêt à passer'
			},
			{
				name: 'Passer un dossier à l’état : enregistré',
				value: 'register',
				action: 'Change l\'état d\'un dossier vers : enregistré'
			},
			{
				name: 'Passer un dossier à l’état : échoué',
				value: 'fail',
				action: 'Change l\'état d\'un dossier vers : échoué'
			},
			{
				name: 'Passer un dossier à l’état : prêt à repasser',
				value: 'retake',
				action: 'Change l\'état d\'un dossier vers : prêt à repasser'
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
				value: 'postTaskCF',
				action: 'Créer une tâche pour un dossier'
			},
			{
				name: 'Créer une activité pour un dossier',
				value: 'postActivityCF',
				action: 'Créer une activité pour un dossier'
			},
			{
				name: 'Créer une activité pour un dossier',
				value: 'postActivityCF',
				action: 'Créer une activité pour un dossier'
			},
			{
				name: 'Envoyer un fichier',
				value: 'sendCFFiles',
				action: 'Envoyer un fichier',
			},
		],
		default: 'getCF',
	},
	...getCF,
	...getCFFiles,
	...getAllCF,
	...getAllCFsWithQueries,
	...getCFActivitiesTasks,
	...updateCF,
	...success,
	...refuse,
	...take,
	...register,
	...fail,
	...retake,
	...control,
	...abort,
	...postTaskCF,
	...postActivityCF,
	...sendCFFiles
]

