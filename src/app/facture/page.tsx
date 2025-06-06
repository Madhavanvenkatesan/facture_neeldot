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
// // const PDFViewer = dynamic(() => import('@react-pdf/renderer').then((mod) => mod.PDFViewer), {
// //     ssr: false,
// // });

// const FactureGenerator: React.FC = () => {
//     const [invoiceNumber, setInvoiceNumber] = useState('1-2025');
//     const [issueDate, setIssueDate] = useState(DateTime.now().toISODate() ?? '');
//     const [dueDate, setDueDate] = useState(DateTime.now().plus({ days: 30 }).toISODate() ?? '');
//     const [client, setClient] = useState({ billTo: '' });
//     const [services, setServices] = useState([{ description: '', quantity: 1, rate: 0 }]);
//     const [notes, setNotes] = useState('');
//     const [terms, setTerms] = useState('');
//     const [amountPaid, setAmountPaid] = useState(0);
//     const [showPDF, setShowPDF] = useState(true);

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
//         setServices((prevServices) => {
//             if (prevServices.length > 1) {
//                 const updated = prevServices.filter((_, i) => i !== index);
//                 setShowPDF(false);
//                 setTimeout(() => setShowPDF(true), 300);
//                 return updated;
//             }
//             return prevServices;
//         });
//     };

//     return (
//         <div className="w-full min-h-screen flex flex-col bg-gray-100 py-4">
//             <div id="invoice" className="w-full max-w-4xl mx-auto bg-white shadow-lg p-4 sm:p-6 text-xs sm:text-sm">
//                 {/* Header */}
//                 <header className="flex flex-col sm:flex-row justify-between items-center mb-6 sm:mb-10">
//                     <div className="w-32 sm:w-48 flex items-center justify-center mb-4 sm:mb-0">
//                         <Image src="/neeldot.png" alt="logo" width={200} height={60} className="object-contain" />
//                     </div>
//                     <div className="text-center sm:text-right flex flex-col gap-4">
//                         <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">FACTURE</h1>
//                         <p className="flex gap-3 justify-center sm:justify-between items-center">
//                             <strong>N°</strong>
//                             <span className="print-only">{invoiceNumber}</span>
//                             <input
//                                 type="text"
//                                 value={invoiceNumber}
//                                 onChange={(e) => setInvoiceNumber(e.target.value)}
//                                 className="border p-2 w-full sm:w-20 screen-only rounded"
//                             />
//                         </p>
//                     </div>
//                 </header>

//                 {/* Freelancer and Client Info */}
//                 <section className="flex flex-col sm:flex-row justify-between mb-6 gap-4">
//                     <div className="w-full sm:w-1/3 flex flex-col gap-6 sm:gap-22">
//                         <div>
//                             <p className="mt-1">{freelancer.name}</p>
//                             <p>{freelancer.address}</p>
//                             <p>SIRET: {freelancer.siret}</p>
//                             <p>Email: {freelancer.email}</p>
//                         </div>
//                         <div>
//                             <p className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
//                                 <strong>Date</strong>
//                                 <span className="print-only">{issueDate}</span>
//                                 <input
//                                     type="date"
//                                     value={issueDate}
//                                     onChange={(e) => setIssueDate(e.target.value)}
//                                     className="border p-2 w-full sm:w-auto screen-only rounded"
//                                 />
//                             </p>
//                             <p className="mt-2 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
//                                 <strong>Date d’échéance</strong>
//                                 <span className="print-only">{dueDate}</span>
//                                 <input
//                                     type="date"
//                                     value={dueDate}
//                                     onChange={(e) => setDueDate(e.target.value)}
//                                     className="border p-2 w-full sm:w-auto screen-only rounded"
//                                 />
//                             </p>
//                         </div>
//                     </div>
//                     <div className="w-full sm:w-1/3 text-left flex flex-col justify-end mt-4 sm:mt-0">
//                         <h2 className="font-semibold text-gray-600">Facturé à</h2>
//                         <textarea
//                             placeholder="À qui s’adresse cette facture ?"
//                             value={client.billTo}
//                             onChange={(e) => setClient({ ...client, billTo: e.target.value })}
//                             className="border p-2 w-full h-24 screen-only mt-1 rounded"
//                         />
//                         <div className="print-only mt-1">{client.billTo || 'À qui s’adresse cette facture ?'}</div>
//                     </div>
//                 </section>

