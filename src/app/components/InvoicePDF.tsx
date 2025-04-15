// // src/components/InvoicePDF.tsx
// 'use client';

// import { Document, Page, Text, View, Image as PDFImage, StyleSheet } from '@react-pdf/renderer';

// // Define styles matching old InvoicePDF
// const styles = StyleSheet.create({
//     page: {
//         padding: 20,
//         fontFamily: 'Helvetica',
//         fontSize: 10,
//     },
//     header: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         marginBottom: 30,
//     },
//     logo: {
//         width: 160,
//         height: 30,
//     },
//     headerText: {
//         flexDirection: 'column',
//         alignItems: 'flex-end',
//     },
//     title: {
//         fontSize: 24,
//         fontWeight: 'bold',
//         marginBottom: 4,
//     },
//     invoiceNumber: {
//         fontSize: 10,
//     },
//     section: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         marginBottom: 30,
//         gap: 10,
//     },
//     leftColumn: {
//         width: '55%',
//     },
//     rightColumn: {
//         width: '40%',
//         textAlign: 'right',
//     },
//     bold: {
//         fontWeight: 'bold',
//     },
//     table: {
//         marginBottom: 30,
//         borderWidth: 1,
//         borderColor: '#000',
//     },
//     tableHeader: {
//         flexDirection: 'row',
//         backgroundColor: '#003366',
//         color: '#fff',
//         padding: 6,
//     },
//     tableRow: {
//         flexDirection: 'row',
//         borderTopWidth: 1,
//         borderColor: '#000',
//         padding: 6,
//     },
//     tableCell: {
//         paddingHorizontal: 4,
//         flex: 2,
//     },
//     tableCellRight: {
//         paddingHorizontal: 4,
//         flex: 1,
//         textAlign: 'right',
//     },
//     footer: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         marginTop: 20,
//     },
//     footerLeft: {
//         width: '55%',
//     },
//     footerRight: {
//         width: '40%',
//         textAlign: 'right',
//     },
//     hr: {
//         borderTopWidth: 1,
//         borderColor: '#000',
//         marginVertical: 6,
//     },
//     textSm: {
//         fontSize: 10,
//         lineHeight: 1.8,
//     },
//     textLg: {
//         fontSize: 12,
//         fontWeight: 'bold',
//     },
//     gap4: {
//         marginTop: 8,
//     },
//     gap2: {
//         marginTop: 4,
//     },
//     gap14: {
//         marginTop: 18,
//     },
// });

// type Props = {
//     invoiceNumber: string;
//     issueDate: string;
//     dueDate: string;
//     freelancer: { name: string; address: string; siret: string; email: string };
//     client: { billTo: string };
//     services: { description: string; quantity: number; rate: number }[];
//     notes: string;
//     terms: string;
//     subtotal: number;
//     tax: number;
//     amountPaid: number;
//     balanceDue: number;
// };

// const InvoicePDF = ({
//     invoiceNumber,
//     issueDate,
//     dueDate,
//     freelancer,
//     client,
//     services,
//     notes,
//     terms,
//     subtotal,
//     tax,
//     amountPaid,
//     balanceDue,
// }: Props) => (
//     <Document>
//         <Page size="A4" style={styles.page}>
//             {/* Header */}
//             <View style={styles.header}>
//                 <PDFImage src="/neeldot.png" style={styles.logo} />
//                 <View style={styles.headerText}>
//                     <Text style={styles.title}>FACTURE</Text>
//                     <Text style={styles.invoiceNumber}>N° {invoiceNumber}</Text>
//                 </View>
//             </View>

//             {/* Freelancer and Client Info */}
//             <View style={styles.section}>
//                 <View style={[styles.leftColumn, styles.textSm]}>
//                     <Text>{freelancer.name}</Text>
//                     <Text>{freelancer.address}</Text>
//                     <Text>SIRET: {freelancer.siret}</Text>
//                     <Text>Email: {freelancer.email}</Text>
//                     <Text style={[styles.bold, styles.gap14]}>Facturé à</Text>
//                     <Text>{client.billTo || 'À qui s’adresse cette facture ?'}</Text>
//                 </View>
//                 <View style={styles.rightColumn}>
//                     <Text style={styles.textSm}>
//                         <Text style={styles.bold}>Date: </Text>
//                         {issueDate}
//                     </Text>
//                     <Text style={[styles.textSm, styles.gap4]}>
//                         <Text style={styles.bold}>Date d’échéance: </Text>
//                         {dueDate}
//                     </Text>
//                 </View>
//             </View>

