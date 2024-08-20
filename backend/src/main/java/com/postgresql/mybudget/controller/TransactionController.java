package com.postgresql.mybudget.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.postgresql.mybudget.entity.Transaction;
import com.postgresql.mybudget.service.TransactionService;

@CrossOrigin
@RestController
@RequestMapping("/api/v1")
public class TransactionController {

    @Autowired
    private TransactionService transactionService;

    @PostMapping("/transactions")
    public Transaction addTransaction(@RequestBody Transaction transaction){
        return transactionService.createTransaction(transaction);
    }

     @GetMapping("/transactions")
    public List<Transaction> getAllTransactions(){
        return transactionService.getAllTransactions();
    }
}
