// // src/app/facture/page.tsx
// 'use client';

// import React, { useState } from 'react';
// import { DateTime } from 'luxon';
// import Image from 'next/image';
// import dynamic from 'next/dynamic';
// import InvoicePDF from '../components/InvoicePDF';

// // Dynamic imports for client-side only
// const PDFDownloadLink = dynamic(() => import('@react-pdf/renderer').then((mod) => mod.PDFDownloadLink), {
//     ssr: false,
// });
// const PDFViewer = dynamic(() => import('@react-pdf/renderer').then((mod) => mod.PDFViewer), {
//     ssr: false,
// });

// const FactureGenerator: React.FC = () => {

//     const [invoiceNumber, setInvoiceNumber] = useState('1-2025');
//     const [issueDate, setIssueDate] = useState(DateTime.now().toISODate() ?? '');
//     const [dueDate, setDueDate] = useState(DateTime.now().plus({ days: 30 }).toISODate() ?? '');
//     const [client, setClient] = useState({ billTo: '' });
//     const [services, setServices] = useState([{ description: '', quantity: 1, rate: 0 }]);
//     const [notes, setNotes] = useState('');
//     const [terms, setTerms] = useState('');
//     const [amountPaid, setAmountPaid] = useState(0);

//     const freelancer = {
//         name: 'Madhavan VENKATESAN',
//         address: '662 Route de vaux, 60100 Creil',
//         siret: '90408466200017',
//         email: 'Madhulivezz@gmail.com',
//     };

//     const subtotal = services.reduce((sum, s) => sum + s.quantity * s.rate, 0);
//     const tax = 0;
//     const balanceDue = subtotal - amountPaid;

//     const handleServiceChange = (index: number, field: string, value: string | number) => {
//         const updatedServices = [...services];
//         updatedServices[index] = { ...updatedServices[index], [field]: field === 'description' ? value : Number(value) };
//         setServices(updatedServices);
//     };

//     const addService = () => {
//         setServices([...services, { description: '', quantity: 1, rate: 0 }]);
//     };

//     const removeService = (index: number) => {
//         if (services.length > 1) {
//             setServices(services.filter((_, i) => i !== index));
//         }
//     };

//     return (
//         <div className="w-full min-h-screen flex justify-around bg-gray-100 py-4">
//             <div id="invoice" className="w-full max-w-4xl bg-white shadow-lg p-6">
//                 {/* Header */}
//                 <header className="flex justify-between items-center mb-10">
//                     <div className="w-48 flex items-center justify-center">
//                         <Image src="/neeldot.png" alt="logo" width={200} height={60} className="object-contain" />
//                     </div>
//                     <div className="text-right flex flex-col gap-4">
//                         <h1 className="text-3xl font-bold text-gray-800">FACTURE</h1>
//                         <p className="text-sm flex gap-3 justify-between">
//                             <strong>N°</strong>
//                             <span className="print-only">{invoiceNumber}</span>
//                             <input
//                                 type="text"
//                                 value={invoiceNumber}
//                                 onChange={(e) => setInvoiceNumber(e.target.value)}
//                                 className="border p-1 w-16 screen-only"
//                             />
//                         </p>
//                     </div>
//                 </header>

//                 {/* Freelancer and Client Info */}
//                 <section className="flex justify-between mb-6 gap-4">
//                     <div className="w-1/2">
//                         <p className="mt-1">{freelancer.name}</p>
//                         <p>{freelancer.address}</p>
//                         <p>SIRET: {freelancer.siret}</p>
//                         <p>Email: {freelancer.email}</p>
//                         <h2 className="text-sm font-semibold text-gray-600 mt-4">Facturé à</h2>
//                         <textarea
//                             placeholder="À qui s’adresse cette facture ?"
//                             value={client.billTo}
//                             onChange={(e) => setClient({ ...client, billTo: e.target.value })}
//                             className="border p-2 w-full h-28 screen-only mt-1"
//                         />
//                         <div className="print-only mt-1">{client.billTo || 'À qui s’adresse cette facture ?'}</div>
//                     </div>
//                     <div className="w-1/3 text-right flex flex-col">
//                         <p className="text-sm flex justify-between">
//                             <strong>Date</strong>
//                             <span className="print-only">{issueDate}</span>
//                             <input
//                                 type="date"
//                                 value={issueDate}
//                                 onChange={(e) => setIssueDate(e.target.value)}
//                                 className="border p-1 screen-only"
//                             />
//                         </p>
//                         <p className="text-sm mt-2 flex justify-between">
//                             <strong>Date d’échéance</strong>
//                             <span className="print-only">{dueDate}</span>
//                             <input
//                                 type="date"
//                                 value={dueDate}
//                                 onChange={(e) => setDueDate(e.target.value)}
//                                 className="border p-1 screen-only"
//                             />
//                         </p>
//                     </div>
//                 </section>

