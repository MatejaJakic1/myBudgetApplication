package com.postgresql.mybudget.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.postgresql.mybudget.entity.Account;
import com.postgresql.mybudget.entity.Transaction;
import com.postgresql.mybudget.exception.ResourceNotFoundException;
import com.postgresql.mybudget.repo.AccountRepository;
import com.postgresql.mybudget.repo.TransactionRepository;



@Service
public class AccountService {
    
    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private TransactionRepository transactionRepository;

    public Account createAccount(Account account) {
        return accountRepository.save(account);
    }

    public Account getAccountById(int id){
        return accountRepository.findById(id).orElse(null);
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

    public Account updateDefault(Account account){
        Optional<Account> optionalOldAccount = accountRepository.findById(account.getId());
        if (optionalOldAccount.isPresent()) {
            Account oldAccount = optionalOldAccount.get();
            oldAccount.setDefault_currency(account.getDefault_currency());
            oldAccount.setDefault_balance(account.getDefault_balance());
            accountRepository.save(oldAccount);
            return oldAccount;
        }  
        return account; 
    }
}
