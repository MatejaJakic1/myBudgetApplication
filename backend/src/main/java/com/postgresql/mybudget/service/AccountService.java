package com.postgresql.mybudget.service;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.postgresql.mybudget.entity.Account;
import com.postgresql.mybudget.entity.Transaction;
import com.postgresql.mybudget.repo.AccountRepository;



@Service
public class AccountService {
    
    @Autowired
    private AccountRepository accountRepository;

    public Account createAccount(Account account) {
        return accountRepository.save(account);
    }

    public List<Account> getAllAccounts(){
        return accountRepository.findAll();
    }

    public void deleteAccounts(){
        accountRepository.deleteAll();
    }

    public Account updateAfterTransaction(Account account, Transaction transaction){
        return accountRepository.save(account);
    }

    public Account updateDefaultBalance(Account account){
        Optional<Account> optionalOldAccount = accountRepository.findById(account.getId());
        if (optionalOldAccount.isPresent()) {
            Account oldAccount = optionalOldAccount.get();
            oldAccount.setDefaultCurrency(account.getDefaultCurrency());
            oldAccount.setDefaultBalance(account.getDefaultBalance());
            accountRepository.save(oldAccount);
            return oldAccount;
        }  
        return account; 
    }
}
