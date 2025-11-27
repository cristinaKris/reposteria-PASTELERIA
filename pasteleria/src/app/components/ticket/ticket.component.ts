import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Pedido } from '../../models/pedido';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss']
})
export class TicketComponent {

  constructor(
    public dialogRef: MatDialogRef<TicketComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { pedido: Pedido }
  ) {}

  descargarPDF() {
    const ticket = document.getElementById('ticketPDF');

    html2canvas(ticket!).then(canvas => {
      const img = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');

      pdf.addImage(img, 'PNG', 10, 10, 190, 0);
      pdf.save('ticket-pedido.pdf');
    });
  }

  cerrar() {
    this.dialogRef.close();
   
  }
}
