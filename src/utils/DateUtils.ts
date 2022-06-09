import moment from 'moment';

export const prettifyDate = (date: Date | null) => (date ? moment(date).format('DD.MM.YYYY') : '');
