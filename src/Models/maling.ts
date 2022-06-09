export class Maling {
	dato: Date = new Date();
	id: string = '';
	pulsDataMalinger: Puls[] = [];
	fartDataMalinger: Fart[] = [];
	malinger: Data[] = [];
}

export class Puls {
	puls: string = '';
	laktat: number = 0;
}

export class Fart {
	fart: string = '';
	laktat: number = 0;
}

export class Data {
	puls: string = '';
	fart: string = '';
	laktat: number = 0;
}

export type Measurement = {
	id?: string | null;
	date: Date;
	laktater: LaktatType[];
};

export type LaktatType = {
	fart: number;
	laktat: number;
	puls: number;
	id?: string | null;
};
