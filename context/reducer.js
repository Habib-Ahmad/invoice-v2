export const initailState = {
	newInvoiceClient: {},
	items: [],
	currentItem: {},
	editItem: []
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
		case 'ADD_CURRENT_ITEM': {
			return {
				...state,
				currentItem: action.payload
			};
		}
		case 'ADD_ITEM': {
			return {
				...state,
				items: [...state.items, action.payload],
				currentItem: {}
			};
		}
		case 'EDIT_ITEM': {
			const [index, item] = action.payload;
			return {
				...state,
				editItem: [index, item]
			};
		}
		case 'CLEAR_STATE': {
			return initailState;
		}
	}
};
