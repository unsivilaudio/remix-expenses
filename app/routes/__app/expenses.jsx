import { json } from '@remix-run/node';
import { Link, Outlet, useLoaderData } from '@remix-run/react';
import { FaDownload, FaPlus } from 'react-icons/fa';
import ExpensesList from '~/components/expenses/ExpensesList';
import { requireUserSession } from '~/data/auth.server';
import { getExpenses } from '~/data/expenses.server';

export default function ExpensesLayout() {
    const expenses = useLoaderData() || [];
    return (
        <>
            <Outlet />
            <main>
                <section id='expenses-actions'>
                    <Link to='add'>
                        <FaPlus />
                        <span>Add Expense</span>
                    </Link>
                    <a href='/expenses/raw'>
                        <FaDownload />
                        <span>Load Expenses</span>
                    </a>
                </section>
                {!!expenses.length && <ExpensesList expenses={expenses} />}
                {!expenses.length && (
                    <section id='no-expenses'>
                        <h1>No Expenses Found</h1>
                        <p>
                            Start <Link to='add'>adding some</Link> today.
                        </p>
                    </section>
                )}
            </main>
        </>
    );
}

export async function loader({ request }) {
    const userId = await requireUserSession(request);

    return getExpenses(userId);
    // const expenses = await getExpenses();

    // if (!expenses?.length) {
    //     throw json(
    //         { message: 'Could not find any expenses' },
    //         { status: 404, statusText: 'No Expenses Found' }
    //     );
    // }
}

// export function CatchBoundary() {
//     return <p>Error</p>;
// }
