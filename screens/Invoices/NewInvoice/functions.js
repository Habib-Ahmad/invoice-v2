import * as Print from 'expo-print';
import { db } from '../../../firebase';
import {
	addDoc,
	collection,
	doc,
	getDoc,
	setDoc,
	updateDoc,
	writeBatch
} from 'firebase/firestore';
import {
	multiplePageInvoice,
	singlePageInvoice
} from '../../../components/pdfTemplate';

export const print = async (data, total, selectedPrinter) => {
	const html =
		data.items < 21
			? singlePageInvoice(data, total)
			: multiplePageInvoice(data, total);
	await Print.printAsync({
		html,
		printerUrl: selectedPrinter?.url // iOS only
	});
};

export const selectPrinter = async (setSelectedPrinter) => {
	const printer = await Print.selectPrinterAsync(); // iOS only
	setSelectedPrinter(printer);
};

export const addItemsToDB = async (data) => {
	const batch = writeBatch(db);
	data.items.forEach((item) => {
		if (!item.id) {
			delete item.quantity;
			const itemRef = doc(collection(db, 'items'));
			batch.set(itemRef, item);
		}
	});
	await batch.commit();
};

const processData = (data) => {
	const date = new Date();
	const [month, day, year] = [
		date.getMonth(),
		date.getDate(),
		date.getFullYear()
	];
	data.date = `${year}-${month}-${day}`;
	data.client.invoices && delete data.client.invoices;
	delete data.items.quantity;

	return data;
};

const addInvoiceToInvoices = async (data) => {
	try {
		await setDoc(doc(db, `invoices/${data.id}`), data);
	} catch (error) {
		console.log(error.message);
	}
};

export const addInvoiceToDB = async (data) => {
	const processedData = processData(data);

	const clientId = processedData.client.id;
	const invoiceId = await addDoc(
		collection(db, `clients/${clientId}/invoices`),
		processedData
	).then(async (invoiceRef) => invoiceRef.id);

	const invoice = await getDoc(
		doc(db, `clients/${clientId}/invoices/${invoiceId}`)
	);
	const invoiceData = invoice.data();
	invoiceData.id = invoiceId;
	const invoiceRef = doc(db, `clients/${clientId}/invoices/${invoiceId}`);
	await updateDoc(invoiceRef, { id: invoiceId });

	addInvoiceToInvoices(invoiceData);
};
