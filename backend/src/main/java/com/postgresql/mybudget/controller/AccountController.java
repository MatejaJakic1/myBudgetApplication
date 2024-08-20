package com.postgresql.mybudget.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.postgresql.mybudget.AccountTransaction;
import com.postgresql.mybudget.entity.Account;
import com.postgresql.mybudget.entity.Transaction;
import com.postgresql.mybudget.service.AccountService;


@RestController
@RequestMapping("/api/v1")
public class AccountController {

    @Autowired
    private AccountService accountService;

    @PostMapping("/accounts")
    public Account addAccount(@RequestBody Account account){
        return accountService.createAccount(account);
    }

    @GetMapping("/account/{id}")
    public Account getAccountById(@PathVariable int id){
        return accountService.getAccountById(id);
    }

    @GetMapping("/accounts")
    public List<Account> getAllAccounts(){
        return accountService.getAllAccounts();
    }
     
    @PutMapping("/accounts")
    public Account updateAfterTransaction(@RequestBody AccountTransaction accountTransaction){
        Account account = accountTransaction.getAccount();
        Transaction transaction = accountTransaction.getTransaction();
        return accountService.updateAfterTransaction(account, transaction);
    }

    @PutMapping("/updateaccounts")
    public ResponseEntity<Account> updateDefault(@RequestBody Account account) {
        try {
        Account updatedAccount = accountService.updateDefault(account);
        return ResponseEntity.ok(updatedAccount);
    } catch (Exception e) {
        // log the error
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
    }}

    @DeleteMapping("/deleteaccounts")
    public void deleteAccounts(){
         accountService.deleteAccounts();
    }
}
