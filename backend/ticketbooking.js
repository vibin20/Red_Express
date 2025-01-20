import { PDFDocument, rgb } from 'pdf-lib';

export default async function handler(req, res) {
  // Check if the request method is POST
  if (req.method === 'POST') {
    const { ticketDetails } = req.body;

    try {
      // Create a new PDF Document
      const pdfDoc = await PDFDocument.create();
      const page = pdfDoc.addPage([600, 400]); // Create a page of size 600x400
      const { width, height } = page.getSize();

      // Add content to the PDF
      page.drawText('Red Express Ticket', {
        x: 50,
        y: height - 50,
        size: 24,
        color: rgb(0, 0.2, 0.5), // Dark blue color
      });
      
      // Add ticket details to the PDF
      page.drawText(`Name: ${ticketDetails.name}`, { x: 50, y: height - 100, size: 18 });
      page.drawText(`Booking ID: ${ticketDetails.bookingId}`, { x: 50, y: height - 130, size: 18 });
      page.drawText(`Date: ${ticketDetails.date}`, { x: 50, y: height - 160, size: 18 });
      page.drawText(`Departure: ${ticketDetails.departure}`, { x: 50, y: height - 190, size: 18 });
      page.drawText(`Arrival: ${ticketDetails.arrival}`, { x: 50, y: height - 220, size: 18 });
      page.drawText(`Seat No: ${ticketDetails.seatNo}`, { x: 50, y: height - 250, size: 18 });

      // Save the PDF document and send it back as a response
      const pdfBytes = await pdfDoc.save();
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename=ticket.pdf');
      res.status(200).send(Buffer.from(pdfBytes)); // Send the PDF data
    } catch (error) {
      // Handle any errors during PDF generation
      console.error('Error generating PDF:', error);
      res.status(500).json({ error: 'Failed to generate PDF' });
    }
  } else {
    // If the request method is not POST, return a 405 error
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
