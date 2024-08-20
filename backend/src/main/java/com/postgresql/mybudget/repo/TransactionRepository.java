package com.postgresql.mybudget.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.postgresql.mybudget.entity.Transaction;


@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Integer>  {

}
