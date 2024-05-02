import test, { expect } from '@playwright/test';
import { connect, disconnect } from './db.helper';
import User, { UserRole } from '../../backend/src/entities/user';
import { clearDB } from '../../backend/src/db';

// test.beforeAll(connect);
// test.beforeEach(clearDB);
// test.afterAll(disconnect);

// test('can render signup page', async ({ page }) => {
//   await page.goto('/auth/inscription');
//   await expect(
//     page.getByRole('heading', { name: 'Inscription' })
//   ).toBeVisible();
//   await expect(page.getByTestId('label-pseudo')).toContainText('Pseudo');
//   await expect(page.getByTestId('label-email')).toContainText('Email');
// });

// test('can view users in db', async ({ page }) => {
//   const admin = new User();
//   Object.assign(admin, {
//     pseudo: 'admin',
//     email: 'admin@app.com',
//     password: 'Admin@974',
//   });
//   await admin.save();

//   const visitor = new User();
//   Object.assign(visitor, {
//     pseudo: 'Visitor',
//     email: 'visitor@app.com',
//     password: 'Visitor@974',
//   });
//   await visitor.save();

//   await page.goto('/');
//   await expect(page.getByTestId('users-list')).toContainText(admin.email);
//   await expect(page.getByTestId('users-list')).toContainText(admin.pseudo);
//   await expect(page.getByTestId('users-list')).toContainText(admin.role);

//   await expect(page.getByTestId('users-list')).toContainText(visitor.email);
//   await expect(page.getByTestId('users-list')).toContainText(visitor.pseudo);
//   await expect(page.getByTestId('users-list')).toContainText(visitor.role);
// });
