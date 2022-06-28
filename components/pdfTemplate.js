const singlePageInvoice = ({ title, title2, items }, total) => {
	return `
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
        <style>
          .watermark {
            position: absolute;
            margin: auto;
            width: 500px;
            height: 500px;
            left: 0; 
            right: 0;
            top: 0;
            bottom: 0;
            z-index: -100;
            opacity: 0.06;
          }

          table {
            font-family: arial, sans-serif;
            border-collapse: collapse;
            width: 100%;
          }

          td, th {
            border: 1px solid #dddddd;
            text-align: left;
            padding: 8px;
          }

          .footer {
            width: 800px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            position: absolute;
            bottom: 1%;
          }
        </style>
      </head>

      <body>
        <div style="position:relative;display:grid;place-items:center;">
          <div class="watermark">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/invoice-app-e6e67.appspot.com/o/switchbox-watermark.jpeg?alt=media&token=d0d35ac7-9a23-4a57-b8f3-0d3f3df6adf8"
              alt=''
              style="width:100%;"
            />
          </div>

          <img
          src="https://firebasestorage.googleapis.com/v0/b/invoice-app-e6e67.appspot.com/o/switchbox-logo.jpeg?alt=media&token=2630a169-2249-4544-be6b-f398ae8abd2f"
          alt=''
            style="width:100px;object-fit:contain;border:0px;" 
          />
          </div>
          
          <h2 style="text-align:center">${title}</h2>
		    ${title2 && `<h3 style='text-align:center'>${title2}</h3>`}

        <table>
          <thead>
            <tr>
              <th>S/N</th>
              <th>DESCRIPTION</th>
              <th>QTY</th>
              <th>RATE</th>
              <th>AMOUNT</th>
            </tr>
          </thead>

          <tbody>
            ${items
							.map(
								(item, idx) =>
									`<tr key={idx}>
                <td>${idx + 1}</td>
                <td>${item.name}</td>
                <td>${item.quantity}</td>
                <td>₦${String(item.rate).replace(
									/\B(?=(\d{3})+(?!\d))/g,
									','
								)}</td>
                <td>₦${String(item.rate * item.quantity).replace(
									/\B(?=(\d{3})+(?!\d))/g,
									','
								)}.00</td>
              </tr>`
							)
							.join('')}

            <tr style="font-weight: bold;">
							<td style="text-align:center" colspan="3">Grand Total</td>
							<td style="text-align:center" colspan="2">₦${String(total).replace(
								/\B(?=(\d{3})+(?!\d))/g,
								','
							)}
							</td>
						</tr>

            <div class="footer">
							<img
								src="https://firebasestorage.googleapis.com/v0/b/invoice-app-e6e67.appspot.com/o/switchbox-footer.PNG?alt=media&token=cc7657de-dc57-4dd4-acdf-3a08cbb45175"
								alt=''
								style="object-fit:contain;border:0;" 
							/>
              <div style="font-weight:bold;">1</div>
						</div>
          </tbody>
        </table>
      </body>
    </html>`;
};

const page = (idx, title, title2, items, total, numOfPages) => {
	const multiplier = idx > 1 ? 21 : 20;
	return `
      <div style="position:relative;height:1042px;">
        <div style="display:grid;place-items:center;">
          <div class="watermark">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/invoice-app-e6e67.appspot.com/o/switchbox-watermark.jpeg?alt=media&token=d0d35ac7-9a23-4a57-b8f3-0d3f3df6adf8"
              alt=''
              style="width:100%;"
            />
          </div>

          ${
						idx === 0
							? `<img
              src="https://firebasestorage.googleapis.com/v0/b/invoice-app-e6e67.appspot.com/o/switchbox-logo.jpeg?alt=media&token=2630a169-2249-4544-be6b-f398ae8abd2f"
              alt=''
                style="width:100px;object-fit:contain;border:0px;" 
            />`
							: ``
					}
        </div>
          
        ${idx === 0 ? `<h2 style="text-align:center">${title}</h2>` : ``}
		    ${idx === 0 && title2 ? `<h3 style='text-align:center'>${title2}</h3>` : ``}

        <table>
          <thead>
            <tr>
              <th>S/N</th>
              <th>DESCRIPTION</th>
              <th>QTY</th>
              <th>RATE</th>
              <th>AMOUNT</th>
            </tr>
          </thead>

          <tbody>
            ${items
							.map(
								(item, index) =>
									`<tr key={index}>
                <td>${index + 1 + idx * multiplier}</td>
                <td>${item.name}</td>
                <td>${item.quantity}</td>
                <td>₦${String(item.rate).replace(
									/\B(?=(\d{3})+(?!\d))/g,
									','
								)}</td>
                <td>₦${String(item.rate * item.quantity).replace(
									/\B(?=(\d{3})+(?!\d))/g,
									','
								)}.00</td>
              </tr>`
							)
							.join('')}

            ${
							idx + 1 === numOfPages
								? `<tr style="font-weight: bold;">
							<td style="text-align:center" colspan="3">Grand Total</td>
							<td style="text-align:center" colspan="2">₦${String(total).replace(
								/\B(?=(\d{3})+(?!\d))/g,
								','
							)}.00
							</td>
						</tr>`
								: ``
						}
          </tbody>
        </table>

        <div class="footer">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/invoice-app-e6e67.appspot.com/o/switchbox-footer.PNG?alt=media&token=cc7657de-dc57-4dd4-acdf-3a08cbb45175"
            alt=''
            style="object-fit:contain;border:0;" 
          />
          <div style="font-weight:bold;">${idx + 1}</div>
        </div>

        ${idx === 0 ? `` : `<div class="pagebreak"></div>`}
      </div>`;
};

const multiplePageInvoice = ({ title, title2, items }, total) => {
	const numOfPages = Math.ceil(items.length / 22);
	const pageItemsArray = [];

	let start = 0;
	let end = 20;
	for (let i = 0; i < numOfPages; i++) {
		const arr = items.slice(start, end);
		pageItemsArray.push(arr);
		start = end;
		end += 22;
	}

	return `
	  <html>
	    <head>
	      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
	      <style>
	        .watermark {
	          position: absolute;
	          margin: auto;
	          width: 500px;
	          height: 500px;
	          left: 0;
	          right: 0;
	          top: 0;
	          bottom: 0;
	          z-index: -100;
	          opacity: 0.06;
	        }

	        table {
	          font-family: arial, sans-serif;
	          border-collapse: collapse;
	          width: 100%;
	        }

	        td, th {
	          border: 1px solid #dddddd;
	          text-align: left;
	          padding: 8px;
	        }

	        .footer {
	          width: 800px;
	          display: flex;
	          justify-content: space-between;
	          align-items: center;
	          position: absolute;
	          bottom: 1%;
	        }

          @media print {
            .pageBreak { 
              page-break-after: always;
            }
          }
	      </style>
	    </head>

	    <body>
	      ${pageItemsArray
					.map((pageItems, idx) =>
						page(idx, title, title2, pageItems, total, numOfPages)
					)
					.join('')}
	    </body>
	  </html>`;
};

export { singlePageInvoice, multiplePageInvoice };
