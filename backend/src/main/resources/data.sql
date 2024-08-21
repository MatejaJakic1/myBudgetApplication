INSERT INTO accounts (name, balance, currency, default_balance, default_currency) VALUES
('John Doe', 1200.50, 'eur', 1200.50, 'eur'),
('Jane Smith', 875.20, 'usd', 786.42, 'eur'),
('Michael Brown', 320.75, 'eur', 320.75, 'eur'),
('Emily Johnson', 550.10, 'eur', 550.10, 'eur');


INSERT INTO transactions (account_name, description, amount, currency, default_amount, default_currency) VALUES
('John Doe', 'Deposit some cash', 500.00, 'eur', 500.00, 'eur'),
('John Doe', 'Groceries', -150.75, 'eur', -150.75, 'eur'),
('John Doe', 'Transfer to friends account', -200.00, 'eur', -200.00, 'eur'),
('Jane Smith', 'Deposit money', 300.00, 'usd', 269.55, 'eur'),
('Jane Smith', 'Udemy course payment', -45.50, 'usd', -40.88, 'eur'),
('Michael Brown', 'Add money to account', 150.00, 'eur', 150.00, 'eur'),
('Michael Brown', 'Electricity bill payment', -60.00, 'eur', -60.00, 'eur');