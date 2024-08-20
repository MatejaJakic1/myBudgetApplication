package com.postgresql.mybudget.service;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.postgresql.mybudget.entity.Transaction;
import com.postgresql.mybudget.repo.TransactionRepository;


@Service
public class TransactionService {
    
    @Autowired
    private TransactionRepository transactionRepository;

    public Transaction createTransaction(Transaction transaction) {
        return transactionRepository.save(transaction);
    }

    public List<Transaction> getAllTransactions(){
        return transactionRepository.findAll();
    }

     public Transaction updateDefaultTransaction(Transaction transaction){
        Optional<Transaction> optionalOldTransaction = transactionRepository.findById(transaction.getId());
        if (optionalOldTransaction.isPresent()) {
            Transaction oldTransaction = optionalOldTransaction.get();
            oldTransaction.setDefaultCurrency(transaction.getDefaultCurrency());
            oldTransaction.setDefaultAmount(transaction.getDefaultAmount());
            transactionRepository.save(oldTransaction);
            return oldTransaction;
        }  
        return transaction; 
    }

    public void deleteTransactions(){
        transactionRepository.deleteAll();
    }
}
