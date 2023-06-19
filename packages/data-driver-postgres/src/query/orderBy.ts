import type { SqlStatement } from '@directus/data-sql';
import { escapeIdentifier } from '../utils/escape-identifier.js';

/**
 * Generates the `ORDER BY x` part of a SQL statement.
 * The order direction is always set explicitly, although Postgres defaults to `ASC`.
 *
 * @param query - The abstract query
 * @returns The `ORDER BY x` part of a SQL statement
 */
export function orderBy({ order }: SqlStatement): string | null {
	if (order === undefined) {
		return null;
	}

	const sortExpressions = order.map((o) => {
		switch (o.orderBy.type) {
			case 'primitive':
				return `${escapeIdentifier(o.orderBy.field)} ${o.order}`;
			case 'fn':
				break;
			case 'm2o':
				break;
			case 'a2o':
				break;
			default:
				break;
		}
	});

	return `ORDER BY ${sortExpressions.join(', ')}`;
}
