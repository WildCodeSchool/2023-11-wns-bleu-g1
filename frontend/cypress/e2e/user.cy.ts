describe("Test user account", () => {
	beforeEach(() => {
		cy.visit("http://localhost:3000/");
	});

	it("Can create an account", () => {
		const newUserPseudo = "CypressUserTest";
		const newUserEmail = "CypressTest@mail.test";
		const newUserPassword = "CypressTestPassword123!";

		cy.get("#topbar").contains("Se connecter").click();
		cy.url().should("eq", "http://localhost:3000/auth/connexion");
		cy.get("a").contains("Inscrivez-vous").click();
		cy.url().should("eq", "http://localhost:3000/auth/inscription");
		cy.get("input[name=pseudo]").type(newUserPseudo);
		cy.get("input[name=email]").type(newUserEmail);
		cy.get("input[name=password]").type(newUserPassword);
		cy.get("button[type=submit]").click();
		cy.url().should("eq", "http://localhost:3000/auth/connexion");
		cy.get("input[name=email]").type(newUserEmail);
		cy.get("input[name=password]").type(newUserPassword);
		cy.get("button[type=submit]").click();
		cy.url().should("eq", "http://localhost:3000/profile");
	});

	it("Can logout", () => {
		const newUserEmail = "CypressTest@mail.test";
		const newUserPassword = "CypressTestPassword123!";

		cy.get("#topbar").contains("Se connecter").click();
		cy.url().should("eq", "http://localhost:3000/auth/connexion");
		cy.get("input[name=email]").type(newUserEmail);
		cy.get("input[name=password]").type(newUserPassword);
		cy.get("button[type=submit]").click();
		cy.url().should("eq", "http://localhost:3000/profile");
		cy.get("#dropdownMenu").click();
		cy.get("div").contains("Déconnexion").click();
		cy.url().should("eq", "http://localhost:3000/auth/connexion");
	});

	it("can delete account", () => {
		const newUserEmail = "CypressTest@mail.test";
		const newUserPassword = "CypressTestPassword123!";

		cy.get("#topbar").contains("Se connecter").click();
		cy.url().should("eq", "http://localhost:3000/auth/connexion");
		cy.get("input[name=email]").type(newUserEmail);
		cy.get("input[name=password]").type(newUserPassword);
		cy.get("button[type=submit]").click();
		cy.url().should("eq", "http://localhost:3000/profile");
		cy.get("button").contains("Supprimer mon compte").click();
		cy.get("div#confirmDeletePopup").should(
			"contain",
			"Etes-vous sûr de vouloir continuer?"
		);
		cy.get("button").contains("Continuer").click();
		cy.url().should("eq", "http://localhost:3000/auth/inscription");
	});
});
