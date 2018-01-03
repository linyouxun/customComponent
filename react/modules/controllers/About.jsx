import React from 'react';
import XLSX from 'xlsx';
import { saveAs } from 'file-saver';

function s2ab(s/*:string*/)/*:ArrayBuffer*/ {
  const buf = new ArrayBuffer(s.length);
  const view = new Uint8Array(buf);
  for (let i=0; i!=s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
  return buf;
}

export default class About extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
			data: [["a","b"],[1,2]], /* Array of Arrays e.g. [["a","b"],[1,2]] */
			cols: [{ name: "C", K: 2 }]  /* Array of column objects e.g. { name: "C", K: 2 } */
		};

  }
  save() {
    console.log('log');
    /* convert state to workbook */
		var ws = XLSX.utils.json_to_sheet([
      {S:1,h:2,e:3,e_1:4,t:5,J:6,S_1:7},
      {S:2,h:3,e:4,e_1:5,t:6,J:7,S_1:8}
    ], {header:["S","h","e","e_1","t","J","S_1"]});
		const wb = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(wb, ws, "SheetJS");
		/* generate XLSX file */
		const wbout = XLSX.write(wb, {type:"binary", bookType:"xlsx"});
		/* send to client */
		saveAs(new Blob([s2ab(wbout)],{type:"application/octet-stream"}), "sheetjs.xlsx");
  }
  render() {
    return (
      <div>
        <div onClick={this.save.bind(this)}>save</div>
      </div>
    );
  }
}
