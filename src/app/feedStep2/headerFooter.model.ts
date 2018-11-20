export class HeaderFooter {
    public headerNumber: number;
    public headerDelimiter: string;
    public footerNumber: number;
    public footerDelimiter: string;
    public okFileIncluded: boolean;
    public dataDelimiter: string;
    public textQualifier: string;

/*
    static clone(headerFooter: HeaderFooter): HeaderFooter {
        return new HeaderFooter(headerFooter.name, headerFooter.email, headerFooter.address, headerFooter.done);
    }
*/

    constructor(
		headerNumber: number, 
		headerDelimiter: string, 
		footerNumber: number, 
		footerDelimiter: string, 
		textQualifier:string, 
		dataDelimiter:string, 
		okFileIncluded = false
	) {
        this.headerNumber = headerNumber;
        this.headerDelimiter = headerDelimiter;
        this.footerNumber = footerNumber;
        this.footerDelimiter = footerDelimiter;
        this.dataDelimiter = dataDelimiter;
        this.textQualifier = textQualifier;
        this.okFileIncluded = okFileIncluded;
    }

    clear() {
        this.headerNumber = 0;
        this.headerDelimiter = '';
        this.footerNumber = 0;
        this.footerDelimiter = '';
        this.dataDelimiter = '';
        this.textQualifier = '';
        this.okFileIncluded = false;
    }
}
