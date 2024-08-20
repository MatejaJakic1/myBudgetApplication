package com.postgresql.mybudget;

import com.postgresql.mybudget.entity.Account;
import com.postgresql.mybudget.entity.Transaction;
import lombok.Data;

@Data
public class AccountTransaction {
    private Account account;
    private Transaction transaction;
}
