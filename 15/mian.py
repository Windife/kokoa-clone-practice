# BLUEPRINT | DONT EDIT
playing = True

while playing:
    a = int(input("Choose a number:\n"))
    b = int(input("Choose another one:\n"))
    operation = input(
        "Choose an operation:\n    Options are: + , - , * or /.\n    Write 'exit' to finish.\n"
    )
# /BLUEPRINT

# 👇🏻 YOUR CODE 👇🏻:

    if operation == "exit":
            print("종료합니다.")
            playing = False
    elif operation == "+":
            result = a + b
            print(f"{a} {operation} {b} = {result}")
    elif operation == "-":
            result = a - b
            print(f"{a} {operation} {b} = {result}")
    elif operation == "*":
            result = a * b
            print(f"{a} {operation} {b} = {result}")
    elif operation == "/":
        if b == 0:
                print("0 으로 나눌수 없습니다.")
        else:
            result = a / b
            print(f"{a} {operation} {b} = {result}")
    else:
        print("잘못된 입력입니다. 종료합니다.")
        playing = False                

# /YOUR CODE