//             {/* Services Table */}
//             <View style={styles.table}>
//                 <View style={styles.tableHeader}>
//                     <Text style={styles.tableCell}>Prestation</Text>
//                     <Text style={styles.tableCellRight}>Quantité [Hours]</Text>
//                     <Text style={styles.tableCellRight}>Tarif [HT]</Text>
//                     <Text style={styles.tableCellRight}>TVA</Text>
//                     <Text style={styles.tableCellRight}>Montant [HT]</Text>
//                 </View>
//                 {services.map((service, index) => (
//                     <View key={index} style={styles.tableRow}>
//                         <Text style={styles.tableCell}>{service.description || 'Description...'}</Text>
//                         <Text style={styles.tableCellRight}>{service.quantity}</Text>
//                         <Text style={styles.tableCellRight}>€ {service.rate.toFixed(2)}</Text>
//                         <Text style={styles.tableCellRight}>0 %</Text>
//                         <Text style={styles.tableCellRight}>€ {(service.quantity * service.rate).toFixed(2)}</Text>
//                     </View>
//                 ))}
//             </View>

//             {/* Notes, Terms, and Totals */}
//             <View style={styles.footer}>
//                 <View style={styles.footerLeft}>
//                     <Text style={styles.bold}>Notes :</Text>
//                     <Text style={[styles.textSm, styles.gap4]}>TVA NON APPLICABLE, Article 293 B du CGI</Text>
//                     <Text style={[styles.textSm, styles.gap4]}>{notes}</Text>
//                     <Text style={[styles.bold, styles.gap14]}>Conditions de paiement :</Text>
//                     <Text style={[styles.textSm, styles.gap4]}>100 % soit {balanceDue.toFixed(2)} € à payer 30 jours fin de mois</Text>
//                     <Text style={[styles.textSm, styles.gap4]}>{terms}</Text>
//                 </View>
//                 <View style={styles.footerRight}>
//                     <Text style={styles.textSm}>
//                         <Text style={styles.bold}>Sous-total HT: </Text>€ {subtotal.toFixed(2)}
//                     </Text>
//                     <Text style={[styles.textSm, styles.gap4]}>
//                         <Text style={styles.bold}>TVA (0%): </Text>€ {tax.toFixed(2)}
//                     </Text>
//                     <Text style={[styles.textSm, styles.gap4]}>
//                         <Text style={styles.bold}>Montant payé: </Text>€ {amountPaid.toFixed(2)}
//                     </Text>
//                     <View style={styles.hr} />
//                     <Text style={styles.textLg}>
//                         <Text style={styles.bold}>Total TTC: </Text>€ {balanceDue.toFixed(2)}
//                     </Text>
//                 </View>
//             </View>
//         </Page>
//     </Document>
// );

// export default InvoicePDF;

// src/components/InvoicePDF.tsx
'use client';

import { Document, Page, Text, View, Image as PDFImage, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    page: {
        padding: 20,
        fontFamily: 'Helvetica',
        fontSize: 10,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 30,
    },
    logo: {
        width: 160,
        height: 30,
    },
    headerText: {
        flexDirection: 'column',
        alignItems: 'flex-end',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    invoiceNumber: {
        fontSize: 10,
    },
    section: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
        gap: 10,
    },
    section1: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginBottom: 30,
    },
    bold: {
        fontWeight: 'bold',
    },
    table: {
        marginBottom: 30,
        borderWidth: 1,
        borderColor: '#000',
    },
    tableHeader: {
        flexDirection: 'row',
        backgroundColor: '#003366',
        color: '#fff',
        padding: 6,
    },
    tableRow: {
        flexDirection: 'row',
        borderTopWidth: 1,
        borderColor: '#000',
        padding: 6,
    },
    tableCell: {
        paddingHorizontal: 4,
        flex: 2,
    },
    tableCellRight: {
        paddingHorizontal: 4,
        flex: 1,
        textAlign: 'right',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    footerLeft: {
        width: '55%',
    },
    footerRight: {
        width: '40%',
        textAlign: 'right',
    },
    hr: {
        borderTopWidth: 1,
        borderColor: '#000',
        marginVertical: 6,
    },
    textSm: {
        fontSize: 10,
        lineHeight: 1.8,
    },
    textLg: {
        fontSize: 12,
        fontWeight: 'bold',
    },
    gap4: {
        marginTop: 8,
    },
    gap2: {
        marginTop: 4,
    },
    gap14: {
        marginTop: 18,
    },
});