//                 {/* Services Table */}
//                 <section className="mb-6">
//                     <table className="w-full border-collapse">
//                         <thead>
//                             <tr className="bg-blue-900 text-white">
//                                 <th className="p-2 text-left">Prestation</th>
//                                 <th className="p-2 text-right">Quantité [Hours]</th>
//                                 <th className="p-2 text-right">Tarif [HT]</th>
//                                 <th className="p-2 text-right">TVA</th>
//                                 <th className="p-2 text-right">Montant [HT]</th>
//                                 <th className="p-2 screen-only"></th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {services.map((service, index) => (
//                                 <tr key={index}>
//                                     <td className="border p-2">
//                                         <input
//                                             type="text"
//                                             value={service.description}
//                                             onChange={(e) => handleServiceChange(index, 'description', e.target.value)}
//                                             className="w-full border-none p-0 screen-only"
//                                             placeholder="Description..."
//                                         />
//                                         <span className="print-only">{service.description || 'Description...'}</span>
//                                     </td>
//                                     <td className="border p-2 text-right">
//                                         <input
//                                             type="number"
//                                             value={service.quantity}
//                                             onChange={(e) => handleServiceChange(index, 'quantity', Number(e.target.value))}
//                                             className="w-full text-right border-none p-0 screen-only"
//                                             min="1"
//                                         />
//                                         <span className="print-only">{service.quantity}</span>
//                                     </td>
//                                     <td className="border p-2 text-right">
//                                         <input
//                                             type="number"
//                                             value={service.rate}
//                                             onChange={(e) => handleServiceChange(index, 'rate', Number(e.target.value))}
//                                             className="w-full text-right border-none p-0 screen-only"
//                                             step="0.01"
//                                         />
//                                         <span className="print-only">€{service.rate.toFixed(2)}</span>
//                                     </td>
//                                     <td className="border p-2 text-right">0 %</td>
//                                     <td className="border p-2 text-right">€{(service.quantity * service.rate).toFixed(2)}</td>
//                                     <td className="border p-2 text-center screen-only">
//                                         <button
//                                             onClick={() => removeService(index)}
//                                             className="text-red-500 hover:text-red-700"
//                                             disabled={services.length === 1}
//                                         >
//                                             X
//                                         </button>
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                     <div className="mt-2 screen-only">
//                         <button onClick={addService} className="text-green-600 hover:underline">
//                             + Ajouter un article
//                         </button>
//                     </div>
//                 </section>

//                 {/* Notes, Terms, and Totals */}
//                 <section className="flex justify-between">
//                     <div className="w-1/2 text-sm">
//                         <h2 className="font-semibold text-gray-600">Notes :</h2>
//                         <p>TVA NON APPLICABLE, Article 293 B du CGI</p>
//                         <textarea
//                             value={notes}
//                             onChange={(e) => setNotes(e.target.value)}
//                             className="border p-2 w-full h-20 screen-only mt-1"
//                         />
//                         <div className="print-only mt-1">{notes}</div>
//                         <h2 className="text-sm font-semibold text-gray-600 mt-4 pb-2">Conditions de paiement :</h2>
//                         <p>100 % soit {balanceDue.toFixed(2)} € à payer 30 jours fin de mois</p>
//                         <textarea
//                             value={terms}
//                             onChange={(e) => setTerms(e.target.value)}
//                             className="border p-2 w-full h-20 screen-only mt-1"
//                         />
//                         <div className="print-only mt-1">{terms}</div>
//                     </div>
//                     <div className="w-1/3 text-right">
//                         <p className="text-sm flex justify-between">
//                             <strong>Sous-total HT:</strong> €{subtotal.toFixed(2)}
//                         </p>
//                         <p className="text-sm mt-2 flex justify-between">
//                             <strong>TVA (0%):</strong> €{tax.toFixed(2)}
//                         </p>
//                         <p className="text-sm mt-2 flex justify-between">
//                             <strong>Montant payé:</strong>
//                             <span className="print-only">€{amountPaid.toFixed(2)}</span>
//                             <input
//                                 type="number"
//                                 value={amountPaid}
//                                 onChange={(e) => setAmountPaid(Number(e.target.value))}
//                                 className="border p-1 w-16 ml-2 screen-only"
//                                 step="0.01"
//                             />
//                         </p>
//                         <hr className="my-2" />
//                         <p className="text-lg font-bold flex justify-between">
//                             <strong>Total TTC:</strong> €{balanceDue.toFixed(2)}
//                         </p>
//                     </div>
//                 </section>
//             </div>

