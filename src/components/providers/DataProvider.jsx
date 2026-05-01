'use client';

import React, { createContext, useContext, useMemo, useEffect } from 'react';
import statesData from '@/static-data/states.json';
import locationsData from '@/static-data/locations.json';
import infectionsData from '@/static-data/infections.json';

const DataContext = createContext(null);

export function DataProvider({ children }) {
	const value = useMemo(
		() => ({
			states: statesData,
			locations: locationsData,
			infections: infectionsData,
		}),
		[]
	);

	useEffect(() => {
		// Data provider loaded
	}, []);

	return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export function useAppData() {
	const context = useContext(DataContext);
	if (context === undefined) {
		throw new Error('useAppData must be used within a DataProvider');
	}
	return context;
}