type Props = {
    invoiceNumber: string;
    issueDate: string;
    dueDate: string;
    freelancer: { name: string; address: string; siret: string; email: string };
    client: { billTo: string };
    services: { description: string; quantity: number; rate: number }[];
    notes: string;
    terms: string;
    subtotal: number;
    tax: number;
    amountPaid: number;
    balanceDue: number;
};

const InvoicePDF = ({
    invoiceNumber,
    issueDate,
    dueDate,
    freelancer,
    client,
    services,
    notes,
    terms,
    subtotal,
    tax,
    amountPaid,
    balanceDue,
}: Props) => (
    <Document>
        <Page size="A4" style={styles.page}>
            {/* Header */}
            <View style={styles.header}>
                <PDFImage src="/neeldot.png" style={styles.logo} />
                <View style={styles.headerText}>
                    <Text style={styles.title}>FACTURE</Text>
                    <Text style={styles.invoiceNumber}>N° {invoiceNumber}</Text>
                </View>
            </View>

            {/* Freelancer and Client Info */}
            <View style={styles.section}>
                <View style={styles.textSm}>
                    <Text>{freelancer.name}</Text>
                    <Text>{freelancer.address}</Text>
                    <Text>SIRET: {freelancer.siret}</Text>
                    <Text>Email: {freelancer.email}</Text>
                </View>
            </View>
            <View style={styles.section1}>
                <View>
                    <Text>
                        <Text style={styles.bold}>Date: </Text>
                        {issueDate}
                    </Text>
                    <Text style={styles.gap4}>
                        <Text style={styles.bold}>Date d’échéance: </Text>
                        {dueDate}
                    </Text>
                </View>
                <View style={styles.textSm}>
                    <Text style={styles.bold}>Facturé à</Text>
                    <Text style={styles.gap2}>{client.billTo || 'À qui s’adresse cette facture ?'}</Text>
                </View>
            </View>

            {/* Services Table */}
            <View style={styles.table}>
                <View style={styles.tableHeader}>
                    <Text style={styles.tableCell}>Prestation</Text>
                    <Text style={styles.tableCellRight}>Quantité [Hours]</Text>
                    <Text style={styles.tableCellRight}>Tarif [HT]</Text>
                    <Text style={styles.tableCellRight}>TVA</Text>
                    <Text style={styles.tableCellRight}>Montant [HT]</Text>
                </View>
                {services
                    .filter((s) => s && typeof s === 'object') // extra safety
                    .map((service, index) => {
                        const quantity = Number(service.quantity) || 0;
                        const rate = Number(service.rate) || 0;
                        const amount = quantity * rate;

                        return (
                            <View key={index} style={styles.tableRow}>
                                <Text style={styles.tableCell}>{service.description || 'Description...'}</Text>
                                <Text style={styles.tableCellRight}>{quantity.toFixed(0)}</Text>
                                <Text style={styles.tableCellRight}>€ {rate.toFixed(2)}</Text>
                                <Text style={styles.tableCellRight}>0 %</Text>
                                <Text style={styles.tableCellRight}>€ {amount.toFixed(2)}</Text>
                            </View>
                        );
                    })}

            </View>

            {/* Notes, Terms, and Totals */}
            <View style={styles.footer}>
                <View style={styles.footerLeft}>
                    <Text style={styles.bold}>Notes :</Text>
                    <Text style={[styles.textSm, styles.gap4]}>TVA NON APPLICABLE, Article 293 B du CGI</Text>
                    <Text style={[styles.textSm, styles.gap4]}>{notes}</Text>
                    <Text style={[styles.bold, styles.gap14]}>Conditions de paiement :</Text>
                    <Text style={[styles.textSm, styles.gap4]}>100 % soit {balanceDue.toFixed(2)} € à payer 30 jours fin de mois</Text>
                    <Text style={[styles.textSm, styles.gap4]}>{terms}</Text>
                </View>
                <View style={styles.footerRight}>
                    <Text style={styles.textSm}>
                        <Text style={styles.bold}>Sous-total HT: </Text>€ {subtotal.toFixed(2)}
                    </Text>
                    <Text style={[styles.textSm, styles.gap4]}>
                        <Text style={styles.bold}>TVA (0%): </Text>€ {tax.toFixed(2)}
                    </Text>
                    <Text style={[styles.textSm, styles.gap4]}>
                        <Text style={styles.bold}>Montant payé: </Text>€ {amountPaid.toFixed(2)}
                    </Text>
                    <View style={styles.hr} />
                    <Text style={styles.textLg}>
                        <Text style={styles.bold}>Total TTC: </Text>€ {balanceDue.toFixed(2)}
                    </Text>
                </View>
            </View>
        </Page>
    </Document>
);

export default InvoicePDF;