//                 {/* Services Table */}
//                 <section className="mb-6">
//                     <table className="w-full border-collapse text-xs">
//                         <thead>
//                             <tr className="bg-blue-900 text-white">
//                                 <th className="p-1 sm:p-2 text-left">Prestation</th>
//                                 <th className="p-1 sm:p-2 text-right">Qté [H]</th>
//                                 <th className="p-1 sm:p-2 text-right">Tarif</th>
//                                 <th className="p-1 sm:p-2 text-right">TVA</th>
//                                 <th className="p-1 sm:p-2 text-right">Montant</th>
//                                 <th className="p-1 sm:p-2 w-12 screen-only"></th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {services.map((service, index) => (
//                                 <tr key={index}>
//                                     <td className="border p-1 sm:p-2 break-words">
//                                         <input
//                                             type="text"
//                                             value={service.description}
//                                             onChange={(e) => handleServiceChange(index, 'description', e.target.value)}
//                                             className="w-full border-none p-0 screen-only"
//                                             placeholder="Description..."
//                                         />
//                                         <span className="print-only">{service.description || 'Description...'}</span>
//                                     </td>
//                                     <td className="border p-1 sm:p-2 text-right">
//                                         <input
//                                             type="number"
//                                             value={service.quantity}
//                                             onChange={(e) => handleServiceChange(index, 'quantity', Number(e.target.value))}
//                                             className="w-full text-right border-none p-0 screen-only"
//                                             min="1"
//                                         />
//                                         <span className="print-only">{service.quantity}</span>
//                                     </td>
//                                     <td className="border p-1 sm:p-2 text-right">
//                                         <input
//                                             type="number"
//                                             value={service.rate}
//                                             onChange={(e) => handleServiceChange(index, 'rate', Number(e.target.value))}
//                                             className="w-full text-right border-none p-0 screen-only"
//                                             step="0.01"
//                                         />
//                                         <span className="print-only">€{service.rate.toFixed(2)}</span>
//                                     </td>
//                                     <td className="border p-1 sm:p-2 text-right">0 %</td>
//                                     <td className="border p-1 sm:p-2 text-right">€{(service.quantity * service.rate).toFixed(2)}</td>
//                                     <td className="border p-1 sm:p-2 text-center screen-only">
//                                         <button
//                                             onClick={() => removeService(index)}
//                                             className="text-red-500 hover:text-red-700 text-sm"
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
//                         <button onClick={addService} className="text-green-600 hover:underline text-sm">
//                             + Ajouter un article
//                         </button>
//                     </div>
//                 </section>

//                 {/* Notes, Terms, and Totals */}
//                 <section className="flex flex-col sm:flex-row justify-between gap-4 sm:gap-5">
//                     <div className="flex-1 flex flex-col gap-4">
//                         <div>
//                             <h2 className="font-semibold text-gray-600 pb-2">Coordonnées bancaires :</h2>
//                             <p className="text-xs sm:text-sm">IBAN: FR68 2004 1010 0526 9833 5T02 690</p>
//                             <p className="text-xs sm:text-sm">BIC: PSSTFRPPLIL</p>
//                             <p className="text-xs sm:text-sm">Banque: La poste</p>
//                             <p className="text-xs sm:text-sm">Titulaire: {freelancer.name}</p>
//                         </div>

//                         <div>

//                             <h2 className="font-semibold text-gray-600">Notes :</h2>
//                             <p className="text-xs sm:text-sm">TVA NON APPLICABLE, Article 293 B du CGI</p>
//                             <textarea
//                                 value={notes}
//                                 onChange={(e) => setNotes(e.target.value)}
//                                 className="border p-2 w-full h-20 screen-only mt-1 rounded"
//                             />
//                             <div className="print-only mt-1">{notes}</div>
//                         </div>
//                         <div>

//                             <h2 className="font-semibold text-gray-600 pb-2">Conditions de paiement :</h2>
//                             <p className="text-xs sm:text-sm">100 % soit {balanceDue.toFixed(2)} € à payer 30 jours fin de mois</p>
//                             <textarea
//                                 value={terms}
//                                 onChange={(e) => setTerms(e.target.value)}
//                                 className="border p-2 w-full h-20 screen-only mt-1 rounded"
//                             />
//                             <div className="print-only mt-1">{terms}</div>
//                         </div>
//                     </div>
//                     <div className="w-full sm:w-1/3 text-right mt-4 sm:mt-0">
//                         <p className="flex justify-between">
//                             <strong>Sous-total HT:</strong> €{subtotal.toFixed(2)}
//                         </p>
//                         <p className="mt-2 flex justify-between">
//                             <strong>TVA (0%):</strong> €{tax.toFixed(2)}
//                         </p>
//                         <p className="mt-2 flex justify-between items-center">
//                             <strong>Montant payé:</strong>
//                             <span className="print-only">€{amountPaid.toFixed(2)}</span>
//                             <input
//                                 type="number"
//                                 value={amountPaid}
//                                 onChange={(e) => setAmountPaid(Number(e.target.value))}
//                                 className="border p-2 w-full sm:w-20 ml-2 screen-only rounded"
//                                 step="0.01"
//                             />
//                         </p>
//                         <hr className="my-2" />
//                         <p className="text-base sm:text-lg font-bold flex justify-between">
//                             <strong>Total TTC:</strong> €{balanceDue.toFixed(2)}
//                         </p>
//                     </div>
//                 </section>
//             </div>

