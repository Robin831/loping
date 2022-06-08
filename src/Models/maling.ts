export class Maling {
  dato: Date = new Date();
  id: string = '';
  pulsDataMalinger: Puls[] = [];
  fartDataMalinger: Fart[] = [];

}

export class Puls{
    puls: string = '';
    laktat: number = 0;
}

export class Fart{
    fart: string = '';
    laktat: number = 0;
}
