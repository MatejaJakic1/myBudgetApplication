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
@Table(name = "transactions")
public class Transaction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "account_name")
    private String account_name;

    @Column(name = "description")
    private String description;

    @Column(name = "default_currency")
    private String default_currency;

    @Column(name = "default_balance")
    private float default_balance;

    @Column(name = "balance")
    private float balance;

    @Column(name = "currency")
    private String currency;
}