//             <div className="w-full max-w-4xl mx-auto mt-6 px-4 sm:px-6">
//                 <div className="flex flex-col sm:flex-row gap-4 screen-only">
//                     <button
//                         onClick={() => setShowPDF(!showPDF)}
//                         className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-4 rounded w-full sm:w-auto text-sm sm:text-base"
//                     >
//                         {showPDF ? 'Masquer Aperçu' : 'Afficher Aperçu'}
//                     </button>
//                     {showPDF && (
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
//                                     className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded disabled:opacity-50 w-full sm:w-auto text-sm sm:text-base"
//                                     disabled={loading}
//                                 >
//                                     {loading ? 'Génération...' : 'Télécharger le PDF'}
//                                 </button>
//                             )}
//                         </PDFDownloadLink>
//                     )}
//                 </div>
//                 {/* <div className="screen-only mt-4 border h-[60vh] sm:h-[80vh] hidden sm:block">
//                     {showPDF && (
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
//                     )}
//                 </div>
//                 {showPDF && (
//                     <div className="sm:hidden mt-4">
//                         <p className="text-red-500 text-xs">
//                             Aperçu PDF désactivé sur mobile pour des raisons de performance. Veuillez télécharger le PDF.
//                         </p>
//                     </div>
//                 )} */}
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
'use client';

import React, { useState, useEffect } from 'react';
import { DateTime } from 'luxon';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import InvoicePDF from '../components/InvoicePDF';

// Dynamic imports for client-side only
const PDFDownloadLink = dynamic(() => import('@react-pdf/renderer').then((mod) => mod.PDFDownloadLink), {
    ssr: false,
});

