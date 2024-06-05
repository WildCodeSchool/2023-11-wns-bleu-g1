import test, { expect } from '@playwright/test';
import { connect, disconnect } from './db.helper';
import User from '../../backend/src/entities/user';
import { clearDb } from '../../backend/src/db';

test.beforeAll(connect);
test.beforeEach(clearDb);
test.afterAll(disconnect);

test('can render signup page', async ({ page }) => {
  await page.goto('/auth/inscription');
  await expect(
    page.getByRole('heading', { name: 'Rejoignez-nous !' })
  ).toBeVisible();
  await expect(page.getByTestId('label-pseudo')).toContainText('Pseudo');
  await expect(page.getByTestId('label-email')).toContainText('Email');
});

// cannot be tested yet
// test('can login', async ({ page }) => {
//   const admin = new User();
//   Object.assign(admin, {
//     pseudo: 'admin',
//     email: 'admin@app.com',
//     password: 'Admin@974',
//   });
//   await admin.save();

//   const visitorEmail = 'visitor@app.com';
//   const visitorPassword = 'Visitor@974';
//   const visitor = new User();
//   Object.assign(visitor, {
//     pseudo: 'Visitor',
//     email: visitorEmail,
//     password: visitorPassword,
//   });
//   await visitor.save();

//   await page.goto('/auth/connexion');

//   await page.getByTestId('login-email').fill(visitorEmail);
//   await page.getByTestId('login-password').fill(visitorPassword);
//   await page.getByRole('button', { name: 'Se connecter' }).click();
//   await expect(
//     page.getByRole('button', { name: 'Se déconnecter' })
//   ).toBeVisible();
// });
