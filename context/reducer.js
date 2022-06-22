export const initailState = {
	newInvoiceClient: {},
	items: []
};

export const defaultReducer = (state, action) => {
	switch (action.type) {
		case 'ADD_CLIENT':
			return {
				...state,
				newInvoiceClient: action.payload
			};
		case 'REMOVE_CLIENT': {
			return {
				...state,
				newInvoiceClient: {}
			};
		}
		case 'ADD_ITEM': {
			return {
				...state,
				items: [...state.items, action.payload]
			};
		}
	}
};
