describe("Test Landing Page", () => {
	beforeEach(() => {
		cy.visit("http://localhost:3000/");
	});

	it("displays two elements on landingPage", () => {
		cy.get("#topbar").should("contain", "Se connecter");
		cy.get("#topbar").should("contain.html", "Logo");
		cy.get("#landingContent").should("contain", "Wild Code");
		cy.get("#landingContent").should("contain", "Commencer à coder");
		cy.get("#landingContent").should("contain", "En savoir plus");
	});

	it("can click on connect button", () => {
		cy.get("#topbar").contains("Se connecter").click();
		cy.url().should("eq", "http://localhost:3000/auth/connexion");
	});

	it("can go to signUp form", () => {
		cy.get("#topbar").contains("Se connecter").click();
		cy.url().should("eq", "http://localhost:3000/auth/connexion");
		cy.get("a").contains("Inscrivez-vous").click();
		cy.url().should("eq", "http://localhost:3000/auth/inscription");
	});

	it("can return to signIn form from signUp form", () => {
		cy.get("#topbar").contains("Se connecter").click();
		cy.url().should("eq", "http://localhost:3000/auth/connexion");
		cy.get("a").contains("Inscrivez-vous").click();
		cy.url().should("eq", "http://localhost:3000/auth/inscription");
		cy.get("a").contains("Connectez-vous").click();
		cy.url().should("eq", "http://localhost:3000/auth/connexion");
	});

	it("can return to landingPage from signIn form", () => {
		cy.get("#topbar").contains("Se connecter").click();
		cy.url().should("eq", "http://localhost:3000/auth/connexion");
		cy.get("a")
			.find("img")
			.filter((index, img) => {
				const alt = img.getAttribute("alt") || "";
				const src = img.getAttribute("src") || "";
				return alt.includes("Logo") || src.includes("logo");
			})
			.click();
		cy.url().should("eq", "http://localhost:3000/");
	});

	it("can return to landingPage from signUp form", () => {
		cy.get("#topbar").contains("Se connecter").click();
		cy.url().should("eq", "http://localhost:3000/auth/connexion");
		cy.get("a").contains("Inscrivez-vous").click();
		cy.url().should("eq", "http://localhost:3000/auth/inscription");
		cy.get("a")
			.find("img")
			.filter((index, img) => {
				const alt = img.getAttribute("alt") || "";
				const src = img.getAttribute("src") || "";
				return alt.includes("Logo") || src.includes("logo");
			})
			.click();
		cy.url().should("eq", "http://localhost:3000/");
	});

	it("can't go to CoddingPage without be signedin", () => {
		cy.get("#landingContent").contains("Commencer à coder").click();
		cy.url().should("eq", "http://localhost:3000/auth/connexion");
	});
});
