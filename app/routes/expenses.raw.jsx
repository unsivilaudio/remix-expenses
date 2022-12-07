import { json } from '@remix-run/node';
import { requireUserSession } from '~/data/auth.server';
import { getExpenses } from '~/data/expenses.server';

export async function loader({ request }) {
    await requireUserSession(request);
    const expensesRaw = (await getExpenses()) || [];
    return json(expensesRaw);
}
