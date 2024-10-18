export enum TypeRequestsEnum {
	query = "query",
	mutation = "mutation",
}
export enum TypeUserEnum {
	admin = "admin",
	visitor = "visitor",
}

export function addDescription(
	typeRequest: TypeRequestsEnum,
	whatDoing: string,
	typeOfUsers: TypeUserEnum[],
	mandatories: string[] = []
): string {
	if (mandatories.length > 0) {
		const mandatoryFields = mandatories.map((field) => `${field}`).join("\n");
		console.log("mandatories", mandatoryFields);
		return `
    This ${typeRequest} ${whatDoing}.
    This ${typeRequest} can only be used by ${typeOfUsers.join(" and ")} users.
    The following field${mandatories.length > 1 ? "s are" : " is"} mandatory:
    ${mandatoryFields}
        `;
	}
	return `This ${typeRequest} ${whatDoing}. This ${typeRequest} can only be used by ${typeOfUsers.join(" and ")} users.`;
}