//             <div className='relative w-1/3'>
//                 {/* PDF Preview */}
//                 <div className="w-full screen-only sticky top-0 left-0">
//                     <div className="border h-[80vh]">
//                         <PDFViewer width="100%" height="100%">
//                             <InvoicePDF
//                                 invoiceNumber={invoiceNumber}
//                                 issueDate={issueDate}
//                                 dueDate={dueDate}
//                                 freelancer={freelancer}
//                                 client={client}
//                                 services={services}
//                                 notes={notes}
//                                 terms={terms}
//                                 subtotal={subtotal}
//                                 tax={tax}
//                                 amountPaid={amountPaid}
//                                 balanceDue={balanceDue}
//                             />
//                         </PDFViewer>
//                     </div>
//                     {/* Download Button */}
//                     <div className="mt-4 screen-only">
//                         <PDFDownloadLink
//                             document={
//                                 <InvoicePDF
//                                     invoiceNumber={invoiceNumber}
//                                     issueDate={issueDate}
//                                     dueDate={dueDate}
//                                     freelancer={freelancer}
//                                     client={client}
//                                     services={services}
//                                     notes={notes}
//                                     terms={terms}
//                                     subtotal={subtotal}
//                                     tax={tax}
//                                     amountPaid={amountPaid}
//                                     balanceDue={balanceDue}
//                                 />
//                             }
//                             fileName={`Facture_${invoiceNumber}.pdf`}
//                         >
//                             {({ loading }) => (
//                                 <button
//                                     className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
//                                     disabled={loading}
//                                 >
//                                     {loading ? 'Génération...' : 'Télécharger le PDF'}
//                                 </button>
//                             )}
//                         </PDFDownloadLink>
//                     </div>
//                 </div>
//             </div>

//             <style jsx>{`
//         @media print {
//           .screen-only {
//             display: none;
//           }
//           .print-only {
//             display: block;
//           }
//         }
//         .screen-only {
//           display: block;
//         }
//         .print-only {
//           display: none;
//         }
//       `}</style>
//         </div>
//     );
// };

// export default FactureGenerator;

// src/app/facture/page.tsx
'use client';

import React, { useState } from 'react';
import { DateTime } from 'luxon';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import InvoicePDF from '../components/InvoicePDF';

// Dynamic imports for client-side only
const PDFDownloadLink = dynamic(() => import('@react-pdf/renderer').then((mod) => mod.PDFDownloadLink), {
    ssr: false,
});
const PDFViewer = dynamic(() => import('@react-pdf/renderer').then((mod) => mod.PDFViewer), {
    ssr: false,
});

