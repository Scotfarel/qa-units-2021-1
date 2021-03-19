import React from 'react'
import {getSortFunction, sortByDate, sortByItemCount, sortOrders} from './sortOrders';

describe('sortByItemCount function', () => {
	it.each([
		[null, null, 0], 													// orders are null
		[{items: ['item1', 'item2']}, {items: ['item1', 'item2']}, 0],		// same items count
		[{items: []}, {items: []}, 0]										// items list are empty
	])('sortByItemCount: %o, %o, %i', (order1, order2, expected) => {
		const result = sortByItemCount(order1, order2);
		expect(result).toBe(expected);
	});

	
	it('the first list is longer than the second one', () => {
		const order1 = {
			items: ['1', '2', '3', '4'],
		};

		const order2 = {
			items: ['5'],
		};

		const result = sortByItemCount(order1, order2);

		expect(result).toBe(1);
	});

	it('the second list is longer than the second one', () => {
		const order1 = {
			items: ['1'],
		};

		const order2 = {
			items: ['2', '3', '4', '5'],
		};

		const result = sortByItemCount(order1, order2);

		expect(result).toBe(-1);
	});
});

describe('sortByDate function', () => {
	it.each([
		[null, null, 0], 												// orders are null
		[
			{date: new Date('March 19, 21').getYear()},
			{date: new Date('March 19, 21').getYear()}, 
			0															// same date
		],	// same items date
		[{date: []}, {date: []}, 0]										// empty date
	])('sortByDate: %o, %o, %i', (order1, order2, expected) => {
		const result = sortByDate(order1, order2);
		expect(result).toBe(expected);
	});

	it('the first item date is bigger', () => {
		const order1 = {
			date: new Date('March 19, 21').getYear(),
		};

		const order2 = {
			date: new Date('March 19, 20').getYear(),
		}

		const result = sortByDate(order1, order2);

		expect(result).toBe(-1);
	});

	it('the second items date is bigger', () => {
		const order1 = {
			date: new Date('March 19, 20').getYear(),
		};

		const order2 = {
			date: new Date('March 19, 21').getYear(),
		}

		const result = sortByDate(order1, order2);

		expect(result).toBe(1);
	});
});

describe('getSortFunction function', () => {
	const sortTypes = {
		DATE: 'date',
		COUNT: 'count',
	};

	it('function is date', () => {
		const result = getSortFunction(sortTypes.DATE);
		expect(result).toEqual(sortByDate);
	});

	it('function is items count', () => {
		const result = getSortFunction(sortTypes.COUNT);
		expect(result).toEqual(sortByItemCount);
	});

	it.each([
		[123, undefined], 										// function is not a function
		[null, undefined]										// function is empty
	])('getSortFunction: %o, %i', (type, expected) => {
		const result = getSortFunction(type);
		expect(result).toBe(expected);
	});
});

describe('sortOrders function', () => {
	it.each([
		[[1, 2, 3], null, undefined], 						// function is null
		[[], sortByDate, undefined],						// array is empty
		[8841, sortByDate, undefined]						// array is not an array
	])('sortOrders: %o, %o, %i', (orders, func, expected) => {
		const result = sortOrders(orders, func);
		expect(result).toBe(expected);
	});
});