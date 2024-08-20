package com.postgresql.mybudget.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.postgresql.mybudget.entity.Account;
import com.postgresql.mybudget.entity.Transaction;
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

    public Account updateAccount(Account account, Transaction transaction){
        Account oldAccount = account;
        account.setDefault_balance(transaction.getAmount() + oldAccount.getDefault_balance());
        accountRepository.save(account);
        return account;
    }
}
