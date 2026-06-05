# 👇🏻 YOUR CODE 👇🏻:

def get_yearly_revenue(monthly_revenue):
    return monthly_revenue * 12

def get_yearly_expenses(monthly_expenses):
    return monthly_expenses * 12

def get_tax_amount(porfit):
    if porfit < 50000:
        return porfit * 0.1
    elif porfit < 100000:
        return porfit * 0.15
    else:
        return porfit * 0.25
    
def apply_tax_credits(tax_amount, tax_credits):
    return tax_amount * tax_credits

# /YOUR CODE

# BLUEPRINT | DONT EDIT

monthly_revenue = 5500000
monthly_expenses = 2700000
tax_credits = 0.01

yearly_revenue = get_yearly_revenue(monthly_revenue)
yearly_expenses = get_yearly_expenses(monthly_expenses)

profit = yearly_revenue - yearly_expenses

tax_amount = get_tax_amount(profit)

final_tax_amount = tax_amount - apply_tax_credits(tax_amount, tax_credits)

print(f"Your tax bill is: ${final_tax_amount}")

# /BLUEPRINT