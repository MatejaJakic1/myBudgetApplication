package com.postgresql.mybudget.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.postgresql.mybudget.entity.Account;
import com.postgresql.mybudget.repo.AccountRepository;



@Service
public class AccountService {
    
    @Autowired
    private AccountRepository accountRepository;

    public Account createAccount(Account account) {
        return accountRepository.save(account);
    }

    public Account getAccountById(int id){
        return accountRepository.findById(id).orElse(null);
    }

    public List<Account> getAllAccounts(){
        return accountRepository.findAll();
    }
}
