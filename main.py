import re
from trackurtab import Tut


members_input = "A, B, C"
expenses_input = [
    "A 15 Snacks",
    "B 60 tickets"
]

def main():
   
    members = parse_members(members_input)
    expenses = parse_expenses(expenses_input)
    
    track_ur_tab = Tut(members, expenses)
    transactions = track_ur_tab.split_expense()
    print_output(transactions)

def parse_members(members_input):
    # Process members input
    members_list = re.sub('[,\n]', '', members_input).split()
    return members_list

def parse_expenses(expenses_input):
    # Process expenses input
    expenses_list = []
    for line in expenses_input:
        parts = line.split()
        member = parts[0]
        amount = float(parts[1])
        description = ' '.join(parts[2:])
        expenses_list.append((member, amount, description))
    return expenses_list

def print_output(transactions):
    
    print("Expenses")
    for x in transactions:
        print(x[0], '->', x[1], x[2])
    

if __name__ == '__main__':
    print("Expense Split")

    main()

    
