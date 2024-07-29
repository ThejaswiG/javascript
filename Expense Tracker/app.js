document.addEventListener('DOMContentLoaded', () => {
    const descriptionInput = document.getElementById('description-input');
    const amountInput = document.getElementById('amount-input');
    const categorySelect = document.getElementById('category-select');
    const addExpenseButton = document.getElementById('add-expense');
    const expenseList = document.getElementById('expense-list');
    const totalExpenses = document.getElementById('total-expenses');
    const expenseChartCanvas = document.getElementById('expense-chart');
    
    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    let chart;

    const updateSummary = () => {
        const total = expenses.reduce((sum, expense) => sum + parseFloat(expense.amount), 0);
        totalExpenses.textContent = `Total Expenses: $${total.toFixed(2)}`;
        updateChart();
    };

    const updateChart = () => {
        const categories = expenses.reduce((acc, expense) => {
            acc[expense.category] = acc[expense.category] || 0;
            acc[expense.category] += parseFloat(expense.amount);
            return acc;
        }, {});

        const data = {
            labels: Object.keys(categories),
            datasets: [{
                label: 'Expenses by Category',
                data: Object.values(categories),
                backgroundColor: ['#ff6384', '#36a2eb', '#cc65fe']
            }]
        };

        if (chart) {
            chart.destroy();
        }

        chart = new Chart(expenseChartCanvas, {
            type: 'pie',
            data
        });
    };

    const addExpense = (expense) => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${expense.description} - $${parseFloat(expense.amount).toFixed(2)} (${expense.category})
            <button class="delete">Delete</button>
        `;
        expenseList.appendChild(li);

        li.querySelector('.delete').addEventListener('click', () => {
            expenses = expenses.filter(e => e !== expense);
            saveExpenses();
            renderExpenses();
        });
    };

    const renderExpenses = () => {
        expenseList.innerHTML = '';
        expenses.forEach(addExpense);
        updateSummary();
    };

    const saveExpenses = () => {
        localStorage.setItem('expenses', JSON.stringify(expenses));
    };

    addExpenseButton.addEventListener('click', () => {
        const description = descriptionInput.value.trim();
        const amount = amountInput.value.trim();
        const category = categorySelect.value;

        if (description && amount && category) {
            const expense = { description, amount, category };
            expenses.push(expense);
            saveExpenses();
            renderExpenses();

            descriptionInput.value = '';
            amountInput.value = '';
            categorySelect.value = 'food';
        }
    });

    renderExpenses();
});