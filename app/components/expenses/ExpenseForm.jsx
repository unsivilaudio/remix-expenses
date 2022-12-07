import {
    Form,
    Link,
    useActionData,
    useMatches,
    useParams,
    useTransition as useNavigation,
} from '@remix-run/react';

function ExpenseForm() {
    const validationErrors = useActionData();
    // const expenseData = useLoaderData();
    const params = useParams();
    const matches = useMatches();
    const navigation = useNavigation();

    const today = new Date().toISOString().slice(0, 10); // yields something like 2023-09-10
    const expenses = matches.find(
        match => match.id === 'routes/__app/expenses'
    ).data;
    const expenseData = expenses.find(exp => exp.id === params.id);

    if (params.id && !expenseData) {
        return <p>Invalid expense id.</p>;
    }

    const defaultValues = expenseData
        ? {
              title: expenseData.title,
              amount: expenseData.amount,
              date: expenseData.date,
          }
        : {
              title: '',
              amount: '',
              date: '',
          };

    const isSubmitting = navigation.state !== 'idle';

    return (
        <Form
            method={expenseData ? 'patch' : 'post'}
            className='form'
            id='expense-form'>
            <p>
                <label htmlFor='title'>Expense Title</label>
                <input
                    type='text'
                    id='title'
                    name='title'
                    defaultValue={defaultValues.title}
                    required
                    maxLength={30}
                />
            </p>

            <div className='form-row'>
                <p>
                    <label htmlFor='amount'>Amount</label>
                    <input
                        type='number'
                        id='amount'
                        name='amount'
                        min='0'
                        step='0.01'
                        defaultValue={defaultValues.amount}
                        required
                    />
                </p>
                <p>
                    <label htmlFor='date'>Date</label>
                    <input
                        type='date'
                        id='date'
                        name='date'
                        max={today}
                        defaultValue={
                            defaultValues.date
                                ? defaultValues.date.slice(0, 10)
                                : ''
                        }
                        required
                    />
                </p>
            </div>
            {validationErrors && (
                <ul>
                    {Object.values(validationErrors).map(val => (
                        <li key={val}>{val}</li>
                    ))}
                </ul>
            )}
            <div className='form-actions'>
                <button
                    disabled={isSubmitting}
                    formMethod={expenseData ? 'patch' : 'post'}>
                    {isSubmitting
                        ? expenseData
                            ? 'Updating...'
                            : 'Saving...'
                        : expenseData
                        ? 'Update Expense'
                        : 'Save Expense'}
                </button>
                <Link to='..'>Cancel</Link>
            </div>
        </Form>
    );
}

export default ExpenseForm;
