package com.postgresql.mybudget.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "accounts")
public class Account {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "account_name")
    private String name;

    @Column(name = "account_currency")
    private String currency;

    @Column(name = "default_currency")
    private String default_currency;

    @Column(name = "balance")
    private float balance;

    @Column(name = "default_balance")
    private float default_balance;
}