const FactureGenerator: React.FC = () => {

    const [invoiceNumber, setInvoiceNumber] = useState('1-2025');
    const [issueDate, setIssueDate] = useState(DateTime.now().toISODate() ?? '');
    const [dueDate, setDueDate] = useState(DateTime.now().plus({ days: 30 }).toISODate() ?? '');
    const [client, setClient] = useState({ billTo: '' });
    const [services, setServices] = useState([{ description: '', quantity: 1, rate: 0 }]);
    const [notes, setNotes] = useState('');
    const [terms, setTerms] = useState('');
    const [amountPaid, setAmountPaid] = useState(0);
    const [showPDF, setShowPDF] = useState(true);


    const freelancer = {
        name: 'Madhavan VENKATESAN',
        address: '662 Route de vaux, 60100 Creil',
        siret: '90408466200017',
        email: 'Madhulivezz@gmail.com',
    };

    const subtotal = services.reduce((sum, s) => sum + s.quantity * s.rate, 0);
    const tax = 0;
    const balanceDue = subtotal - amountPaid;

    const handleServiceChange = (index: number, field: string, value: string | number) => {
        const updatedServices = [...services];
        updatedServices[index] = { ...updatedServices[index], [field]: field === 'description' ? value : Number(value) };
        setServices(updatedServices);
    };

    const addService = () => {
        setServices([...services, { description: '', quantity: 1, rate: 0 }]);
    };

    const removeService = (index: number) => {
        setServices(prevServices => {
            if (prevServices.length > 1) {
                const updated = prevServices.filter((_, i) => i !== index);

                // Hide PDF to force re-render
                setShowPDF(false);

                // Wait for DOM to unmount PDF, then re-mount it
                setTimeout(() => setShowPDF(true), 50);

                return updated;
            }
            return prevServices;
        });
    };


    return (
        <div className="w-full min-h-screen flex justify-around bg-gray-100 py-4">
            <div id="invoice" className="w-full max-w-4xl bg-white shadow-lg p-6">
                {/* Header */}
                <header className="flex justify-between items-center mb-10">
                    <div className="w-48 flex items-center justify-center">
                        <Image src="/neeldot.png" alt="logo" width={200} height={60} className="object-contain" />
                    </div>
                    <div className="text-right flex flex-col gap-4">
                        <h1 className="text-3xl font-bold text-gray-800">FACTURE</h1>
                        <p className="text-sm flex gap-3 justify-between">
                            <strong>N°</strong>
                            <span className="print-only">{invoiceNumber}</span>
                            <input
                                type="text"
                                value={invoiceNumber}
                                onChange={(e) => setInvoiceNumber(e.target.value)}
                                className="border p-1 w-16 screen-only"
                            />
                        </p>
                    </div>
                </header>

                {/* Freelancer and Client Info */}
                <section className="flex justify-between mb-6 gap-4">
                    <div className="w-1/3 flex flex-col gap-22">
                        <div>
                            <p className="mt-1">{freelancer.name}</p>
                            <p>{freelancer.address}</p>
                            <p>SIRET: {freelancer.siret}</p>
                            <p>Email: {freelancer.email}</p>
                        </div>
                        <div>
                            <p className="text-sm flex justify-between">
                                <strong>Date</strong>
                                <span className="print-only">{issueDate}</span>
                                <input
                                    type="date"
                                    value={issueDate}
                                    onChange={(e) => setIssueDate(e.target.value)}
                                    className="border p-1 screen-only"
                                />
                            </p>
                            <p className="text-sm mt-2 flex justify-between">
                                <strong>Date d’échéance</strong>
                                <span className="print-only">{dueDate}</span>
                                <input
                                    type="date"
                                    value={dueDate}
                                    onChange={(e) => setDueDate(e.target.value)}
                                    className="border p-1 screen-only"
                                />
                            </p>
                        </div>
                    </div>
                    <div className="w-1/3 text-left flex flex-col justify-end">
                        <h2 className="text-sm font-semibold text-gray-600 mt-4">Facturé à</h2>
                        <textarea
                            placeholder="À qui s’adresse cette facture ?"
                            value={client.billTo}
                            onChange={(e) => setClient({ ...client, billTo: e.target.value })}
                            className="border p-2 w-full h-28 screen-only mt-1"
                        />
                        <div className="print-only mt-1">{client.billTo || 'À qui s’adresse cette facture ?'}</div>
                    </div>
                </section>

                {/* Services Table */}
                <section className="mb-6">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-blue-900 text-white">
                                <th className="p-2 text-left">Prestation</th>
                                <th className="p-2 text-right">Quantité [Hours]</th>
                                <th className="p-2 text-right">Tarif [HT]</th>
                                <th className="p-2 text-right">TVA</th>
                                <th className="p-2 text-right">Montant [HT]</th>
                                <th className="p-2 screen-only"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {services.map((service, index) => (
                                <tr key={index}>
                                    <td className="border p-2">
                                        <input
                                            type="text"
                                            value={service.description}
                                            onChange={(e) => handleServiceChange(index, 'description', e.target.value)}
                                            className="w-full border-none p-0 screen-only"
                                            placeholder="Description..."
                                        />
                                        <span className="print-only">{service.description || 'Description...'}</span>
                                    </td>
                                    <td className="border p-2 text-right">
                                        <input
                                            type="number"
                                            value={service.quantity}
                                            onChange={(e) => handleServiceChange(index, 'quantity', Number(e.target.value))}
                                            className="w-full text-right border-none p-0 screen-only"
                                            min="1"
                                        />
                                        <span className="print-only">{service.quantity}</span>
                                    </td>
                                    <td className="border p-2 text-right">
                                        <input
                                            type="number"
                                            value={service.rate}
                                            onChange={(e) => handleServiceChange(index, 'rate', Number(e.target.value))}
                                            className="w-full text-right border-none p-0 screen-only"
                                            step="0.01"
                                        />
                                        <span className="print-only">€{service.rate.toFixed(2)}</span>
                                    </td>
                                    <td className="border p-2 text-right">0 %</td>
                                    <td className="border p-2 text-right">€{(service.quantity * service.rate).toFixed(2)}</td>
                                    <td className="border p-2 text-center screen-only">
                                        <button
                                            onClick={() => removeService(index)}
                                            className="text-red-500 hover:text-red-700"
                                            disabled={services.length === 1}
                                        >
                                            X
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="mt-2 screen-only">
                        <button onClick={addService} className="text-green-600 hover:underline">
                            + Ajouter un article
                        </button>
                    </div>
                </section>

                {/* Notes, Terms, and Totals */}
                <section className="flex justify-between">
                    <div className="w-1/2 text-sm">
                        <h2 className="font-semibold text-gray-600">Notes :</h2>
                        <p>TVA NON APPLICABLE, Article 293 B du CGI</p>
                        <textarea
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            className="border p-2 w-full h-20 screen-only mt-1"
                        />
                        <div className="print-only mt-1">{notes}</div>
                        <h2 className="text-sm font-semibold text-gray-600 mt-4 pb-2">Conditions de paiement :</h2>
                        <p>100 % soit {balanceDue.toFixed(2)} € à payer 30 jours fin de mois</p>
                        <textarea
                            value={terms}
                            onChange={(e) => setTerms(e.target.value)}
                            className="border p-2 w-full h-20 screen-only mt-1"
                        />
                        <div className="print-only mt-1">{terms}</div>
                    </div>
                    <div className="w-1/3 text-right">
                        <p className="text-sm flex justify-between">
                            <strong>Sous-total HT:</strong> €{subtotal.toFixed(2)}
                        </p>
                        <p className="text-sm mt-2 flex justify-between">
                            <strong>TVA (0%):</strong> €{tax.toFixed(2)}
                        </p>
                        <p className="text-sm mt-2 flex justify-between">
                            <strong>Montant payé:</strong>
                            <span className="print-only">€{amountPaid.toFixed(2)}</span>
                            <input
                                type="number"
                                value={amountPaid}
                                onChange={(e) => setAmountPaid(Number(e.target.value))}
                                className="border p-1 w-16 ml-2 screen-only"
                                step="0.01"
                            />
                        </p>
                        <hr className="my-2" />
                        <p className="text-lg font-bold flex justify-between">
                            <strong>Total TTC:</strong> €{balanceDue.toFixed(2)}
                        </p>
                    </div>
                </section>
            </div>

            <div className='relative w-1/3'>
                {/* PDF Preview */}
                <div className="w-full screen-only sticky top-0 left-0">
                    <div className="border h-[80vh]">
                        {showPDF && (
                            <PDFViewer width="100%" height="100%">
                                <InvoicePDF
                                    invoiceNumber={invoiceNumber}
                                    issueDate={issueDate}
                                    dueDate={dueDate}
                                    freelancer={freelancer}
                                    client={client}
                                    services={services}
                                    notes={notes}
                                    terms={terms}
                                    subtotal={subtotal}
                                    tax={tax}
                                    amountPaid={amountPaid}
                                    balanceDue={balanceDue}
                                />
                            </PDFViewer>
                        )}
                    </div>
                    {/* Download Button */}
                    <div className="mt-4 screen-only">
                        {showPDF && (
                            <PDFDownloadLink
                                document={
                                    <InvoicePDF
                                        invoiceNumber={invoiceNumber}
                                        issueDate={issueDate}
                                        dueDate={dueDate}
                                        freelancer={freelancer}
                                        client={client}
                                        services={services}
                                        notes={notes}
                                        terms={terms}
                                        subtotal={subtotal}
                                        tax={tax}
                                        amountPaid={amountPaid}
                                        balanceDue={balanceDue}
                                    />
                                }
                                fileName={`Facture_${invoiceNumber}.pdf`}
                            >
                                {({ loading }) => (
                                    <button
                                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
                                        disabled={loading}
                                    >
                                        {loading ? 'Génération...' : 'Télécharger le PDF'}
                                    </button>
                                )}
                            </PDFDownloadLink>
                        )}
                    </div>
                </div>
            </div>

            <style jsx>{`
        @media print {
          .screen-only {
            display: none;
          }
          .print-only {
            display: block;
          }
        }
        .screen-only {
          display: block;
        }
        .print-only {
          display: none;
        }
      `}</style>
        </div>
    );
};

export default FactureGenerator;