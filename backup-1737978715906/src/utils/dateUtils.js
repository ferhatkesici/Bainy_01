import { format, parseISO, isValid } from 'date-fns';
import { tr } from 'date-fns/locale';

export const formatTime = (dateStr) => {
  if (!dateStr) return '';
  
  const date = new Date(dateStr);
  return date.toLocaleTimeString('tr-TR', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });
};

export const formatDate = (date) => {
  if (!date) return '';
  const parsedDate = typeof date === 'string' ? parseISO(date) : date;
  return isValid(parsedDate) ? format(parsedDate, 'dd MMMM yyyy', { locale: tr }) : '';
};

export const formatDateTime = (date) => {
  if (!date) return '';
  const parsedDate = typeof date === 'string' ? parseISO(date) : date;
  return isValid(parsedDate) ? format(parsedDate, 'dd MMMM yyyy HH:mm', { locale: tr }) : '';
};

export const getWeekNumber = (date) => {
  const parsedDate = typeof date === 'string' ? parseISO(date) : date;
  return format(parsedDate, 'w');
};

export const getMonthName = (date) => {
  const parsedDate = typeof date === 'string' ? parseISO(date) : date;
  return format(parsedDate, 'MMMM', { locale: tr });
}; 