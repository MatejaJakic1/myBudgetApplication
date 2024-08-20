package com.postgresql.mybudget.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.postgresql.mybudget.entity.Account;

@Repository
public interface AccountRepository extends JpaRepository<Account, Integer> {

}