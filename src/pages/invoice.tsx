import { Hexagon, Printer, Send } from 'lucide-react';
import Container from "../components/shared/container";
import Section from "../components/shared/section";

interface InvoiceItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

interface InvoiceData {
  id: string;
  sender: {
    name: string;
    address: string[];
    phone: string;
  };
  customer: {
    name: string;
    address: string[];
    phone: string;
  };
  items: InvoiceItem[];
  discountPercent: number;
  notes: string;
}

const MOCK_INVOICE: InvoiceData = {
  id: '#RB6985',
  sender: {
    name: 'Rasket',
    address: ['1729 Bangor St,', 'Houlton, ME, 04730'],
    phone: '(207) 532-9109',
  },
  customer: {
    name: 'Anna M. Hines',
    address: ['135 White Cemetery Rd,', 'Perryville, KY, 40468'],
    phone: '(304) 584-4345',
  },
  items: [
    { id: '1', name: 'G15 Gaming Laptop', quantity: 3, price: 240.59 },
    { id: '2', name: 'Sony Alpha ILCE 6000Y 24.3 MP Mirrorless Digital SLR Camera', quantity: 5, price: 135.99 },
    { id: '3', name: 'Sony Over-Ear Wireless Headphone with Mic', quantity: 1, price: 99.49 },
    { id: '4', name: 'Adam ROMA USB-C / USB-A 3.1 (2-in-1 Flash Drive) – 128GB', quantity: 2, price: 350.19 },
  ],
  discountPercent: 10,
  notes: 'All accounts are to be paid within 7 days from receipt of invoice. To be paid by cheque or credit card or direct payment online. If account is not paid within 7 days the credits details supplied as confirmation of work undertaken will be charged the agreed quoted fee noted above.'
};

export const Invoice = ({ data = MOCK_INVOICE }: { data?: InvoiceData }) => {
  const subTotal = data.items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const discountAmount = (subTotal * data.discountPercent) / 100;
  const grandTotal = subTotal - discountAmount;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 p-8 md:p-12">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start mb-12">
        <div>
          <h2 className="text-xl font-bold text-slate-700 dark:text-slate-100 mb-1">
            Invoice: <span className="text-blue-600 dark:text-blue-400">{data.id}</span>
          </h2>
        </div>
        <div className="text-right mt-6 md:mt-0">
          <div className="flex items-center justify-end gap-2 mb-2">
            <Hexagon className="text-blue-600 dark:text-blue-400 fill-current" size={24} />
            <span className="text-2xl font-bold text-slate-900 dark:text-white">{data.sender.name}</span>
          </div>
          {data.sender.address.map((line, i) => (
            <p key={i} className="text-sm text-slate-500 dark:text-slate-400">{line}</p>
          ))}
          <p className="text-sm text-slate-500 dark:text-slate-400">P: {data.sender.phone}</p>
        </div>
      </div>

      {/* Customer Info */}
      <div className="mb-12">
        <p className="text-xs font-semibold text-slate-400 uppercase mb-2">Customer</p>
        <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-1">{data.customer.name}</h3>
        {data.customer.address.map((line, i) => (
          <p key={i} className="text-sm text-slate-500 dark:text-slate-400">{line}</p>
        ))}
        <p className="text-sm text-slate-500 dark:text-slate-400">P: {data.customer.phone}</p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto mb-8">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase bg-slate-50 dark:bg-slate-800/50">
              <th className="py-3 px-4">Product Name</th>
              <th className="py-3 px-4 text-center">Quantity</th>
              <th className="py-3 px-4 text-right">Price</th>
              <th className="py-3 px-4 text-right">Total</th>
            </tr>
          </thead>
          <tbody className="text-sm divide-y divide-slate-200 dark:divide-slate-800">
            {data.items.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                <td className="py-4 px-4 font-medium text-slate-700 dark:text-slate-300">
                  {item.name}
                </td>
                <td className="py-4 px-4 text-center text-slate-500 dark:text-slate-400">
                  {item.quantity}
                </td>
                <td className="py-4 px-4 text-right text-slate-500 dark:text-slate-400">
                  ${item.price.toFixed(2)}
                </td>
                <td className="py-4 px-4 text-right text-slate-700 dark:text-slate-300 font-semibold">
                  ${(item.price * item.quantity).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Totals */}
      <div className="flex justify-end mb-12">
        <div className="w-full md:w-1/3 space-y-3">
          <div className="flex justify-between text-sm text-slate-500 dark:text-slate-400">
            <span>Sub-total :</span>
            <span className="text-slate-700 dark:text-slate-200">${subTotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm text-slate-500 dark:text-slate-400">
            <span>Discount ({data.discountPercent}%) :</span>
            <span className="text-slate-700 dark:text-slate-200">${discountAmount.toFixed(2)}</span>
          </div>
          <div className="border-t border-slate-200 dark:border-slate-800 pt-3 flex justify-between items-center">
            <span className="text-base font-bold text-slate-800 dark:text-white">Total :</span>
            <span className="text-2xl font-bold text-slate-800 dark:text-white">${grandTotal.toFixed(3)} USD</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mb-8">
        <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mb-1">Notes:</p>
        <p className="text-xs text-slate-400 dark:text-slate-500 leading-relaxed">
          {data.notes}
        </p>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3 print:hidden">
        <button 
          onClick={handlePrint}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium text-sm transition-colors shadow-lg shadow-blue-900/20 flex items-center gap-2"
        >
          <Printer size={16} /> Print
        </button>
        <button className="px-4 py-2 bg-transparent border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white rounded-md font-medium text-sm transition-colors flex items-center gap-2">
          <Send size={16} /> Submit
        </button>
      </div>
    </div>
  );
};

/**
 * =========================================================================
 * DOCUMENTATION PAGE
 * =========================================================================
 */

export default function Invoices() {
  return (
    <Container
      title="Invoice"
      description="A professional, responsive invoice template suitable for billing and payment requests."
    >
      <Section title="Invoice Template">
        <Invoice />
      </Section>
    </Container>
  );
}