const FactureGenerator: React.FC = () => {
    // Initialize state with default values
    const [invoiceNumber, setInvoiceNumber] = useState<string>('1-2025');
    const [issueDate, setIssueDate] = useState<string>(DateTime.now().toISODate() ?? '');
    const [dueDate, setDueDate] = useState<string>(DateTime.now().plus({ days: 30 }).toISODate() ?? '');
    const [client, setClient] = useState<{ billTo: string }>({ billTo: '' });
    const [services, setServices] = useState<{ description: string; quantity: number; rate: number }[]>([
        { description: '', quantity: 1, rate: 0 },
    ]);
    const [notes, setNotes] = useState<string>('');
    const [terms, setTerms] = useState<string>('');
    const [amountPaid, setAmountPaid] = useState<number>(0);
    const [showPDF, setShowPDF] = useState(true);

    // Load data from localStorage on client-side mount
    useEffect(() => {
        const saved = localStorage.getItem('invoiceData');
        if (saved) {
            try {
                const data = JSON.parse(saved);
                setInvoiceNumber(data.invoiceNumber || '1-2025');
                setIssueDate(data.issueDate || DateTime.now().toISODate() || '');
                setDueDate(data.dueDate || DateTime.now().plus({ days: 30 }).toISODate() || '');
                setClient(data.client || { billTo: '' });
                setServices(data.services && Array.isArray(data.services) ? data.services : [{ description: '', quantity: 1, rate: 0 }]);
                setNotes(data.notes || '');
                setTerms(data.terms || '');
                setAmountPaid(data.amountPaid || 0);
            } catch (error) {
                console.error('Failed to parse localStorage data:', error);
            }
        }
    }, []); // Empty dependency array to run once on mount

    // Save form data to localStorage whenever it changes
    useEffect(() => {
        const invoiceData = {
            invoiceNumber,
            issueDate,
            dueDate,
            client,
            services,
            notes,
            terms,
            amountPaid,
        };
        localStorage.setItem('invoiceData', JSON.stringify(invoiceData));
    }, [invoiceNumber, issueDate, dueDate, client, services, notes, terms, amountPaid]);

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
        setServices((prevServices) => {
            if (prevServices.length > 1) {
                const updated = prevServices.filter((_, i) => i !== index);
                setShowPDF(false);
                setTimeout(() => setShowPDF(true), 300);
                return updated;
            }
            return prevServices;
        });
    };

    const clearForm = () => {
        setInvoiceNumber('1-2025');
        setIssueDate(DateTime.now().toISODate() ?? '');
        setDueDate(DateTime.now().plus({ days: 30 }).toISODate() ?? '');
        setClient({ billTo: '' });
        setServices([{ description: '', quantity: 1, rate: 0 }]);
        setNotes('');
        setTerms('');
        setAmountPaid(0);
        localStorage.removeItem('invoiceData');
    };

    return (
        <div className="w-full min-h-screen flex flex-col bg-gray-100 py-4">
            <div id="invoice" className="w-full max-w-4xl mx-auto bg-white shadow-lg p-4 sm:p-6 text-xs sm:text-sm">
                {/* Header */}
                <header className="flex flex-col sm:flex-row justify-between items-center mb-6 sm:mb-10">
                    <div className="w-32 sm:w-48 flex items-center justify-center mb-4 sm:mb-0">
                        <Image src="/neeldot.png" alt="logo" width={200} height={60} className="object-contain" />
                    </div>
                    <div className="text-center sm:text-right flex flex-col gap-4">
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">FACTURE</h1>
                        <p className="flex gap-3 justify-center sm:justify-between items-center">
                            <strong>N°</strong>
                            <span className="print-only">{invoiceNumber}</span>
                            <input
                                type="text"
                                value={invoiceNumber}
                                onChange={(e) => setInvoiceNumber(e.target.value)}
                                className="border p-2 w-full sm:w-20 screen-only rounded"
                            />
                        </p>
                    </div>
                </header>

                {/* Freelancer and Client Info */}
                <section className="flex flex-col sm:flex-row justify-between mb-6 gap-4">
                    <div className="w-full sm:w-1/3 flex flex-col gap-6 sm:gap-22">
                        <div>
                            <p className="mt-1">{freelancer.name}</p>
                            <p>{freelancer.address}</p>
                            <p>SIRET: {freelancer.siret}</p>
                            <p>Email: {freelancer.email}</p>
                        </div>
                        <div>
                            <p className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                                <strong>Date</strong>
                                <span className="print-only">{issueDate}</span>
                                <input
                                    type="date"
                                    value={issueDate}
                                    onChange={(e) => setIssueDate(e.target.value)}
                                    className="border p-2 w-full sm:w-auto screen-only rounded"
                                />
                            </p>
                            <p className="mt-2 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                                <strong>Date d’échéance</strong>
                                <span className="print-only">{dueDate}</span>
                                <input
                                    type="date"
                                    value={dueDate}
                                    onChange={(e) => setDueDate(e.target.value)}
                                    className="border p-2 w-full sm:w-auto screen-only rounded"
                                />
                            </p>
                        </div>
                    </div>
                    <div className="w-full sm:w-1/3 text-left flex flex-col justify-end mt-4 sm:mt-0">
                        <h2 className="font-semibold text-gray-600">Facturé à</h2>
                        <textarea
                            placeholder="À qui s’adresse cette facture ?"
                            value={client.billTo}
                            onChange={(e) => setClient({ ...client, billTo: e.target.value })}
                            className="border p-2 w-full h-24 screen-only mt-1 rounded"
                        />
                        <div className="print-only mt-1">{client.billTo || 'À qui s’adresse cette facture ?'}</div>
                    </div>
                </section>

                {/* Services Table */}
                <section className="mb-6">
                    <table className="w-full border-collapse text-xs">
                        <thead>
                            <tr className="bg-blue-900 text-white">
                                <th className="p-1 sm:p-2 text-left">Prestation</th>
                                <th className="p-1 sm:p-2 text-right">Qté [H]</th>
                                <th className="p-1 sm:p-2 text-right">Tarif</th>
                                <th className="p-1 sm:p-2 text-right">TVA</th>
                                <th className="p-1 sm:p-2 text-right">Montant</th>
                                <th className="p-1 sm:p-2 w-12 screen-only"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {services.map((service, index) => (
                                <tr key={index}>
                                    <td className="border p-1 sm:p-2 break-words">
                                        <input
                                            type="text"
                                            value={service.description}
                                            onChange={(e) => handleServiceChange(index, 'description', e.target.value)}
                                            className="w-full border-none p-0 screen-only"
                                            placeholder="Description..."
                                        />
                                        <span className="print-only">{service.description || 'Description...'}</span>
                                    </td>
                                    <td className="border p-1 sm:p-2 text-right">
                                        <input
                                            type="number"
                                            value={service.quantity}
                                            onChange={(e) => handleServiceChange(index, 'quantity', Number(e.target.value))}
                                            className="w-full text-right border-none p-0 screen-only"
                                            min="1"
                                        />
                                        <span className="print-only">{service.quantity}</span>
                                    </td>
                                    <td className="border p-1 sm:p-2 text-right">
                                        <input
                                            type="number"
                                            value={service.rate}
                                            onChange={(e) => handleServiceChange(index, 'rate', Number(e.target.value))}
                                            className="w-full text-right border-none p-0 screen-only"
                                            step="0.01"
                                        />
                                        <span className="print-only">€{service.rate.toFixed(2)}</span>
                                    </td>
                                    <td className="border p-1 sm:p-2 text-right">0 %</td>
                                    <td className="border p-1 sm:p-2 text-right">€{(service.quantity * service.rate).toFixed(2)}</td>
                                    <td className="border p-1 sm:p-2 text-center screen-only">
                                        <button
                                            onClick={() => removeService(index)}
                                            className="text-red-500 hover:text-red-700 text-sm"
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
                        <button onClick={addService} className="text-green-600 hover:underline text-sm">
                            + Ajouter un article
                        </button>
                    </div>
                </section>

                {/* Notes, Terms, and Totals */}
                <section className="flex flex-col sm:flex-row justify-between gap-4 sm:gap-5">
                    <div className="flex-1 flex flex-col gap-4">
                        <div>
                            <h2 className="font-semibold text-gray-600 pb-2">Coordonnées bancaires :</h2>
                            <p className="text-xs sm:text-sm">IBAN: FR68 2004 1010 0526 9833 5T02 690</p>
                            <p className="text-xs sm:text-sm">BIC: PSSTFRPPLIL</p>
                            <p className="text-xs sm:text-sm">Banque: La poste</p>
                            <p className="text-xs sm:text-sm">Titulaire: {freelancer.name}</p>
                        </div>
                        <div>
                            <h2 className="font-semibold text-gray-600">Notes :</h2>
                            <p className="text-xs sm:text-sm">TVA NON APPLICABLE, Article 293 B du CGI</p>
                            <textarea
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                className="border p-2 w-full h-20 screen-only mt-1 rounded"
                            />
                            <div className="print-only mt-1">{notes}</div>
                        </div>
                        <div>
                            <h2 className="font-semibold text-gray-600 pb-2">Conditions de paiement :</h2>
                            <p className="text-xs sm:text-sm">100 % soit {balanceDue.toFixed(2)} € à payer 30 jours fin de mois</p>
                            <textarea
                                value={terms}
                                onChange={(e) => setTerms(e.target.value)}
                                className="border p-2 w-full h-20 screen-only mt-1 rounded"
                            />
                            <div className="print-only mt-1">{terms}</div>
                        </div>
                    </div>
                    <div className="w-full sm:w-1/3 text-right mt-4 sm:mt-0">
                        <p className="flex justify-between">
                            <strong>Sous-total HT:</strong> €{subtotal.toFixed(2)}
                        </p>
                        <p className="mt-2 flex justify-between">
                            <strong>TVA (0%):</strong> €{tax.toFixed(2)}
                        </p>
                        <p className="mt-2 flex justify-between items-center">
                            <strong>Montant payé:</strong>
                            <span className="print-only">€{amountPaid.toFixed(2)}</span>
                            <input
                                type="number"
                                value={amountPaid}
                                onChange={(e) => setAmountPaid(Number(e.target.value))}
                                className="border p-2 w-full sm:w-20 ml-2 screen-only rounded"
                                step="0.01"
                            />
                        </p>
                        <hr className="my-2" />
                        <p className="text-base sm:text-lg font-bold flex justify-between">
                            <strong>Total TTC:</strong> €{balanceDue.toFixed(2)}
                        </p>
                    </div>
                </section>
            </div>

            <div className="w-full max-w-4xl mx-auto mt-6 px-4 sm:px-6">
                <div className="flex flex-col sm:flex-row gap-4 screen-only">
                    <button
                        onClick={() => setShowPDF(!showPDF)}
                        className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-4 rounded w-full sm:w-auto text-sm sm:text-base"
                    >
                        {showPDF ? 'Masquer Aperçu' : 'Afficher Aperçu'}
                    </button>
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
                                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded disabled:opacity-50 w-full sm:w-auto text-sm sm:text-base"
                                disabled={loading}
                            >
                                {loading ? 'Génération...' : 'Télécharger le PDF'}
                            </button>
                        )}
                    </PDFDownloadLink>
                    <button
                        onClick={clearForm}
                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-4 rounded w-full sm:w-auto text-sm sm:text-base"
                    >
                        Réinitialiser le Formulaire
                    </button>
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