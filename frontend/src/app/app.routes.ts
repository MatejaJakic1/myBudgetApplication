import { Routes } from '@angular/router';
import { AccountComponent } from './components/account/account.component';
import { TransactionComponent } from './components/transaction/transaction.component';
import { SettingsComponent } from './components/settings/settings.component';

export const routes: Routes = [
    {path: '', component: AccountComponent},
    {path: 'components/account', component: AccountComponent},
    {path: 'components/transaction', component: TransactionComponent},
    {path: 'components/settings', component: SettingsComponent }
];
