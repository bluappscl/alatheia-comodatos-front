export const formatCurrency = (value: number, currency: string) => {
    let options: Intl.NumberFormatOptions = {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    };
  
    switch (currency) {
      case 'CLP':
        options = {
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        };
        return value.toLocaleString('de-DE', options); // Miles con puntos, sin decimales
  
      case 'USD':
        options = {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        };
        return value.toLocaleString('de-DE', options); // Miles con puntos, decimales con coma
  
      case 'UF':
        options = {
          minimumFractionDigits: 4,
          maximumFractionDigits: 4,
        };
        return value.toLocaleString('de-DE', options); // Miles con puntos, 4 decimales
  
      default:
        return value.toLocaleString('de-DE', options); // Default a CLP si no se especifica moneda
    }
  };